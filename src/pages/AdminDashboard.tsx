import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { useCatalog } from '@/contexts/CatalogContext';
import type { Product, ProductLine } from '@/data/catalogData';
import { AlertCircle, Edit2, LogOut, Plus, Save, Trash2 } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

export default function AdminDashboard() {
  const navigate = useNavigate();
  const { productLines: data, updateProductLines } = useCatalog();
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [editMode, setEditMode] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const isAdmin = localStorage.getItem('isAdmin');
    if (!isAdmin) {
      navigate('/admin');
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('isAdmin');
    navigate('/');
  };

  const handleSelectProduct = (lineId: string, categoryId: string, product: Product) => {
    setSelectedProduct({ ...product, _lineId: lineId, _categoryId: categoryId } as any);
    setEditMode(true);
  };

  const handleSaveProduct = () => {
    if (!selectedProduct) return;

    const newData = data.map(line => {
      if (line.id === (selectedProduct as any)._lineId) {
        return {
          ...line,
          categories: line.categories.map(cat => {
            if (cat.id === (selectedProduct as any)._categoryId) {
              return {
                ...cat,
                products: cat.products.map(p =>
                  p.id === selectedProduct.id ? { ...selectedProduct } : p
                )
              };
            }
            return cat;
          })
        };
      }
      return line;
    });

    updateProductLines(newData);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
    setEditMode(false);
  };

  const handleUpdateField = (field: string, value: any) => {
    if (!selectedProduct) return;
    setSelectedProduct({ ...selectedProduct, [field]: value });
  };

  const handleAddVariant = () => {
    if (!selectedProduct) return;
    const newVariants = [...(selectedProduct.variantes || []), { modelo: '', precio: '', nota: '' }];
    setSelectedProduct({ ...selectedProduct, variantes: newVariants });
  };

  const handleUpdateVariant = (index: number, field: string, value: string) => {
    if (!selectedProduct || !selectedProduct.variantes) return;
    const newVariants = [...selectedProduct.variantes];
    newVariants[index] = { ...newVariants[index], [field]: value };
    setSelectedProduct({ ...selectedProduct, variantes: newVariants });
  };

  const handleDeleteVariant = (index: number) => {
    if (!selectedProduct || !selectedProduct.variantes) return;
    const newVariants = selectedProduct.variantes.filter((_, i) => i !== index);
    setSelectedProduct({ ...selectedProduct, variantes: newVariants });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Panel Admin</h1>
            <p className="text-sm text-gray-500">Editor de Catálogo</p>
          </div>
          <div className="flex gap-2">
            {saved && (
              <Alert className="py-2 px-4 bg-green-50 border-green-200">
                <AlertDescription className="text-green-800">✓ Cambios guardados automáticamente</AlertDescription>
              </Alert>
            )}
            <Button onClick={handleLogout} variant="ghost">
              <LogOut className="w-4 h-4 mr-2" />
              Salir
            </Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-12 gap-6">
          {/* Lista de productos */}
          <div className="col-span-4">
            <Card>
              <CardHeader>
                <CardTitle>Productos ({data.reduce((acc, line) => acc + line.categories.reduce((a, cat) => a + cat.products.length, 0), 0)})</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <Tabs defaultValue="productiva" className="w-full">
                  <TabsList className="w-full grid grid-cols-4">
                    <TabsTrigger value="productiva">Prod.</TabsTrigger>
                    <TabsTrigger value="deportiva">Dep.</TabsTrigger>
                    <TabsTrigger value="fuerza">Fuerza</TabsTrigger>
                    <TabsTrigger value="lubricantes">Lub.</TabsTrigger>
                  </TabsList>

                  {data.map(line => (
                    <TabsContent key={line.id} value={line.id} className="mt-0">
                      <ScrollArea className="h-[calc(100vh-300px)]">
                        {line.categories.map(category => (
                          <div key={category.id} className="p-4 border-b">
                            <h3 className="font-semibold text-sm mb-2">{category.name}</h3>
                            <div className="space-y-1">
                              {category.products.map(product => (
                                <div
                                  key={product.id}
                                  onClick={() => handleSelectProduct(line.id, category.id, product)}
                                  className={`p-2 rounded cursor-pointer hover:bg-blue-50 transition-colors ${
                                    selectedProduct?.id === product.id ? 'bg-blue-100' : ''
                                  }`}
                                >
                                  <div className="flex items-center justify-between">
                                    <span className="text-sm font-medium">{product.name}</span>
                                    <Edit2 className="w-3 h-3 text-gray-400" />
                                  </div>
                                  <p className="text-xs text-gray-500 truncate">{product.description}</p>
                                  {product.variantes && product.variantes.length > 0 && (
                                    <Badge variant="secondary" className="mt-1">
                                      {product.variantes.length} variantes
                                    </Badge>
                                  )}
                                </div>
                              ))}
                            </div>
                          </div>
                        ))}
                      </ScrollArea>
                    </TabsContent>
                  ))}
                </Tabs>
              </CardContent>
            </Card>
          </div>

          {/* Editor de producto */}
          <div className="col-span-8">
            {!editMode ? (
              <Card className="h-[calc(100vh-200px)] flex items-center justify-center">
                <div className="text-center text-gray-500">
                  <AlertCircle className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p>Selecciona un producto para editar</p>
                </div>
              </Card>
            ) : selectedProduct && (
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle>Editando: {selectedProduct.name}</CardTitle>
                  <Button onClick={handleSaveProduct}>
                    <Save className="w-4 h-4 mr-2" />
                    Guardar Cambios
                  </Button>
                </CardHeader>
                <CardContent>
                  <ScrollArea className="h-[calc(100vh-300px)] pr-4">
                    <div className="space-y-6">
                      {/* Información básica */}
                      <div className="space-y-4">
                        <h3 className="font-semibold text-lg">Información Básica</h3>
                        
                        <div>
                          <Label>Nombre</Label>
                          <Input
                            value={selectedProduct.name}
                            onChange={(e) => handleUpdateField('name', e.target.value)}
                          />
                        </div>

                        <div>
                          <Label>Descripción</Label>
                          <Textarea
                            value={selectedProduct.description}
                            onChange={(e) => handleUpdateField('description', e.target.value)}
                            rows={3}
                          />
                        </div>

                        {selectedProduct.tipo !== undefined && (
                          <div>
                            <Label>Tipo</Label>
                            <Input
                              value={selectedProduct.tipo || ''}
                              onChange={(e) => handleUpdateField('tipo', e.target.value)}
                              placeholder="Ej: 4 Tiempos, 2 Tiempos, Enduro"
                            />
                          </div>
                        )}

                        <div>
                          <Label>Features (separar con | )</Label>
                          <Input
                            value={selectedProduct.features.join('|')}
                            onChange={(e) => handleUpdateField('features', e.target.value.split('|'))}
                            placeholder="300 HP|4 Tiempos|V6"
                          />
                        </div>
                      </div>

                      {/* Variantes de precio */}
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <h3 className="font-semibold text-lg">Variantes de Precio</h3>
                          <Button onClick={handleAddVariant} variant="outline" size="sm">
                            <Plus className="w-4 h-4 mr-2" />
                            Agregar Variante
                          </Button>
                        </div>

                        {selectedProduct.variantes?.map((variante, index) => (
                          <Card key={index} className="p-4">
                            <div className="flex items-start gap-4">
                              <div className="flex-1 space-y-3">
                                <div>
                                  <Label className="text-xs">Modelo</Label>
                                  <Input
                                    value={variante.modelo}
                                    onChange={(e) => handleUpdateVariant(index, 'modelo', e.target.value)}
                                    placeholder="FL300GET2X"
                                  />
                                </div>
                                <div>
                                  <Label className="text-xs">Precio</Label>
                                  <Input
                                    value={variante.precio}
                                    onChange={(e) => handleUpdateVariant(index, 'precio', e.target.value)}
                                    placeholder="$41,231.04 USD"
                                  />
                                </div>
                                <div>
                                  <Label className="text-xs">Nota</Label>
                                  <Input
                                    value={variante.nota || ''}
                                    onChange={(e) => handleUpdateVariant(index, 'nota', e.target.value)}
                                    placeholder="Precio Incluye I.V.A."
                                  />
                                </div>
                              </div>
                              <Button
                                onClick={() => handleDeleteVariant(index)}
                                variant="ghost"
                                size="icon"
                                className="text-red-500"
                              >
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </div>
                          </Card>
                        ))}

                        {(!selectedProduct.variantes || selectedProduct.variantes.length === 0) && (
                          <p className="text-sm text-gray-500 text-center py-4">
                            No hay variantes. Haz clic en "Agregar Variante" para crear una.
                          </p>
                        )}
                      </div>

                      {/* Especificaciones técnicas */}
                      <div className="space-y-4">
                        <h3 className="font-semibold text-lg">Especificaciones Técnicas</h3>
                        
                        <div className="grid grid-cols-2 gap-4">
                          {Object.entries(selectedProduct.specs || {}).map(([key, value]) => (
                            <div key={key}>
                              <Label className="text-xs">{key}</Label>
                              <Input
                                value={value}
                                onChange={(e) => {
                                  const newSpecs = { ...selectedProduct.specs, [key]: e.target.value };
                                  handleUpdateField('specs', newSpecs);
                                }}
                              />
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </ScrollArea>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
