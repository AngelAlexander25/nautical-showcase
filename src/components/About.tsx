import { Award, Shield, Wrench, Users } from "lucide-react";
import boatDeck from "@/assets/boat-deck.png";
import boatDeckWebp from "@/assets/boat-deck.webp";
import boatDeckAvif from "@/assets/boat-deck.avif";
import AnimatedSection, { SlideInLeft, SlideInRight, StaggerContainer, StaggerItem } from "./AnimatedSection";

const features = [
  {
    icon: Award,
    title: "30 Años de Experiencia",
    description: "Tres decadas siendo lideres en el mercado nautico mexicano.",
  },
  {
    icon: Shield,
    title: "Respaldo Total",
    description: "Garantia y soporte tecnico en todos nuestros productos.",
  },
  {
    icon: Wrench,
    title: "Servicio Especializado",
    description: "Tecnicos certificados para mantenimiento y reparacion.",
  },
  {
    icon: Users,
    title: "Atencion Personalizada",
    description: "Asesoria experta para encontrar el equipo ideal.",
  },
];

const About = () => {
  return (
    <section id="nosotros" className="py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Image */}
          <SlideInLeft>
            <div className="relative">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <picture>
                  <source srcSet={boatDeckAvif} type="image/avif" />
                  <source srcSet={boatDeckWebp} type="image/webp" />
                  <img
                    src={boatDeck}
                    alt="Vista desde embarcacion"
                    className="w-full h-[320px] sm:h-[420px] md:h-[500px] object-cover"
                    loading="lazy"
                    decoding="async"
                  />
                </picture>
                <div className="absolute inset-0 bg-gradient-to-t from-primary/30 to-transparent" />
              </div>
              <div className="absolute -bottom-8 -right-8 bg-card p-6 rounded-xl shadow-xl border border-border hidden md:block">
                <div className="text-4xl font-display font-bold text-primary">30+</div>
                <div className="text-muted-foreground">Años de experiencia</div>
              </div>
            </div>
          </SlideInLeft>

          {/* Content */}
          <SlideInRight>
            <div>
              <span className="text-secondary font-semibold uppercase tracking-wider text-sm">
                Sobre Nosotros
              </span>
              <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mt-2 mb-6">
                Tu Aliado en el Mundo{" "}
                <span className="text-primary">Nautico</span>
              </h2>
              <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
                En <strong className="text-foreground">Aqua Servi</strong>, nos especializamos en la distribucion de motores marinos, 
                embarcaciones y equipos nauticos de las marcas mas reconocidas. Nuestra mision es brindarte 
                productos de la mas alta calidad con el respaldo y servicio que mereces.
              </p>

              <StaggerContainer className="grid sm:grid-cols-2 gap-6">
                {features.map((feature, index) => (
                  <StaggerItem key={index}>
                    <div className="flex gap-4 p-4 rounded-xl bg-card border border-border hover:border-primary/30 transition-colors">
                      <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                        <feature.icon className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground mb-1">{feature.title}</h3>
                        <p className="text-sm text-muted-foreground">{feature.description}</p>
                      </div>
                    </div>
                  </StaggerItem>
                ))}
              </StaggerContainer>
            </div>
          </SlideInRight>
        </div>
      </div>
    </section>
  );
};

export default About;
