import { ChevronDown, Anchor, Ship } from "lucide-react";
import { Button } from "@/components/ui/button";
import yateImage from "@/assets/yate.png";

const Hero = () => {
  const handleScroll = () => {
    document.getElementById("catalogo")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="inicio" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={yateImage}
          alt="Yate en el océano"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-hero-overlay" />
      </div>

      {/* Floating decorative elements */}
      <div className="absolute top-1/4 left-10 text-primary-foreground/20 animate-float hidden lg:block">
        <Anchor className="w-16 h-16" />
      </div>
      <div className="absolute bottom-1/3 right-10 text-primary-foreground/20 animate-float hidden lg:block" style={{ animationDelay: "2s" }}>
        <Ship className="w-20 h-20" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center">
        <div className="max-w-4xl mx-auto">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-secondary/20 backdrop-blur-sm border border-secondary/40 rounded-full px-6 py-2 mb-8 animate-fade-up">
            <span className="text-secondary font-semibold">30 Años de Experiencia</span>
          </div>

          {/* Main Title */}
          <h1 className="font-display text-4xl md:text-6xl lg:text-7xl font-bold text-primary-foreground mb-6 animate-fade-up" style={{ animationDelay: "0.2s" }}>
            Navega hacia la{" "}
            <span className="text-gradient-gold">Excelencia</span>
          </h1>

          {/* Subtitle */}
          <p className="text-lg md:text-xl text-primary-foreground/90 max-w-2xl mx-auto mb-10 animate-fade-up" style={{ animationDelay: "0.4s" }}>
            Distribuidores autorizados de motores marinos, yates y embarcaciones de las mejores marcas. 
            <strong className="text-secondary"> Respaldo • Servicio • Calidad</strong>
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-up" style={{ animationDelay: "0.6s" }}>
            <Button
              onClick={handleScroll}
              size="lg"
              className="bg-secondary hover:bg-secondary/90 text-secondary-foreground font-semibold px-8 py-6 text-lg"
            >
              Ver Catálogo
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="border-primary-foreground/50 text-primary-foreground hover:bg-primary-foreground/10 px-8 py-6 text-lg"
              onClick={() => document.getElementById("contacto")?.scrollIntoView({ behavior: "smooth" })}
            >
              Solicitar Cotización
            </Button>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <button
          onClick={handleScroll}
          className="text-primary-foreground/70 hover:text-primary-foreground transition-colors"
          aria-label="Scroll to catalog"
        >
          <ChevronDown className="w-10 h-10" />
        </button>
      </div>
    </section>
  );
};

export default Hero;
