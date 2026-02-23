import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import AnimatedSection from "./AnimatedSection";

import lanchasImage from "@/assets/lanchas.jpg";
import motorsHero from "@/assets/carousel/motors-hero.jpg";
import motorsHeroWebp from "@/assets/carousel/motors-hero.webp";
import motorsHeroAvif from "@/assets/carousel/motors-hero.avif";
import lubricantesImage from "@/assets/lubricantes.png";

type CatalogSlide = {
  id: string;
  title: string;
  subtitle: string;
  image: string;
  imageWebp?: string;
  imageAvif?: string;
};

const catalogSlides: CatalogSlide[] = [
  {
    id: "productiva",
    title: "Linea Productiva",
    subtitle: "Lanchas y Motores Fuera de Borda",
    image: lanchasImage,
  },
  {
    id: "deportiva",
    title: "Linea Deportiva",
    subtitle: "Motos Acuáticas y Remolques",
    image: motorsHero,
    imageWebp: motorsHeroWebp,
    imageAvif: motorsHeroAvif,
  },
  {
    id: "lubricantes",
    title: "Linea de Lubricantes",
    subtitle: "Aceites Yamalube premium",
    image: lubricantesImage,
  },
];

const CatalogPreview = () => {
  const navigate = useNavigate();
  const [current, setCurrent] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const [progress, setProgress] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const progressIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const startAuto = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
    
    setProgress(0);
    
    intervalRef.current = setInterval(() => {
      setCurrent((prev) => (prev + 1) % catalogSlides.length);
      setProgress(0);
    }, 4000);

    progressIntervalRef.current = setInterval(() => {
      setProgress((prev) => Math.min(prev + 2, 100));
    }, 80);
  };

  useEffect(() => {
    if (!isHovering) {
      startAuto();
    } else {
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
    };
  }, [isHovering]);

  const goTo = (idx: number) => {
    setCurrent(idx);
    setProgress(0);
    startAuto();
  };

  const prev = () => {
    setCurrent((prev) => (prev - 1 + catalogSlides.length) % catalogSlides.length);
    setProgress(0);
    startAuto();
  };

  const next = () => {
    setCurrent((prev) => (prev + 1) % catalogSlides.length);
    setProgress(0);
    startAuto();
  };

  const isNearCurrentSlide = (index: number) => {
    const total = catalogSlides.length;
    const prevIndex = (current - 1 + total) % total;
    const nextIndex = (current + 1) % total;

    return index === current || index === prevIndex || index === nextIndex;
  };

  return (
    <section id="catalogo" className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <AnimatedSection className="text-center mb-14">
          <span className="text-secondary font-semibold uppercase tracking-wider text-sm">
            Nuestros Productos
          </span>
          <h2 className="font-display text-3xl md:text-5xl font-bold text-primary mt-2 mb-4">
            Catalogo de Productos
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Explora nuestra seleccion completa de productos marinos de las mejores marcas.
          </p>
        </AnimatedSection>

        {/* Main slide */}
        <AnimatedSection delay={0.2}>
          <div className="relative max-w-5xl mx-auto">
            {/* Main carousel */}
            <div 
              className="relative rounded-2xl overflow-hidden shadow-2xl group"
              onMouseEnter={() => setIsHovering(true)}
              onMouseLeave={() => setIsHovering(false)}
            >
              {/* Carousel Item */}
              <div className="relative w-full min-h-[350px] md:min-h-[600px] overflow-hidden">
                {catalogSlides.map((slide, i) => (
                  <div
                    key={slide.id}
                    className={`absolute inset-0 transition-all duration-700 ease-in-out ${
                      i === current ? "opacity-100 scale-100" : "opacity-0 scale-110"
                    }`}
                  >
                    {isNearCurrentSlide(i) ? (
                      <picture>
                        {slide.imageAvif && <source srcSet={slide.imageAvif} type="image/avif" />}
                        {slide.imageWebp && <source srcSet={slide.imageWebp} type="image/webp" />}
                        <img
                          src={slide.image}
                          alt={slide.title}
                          className="w-full h-full object-cover"
                          loading={i === current ? "eager" : "lazy"}
                          decoding="async"
                        />
                      </picture>
                    ) : (
                      <div className="w-full h-full bg-slate-200" aria-hidden="true" />
                    )}
                    {/* Dark gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                  </div>
                ))}

                {/* Carousel Caption - Overlay on image */}
                <div className="absolute bottom-0 left-0 right-0 px-4 md:px-12 py-6 md:py-16 text-white z-10">
                  <p className="text-secondary font-bold uppercase tracking-widest text-xs md:text-sm mb-1 md:mb-2 transition-opacity duration-500">
                    {catalogSlides[current].subtitle}
                  </p>
                  <h2 className="font-display text-2xl md:text-5xl font-black uppercase leading-tight mb-4 md:mb-6">
                    {catalogSlides[current].title}
                  </h2>

                  {/* Progress bar */}
                  <div className="w-full max-w-xs h-1.5 bg-white/20 rounded-full overflow-hidden mb-4 md:mb-6">
                    <div
                      className="h-full bg-secondary transition-all duration-100 ease-linear rounded-full"
                      style={{ width: `${progress}%` }}
                    />
                  </div>

                  {/* Dots */}
                  <div className="flex gap-2.5">
                    {catalogSlides.map((_, i) => (
                      <button
                        key={i}
                        onClick={() => goTo(i)}
                        className={`rounded-full transition-all duration-300 cursor-pointer ${
                          i === current 
                            ? "w-8 h-2.5 bg-secondary" 
                            : "w-2.5 h-2.5 bg-white/40 hover:bg-white/60"
                        }`}
                        aria-label={`Ir a slide ${i + 1}`}
                      />
                    ))}
                  </div>
                </div>

                {/* Navigation arrows */}
                <button
                  onClick={prev}
                  className="hidden md:block absolute left-3 md:left-6 top-1/2 -translate-y-1/2 bg-white/30 hover:bg-white/50 text-white p-2 md:p-3 rounded-full transition-all duration-200 opacity-0 group-hover:opacity-100 z-20 hover:scale-110"
                  aria-label="Anterior"
                >
                  <ChevronLeft className="w-5 h-5 md:w-6 md:h-6" />
                </button>
                <button
                  onClick={next}
                  className="hidden md:block absolute right-3 md:right-6 top-1/2 -translate-y-1/2 bg-white/30 hover:bg-white/50 text-white p-2 md:p-3 rounded-full transition-all duration-200 opacity-0 group-hover:opacity-100 z-20 hover:scale-110"
                  aria-label="Siguiente"
                >
                  <ChevronRight className="w-5 h-5 md:w-6 md:h-6" />
                </button>

                {/* CTA Button on image */}
                <button
                  onClick={() => navigate(`/catalogo/${catalogSlides[current].id}`)}
                  className="absolute bottom-8 md:bottom-16 right-4 md:right-12 inline-flex items-center gap-2 bg-secondary text-white font-bold px-4 md:px-8 py-2 md:py-3 text-sm md:text-base rounded-lg hover:bg-secondary/90 active:scale-95 transition-all shadow-lg hover:shadow-xl z-10"
                >
                  Ver productos
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>

            {/* Thumbnail previews - hidden on mobile */}
            <div className="hidden md:grid grid-cols-3 gap-3 md:gap-4 mt-8">
              {catalogSlides.map((slide, i) => (
                <button
                  key={slide.id}
                  onClick={() => goTo(i)}
                  className={`relative rounded-lg md:rounded-xl overflow-hidden aspect-video md:aspect-[16/9] group/thumb transition-all duration-300 ${
                    i === current 
                      ? "ring-4 ring-secondary scale-105 shadow-xl" 
                      : "opacity-60 hover:opacity-100 shadow-md"
                  }`}
                  aria-label={`Seleccionar ${slide.title}`}
                >
                  <picture>
                    {slide.imageAvif && <source srcSet={slide.imageAvif} type="image/avif" />}
                    {slide.imageWebp && <source srcSet={slide.imageWebp} type="image/webp" />}
                    <img
                      src={slide.image}
                      alt={slide.title}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover/thumb:scale-125"
                      loading="lazy"
                      decoding="async"
                    />
                  </picture>
                  {/* Dark overlay for text */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent flex items-end p-3">
                    <span className="text-white text-[11px] md:text-sm font-bold uppercase line-clamp-2 transition-opacity duration-300">
                      {slide.title}
                    </span>
                  </div>
                </button>
              ))}
            </div>

            {/* Mobile navigation arrows - always visible */}
            <div className="md:hidden flex justify-between absolute left-3 right-3 top-1/2 -translate-y-1/2 pointer-events-none">
              <button
                onClick={prev}
                className="bg-primary hover:bg-primary/80 text-white p-3 rounded-full transition-all shadow-lg z-20 pointer-events-auto hover:scale-110"
                aria-label="Anterior"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={next}
                className="bg-primary hover:bg-primary/80 text-white p-3 rounded-full transition-all shadow-lg z-20 pointer-events-auto hover:scale-110"
                aria-label="Siguiente"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
};

export default CatalogPreview;
