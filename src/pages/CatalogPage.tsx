import { useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { useCatalog } from "@/contexts/CatalogContext";

// Line accent colors
const lineAccents: Record<string, string> = {
  productiva: "from-primary to-primary/80",
  deportiva: "from-secondary to-secondary/80",
  lubricantes: "from-primary to-primary/80",
  fuerza: "from-primary to-primary/80",
};

const CatalogPage = () => {
  const navigate = useNavigate();
  const { productLines } = useCatalog();

  // Only show the 3 main lines (exclude fuerza if empty)
  const visibleLines = productLines.filter(
    (l) => l.id !== "fuerza" || l.categories.some((c) => c.products.some((p) => p.images.length > 0))
  );

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main className="pt-24 pb-20">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="text-center mb-16 pt-8">
            <span className="text-secondary font-semibold uppercase tracking-widest text-xs">
              Nuestros Productos
            </span>
            <h1 className="font-display text-4xl md:text-6xl font-black text-primary mt-2 uppercase">
              Catálogo
            </h1>
            <p className="text-muted-foreground text-lg mt-4 max-w-xl mx-auto">
              Selecciona una línea de productos para explorar nuestra colección completa.
            </p>
          </div>

          {/* Line cards */}
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {visibleLines.map((line) => {
              const previewImg = line.categories
                .flatMap((c) => c.products)
                .find((p) => p.images.length > 0)?.images[0];

              const totalProducts = line.categories.reduce(
                (acc, c) => acc + c.products.length,
                0
              );

              return (
                <button
                  key={line.id}
                  onClick={() => navigate(`/catalogo/${line.id}`)}
                  className="group relative rounded-2xl overflow-hidden border border-gray-100 hover:shadow-2xl transition-all duration-500 text-left bg-white"
                >
                  {/* Image area */}
                  <div className="aspect-[4/3] bg-gray-50 flex items-center justify-center overflow-hidden relative">
                    {previewImg ? (
                      <img
                        src={previewImg}
                        alt={line.title}
                        className="w-full h-full object-contain p-6 group-hover:scale-110 transition-transform duration-500"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-primary/10 to-primary/5" />
                    )}
                    {/* Overlay on hover */}
                    <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/10 transition-all duration-300" />
                  </div>

                  {/* Bottom info */}
                  <div className={`bg-gradient-to-r ${lineAccents[line.id] || "from-primary to-primary/80"} p-6`}>
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="text-white/70 text-xs font-semibold uppercase tracking-widest">
                          {line.subtitle}
                        </p>
                        <h2 className="font-display text-xl font-black text-white mt-1 uppercase">
                          {line.title}
                        </h2>
                        <p className="text-white/70 text-xs mt-1">
                          {totalProducts} producto{totalProducts !== 1 ? "s" : ""}
                          {line.categories.length > 1 && ` · ${line.categories.length} categorías`}
                        </p>
                      </div>
                      <ArrowRight className="w-6 h-6 text-white/80 group-hover:translate-x-1 transition-transform mt-1" />
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default CatalogPage;
