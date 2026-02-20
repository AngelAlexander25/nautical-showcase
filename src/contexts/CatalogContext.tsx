import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { productLines as defaultProductLines, type ProductLine } from '@/data/catalogData';
import {
  CATALOG_STORAGE_KEY,
  isRemoteSyncEnabled,
  loadCatalogFromRemote,
  saveCatalogToRemote,
} from '@/lib/catalogSync';

const hasAquamotosInDeportiva = (lines: ProductLine[]) => {
  const deportiva = lines.find((line) => line.id === 'deportiva');
  if (!deportiva) return false;

  const aquamotos = deportiva.categories.find((category) => category.id === 'aquamotos');
  return !!aquamotos && aquamotos.products.length > 0;
};

const normalizeCatalogData = (lines: ProductLine[]) => {
  if (hasAquamotosInDeportiva(lines)) {
    return lines;
  }

  return defaultProductLines;
};

interface CatalogContextType {
  productLines: ProductLine[];
  updateProductLines: (lines: ProductLine[]) => void;
  resetToDefault: () => void;
}

const CatalogContext = createContext<CatalogContextType | undefined>(undefined);

export function CatalogProvider({ children }: { children: ReactNode }) {
  const remoteSyncEnabled = isRemoteSyncEnabled();
  const [productLines, setProductLines] = useState<ProductLine[]>(() => {
    const saved = localStorage.getItem(CATALOG_STORAGE_KEY);
    if (saved) {
      try {
        return normalizeCatalogData(JSON.parse(saved));
      } catch (e) {
        console.error('Error al cargar catálogo guardado:', e);
        return defaultProductLines;
      }
    }
    return defaultProductLines;
  });
  const [isRemoteHydrated, setIsRemoteHydrated] = useState(!remoteSyncEnabled);

  useEffect(() => {
    if (!remoteSyncEnabled) return;

    let isCancelled = false;

    const hydrateFromRemote = async () => {
      try {
        const remoteCatalog = await loadCatalogFromRemote();

        if (isCancelled || !remoteCatalog) {
          return;
        }

        const normalized = normalizeCatalogData(remoteCatalog);
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
    const normalized = normalizeCatalogData(productLines);

    if (normalized !== productLines) {
      setProductLines(normalized);
      return;
    }

    localStorage.setItem(CATALOG_STORAGE_KEY, JSON.stringify(normalized));

    if (!remoteSyncEnabled || !isRemoteHydrated) {
      return;
    }

    const syncTimeout = window.setTimeout(() => {
      saveCatalogToRemote(normalized).catch((e) => {
        console.error('Error al guardar catálogo remoto:', e);
      });
    }, 400);

    return () => {
      window.clearTimeout(syncTimeout);
    };
  }, [isRemoteHydrated, productLines, remoteSyncEnabled]);

  const updateProductLines = (lines: ProductLine[]) => {
    setProductLines(lines);
  };

  const resetToDefault = () => {
    setProductLines(defaultProductLines);
    localStorage.removeItem(CATALOG_STORAGE_KEY);
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
