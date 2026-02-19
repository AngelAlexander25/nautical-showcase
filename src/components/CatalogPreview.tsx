import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import AnimatedSection from "./AnimatedSection";

import boatsMarina from "@/assets/carousel/boats-marina.jpg";
import motorsHero from "@/assets/carousel/motors-hero.jpg";
import lubricantsHero from "@/assets/carousel/lubricants-hero.jpg";

const catalogSlides = [
  {
    id: "productiva",
    title: "Linea Productiva",
    subtitle: "Lanchas y Motores Fuera de Borda",
    image: boatsMarina,
  },
  {
    id: "deportiva",
    title: "Linea Deportiva",
    subtitle: "Motos Acuáticas y Remolques",
    image: motorsHero,
  },
  {
    id: "lubricantes",
    title: "Linea de Lubricantes",
    subtitle: "Aceites Yamalube premium",
    image: lubricantsHero,
  },
];

const CatalogPreview = () => {
  const navigate = useNavigate();
  const [current, setCurrent] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const startAuto = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setCurrent((prev) => (prev + 1) % catalogSlides.length);
    }, 4000);
  };

  useEffect(() => {
    startAuto();
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  const goTo = (idx: number) => {
    setCurrent(idx);
    startAuto();
  };

  return (
    <section id="catalogo" className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <AnimatedSection className="text-center mb-14">
          <span className="text-secondary font-semibold uppercase tracking-wider text-sm">
            Nuestros Productos
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-primary mt-2 mb-4">
            Catalogo de Productos
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Explora nuestra seleccion completa de productos marinos de las mejores marcas.
          </p>
        </AnimatedSection>

        {/* Main slide */}
        <AnimatedSection delay={0.2}>
          <div className="relative max-w-5xl mx-auto">
            <div className="grid md:grid-cols-2 rounded-2xl overflow-hidden shadow-2xl min-h-[420px]">
              {/* Image */}
              <div className="relative overflow-hidden">
                {catalogSlides.map((slide, i) => (
                  <img
                    key={slide.id}
                    src={slide.image}
                    alt={slide.title}
                    className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${
                      i === current ? "opacity-100" : "opacity-0"
                    }`}
                  />
                ))}
                <div className="absolute inset-0 bg-gradient-to-r from-primary/40 to-transparent" />
              </div>

              {/* Text side */}
              <div className="bg-primary flex flex-col justify-center px-10 py-12">
                <p className="text-secondary font-bold uppercase tracking-widest text-xs mb-2">
                  {catalogSlides[current].subtitle}
                </p>
                <h3 className="font-display text-3xl md:text-4xl font-black text-white uppercase leading-tight mb-6 transition-all duration-300">
                  {catalogSlides[current].title}
                </h3>

                {/* Dots */}
                <div className="flex gap-3 mb-8">
                  {catalogSlides.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => goTo(i)}
                      className={`h-2 rounded-full transition-all duration-300 ${
                        i === current ? "w-8 bg-secondary" : "w-2 bg-white/40"
                      }`}
                    />
                  ))}
                </div>

                <button
                  onClick={() => navigate(`/catalogo/${catalogSlides[current].id}`)}
                  className="inline-flex items-center gap-2 bg-secondary text-white font-bold px-6 py-3 rounded-lg hover:bg-secondary/90 transition-colors self-start group"
                >
                  Ver productos
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>

            {/* Thumbnail previews */}
            <div className="grid grid-cols-3 gap-4 mt-6">
              {catalogSlides.map((slide, i) => (
                <button
                  key={slide.id}
                  onClick={() => goTo(i)}
                  className={`relative rounded-xl overflow-hidden aspect-[16/9] group transition-all duration-300 ${
                    i === current ? "ring-2 ring-secondary scale-[1.02]" : "opacity-70 hover:opacity-100"
                  }`}
                >
                  <img
                    src={slide.image}
                    alt={slide.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-primary/50 flex items-end p-3">
                    <span className="text-white text-xs font-bold uppercase">{slide.title}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
};

export default CatalogPreview;
