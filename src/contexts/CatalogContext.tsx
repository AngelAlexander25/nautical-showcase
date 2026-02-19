import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { productLines as defaultProductLines, type ProductLine } from '@/data/catalogData';

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
  const [productLines, setProductLines] = useState<ProductLine[]>(() => {
    const saved = localStorage.getItem('catalogData');
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

  useEffect(() => {
    const normalized = normalizeCatalogData(productLines);

    if (normalized !== productLines) {
      setProductLines(normalized);
      return;
    }

    localStorage.setItem('catalogData', JSON.stringify(normalized));
  }, [productLines]);

  const updateProductLines = (lines: ProductLine[]) => {
    setProductLines(lines);
  };

  const resetToDefault = () => {
    setProductLines(defaultProductLines);
    localStorage.removeItem('catalogData');
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
