import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Product } from '@/data/catalogData';

interface TechnicalSheetProps {
  product: Product;
  productType: 'lancha' | 'motor' | 'aceite' | 'motoAcuatica' | 'remolque';
}

export function TechnicalSheet({ product, productType }: TechnicalSheetProps) {
  const specs = product.specs || {};
  
  // Separar especificaciones por información adicional y técnicas
  const additionalInfo = specs['Información adicional'] || '';
  const technicalSpecs = Object.entries(specs).filter(
    ([key]) => key !== 'Información adicional'
  );

  // Grupos de especificaciones por tipo de producto
  const getGroupedSpecs = () => {
    const groups: Record<string, Array<[string, string]>> = {};

    if (productType === 'motor') {
      groups['Básico'] = technicalSpecs.filter(([key]) =>
        ['SKU', 'Peso', 'Dimensiones', 'Uso'].includes(key)
      );
      groups['Motor'] = technicalSpecs.filter(([key]) =>
        ['Tipo de motor', 'Cilindrada', 'Potencia Máxima', 'Revoluciones Máximas por Minuto'].includes(key)
      );
      groups['Sistemas'] = technicalSpecs.filter(([key]) =>
        ['Sistema de Combustible', 'Sistema de Arranque', 'Sistema de Dirección', 'Sistema de Inclinación'].includes(key)
      );
      groups['Capacidades'] = technicalSpecs.filter(([key]) =>
        ['Consumo de Combustible', 'Tanque de Combustible', 'Capacidad del depósito de Aceite (Motor)', 'Capacidad del depósito de Aceite (Transmisión)'].includes(key)
      );
    } else if (productType === 'lancha' || productType === 'remolque') {
      groups['Básico'] = technicalSpecs.filter(([key]) =>
        ['SKU', 'Peso'].includes(key)
      );
      groups['Dimensiones'] = technicalSpecs.filter(([key]) =>
        ['Eslora', 'Manga', 'Puntal', 'Espejo 1'].includes(key)
      );
      groups['Capacidad'] = technicalSpecs.filter(([key]) =>
        ['Capacidad Máxima de Carga'].includes(key)
      );
    } else if (productType === 'motoAcuatica') {
      groups['Básico'] = technicalSpecs.filter(([key]) =>
        ['SKU', 'Peso', 'Pet Name', 'Dimensiones'].includes(key)
      );
      groups['Motor'] = technicalSpecs.filter(([key]) =>
        ['Motor YAMAHA', 'Cilindrada', 'Inyección de aire'].includes(key)
      );
      groups['Capacidades'] = technicalSpecs.filter(([key]) =>
        ['Capacidad de Combustible', 'Capacidad de Aceite', 'Almacenamiento'].includes(key)
      );
      groups['Características'] = technicalSpecs.filter(([key]) =>
        ['Casco', 'Reversa', 'Pasajeros', 'Color', 'Sistema de audio'].includes(key)
      );
    } else if (productType === 'aceite') {
      groups['Información'] = technicalSpecs;
    }

    // Agregar specs que no encajen en ningún grupo
    const usedKeys = new Set(Object.values(groups).flat().map(([key]) => key));
    const remainingSpecs = technicalSpecs.filter(([key]) => !usedKeys.has(key));
    if (remainingSpecs.length > 0) {
      groups['Otros'] = remainingSpecs;
    }

    return groups;
  };

  const groupedSpecs = getGroupedSpecs();

  return (
    <Card className="w-full">
      <CardHeader className="border-b">
        <div>
          <CardTitle className="text-xl">{product.name}</CardTitle>
          <p className="text-sm text-gray-600 mt-1">{product.description}</p>
        </div>
      </CardHeader>
      <CardContent className="pt-6">
        <Tabs defaultValue="tecnico" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="tecnico">Datos técnicos</TabsTrigger>
            <TabsTrigger value="descripcion">Descripción</TabsTrigger>
          </TabsList>

          <TabsContent value="tecnico" className="mt-6">
            {Object.entries(groupedSpecs).map(([group, specs]) => (
              <div key={group} className="mb-8 last:mb-0">
                <h3 className="font-semibold text-blue-700 mb-4 pb-2 border-b-2 border-blue-200">
                  {group}
                </h3>
                <div className="space-y-3">
                  {specs.map(([key, value]) => (
                    <div key={key} className="flex justify-between items-start">
                      <span className="font-medium text-gray-700 flex-1">{key}</span>
                      <span className="text-gray-900 font-semibold text-right ml-4 flex-1">
                        {value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </TabsContent>

          <TabsContent value="descripcion" className="mt-6">
            {additionalInfo ? (
              <div className="prose prose-sm max-w-none">
                <p className="text-gray-700 whitespace-pre-wrap">{additionalInfo}</p>
              </div>
            ) : (
              <p className="text-gray-500 italic">No hay información adicional disponible.</p>
            )}
          </TabsContent>
        </Tabs>

        {/* Información del producto */}
        {product.variantes && product.variantes.length > 0 && (
          <div className="mt-8 pt-8 border-t">
            <h3 className="font-semibold text-lg mb-4">Variantes</h3>
            <div className="grid gap-4">
              {product.variantes.map((variante, idx) => (
                <div key={idx} className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-semibold">{variante.modelo}</p>
                      {variante.nota && (
                        <p className="text-sm text-gray-600 mt-1">{variante.nota}</p>
                      )}
                    </div>
                    {variante.precio && (
                      <p className="font-bold text-blue-600">${variante.precio}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
