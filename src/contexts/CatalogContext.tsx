import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { productLines as defaultProductLines, type ProductLine } from '@/data/catalogData';

interface CatalogContextType {
  productLines: ProductLine[];
  updateProductLines: (lines: ProductLine[]) => void;
  resetToDefault: () => void;
}

const CatalogContext = createContext<CatalogContextType | undefined>(undefined);

export function CatalogProvider({ children }: { children: ReactNode }) {
  const [productLines, setProductLines] = useState<ProductLine[]>(() => {
    // Intentar cargar desde localStorage
    const saved = localStorage.getItem('catalogData');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Error al cargar catálogo guardado:', e);
        return defaultProductLines;
      }
    }
    return defaultProductLines;
  });

  // Guardar en localStorage cuando cambie
  useEffect(() => {
    localStorage.setItem('catalogData', JSON.stringify(productLines));
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

export function useCatalog() {
  const context = useContext(CatalogContext);
  if (!context) {
    throw new Error('useCatalog debe usarse dentro de CatalogProvider');
  }
  return context;
}
