import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { MessageCircle, ChevronLeft, ChevronRight, ArrowLeft } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { useCatalog } from "@/contexts/CatalogContext";
import type { Product, ProductVariant } from "@/data/catalogData";

const CatalogPage = () => {
  const navigate = useNavigate();
  const { productLines } = useCatalog();
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [activeLineId, setActiveLineId] = useState(productLines[0]?.id || "");

  const handleWhatsApp = (productName: string) => {
    const message = encodeURIComponent(
      `Hola, me interesa obtener informacion y cotizacion del producto: ${productName}. Podrian ayudarme?`
    );
    window.open(`https://wa.me/529843175479?text=${message}`, "_blank");
  };

  const openProductDetail = (product: Product) => {
    setSelectedProduct(product);
    setCurrentImageIndex(0);
  };

  const activeLine = productLines.find((l) => l.id === activeLineId);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="mb-10">
            <button
              onClick={() => navigate("/")}
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-6"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="text-sm">Volver al inicio</span>
            </button>
            <h1 className="font-display text-4xl md:text-5xl font-bold text-primary mb-2">
              Catalogo de Productos
            </h1>
            <p className="text-muted-foreground text-lg">
              Explora nuestra seleccion completa. Contactanos por WhatsApp para cotizaciones.
            </p>
          </div>

          {/* Line Tabs */}
          <Tabs value={activeLineId} onValueChange={setActiveLineId} className="w-full">
            <TabsList className="w-full flex flex-wrap h-auto gap-2 bg-transparent p-0 mb-10">
              {productLines.map((line) => (
                <TabsTrigger
                  key={line.id}
                  value={line.id}
                  className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground border border-border px-6 py-3 rounded-lg font-semibold"
                >
                  {line.title}
                </TabsTrigger>
              ))}
            </TabsList>

            {productLines.map((line) => (
              <TabsContent key={line.id} value={line.id}>
                {line.categories.map((cat) => (
                  <div key={cat.id} className="mb-12">
                    <h2 className="font-display text-2xl font-bold text-primary mb-6 border-b-2 border-secondary/30 pb-3">
                      {cat.name}
                    </h2>
                    <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                      {cat.products.map((product) => (
                        <button
                          key={product.id}
                          onClick={() => openProductDetail(product)}
                          className="text-left bg-card rounded-xl border border-border hover:border-primary/40 hover:shadow-lg transition-all duration-300 overflow-hidden group"
                        >
                          <div className="aspect-square bg-muted flex items-center justify-center overflow-hidden">
                            {product.images.length > 0 ? (
                              <img
                                src={product.images[0]}
                                alt={product.name}
                                className="w-full h-full object-contain bg-white p-2 group-hover:scale-105 transition-transform duration-300"
                              />
                            ) : (
                              <span className="text-muted-foreground text-xs">Sin imagen</span>
                            )}
                          </div>
                          <div className="p-4">
                            <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors mb-1">
                              {product.name}
                            </h3>
                            <p className="text-xs text-muted-foreground line-clamp-2">{product.description}</p>
                            {product.price && (
                              <p className="text-primary font-bold mt-2">{product.price}</p>
                            )}
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </main>

      {/* Product Detail Modal */}
      <Dialog open={!!selectedProduct} onOpenChange={() => setSelectedProduct(null)}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="font-display text-2xl text-primary">
              {selectedProduct?.name}
            </DialogTitle>
          </DialogHeader>

          {selectedProduct && (
            <div className="space-y-6">
              {/* Image gallery */}
              <div className="relative aspect-[4/3] bg-white rounded-lg overflow-hidden flex items-center justify-center border border-border">
                {selectedProduct.images.length > 0 ? (
                  <>
                    <img
                      src={selectedProduct.images[currentImageIndex]}
                      alt={selectedProduct.name}
                      className="w-full h-full object-contain"
                    />
                    {selectedProduct.images.length > 1 && (
                      <>
                        <button
                          onClick={() => setCurrentImageIndex((prev) => (prev - 1 + selectedProduct.images.length) % selectedProduct.images.length)}
                          className="absolute left-2 top-1/2 -translate-y-1/2 bg-background/80 rounded-full p-2 hover:bg-background"
                        >
                          <ChevronLeft className="w-5 h-5" />
                        </button>
                        <button
                          onClick={() => setCurrentImageIndex((prev) => (prev + 1) % selectedProduct.images.length)}
                          className="absolute right-2 top-1/2 -translate-y-1/2 bg-background/80 rounded-full p-2 hover:bg-background"
                        >
                          <ChevronRight className="w-5 h-5" />
                        </button>
                      </>
                    )}
                  </>
                ) : (
                  <span className="text-muted-foreground">Imagen no disponible</span>
                )}
              </div>

              {/* Thumbnails */}
              {selectedProduct.images.length > 1 && (
                <div className="flex gap-2 overflow-x-auto">
                  {selectedProduct.images.map((img, i) => (
                    <button
                      key={i}
                      onClick={() => setCurrentImageIndex(i)}
                      className={`w-16 h-16 rounded-md overflow-hidden border-2 flex-shrink-0 ${
                        i === currentImageIndex ? "border-primary" : "border-border"
                      }`}
                    >
                      <img src={img} alt="" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}

              {/* Tipo */}
              {selectedProduct.tipo && (
                <p className="text-xl font-bold text-foreground">{selectedProduct.tipo}</p>
              )}

              {/* Variantes con precios */}
              {selectedProduct.variantes && selectedProduct.variantes.length > 0 && (
                <div className="space-y-4">
                  {selectedProduct.variantes.map((v, i) => (
                    <div key={i}>
                      <p className="text-sm">
                        <span className="font-bold text-primary">{v.modelo}:</span>{" "}
                        <span className="font-semibold text-foreground">{v.precio}</span>
                      </p>
                      {v.nota && <p className="text-xs text-muted-foreground">{v.nota}</p>}
                    </div>
                  ))}
                </div>
              )}

              {/* Precio unico (si no tiene variantes) */}
              {!selectedProduct.variantes && selectedProduct.price && (
                <p className="text-2xl font-bold text-primary">{selectedProduct.price}</p>
              )}

              {/* Notas de precio */}
              {selectedProduct.notasPrecio && selectedProduct.notasPrecio.length > 0 && (
                <div className="space-y-1 pt-2">
                  {selectedProduct.notasPrecio.map((nota, i) => (
                    <p key={i} className={`text-xs ${i === 0 ? "text-destructive font-semibold" : "text-muted-foreground italic"}`}>
                      {nota}
                    </p>
                  ))}
                </div>
              )}

              <p className="text-muted-foreground leading-relaxed">{selectedProduct.description}</p>

              <div className="flex flex-wrap gap-2">
                {selectedProduct.features.map((feature, i) => (
                  <Badge key={i} variant="secondary" className="bg-accent text-accent-foreground">
                    {feature}
                  </Badge>
                ))}
              </div>

              {/* Ficha Tecnica */}
              {selectedProduct.specs && Object.keys(selectedProduct.specs).length > 0 && (
                <div>
                  <h3 className="font-display text-lg font-semibold text-primary mb-4 border-b-2 border-primary pb-2">
                    Datos Tecnicos
                  </h3>
                  <div className="divide-y divide-border">
                    {Object.entries(selectedProduct.specs).map(([key, value]) => (
                      <div key={key} className="flex justify-between py-3 text-sm">
                        <span className="font-semibold text-foreground">{key}</span>
                        <span className="text-muted-foreground text-right max-w-[60%]">{value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Compatibles y Documentos */}
              {(selectedProduct.compatibles || selectedProduct.documentos) && (
                <div className="border-t border-border pt-4 space-y-2">
                  {selectedProduct.compatibles && selectedProduct.compatibles.length > 0 && (
                    <p className="text-sm">
                      <span className="font-bold text-foreground">LANCHAS COMPATIBLES </span>
                      <span className="text-muted-foreground">{selectedProduct.compatibles.join(", ")}</span>
                    </p>
                  )}
                  {selectedProduct.documentos && selectedProduct.documentos.map((doc, i) => (
                    <p key={i} className="text-sm">
                      <span className="font-bold text-foreground">{doc.nombre.toUpperCase()} </span>
                      <span className="text-destructive font-medium">{doc.archivo}</span>
                    </p>
                  ))}
                </div>
              )}

              <Button
                onClick={() => handleWhatsApp(selectedProduct.name)}
                className="w-full bg-[#25D366] hover:bg-[#20BD5A] text-white gap-2"
                size="lg"
              >
                <MessageCircle className="w-5 h-5" />
                Solicitar Cotizacion por WhatsApp
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>

      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default CatalogPage;
