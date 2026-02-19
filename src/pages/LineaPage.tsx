import { useEffect, useRef, useState } from "react";
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

// Import videos
import motoresVideo from "@/assets/motores.mp4";
import motosVideo from "@/assets/motos.mp4";
import remolquesVideo from "@/assets/remolques.mp4";
import lubricantesVideo from "@/assets/lubricantes.mp4";
import lanchaVideo from "@/assets/lancha.mp4";

const lineDescriptions: Record<string, string> = {
  productiva:
    "Embarcaciones de fibra de vidrio y motores fuera de borda Yamaha. Diseñadas para el trabajo, la pesca y la aventura en el mar.",
  deportiva:
    "Motos acuáticas WaveRunner y remolques para embarcaciones. La máxima emoción en el agua con tecnología Yamaha.",
  lubricantes:
    "Aceites Yamalube premium certificados para motores marinos de 2 y 4 tiempos. Protección y rendimiento garantizados.",
};

const LineaPage = () => {
  const { lineaId } = useParams<{ lineaId: string }>();
  const navigate = useNavigate();
  const { productLines } = useCatalog();

  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const didAutoSelectDeportiva = useRef(false);

  const line = productLines.find((l) => l.id === lineaId);
  const description = lineDescriptions[lineaId || ""] || "";

  const activeCat = activeCategory
    ? line?.categories.find((c) => c.id === activeCategory) ?? null
    : null;

  const allProducts = line?.categories.flatMap((c) => c.products) ?? [];
  const displayedProducts = activeCat ? activeCat.products : allProducts;

  useEffect(() => {
    if (!line || line.id !== "deportiva" || didAutoSelectDeportiva.current) {
      return;
    }

    const hasAquamotos = line.categories.some((category) => category.id === "aquamotos");
    if (hasAquamotos) {
      setActiveCategory("aquamotos");
      didAutoSelectDeportiva.current = true;
    }
  }, [line]);

  useEffect(() => {
    didAutoSelectDeportiva.current = false;
    setActiveCategory(null);
  }, [lineaId]);

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

  // Video mapping for each category/line
  const videoMap: Record<string, string> = {
    motores: motoresVideo,
    aquamotos: motosVideo,
    remolques: remolquesVideo,
    "lubricantes-productos": lubricantesVideo,
    lanchas: lanchaVideo,
  };

  // Short display names for categories
  const categoryShortNames: Record<string, string> = {
    "Motores Fuera de Borda": "MOTORES",
    "Motos Acuaticas": "ACUAMOTOS",
    "Remolques": "REMOLQUES",
    "Lubricantes": "LUBRICANTES",
    "Lanchas": "LANCHAS",
  };

  const getShortName = (fullName: string): string => {
    return categoryShortNames[fullName] || fullName.toUpperCase();
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

        {/* ── HERO: Descripción + Video ── */}
        <section className="py-10 bg-white overflow-hidden relative">
          {/* Subtitle + Title (only when no active category) */}
          {!activeCat && (
            <div className="text-center mb-8 relative z-10 px-4">
              <span className="text-secondary font-bold uppercase tracking-widest text-xs">
                Todos los productos
              </span>
              <h1 className="font-display text-4xl md:text-6xl font-black text-primary mt-1 uppercase tracking-tight">
                {line.title.replace("Linea ", "").replace("Línea ", "")}
              </h1>
              <p className="text-muted-foreground text-sm md:text-base mt-3 max-w-xl mx-auto leading-relaxed">
                {description}
              </p>
            </div>
          )}

          {/* Video section with title header */}
          {activeCat && (
            <div className="w-full mb-8">
              <div className="relative text-center mb-6 px-4 py-8">
                {/* Small red label */}
                <span className="text-secondary font-bold uppercase tracking-widest text-xs block mb-2">
                  {activeCat.name}
                </span>
                
                {/* Large title - SHORT NAME */}
                <h2 className="font-display text-4xl md:text-6xl font-black text-primary uppercase tracking-tight relative z-20 mb-2">
                  {getShortName(activeCat.name)}
                </h2>

                {/* Huge watermark behind - SHORT NAME */}
                {videoMap[activeCat.id] && (
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
                    <span className="font-display font-black text-[15vw] text-primary/8 uppercase tracking-widest whitespace-nowrap">
                      {getShortName(activeCat.name)}
                    </span>
                  </div>
                )}
              </div>

              {/* Video if available */}
              {videoMap[activeCat.id] && (
                <div className="relative w-full h-[360px] md:h-[500px] overflow-hidden bg-black rounded-lg">
                  <video
                    src={videoMap[activeCat.id]}
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                </div>
              )}
            </div>
          )}
        </section>

        {/* ── BANNER ROJO: Info de línea ── */}
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

        {/* ── CATEGORÍAS: Selector ── */}
        {line.categories.length > 1 && (
          <section className="bg-white py-8 border-b border-gray-100">
            <div className="container mx-auto px-4">
              <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-4 text-center">
                Selecciona una categoría
              </p>
              <div className="flex flex-wrap justify-center gap-3">
                <button
                  onClick={() => setActiveCategory(null)}
                  className={`px-8 py-3 rounded-full font-bold text-sm border-2 transition-all ${
                    activeCategory === null
                      ? "bg-primary text-white border-primary shadow-lg scale-105"
                      : "bg-white text-primary border-primary/30 hover:border-primary"
                  }`}
                >
                  Todos
                </button>
                {line.categories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setActiveCategory(cat.id)}
                    className={`px-8 py-3 rounded-full font-bold text-sm border-2 transition-all ${
                      activeCategory === cat.id
                        ? "bg-primary text-white border-primary shadow-lg scale-105"
                        : "bg-white text-primary border-primary/30 hover:border-primary"
                    }`}
                  >
                    {cat.name}
                    <span className="ml-2 text-xs font-normal opacity-70">
                      ({cat.products.length})
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ── GRID DE PRODUCTOS ── */}
        <section className="py-14 bg-white">
          <div className="container mx-auto px-4">
            {/* When showing all: group by category */}
            {!activeCat ? (
              line.categories.map((cat) => (
                <div key={cat.id} className="mb-16">
                  <div className="flex items-center gap-4 mb-8">
                    <div>
                      <h2 className="font-display text-2xl md:text-3xl font-black text-primary uppercase">
                        {cat.name}
                      </h2>
                      <div className="h-1 w-14 bg-secondary mt-2" />
                    </div>
                    {line.categories.length > 1 && (
                      <button
                        onClick={() => setActiveCategory(cat.id)}
                        className="ml-auto text-sm text-primary hover:text-secondary font-semibold transition-colors"
                      >
                        Ver solo {cat.name} →
                      </button>
                    )}
                  </div>
                  <ProductGrid products={cat.products} onSelect={openProductDetail} />
                </div>
              ))
            ) : (
              <>
                <div className="mb-8">
                  <h2 className="font-display text-2xl md:text-3xl font-black text-primary uppercase">
                    {activeCat.name}
                  </h2>
                  <div className="h-1 w-14 bg-secondary mt-2" />
                </div>
                <ProductGrid products={displayedProducts} onSelect={openProductDetail} />
              </>
            )}
          </div>
        </section>
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

              {/* Variantes y precios */}
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

              {/* Ficha técnica */}
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

              {/* Compatibles y documentos */}
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
                        {doc.nombre.toUpperCase()} {" "}
                      </span>
                      <span className="text-secondary font-medium">{doc.archivo}</span>
                    </p>
                  ))}
                </div>
              )}

              <Button
                onClick={() => handleWhatsApp(selectedProduct.name)}
                className="w-full bg-green-500 hover:bg-green-600 text-white gap-2"
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
        className="text-left bg-white rounded-xl border border-gray-100 hover:border-primary/40 hover:shadow-lg transition-all duration-300 overflow-hidden group"
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
        <div className="px-3 py-2 border-t border-gray-100">
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
