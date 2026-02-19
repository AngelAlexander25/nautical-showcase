import { useState, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MessageCircle, ChevronLeft, ChevronRight, ArrowLeft, Play } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { useCatalog } from "@/contexts/CatalogContext";
import type { Product } from "@/data/catalogData";

// Video mapping per category id
// El usuario debe subir los videos a src/assets/ con estos nombres
// Por ahora usamos fondo.mp4 como placeholder donde no hay video propio
import fondoVideo from "@/assets/fondo.mp4";

const categoryVideos: Record<string, string> = {
  lanchas: fondoVideo,
  motores: fondoVideo,
  aquamotos: fondoVideo,
  remolques: fondoVideo,
  "lubricantes-productos": fondoVideo,
  // Agrega aqui cuando tengas los videos: motores: motorVideo, etc.
};

const lineDescriptions: Record<string, string> = {
  productiva:
    "Embarcaciones de fibra de vidrio y motores fuera de borda Yamaha. Diseñadas para el trabajo, la pesca y la aventura en el mar.",
  deportiva:
    "Motos acuáticas WaveRunner y remolques para embarcaciones. La máxima emoción en el agua con tecnología Yamaha.",
  lubricantes:
    "Aceites Yamalube premium certificados para motores marinos de 2 y 4 tiempos. Protección y rendimiento garantizados.",
};

// ── VIDEO SECTION ──
const CategoryVideoSection = ({ categoryId, categoryName }: { categoryId: string; categoryName: string }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const videoSrc = categoryVideos[categoryId] ?? fondoVideo;

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (playing) {
      videoRef.current.pause();
      setPlaying(false);
    } else {
      videoRef.current.play();
      setPlaying(true);
    }
  };

  return (
    <section className="relative w-full bg-foreground overflow-hidden" style={{ height: "420px" }}>
      <video
        ref={videoRef}
        src={videoSrc}
        className="w-full h-full object-cover opacity-80"
        loop
        playsInline
        onEnded={() => setPlaying(false)}
      />
      {/* Overlay gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />

      {/* Play button */}
      {!playing && (
        <button
          onClick={togglePlay}
          className="absolute inset-0 flex items-center justify-center group"
          aria-label="Reproducir video"
        >
          <div className="w-20 h-20 rounded-full bg-black/60 border-2 border-white/70 flex items-center justify-center group-hover:bg-black/80 transition-all duration-300 group-hover:scale-110">
            <Play className="w-8 h-8 text-white ml-1" fill="white" />
          </div>
        </button>
      )}

      {/* Pause button when playing */}
      {playing && (
        <button
          onClick={togglePlay}
          className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center"
          aria-label="Pausar video"
        >
          <div className="w-20 h-20 rounded-full bg-black/40 border-2 border-white/50 flex items-center justify-center">
            <div className="flex gap-1.5">
              <div className="w-2 h-7 bg-white rounded-sm" />
              <div className="w-2 h-7 bg-white rounded-sm" />
            </div>
          </div>
        </button>
      )}
    </section>
  );
};

