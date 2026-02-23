import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import type { ProductLine } from '@/data/catalogData';
import {
  CATALOG_STORAGE_KEY,
  isRemoteSyncEnabled,
  loadCatalogFromRemote,
  saveCatalogToRemote,
} from '@/lib/catalogSync';

let defaultProductLinesCache: ProductLine[] | null = null;

const loadDefaultProductLines = async (): Promise<ProductLine[]> => {
  if (defaultProductLinesCache) {
    return defaultProductLinesCache;
  }

  const module = await import('@/data/catalogData');
  defaultProductLinesCache = module.productLines;
  return defaultProductLinesCache;
};

const getCachedDefaultProductLines = (): ProductLine[] => defaultProductLinesCache ?? [];

const hasAquamotosInDeportiva = (lines: ProductLine[]) => {
  const deportiva = lines.find((line) => line.id === 'deportiva');
  if (!deportiva) return false;

  const aquamotos = deportiva.categories.find((category) => category.id === 'aquamotos');
  return !!aquamotos && aquamotos.products.length > 0;
};

const normalizeCatalogData = (lines: ProductLine[], fallback: ProductLine[]) => {
  if (fallback.length === 0) {
    return lines;
  }

  if (hasAquamotosInDeportiva(lines)) {
    return lines;
  }

  return fallback;
};

interface CatalogContextType {
  productLines: ProductLine[];
  updateProductLines: (lines: ProductLine[]) => Promise<void>;
  resetToDefault: () => void;
}

const CatalogContext = createContext<CatalogContextType | undefined>(undefined);

const mergeProductLines = (
  remote: ProductLine[],
  local: ProductLine[]
): ProductLine[] => {
  const merged = [...remote];

  local.forEach((localLine) => {
    const remoteLineIndex = merged.findIndex((line) => line.id === localLine.id);

    if (remoteLineIndex === -1) {
      merged.push(localLine);
      return;
    }

    const remoteLine = merged[remoteLineIndex];
    const mergedCategories = [...remoteLine.categories];

    localLine.categories.forEach((localCat) => {
      const remoteCatIndex = mergedCategories.findIndex((cat) => cat.id === localCat.id);

      if (remoteCatIndex === -1) {
        mergedCategories.push(localCat);
        return;
      }

      const remoteCat = mergedCategories[remoteCatIndex];
      const mergedProducts = [...remoteCat.products];

      localCat.products.forEach((localProd) => {
        const remoteProdIndex = mergedProducts.findIndex((p) => p.id === localProd.id);
        if (remoteProdIndex === -1) {
          mergedProducts.push(localProd);
        } else {
          mergedProducts[remoteProdIndex] = localProd;
        }
      });

      mergedCategories[remoteCatIndex] = {
        ...remoteCat,
        products: mergedProducts,
      };
    });

    merged[remoteLineIndex] = {
      ...remoteLine,
      categories: mergedCategories,
    };
  });

  return merged;
};

export function CatalogProvider({ children }: { children: ReactNode }) {
  const remoteSyncEnabled = isRemoteSyncEnabled();
  const [productLines, setProductLines] = useState<ProductLine[]>(() => {
    const saved = localStorage.getItem(CATALOG_STORAGE_KEY);
    if (saved) {
      try {
        return normalizeCatalogData(JSON.parse(saved), getCachedDefaultProductLines());
      } catch (e) {
        console.error('Error al cargar catálogo guardado:', e);
        return [];
      }
    }
    return [];
  });
  const [isRemoteHydrated, setIsRemoteHydrated] = useState(!remoteSyncEnabled);

  useEffect(() => {
    if (productLines.length > 0) return;

    let isCancelled = false;

    const hydrateDefaults = async () => {
      try {
        const fallback = await loadDefaultProductLines();

        if (isCancelled) {
          return;
        }

        setProductLines((current) => {
          if (current.length > 0) {
            return current;
          }

          localStorage.setItem(CATALOG_STORAGE_KEY, JSON.stringify(fallback));
          return fallback;
        });
      } catch (e) {
        console.error('Error al cargar catálogo base:', e);
      }
    };

    hydrateDefaults();

    return () => {
      isCancelled = true;
    };
  }, [productLines.length]);

  useEffect(() => {
    if (!remoteSyncEnabled) return;

    let isCancelled = false;

    const hydrateFromRemote = async () => {
      try {
        const remoteCatalog = await loadCatalogFromRemote();
        const fallback = await loadDefaultProductLines();

        if (isCancelled || !remoteCatalog) {
          return;
        }

        const normalized = normalizeCatalogData(remoteCatalog, fallback);
        setProductLines(normalized);
        localStorage.setItem(CATALOG_STORAGE_KEY, JSON.stringify(normalized));
      } catch (e) {
        console.error('Error al cargar catálogo remoto:', e);
      } finally {
        if (!isCancelled) {
          setIsRemoteHydrated(true);
        }
      }
    };

    hydrateFromRemote();

    return () => {
      isCancelled = true;
    };
  }, [remoteSyncEnabled]);

  useEffect(() => {
    if (productLines.length === 0) {
      return;
    }

    const normalized = normalizeCatalogData(productLines, getCachedDefaultProductLines());

    if (normalized !== productLines) {
      setProductLines(normalized);
      return;
    }

    localStorage.setItem(CATALOG_STORAGE_KEY, JSON.stringify(normalized));
  }, [productLines]);

  const updateProductLines = async (lines: ProductLine[]) => {
    if (!remoteSyncEnabled || !isRemoteHydrated) {
      setProductLines(lines);
      if (lines.length > 0) {
        localStorage.setItem(CATALOG_STORAGE_KEY, JSON.stringify(lines));
      }
      return;
    }

    try {
      const remoteCatalog = await loadCatalogFromRemote();
      const fallback = await loadDefaultProductLines();
      const remoteLines = remoteCatalog || fallback;
      const merged = mergeProductLines(remoteLines, lines);
      const normalized = normalizeCatalogData(merged, fallback);

      setProductLines(normalized);
      localStorage.setItem(CATALOG_STORAGE_KEY, JSON.stringify(normalized));

      await saveCatalogToRemote(normalized);
    } catch (e) {
      console.error('Error al sincronizar catálogo:', e);
      setProductLines(lines);
    }
  };

  const resetToDefault = () => {
    void (async () => {
      const fallback = await loadDefaultProductLines();
      setProductLines(fallback);
      localStorage.setItem(CATALOG_STORAGE_KEY, JSON.stringify(fallback));
    })();
  };

  return (
    <CatalogContext.Provider value={{ productLines, updateProductLines, resetToDefault }}>
      {children}
    </CatalogContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useCatalog() {
  const context = useContext(CatalogContext);
  if (!context) {
    throw new Error('useCatalog debe usarse dentro de CatalogProvider');
  }
  return context;
}
