import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { HelpCircle } from 'lucide-react';

export function TemplateReferenceDialog() {
  const templates = [
    {
      type: 'lancha',
      label: 'Lancha',
      fields: [
        'Información adicional - Descripción del uso y características',
        'SKU - Código del modelo (ej: W-267BA)',
        'Peso - Incluir unidad kg',
        'Eslora - Largo del casco en metros (m)',
        'Manga - Ancho del casco en metros (m)',
        'Puntal - Altura del casco en metros (m)',
        'Espejo 1 - Medida del espejo en metros (m)',
        'Capacidad Máxima de Carga - En kg'
      ],
      example: 'W-267BA: 8.13m × 2.67m × 1.34m, Peso 5,500kg, Carga máxima 1,814kg'
    },
    {
      type: 'motor',
      label: 'Motor',
      fields: [
        'Información adicional - Tecnología y características especiales',
        'SKU - Código del motor',
        'Dimensiones - Formato: Ancho × Profundidad × Altura (m)',
        'Peso - Incluir rango si varía (kg)',
        'Uso - Commercial, etc.',
        'Tipo de motor - 4 tiempos, cilindros, tipo',
        'Cilindrada - En cc',
        'Potencia Máxima - En HP y RPM (ej: 300 HP @5,500rpm)',
        'Sistema de Combustible - Inyección, carburador, etc.',
        'Capacidades de aceite - Especificar Motor y Transmisión en Lts.'
      ],
      example: 'F300DETX: Motor 4T, 6 cil, 4,169cc, 300 HP @5,500rpm'
    },
    {
      type: 'aceite',
      label: 'Aceite',
      fields: [
        'Información adicional - Descripción del producto',
        'SKU - Código del aceite',
        'Peso - En kg',
        'Dimensiones - Formato: Ancho × Profundidad × Altura (m)',
        'Precauciones - Instrucciones de seguridad (puede ser multilinea)'
      ],
      example: 'Mobil-Yamaha 15W-40: 13kg, especial para motores marina'
    },
    {
      type: 'motoAcuatica',
      label: 'Moto Acuática',
      fields: [
        'Información adicional - Descripción del modelo',
        'SKU - Código del modelo',
        'Peso - En kg',
        'Dimensiones - Formato: Largo × Ancho × Alto (m)',
        'Pet Name - Nombre comercial (ej: FX-CRUISER HO 2026)',
        'Motor YAMAHA - Descripción técnica',
        'Cilindrada - En cc',
        'Capacidad de Combustible - En litros',
        'Capacidad de Aceite - En litros',
        'Almacenamiento - En litros',
        'Pasajeros - Rango (ej: 1 a 3 personas)',
        'Color - Colores disponibles separados por coma'
      ],
      example: 'FX-CRUISER HO: 1,898cc, 70L combustible, 3 pasajeros'
    },
    {
      type: 'remolque',
      label: 'Remolque',
      fields: [
        'Información adicional - Descripción del remolque',
        'SKU - Código del modelo',
        'Peso - En kg (en seco)',
        'Eslora - Largo en metros',
        'Manga - Ancho en metros',
        'Puntal - Altura en metros',
        'Espejo 1 - Medida del espejo en metros',
        'Capacidad Máxima de Carga - En kg'
      ],
      example: 'R18: 6.5m × 2.5m × 1.8m, Carga máxima 5,000kg'
    }
  ];

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2">
          <HelpCircle className="w-4 h-4" />
          Ver Referencia de Templates
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[90vh]">
        <DialogHeader>
          <DialogTitle>Referencia de Templates de Fichas Técnicas</DialogTitle>
        </DialogHeader>
        <ScrollArea className="h-full">
          <div className="space-y-6 pr-6">
            {templates.map((template) => (
              <Card key={template.type}>
                <CardHeader className="pb-3">
                  <div className="flex items-center gap-2">
                    <Badge>{template.label}</Badge>
                  </div>
                  <CardTitle className="text-base mt-2">{template.label}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="space-y-2">
                    <p className="text-sm font-semibold text-gray-700">Campos:</p>
                    <ul className="space-y-1">
                      {template.fields.map((field, idx) => (
                        <li key={idx} className="text-sm text-gray-600">
                          <span className="font-mono text-xs bg-gray-100 px-2 py-1 rounded mr-2">
                            {field.split(' - ')[0]}
                          </span>
                          {field.split(' - ')[1] && (
                            <span className="text-gray-500">{field.split(' - ')[1]}</span>
                          )}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="bg-blue-50 p-3 rounded">
                    <p className="text-xs font-semibold text-blue-900 mb-1">Ejemplo:</p>
                    <p className="text-sm text-blue-800">{template.example}</p>
                  </div>
                </CardContent>
              </Card>
            ))}

            <Card className="bg-yellow-50 border-yellow-200">
              <CardHeader>
                <CardTitle className="text-base">Notas Importantes</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm">
                <p>
                  <strong>Unidades:</strong> Usa siempre unidades consistentes. Distancias en metros (m), pesos en kg, capacidades en litros (L), potencia en HP
                </p>
                <p>
                  <strong>Dimensiones:</strong> Sigue el formato específico para cada tipo de producto (largo × ancho × alto o largo × ancho × alto)
                </p>
                <p>
                  <strong>Información adicional:</strong> Este campo es importante - proporciona contexto sobre el producto
                </p>
                <p>
                  <strong>Precauciones (Aceites):</strong> Puede contener saltos de línea. Usa Enter para separar puntos diferentes
                </p>
              </CardContent>
            </Card>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
