import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { MessageCircle, ChevronLeft, ChevronRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import AnimatedSection, { StaggerContainer } from "./AnimatedSection";
import { productLines, type Product, type ProductLine } from "@/data/catalogData";

const Catalog = () => {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [expandedLine, setExpandedLine] = useState<string | null>(null);
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);

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

  return (
    <section id="catalogo" className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <AnimatedSection className="text-center mb-16">
          <span className="text-secondary font-semibold uppercase tracking-wider text-sm">
            Nuestros Productos
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mt-2 mb-4">
            Catalogo de <span className="text-primary">Productos</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Explora nuestra seleccion completa de productos. Contactanos por WhatsApp para cotizaciones.
          </p>
        </AnimatedSection>

        {/* Product Lines */}
        <StaggerContainer className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {productLines.map((line) => (
            <div key={line.id} className="group">
              <button
                onClick={() => setExpandedLine(expandedLine === line.id ? null : line.id)}
                className="w-full text-left border-b-2 border-primary pb-3 mb-4"
              >
                <h3 className="font-display text-lg font-bold text-primary uppercase tracking-wide">
                  {line.title}
                </h3>
                <p className="text-muted-foreground text-xs mt-1">{line.subtitle}</p>
              </button>

              {/* Categories */}
              {line.categories.map((cat) => (
                <div key={cat.id} className="mb-4">
                  <button
                    onClick={() => setExpandedCategory(expandedCategory === cat.id ? null : cat.id)}
                    className="w-full text-left py-2 px-3 rounded-md bg-muted/50 hover:bg-muted transition-colors mb-2"
                  >
                    <span className="text-sm font-semibold text-foreground">{cat.name}</span>
                    <span className="text-xs text-muted-foreground ml-2">({cat.products.length})</span>
                  </button>

                  {expandedCategory === cat.id && (
                    <div className="space-y-2 max-h-96 overflow-y-auto pr-1">
                      {cat.products.map((product) => (
                        <button
                          key={product.id}
                          onClick={() => openProductDetail(product)}
                          className="w-full text-left p-3 rounded-lg border border-border hover:border-primary/50 hover:bg-accent/50 transition-all duration-200 group/item flex gap-3 items-center"
                        >
                          {product.images.length > 0 ? (
                            <img
                              src={product.images[0]}
                              alt={product.name}
                              className="w-12 h-12 rounded object-cover flex-shrink-0"
                            />
                          ) : (
                            <div className="w-12 h-12 rounded bg-muted flex-shrink-0 flex items-center justify-center">
                              <span className="text-[8px] text-muted-foreground">Sin img</span>
                            </div>
                          )}
                          <div className="min-w-0">
                            <h4 className="text-sm font-semibold text-foreground group-hover/item:text-primary transition-colors truncate">
                              {product.name}
                            </h4>
                            <p className="text-xs text-muted-foreground line-clamp-1">
                              {product.description}
                            </p>
                          </div>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          ))}
        </StaggerContainer>

        {/* CTA */}
        <div className="text-center mt-16">
          <p className="text-muted-foreground mb-4">
            No encuentras lo que buscas? Contactanos para productos personalizados.
          </p>
          <Button
            size="lg"
            onClick={() => document.getElementById("contacto")?.scrollIntoView({ behavior: "smooth" })}
            className="bg-secondary hover:bg-secondary/90 text-secondary-foreground"
          >
            Solicitar Cotizacion Especial
          </Button>
        </div>
      </div>

      {/* Product Detail Modal */}
      <Dialog open={!!selectedProduct} onOpenChange={() => setSelectedProduct(null)}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="font-display text-2xl text-foreground">
              {selectedProduct?.name}
            </DialogTitle>
          </DialogHeader>

          {selectedProduct && (
            <div className="space-y-6">
              {/* Image gallery */}
              <div className="relative aspect-[4/3] bg-muted rounded-lg overflow-hidden flex items-center justify-center border border-border">
                {selectedProduct.images.length > 0 ? (
                  <>
                    <img
                      src={selectedProduct.images[currentImageIndex]}
                      alt={selectedProduct.name}
                      className="w-full h-full object-contain bg-white"
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

              {selectedProduct.price && (
                <p className="text-2xl font-bold text-primary">{selectedProduct.price}</p>
              )}

              <p className="text-muted-foreground leading-relaxed">{selectedProduct.description}</p>

              <div className="flex flex-wrap gap-2">
                {selectedProduct.features.map((feature, i) => (
                  <Badge key={i} variant="secondary" className="bg-accent text-accent-foreground">
                    {feature}
                  </Badge>
                ))}
              </div>

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
    </section>
  );
};

export default Catalog;
