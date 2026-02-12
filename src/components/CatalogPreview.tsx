import { useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import AnimatedSection from "./AnimatedSection";

import boatsMarina from "@/assets/carousel/boats-marina.jpg";
import motorsHero from "@/assets/carousel/motors-hero.jpg";
import trailersHero from "@/assets/carousel/trailers-hero.jpg";
import lubricantsHero from "@/assets/carousel/lubricants-hero.jpg";

const catalogSlides = [
  {
    id: "productiva",
    title: "Linea Productiva",
    subtitle: "Lanchas y Motores Fuera de Borda",
    image: boatsMarina,
  },
  {
    id: "motores",
    title: "Motores Marinos",
    subtitle: "Potencia y confiabilidad Yamaha",
    image: motorsHero,
  },
  {
    id: "deportiva",
    title: "Linea Deportiva",
    subtitle: "Remolques para embarcaciones",
    image: trailersHero,
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

  return (
    <section id="catalogo" className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <AnimatedSection className="text-center mb-16">
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

        <AnimatedSection delay={0.2}>
          <Carousel
            opts={{ align: "start", loop: true }}
            className="w-full max-w-6xl mx-auto"
          >
            <CarouselContent className="-ml-4">
              {catalogSlides.map((slide) => (
                <CarouselItem key={slide.id} className="pl-4 md:basis-1/2">
                  <button
                    onClick={() => navigate("/catalogo")}
                    className="relative w-full aspect-[16/10] rounded-2xl overflow-hidden group block"
                  >
                    <img
                      src={slide.image}
                      alt={slide.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-6 text-left">
                      <h3 className="font-display text-2xl font-bold text-white mb-1">
                        {slide.title}
                      </h3>
                      <p className="text-white/80 text-sm mb-3">{slide.subtitle}</p>
                      <span className="inline-flex items-center gap-2 text-secondary font-semibold text-sm group-hover:gap-3 transition-all">
                        Ver productos <ArrowRight className="w-4 h-4" />
                      </span>
                    </div>
                  </button>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="hidden md:flex -left-12" />
            <CarouselNext className="hidden md:flex -right-12" />
          </Carousel>
        </AnimatedSection>
      </div>
    </section>
  );
};

export default CatalogPreview;
