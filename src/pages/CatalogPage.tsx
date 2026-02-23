import { useNavigate } from "react-router-dom";
import { ArrowRight, Anchor, Waves, Droplets } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { useCatalog } from "@/contexts/CatalogContext";

const lineConfig: Record<
  string,
  { icon: React.ComponentType<{ className?: string }>; color: string; bg: string; description: string }
> = {
  productiva: {
    icon: Anchor,
    color: "text-primary",
    bg: "bg-primary",
    description:
      "Lanchas de fibra de vidrio y motores fuera de borda Yamaha para trabajo y aventura.",
  },
  deportiva: {
    icon: Waves,
    color: "text-secondary",
    bg: "bg-secondary",
    description:
      "Motos acuáticas WaveRunner y remolques. La máxima emoción sobre el agua.",
  },
  lubricantes: {
    icon: Droplets,
    color: "text-primary",
    bg: "bg-primary",
    description:
      "Aceites Yamalube certificados para motores marinos de 2 y 4 tiempos.",
  },
};

const CatalogPage = () => {
  const navigate = useNavigate();
  const { productLines } = useCatalog();

  const getPreviewProducts = (line: (typeof productLines)[number]) => {
    const products = line.categories.flatMap((c) => c.products);
    const withImages = products.filter((p) => p.images.length > 0);

    const uniquePreview: typeof withImages = [];
    const usedIds = new Set<string>();

    const pushUnique = (product?: (typeof withImages)[number]) => {
      if (!product || usedIds.has(product.id)) return;
      usedIds.add(product.id);
      uniquePreview.push(product);
    };

    line.categories.forEach((category) => {
      pushUnique(category.products.find((p) => p.images.length > 0));
    });

    const fallbackIndexes = [0, Math.floor(withImages.length / 2), withImages.length - 1];
    fallbackIndexes.forEach((index) => pushUnique(withImages[index]));

    return uniquePreview.slice(0, 3);
  };

  const visibleLines = productLines.filter(
    (l) =>
      l.id !== "fuerza" ||
      l.categories.some((c) => c.products.some((p) => p.images.length > 0))
  );

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main className="pt-20 md:pt-24 pb-16 md:pb-20">

        {/* Hero header */}
        <div className="relative overflow-hidden bg-primary py-12 md:py-16 mb-10 md:mb-16">
          <div className="relative z-10 text-center px-4">
            <span className="text-secondary font-bold uppercase tracking-widest text-xs block mb-2">
              Nuestros Productos
            </span>
            <h1 className="font-display text-4xl md:text-7xl font-black text-white uppercase tracking-tight">
              Catálogo
            </h1>
            <p className="text-white/70 text-sm md:text-base mt-3 md:mt-4 max-w-lg mx-auto">
              Selecciona una línea de productos para explorar nuestra colección completa.
            </p>
          </div>
        </div>

        {/* Line cards */}
        <div className="container mx-auto px-4">
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 max-w-5xl mx-auto">
            {visibleLines.map((line) => {
              const cfg = lineConfig[line.id];
              const Icon = cfg?.icon ?? Anchor;

              const products = line.categories.flatMap((c) => c.products);
              const preview = getPreviewProducts(line);

              const totalProducts = products.length;

              return (
                <button
                  key={line.id}
                  onClick={() => navigate(`/catalogo/${line.id}`)}
                  className="group relative rounded-2xl overflow-hidden border border-gray-100 hover:shadow-2xl hover:-translate-y-1 transition-all duration-400 text-left bg-white flex flex-col"
                >
                  {/* Image collage area */}
                  <div className="relative h-52 bg-gray-50 overflow-hidden flex items-center justify-around px-4">
                    {preview.length > 0 ? (
                      preview.map((p, i) => (
                        <div
                          key={p.id}
                          className={`transition-all duration-500 group-hover:scale-105 ${
                            i === 1
                              ? "z-20 scale-110"
                              : "z-10 scale-90 opacity-80"
                          }`}
                          style={{ transitionDelay: `${i * 60}ms` }}
                        >
                          <img
                            src={p.images[0]}
                            alt={p.name}
                            className="h-28 w-28 object-contain drop-shadow-md"
                            loading="lazy"
                            decoding="async"
                          />
                        </div>
                      ))
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center">
                        <Icon className="w-16 h-16 text-primary/20" />
                      </div>
                    )}
                    {/* Hover overlay */}
                    <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/5 transition-all duration-300" />
                  </div>

                  {/* Footer bar */}
                  <div
                    className={`${cfg?.bg ?? "bg-primary"} p-5 flex items-center justify-between flex-1`}
                  >
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <Icon className="w-4 h-4 text-white/70" />
                        <span className="text-white/60 text-[10px] font-bold uppercase tracking-widest">
                          {line.subtitle}
                        </span>
                      </div>
                      <h2 className="font-display text-xl font-black text-white uppercase leading-tight">
                        {line.title.replace("Linea ", "").replace("Línea ", "")}
                      </h2>
                      <p className="text-white/60 text-xs mt-1 leading-snug max-w-[180px]">
                        {cfg?.description}
                      </p>
                      <span className="inline-block mt-2 text-white/50 text-[10px] font-semibold">
                        {totalProducts} productos
                        {line.categories.length > 1 &&
                          ` · ${line.categories.length} categorías`}
                      </span>
                    </div>
                    <div className="flex-shrink-0">
                      <div className="w-10 h-10 rounded-full bg-white/20 group-hover:bg-white/30 flex items-center justify-center transition-all group-hover:translate-x-1">
                        <ArrowRight className="w-5 h-5 text-white" />
                      </div>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Bottom strip */}
          <div className="mt-16 text-center">
            <p className="text-muted-foreground text-sm">
              ¿No encontrás lo que buscas?{" "}
              <a
                href="https://wa.me/529843175479"
                target="_blank"
                rel="noopener noreferrer"
                className="text-secondary font-semibold hover:underline"
              >
                Contáctanos por WhatsApp
              </a>
            </p>
          </div>
        </div>
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default CatalogPage;