// ── CATEGORY HERO (shown when a category is selected) ──
const CategoryHero = ({ categoryName, subtitle }: { categoryName: string; subtitle: string }) => (
  <section className="bg-background py-12 relative overflow-hidden">
    {/* Giant watermark */}
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden">
      <span className="font-display font-black text-[15vw] text-muted/30 uppercase tracking-widest whitespace-nowrap">
        {categoryName}
      </span>
    </div>
    <div className="text-center relative z-10 px-4">
      <span className="text-secondary font-bold uppercase tracking-widest text-xs">
        {subtitle}
      </span>
      <h1 className="font-display text-5xl md:text-7xl font-black text-primary mt-2 uppercase tracking-tight">
        {categoryName}
      </h1>
    </div>
  </section>
);

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
  const description = lineDescriptions[lineaId || ""] || "";

  const activeCat = activeCategory
    ? line?.categories.find((c) => c.id === activeCategory) ?? null
    : null;

  const allProducts = line?.categories.flatMap((c) => c.products) ?? [];
  const carouselProducts = (activeCat?.products ?? allProducts).filter(
    (p) => p.images.length > 0
  );

  const displayedProducts = activeCat ? activeCat.products : allProducts;

  // Auto-advance carousel
  useEffect(() => {
    if (carouselProducts.length <= 1) return;
    carouselRef.current = setInterval(() => {
      setCarouselIndex((prev) => (prev + 1) % carouselProducts.length);
    }, 3000);
    return () => {
      if (carouselRef.current) clearInterval(carouselRef.current);
    };
  }, [carouselProducts.length, activeCategory]);

  useEffect(() => {
    setCarouselIndex(0);
  }, [activeCategory]);

  const handleWhatsApp = (productName: string) => {
    const message = encodeURIComponent(
      `Hola, me interesa obtener información y cotización del producto: ${productName}. ¿Podrían ayudarme?`
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

  // Floating carousel: 3 visible products
  const visibleCount = 3;
  const stripProducts =
    carouselProducts.length > 0
      ? Array.from({ length: Math.min(visibleCount, carouselProducts.length) }, (_, i) =>
          carouselProducts[(carouselIndex + i) % carouselProducts.length]
        )
      : [];

  const lineTitleClean = line.title.replace("Linea ", "").replace("Línea ", "");

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

        {/* ══════════════════════════════════════════
            VISTA PRINCIPAL: sin categoría seleccionada
            - Carrusel flotante + banner rojo + selector de categorías
        ══════════════════════════════════════════ */}
        {!activeCat ? (
          <>
            {/* Hero con carrusel flotante */}
            <section className="py-10 bg-background overflow-hidden relative">
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden">
                <span className="font-display font-black text-[14vw] text-muted/30 uppercase tracking-widest whitespace-nowrap">
                  {lineTitleClean}
                </span>
              </div>

              <div className="text-center mb-6 relative z-10 px-4">
                <span className="text-secondary font-bold uppercase tracking-widest text-xs">
                  {line.subtitle}
                </span>
                <h1 className="font-display text-4xl md:text-6xl font-black text-primary mt-1 uppercase tracking-tight">
                  {lineTitleClean}
                </h1>
                <p className="text-muted-foreground text-sm md:text-base mt-3 max-w-xl mx-auto leading-relaxed">
                  {description}
                </p>
              </div>

              {/* Floating carousel */}
              {stripProducts.length > 0 && (
                <div className="relative z-10 flex justify-center items-end gap-4 md:gap-10 px-4 min-h-[260px]">
                  {stripProducts.map((product, i) => (
                    <button
                      key={`${product.id}-${i}`}
                      onClick={() => openProductDetail(product)}
                      className={`group transition-all duration-500 ${
                        i === 1
                          ? "scale-110 -translate-y-6 z-20"
                          : "scale-90 opacity-70 z-10"
                      }`}
                    >
                      <div className="w-32 h-44 md:w-52 md:h-64 flex items-end justify-center">
                        <img
                          src={product.images[0]}
                          alt={product.name}
                          className="max-w-full max-h-full object-contain drop-shadow-2xl group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      <p
                        className={`text-xs font-bold text-center mt-2 transition-opacity ${
                          i === 1
                            ? "text-primary opacity-100"
                            : "text-muted-foreground opacity-0 group-hover:opacity-100"
                        }`}
                      >
                        {product.name}
                      </p>
                    </button>
                  ))}
                </div>
              )}

              {/* Dots */}
              {carouselProducts.length > 1 && (
                <div className="flex justify-center gap-2 mt-6 relative z-10">
                  {carouselProducts.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setCarouselIndex(i)}
                      className={`h-2 rounded-full transition-all ${
                        i === carouselIndex ? "bg-secondary w-6" : "bg-gray-300 w-2"
                      }`}
                    />
                  ))}
                </div>
              )}
            </section>

            {/* Banner rojo */}
            <section className="bg-secondary py-10 px-6 md:px-16">
              <div className="max-w-4xl mx-auto text-center">
                <p className="text-white/60 text-xs font-bold uppercase tracking-widest mb-2">
                  {line.subtitle}
                </p>
                <h2 className="font-display text-3xl md:text-4xl font-black text-white uppercase leading-tight">
                  {line.title}
                </h2>
                <p className="text-white/80 text-sm mt-3 leading-relaxed max-w-lg mx-auto">
                  {description}
                </p>
              </div>
            </section>

            {/* Selector de categorías */}
            {line.categories.length > 1 && (
              <section className="bg-background py-12 border-b border-border">
                <div className="container mx-auto px-4 text-center">
                  <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-6">
                    ¿Qué deseas explorar?
                  </p>
                  <div className="flex flex-wrap justify-center gap-4">
                    {line.categories.map((cat) => (
                      <button
                        key={cat.id}
                        onClick={() => setActiveCategory(cat.id)}
                        className="group relative px-10 py-4 rounded-full font-bold text-sm border-2 border-primary/30 bg-white text-primary hover:border-primary hover:shadow-xl transition-all duration-300 hover:scale-105"
                      >
                        {cat.name}
                        <span className="ml-2 text-xs font-normal opacity-60">
                          ({cat.products.length})
                        </span>
                        <span className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-2 h-2 bg-secondary rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                      </button>
                    ))}
                  </div>
                </div>
              </section>
            )}

            {/* Si solo hay 1 categoría, mostrar grid directo */}
            {line.categories.length === 1 && (
              <section className="py-14 bg-white">
                <div className="container mx-auto px-4">
                  <ProductGrid products={displayedProducts} onSelect={openProductDetail} />
                </div>
              </section>
            )}
          </>
        ) : (
          /* ══════════════════════════════════════════
              VISTA DE CATEGORÍA SELECCIONADA
              - Nombre con watermark → Video → Grid
          ══════════════════════════════════════════ */
          <>
            {/* Botón volver a la línea */}
            <div className="container mx-auto px-4 pt-2 pb-0">
              <button
                onClick={() => setActiveCategory(null)}
                className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors text-sm"
              >
                <ChevronLeft className="w-4 h-4" />
                <span className="font-medium">Volver a {lineTitleClean}</span>
              </button>
            </div>

            {/* Nombre de categoría con watermark */}
            <CategoryHero categoryName={activeCat.name} subtitle={line.subtitle} />

            {/* Video de la categoría */}
            <CategoryVideoSection categoryId={activeCat.id} categoryName={activeCat.name} />

            {/* Selector de otras categorías (si hay más) */}
            {line.categories.length > 1 && (
              <div className="bg-background border-b border-border py-4">
                <div className="container mx-auto px-4 flex flex-wrap justify-center gap-3">
                  {line.categories.map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => setActiveCategory(cat.id)}
                      className={`px-6 py-2.5 rounded-full font-bold text-sm border-2 transition-all ${
                        activeCat.id === cat.id
                          ? "bg-primary text-primary-foreground border-primary shadow-md"
                          : "bg-background text-primary border-primary/30 hover:border-primary"
                      }`}
                    >
                      {cat.name}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Grid de productos */}
            <section className="py-14 bg-white">
              <div className="container mx-auto px-4">
                <div className="mb-8">
                  <h2 className="font-display text-2xl md:text-3xl font-black text-primary uppercase">
                    {activeCat.name}
                  </h2>
                  <div className="h-1 w-14 bg-secondary mt-2" />
                </div>
                <ProductGrid products={activeCat.products} onSelect={openProductDetail} />
              </div>
            </section>
          </>
        )}
      </main>

      {/* ── MODAL DETALLE ── */}
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
                          onClick={() =>
                            setCurrentImageIndex(
                              (prev) =>
                                (prev - 1 + selectedProduct.images.length) %
                                selectedProduct.images.length
                            )
                          }
                          className="absolute left-2 top-1/2 -translate-y-1/2 bg-background/80 rounded-full p-2 hover:bg-background"
                        >
                          <ChevronLeft className="w-5 h-5" />
                        </button>
                        <button
                          onClick={() =>
                            setCurrentImageIndex(
                              (prev) => (prev + 1) % selectedProduct.images.length
                            )
                          }
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

              {selectedProduct.tipo && (
                <p className="text-sm font-bold text-secondary uppercase tracking-wider">
                  {selectedProduct.tipo}
                </p>
              )}

              {selectedProduct.variantes && selectedProduct.variantes.length > 0 && (
                <div className="space-y-3 bg-muted/40 rounded-xl p-4">
                  <h4 className="font-bold text-primary text-sm uppercase tracking-wider mb-2">
                    Modelos y Precios
                  </h4>
                  {selectedProduct.variantes.map((v, i) => (
                    <div
                      key={i}
                      className="flex justify-between items-start py-2 border-b border-border last:border-0"
                    >
                      <span className="font-semibold text-foreground text-sm">{v.modelo}</span>
                      <div className="text-right">
                        <span className="font-bold text-primary text-sm">{v.precio}</span>
                        {v.nota && (
                          <p className="text-xs text-muted-foreground">{v.nota}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {!selectedProduct.variantes && selectedProduct.price && (
                <p className="text-2xl font-bold text-primary">{selectedProduct.price}</p>
              )}

              {selectedProduct.notasPrecio && selectedProduct.notasPrecio.length > 0 && (
                <div className="space-y-1">
                  {selectedProduct.notasPrecio.map((nota, i) => (
                    <p
                      key={i}
                      className={`text-xs ${
                        i === 0
                          ? "text-secondary font-semibold"
                          : "text-muted-foreground italic"
                      }`}
                    >
                      {nota}
                    </p>
                  ))}
                </div>
              )}

              <p className="text-muted-foreground leading-relaxed">
                {selectedProduct.description}
              </p>

              {selectedProduct.features.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {selectedProduct.features.map((feature, i) => (
                    <Badge
                      key={i}
                      variant="secondary"
                      className="bg-primary/10 text-primary border-primary/20"
                    >
                      {feature}
                    </Badge>
                  ))}
                </div>
              )}

              {selectedProduct.specs && Object.keys(selectedProduct.specs).length > 0 && (
                <div>
                  <h3 className="font-display text-lg font-semibold text-primary mb-4 border-b-2 border-secondary pb-2">
                    Datos Técnicos
                  </h3>
                  <div className="divide-y divide-border">
                    {Object.entries(selectedProduct.specs).map(([key, value]) => (
                      <div key={key} className="flex justify-between py-3 text-sm">
                        <span className="font-semibold text-foreground">{key}</span>
                        <span className="text-muted-foreground text-right max-w-[60%]">
                          {value}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {(selectedProduct.compatibles || selectedProduct.documentos) && (
                <div className="border-t border-border pt-4 space-y-2">
                  {selectedProduct.compatibles && selectedProduct.compatibles.length > 0 && (
                    <p className="text-sm">
                      <span className="font-bold text-foreground">LANCHAS COMPATIBLES </span>
                      <span className="text-muted-foreground">
                        {selectedProduct.compatibles.join(", ")}
                      </span>
                    </p>
                  )}
                  {selectedProduct.documentos?.map((doc, i) => (
                    <p key={i} className="text-sm">
                      <span className="font-bold text-foreground">
                        {doc.nombre.toUpperCase()}{" "}
                      </span>
                      <span className="text-secondary font-medium">{doc.archivo}</span>
                    </p>
                  ))}
                </div>
              )}

              <Button
                onClick={() => handleWhatsApp(selectedProduct.name)}
                className="w-full bg-green-600 hover:bg-green-700 text-primary-foreground gap-2"
                size="lg"
              >
                <MessageCircle className="w-5 h-5" />
                Solicitar Cotización por WhatsApp
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

// ── Subcomponente: Grid de productos ──
const ProductGrid = ({
  products,
  onSelect,
}: {
  products: Product[];
  onSelect: (p: Product) => void;
}) => (
  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
    {products.map((product) => (
      <button
        key={product.id}
        onClick={() => onSelect(product)}
        className="text-left bg-background rounded-xl border border-border hover:border-primary/40 hover:shadow-lg transition-all duration-300 overflow-hidden group"
      >
        <div className="aspect-square bg-muted/30 flex items-center justify-center overflow-hidden">
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
        <div className="px-3 py-2 border-t border-border">
          {product.tipo && (
            <span className="text-[9px] font-bold text-secondary uppercase tracking-widest block">
              {product.tipo}
            </span>
          )}
          <h3 className="font-bold text-foreground group-hover:text-primary transition-colors text-xs leading-tight mt-0.5">
            {product.name}
          </h3>
        </div>
      </button>
    ))}
  </div>
);

export default LineaPage;
