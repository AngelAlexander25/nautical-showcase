import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';

/**
 * Componente de vista previa profesional de fichas técnicas
 * Muestra cómo se verán los productos finales en el sitio público
 */
export function TechnicalSheetPreview() {
  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      {/* EJEMPLO LANCHA */}
      <Card className="overflow-hidden">
        <CardHeader className="bg-blue-50 border-b">
          <div className="flex items-start justify-between">
            <div>
              <CardTitle className="text-2xl">Lancha Pescadora W-267BA</CardTitle>
              <p className="text-sm text-gray-600 mt-2">
                Embarcación polivalente de 26.7 pies con capacidad para 7 personas
              </p>
            </div>
            <Badge className="bg-blue-600">Lancha</Badge>
          </div>
        </CardHeader>
        <CardContent className="pt-6">
          <Tabs defaultValue="tecnico" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="tecnico">Datos técnicos</TabsTrigger>
              <TabsTrigger value="descripcion">Descripción</TabsTrigger>
            </TabsList>

            <TabsContent value="tecnico" className="mt-6 space-y-6">
              <div>
                <h3 className="font-semibold text-blue-700 mb-4 pb-2 border-b-2 border-blue-200">
                  Información General
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="font-medium">SKU</span>
                    <span className="font-semibold">W-267BA</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Peso</span>
                    <span className="font-semibold">5,500 kg</span>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-semibold text-blue-700 mb-4 pb-2 border-b-2 border-blue-200">
                  Dimensiones
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="font-medium">Eslora</span>
                    <span className="font-semibold">8.13 m</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Manga</span>
                    <span className="font-semibold">2.67 m</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Puntal</span>
                    <span className="font-semibold">1.34 m</span>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-semibold text-blue-700 mb-4 pb-2 border-b-2 border-blue-200">
                  Capacidad
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="font-medium">Capacidad Máxima de Carga</span>
                    <span className="font-semibold">1,814 kg</span>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="descripcion" className="mt-6">
              <p className="text-gray-700">
                Embarcación diseñada para pesca deportiva y uso recreativo. Casco en V profundo para mejor 
                comportamiento en aguas picadas. Construcción robusta con materiales de alta calidad.
              </p>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* EJEMPLO MOTOR */}
      <Card className="overflow-hidden">
        <CardHeader className="bg-amber-50 border-b">
          <div className="flex items-start justify-between">
            <div>
              <CardTitle className="text-2xl">Motor Yamaha F300DETX</CardTitle>
              <p className="text-sm text-gray-600 mt-2">
                Motor de 4 tiempos con 300 HP de potencia, sistema de inyección de combustible
              </p>
            </div>
            <Badge className="bg-amber-600">Motor</Badge>
          </div>
        </CardHeader>
        <CardContent className="pt-6">
          <Tabs defaultValue="tecnico" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="tecnico">Datos técnicos</TabsTrigger>
              <TabsTrigger value="descripcion">Descripción</TabsTrigger>
            </TabsList>

            <TabsContent value="tecnico" className="mt-6 space-y-6">
              <div>
                <h3 className="font-semibold text-amber-700 mb-4 pb-2 border-b-2 border-amber-200">
                  Básico
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="font-medium">SKU</span>
                    <span className="font-semibold">F300DETX</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Peso</span>
                    <span className="font-semibold">269 kg - 276 kg</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Uso</span>
                    <span className="font-semibold">Commercial</span>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-semibold text-amber-700 mb-4 pb-2 border-b-2 border-amber-200">
                  Motor
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="font-medium">Tipo de motor</span>
                    <span className="font-semibold">4 tiempos, 6 cilindros High Output</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Cilindrada</span>
                    <span className="font-semibold">4,169 cc</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Potencia Máxima</span>
                    <span className="font-semibold">300 HP @5,500rpm</span>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-semibold text-amber-700 mb-4 pb-2 border-b-2 border-amber-200">
                  Sistemas
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="font-medium">Sistema de Combustible</span>
                    <span className="font-semibold">Inyección electrónica</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Sistema de Arranque</span>
                    <span className="font-semibold">Eléctrico</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Sistema de Dirección</span>
                    <span className="font-semibold">Control Remoto</span>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="descripcion" className="mt-6">
              <p className="text-gray-700">
                Tecnología de inyección de combustible de alta presión. Sistema DFI avanzado para mejor 
                eficiencia y rendimiento. Ideal para aplicaciones comerciales y de alta demanda.
              </p>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* EJEMPLO MOTO ACUÁTICA */}
      <Card className="overflow-hidden">
        <CardHeader className="bg-green-50 border-b">
          <div className="flex items-start justify-between">
            <div>
              <CardTitle className="text-2xl">Yamaha FX Cruiser HO 2026</CardTitle>
              <p className="text-sm text-gray-600 mt-2">
                Moto acuática de alto rendimiento con motor YAMAHA de 4 tiempos
              </p>
            </div>
            <Badge className="bg-green-600">Moto Acuática</Badge>
          </div>
        </CardHeader>
        <CardContent className="pt-6">
          <Tabs defaultValue="tecnico" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="tecnico">Datos técnicos</TabsTrigger>
              <TabsTrigger value="descripcion">Descripción</TabsTrigger>
            </TabsList>

            <TabsContent value="tecnico" className="mt-6 space-y-6">
              <div>
                <h3 className="font-semibold text-green-700 mb-4 pb-2 border-b-2 border-green-200">
                  Básico
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="font-medium">SKU</span>
                    <span className="font-semibold">FX1900A-C</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Pet Name</span>
                    <span className="font-semibold">FX-CRUISER HO 2026</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Peso</span>
                    <span className="font-semibold">380 kg</span>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-semibold text-green-700 mb-4 pb-2 border-b-2 border-green-200">
                  Motor
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="font-medium">Motor YAMAHA</span>
                    <span className="font-semibold">4T, 4 cilindros, High Output</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Cilindrada</span>
                    <span className="font-semibold">1,898 cc</span>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-semibold text-green-700 mb-4 pb-2 border-b-2 border-green-200">
                  Capacidades
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="font-medium">Capacidad de Combustible</span>
                    <span className="font-semibold">70 litros</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Capacidad de Aceite</span>
                    <span className="font-semibold">4.3 litros</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Pasajeros</span>
                    <span className="font-semibold">1 a 3 personas</span>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="descripcion" className="mt-6">
              <p className="text-gray-700">
                Diseñada para máximo confort y rendimiento. Tecnología RIDE avanzada con estabilidad superior. 
                Ideal para cruceros y aventuras en agua.
              </p>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
