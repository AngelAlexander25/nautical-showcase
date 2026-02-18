import { useState, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MessageCircle, ChevronLeft, ChevronRight, ArrowLeft } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { useCatalog } from "@/contexts/CatalogContext";
import type { Product } from "@/data/catalogData";

// Banner images per line (carousel de productos flotando)
const lineBanners: Record<string, { label: string; description: string; color: string }> = {
  productiva: {
    label: "Linea Productiva",
    description: "Lanchas de fibra de vidrio y motores fuera de borda Yamaha. Diseñadas para el trabajo y la aventura en el mar.",
    color: "hsl(var(--primary))",
  },
  deportiva: {
    label: "Linea Deportiva",
    description: "Motos acuáticas y remolques para embarcaciones. La emoción del agua en su máxima expresión.",
    color: "hsl(var(--secondary))",
  },
  lubricantes: {
    label: "Linea de Lubricantes",
    description: "Aceites Yamalube premium certificados para motores marinos de 2 y 4 tiempos.",
    color: "hsl(var(--primary))",
  },
};

const LineaPage = () => {
  const { lineaId } = useParams<{ lineaId: string }>();
  const navigate = useNavigate();
  const { productLines } = useCatalog();
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [carouselIndex, setCarouselIndex] = useState(0);
  const carouselRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const line = productLines.find((l) => l.id === lineaId);
  const banner = lineBanners[lineaId || ""] || lineBanners["productiva"];

  // All products in this line flattened for the top carousel
  const allProducts = line?.categories.flatMap((c) => c.products) || [];
  const previewProducts = allProducts.filter((p) => p.images.length > 0).slice(0, 8);

  const activecat = activeCategory
    ? line?.categories.find((c) => c.id === activeCategory)
    : null;

  const displayedProducts = activecat ? activecat.products : allProducts;

  // Auto-advance the top carousel
  useEffect(() => {
    if (previewProducts.length <= 1) return;
    carouselRef.current = setInterval(() => {
      setCarouselIndex((prev) => (prev + 1) % previewProducts.length);
    }, 3000);
    return () => {
      if (carouselRef.current) clearInterval(carouselRef.current);
    };
  }, [previewProducts.length]);

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

  if (!line) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-foreground mb-4">Línea no encontrada</h2>
          <Button onClick={() => navigate("/catalogo")}>Ver Catálogo</Button>
        </div>
      </div>
    );
  }

  // Visible products in the top strip (3 at a time)
  const visibleCount = 3;
  const stripProducts = previewProducts.length > 0
    ? Array.from({ length: visibleCount }, (_, i) =>
        previewProducts[(carouselIndex + i) % previewProducts.length]
      )
    : [];

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <main className="pt-24">
        {/* Back nav */}
        <div className="container mx-auto px-4 pt-6 pb-2">
          <button
            onClick={() => navigate("/catalogo")}
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm font-medium">Volver al catálogo</span>
          </button>
        </div>

        {/* TOP: Floating products carousel on white bg */}
        <section className="py-12 bg-white overflow-hidden relative">
          {/* Giant watermark text */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden">
            <span className="font-display font-black text-[12vw] text-gray-100 uppercase tracking-widest whitespace-nowrap">
              {line.categories[0]?.name || line.title}
            </span>
          </div>

          {/* Title */}
          <div className="text-center mb-8 relative z-10">
            <span className="text-secondary font-semibold uppercase tracking-widest text-xs">
              {line.categories.find((c) => c.id === (activeCategory || line.categories[0]?.id))?.name || line.title}
            </span>
            <h1 className="font-display text-4xl md:text-5xl font-black text-primary mt-1 uppercase tracking-tight">
              {line.title.replace("Linea ", "")}
            </h1>
          </div>

          {/* Products floating */}
          <div className="relative z-10 flex justify-center items-end gap-4 md:gap-8 px-4 min-h-[280px]">
            {stripProducts.map((product, i) => (
              <button
                key={`${product.id}-${i}`}
                onClick={() => openProductDetail(product)}
                className={`group transition-all duration-500 ${
                  i === 1
                    ? "scale-110 -translate-y-4 z-20"
                    : "scale-90 opacity-80 z-10"
                }`}
              >
                <div className="w-36 h-48 md:w-52 md:h-64 flex items-end justify-center">
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    className="max-w-full max-h-full object-contain drop-shadow-2xl group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <p className="text-xs font-semibold text-center text-foreground mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  {product.name}
                </p>
              </button>
            ))}
          </div>

          {/* Carousel dots */}
          {previewProducts.length > 1 && (
            <div className="flex justify-center gap-2 mt-6 relative z-10">
              {previewProducts.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCarouselIndex(i)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    i === carouselIndex ? "bg-secondary w-6" : "bg-gray-300"
                  }`}
                />
              ))}
            </div>
          )}
        </section>

        {/* RED BANNER */}
        <section className="grid md:grid-cols-2 min-h-[280px]">
          <div className="bg-secondary flex flex-col justify-center px-10 py-12">
            <p className="text-white/70 text-xs font-semibold uppercase tracking-widest mb-2">
              {line.subtitle}
            </p>
            <h2 className="font-display text-3xl md:text-4xl font-black text-white uppercase leading-tight">
              {line.title}
            </h2>
            <p className="text-white/80 text-sm mt-4 leading-relaxed max-w-sm">
              {banner.description}
            </p>
          </div>
          <div className="bg-primary/10 flex items-center justify-center overflow-hidden relative min-h-[200px]">
            {previewProducts[0]?.images[0] ? (
              <img
                src={previewProducts[Math.floor(previewProducts.length / 2)]?.images[0] || previewProducts[0].images[0]}
                alt={line.title}
                className="w-full h-full object-cover opacity-90"
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-primary/20 to-primary/5" />
            )}
            <div className="absolute inset-0 bg-primary/20" />
          </div>
        </section>

        {/* PRODUCTS GRID */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            {/* Category filter tabs */}
            {line.categories.length > 1 && (
              <div className="flex flex-wrap gap-3 mb-10">
                <button
                  onClick={() => setActiveCategory(null)}
                  className={`px-6 py-2 rounded-full font-semibold text-sm border-2 transition-all ${
                    activeCategory === null
                      ? "bg-primary text-white border-primary"
                      : "bg-white text-primary border-primary/30 hover:border-primary"
                  }`}
                >
                  Todos
                </button>
                {line.categories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setActiveCategory(cat.id)}
                    className={`px-6 py-2 rounded-full font-semibold text-sm border-2 transition-all ${
                      activeCategory === cat.id
                        ? "bg-primary text-white border-primary"
                        : "bg-white text-primary border-primary/30 hover:border-primary"
                    }`}
                  >
                    {cat.name}
                    <span className="ml-2 text-xs opacity-70">({cat.products.length})</span>
                  </button>
                ))}
              </div>
            )}

            {/* Category heading when filtered */}
            {activecat && (
              <div className="mb-8">
                <h2 className="font-display text-3xl font-bold text-primary uppercase">
                  {activecat.name}
                </h2>
                <div className="h-1 w-16 bg-secondary mt-2" />
              </div>
            )}

            {/* Products by category (when showing all) */}
            {!activecat ? (
              line.categories.map((cat) => (
                <div key={cat.id} className="mb-16">
                  <div className="flex items-center gap-4 mb-8">
                    <div>
                      <h2 className="font-display text-3xl font-bold text-primary uppercase">
                        {cat.name}
                      </h2>
                      <div className="h-1 w-16 bg-secondary mt-2" />
                    </div>
                    <button
                      onClick={() => setActiveCategory(cat.id)}
                      className="ml-auto text-sm text-primary hover:text-secondary font-semibold transition-colors"
                    >
                      Ver solo {cat.name} →
                    </button>
                  </div>
                  <ProductGrid products={cat.products} onSelect={openProductDetail} />
                </div>
              ))
            ) : (
              <ProductGrid products={displayedProducts} onSelect={openProductDetail} />
            )}
          </div>
        </section>
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
                        i === currentImageIndex ? "border-secondary" : "border-border"
                      }`}
                    >
                      <img src={img} alt="" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}

              {/* Tipo */}
              {selectedProduct.tipo && (
                <p className="text-sm font-semibold text-secondary uppercase tracking-wider">{selectedProduct.tipo}</p>
              )}

              {/* Variantes con precios */}
              {selectedProduct.variantes && selectedProduct.variantes.length > 0 && (
                <div className="space-y-3 bg-muted/40 rounded-xl p-4">
                  <h4 className="font-bold text-primary text-sm uppercase tracking-wider mb-2">Modelos y Precios</h4>
                  {selectedProduct.variantes.map((v, i) => (
                    <div key={i} className="flex justify-between items-start py-2 border-b border-border last:border-0">
                      <span className="font-semibold text-foreground text-sm">{v.modelo}</span>
                      <div className="text-right">
                        <span className="font-bold text-primary text-sm">{v.precio}</span>
                        {v.nota && <p className="text-xs text-muted-foreground">{v.nota}</p>}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Precio unico */}
              {!selectedProduct.variantes && selectedProduct.price && (
                <p className="text-2xl font-bold text-primary">{selectedProduct.price}</p>
              )}

              {/* Notas de precio */}
              {selectedProduct.notasPrecio && selectedProduct.notasPrecio.length > 0 && (
                <div className="space-y-1">
                  {selectedProduct.notasPrecio.map((nota, i) => (
                    <p key={i} className={`text-xs ${i === 0 ? "text-secondary font-semibold" : "text-muted-foreground italic"}`}>
                      {nota}
                    </p>
                  ))}
                </div>
              )}

              <p className="text-muted-foreground leading-relaxed">{selectedProduct.description}</p>

              {selectedProduct.features.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {selectedProduct.features.map((feature, i) => (
                    <Badge key={i} variant="secondary" className="bg-primary/10 text-primary border-primary/20">
                      {feature}
                    </Badge>
                  ))}
                </div>
              )}

              {/* Ficha Tecnica */}
              {selectedProduct.specs && Object.keys(selectedProduct.specs).length > 0 && (
                <div>
                  <h3 className="font-display text-lg font-semibold text-primary mb-4 border-b-2 border-secondary pb-2">
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
                      <span className="text-secondary font-medium">{doc.archivo}</span>
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

// Product grid sub-component
const ProductGrid = ({
  products,
  onSelect,
}: {
  products: Product[];
  onSelect: (p: Product) => void;
}) => (
  <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
    {products.map((product) => (
      <button
        key={product.id}
        onClick={() => onSelect(product)}
        className="text-left bg-white rounded-xl border border-gray-100 hover:border-primary/40 hover:shadow-xl transition-all duration-300 overflow-hidden group"
      >
        <div className="aspect-square bg-gray-50 flex items-center justify-center overflow-hidden">
          {product.images.length > 0 ? (
            <img
              src={product.images[0]}
              alt={product.name}
              className="w-full h-full object-contain p-3 group-hover:scale-105 transition-transform duration-300"
            />
          ) : (
            <span className="text-muted-foreground text-xs">Sin imagen</span>
          )}
        </div>
        <div className="p-4 border-t border-gray-100">
          {product.tipo && (
            <span className="text-[10px] font-bold text-secondary uppercase tracking-widest">{product.tipo}</span>
          )}
          <h3 className="font-bold text-foreground group-hover:text-primary transition-colors text-sm mt-0.5">
            {product.name}
          </h3>
          <p className="text-xs text-muted-foreground line-clamp-2 mt-1">{product.description}</p>
          {product.price && (
            <p className="text-primary font-bold text-sm mt-2">{product.price}</p>
          )}
        </div>
      </button>
    ))}
  </div>
);

export default LineaPage;
