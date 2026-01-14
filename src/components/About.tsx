import { Award, Shield, Wrench, Users } from "lucide-react";
import boatDeck from "@/assets/boat-deck.png";

const features = [
  {
    icon: Award,
    title: "30 Años de Experiencia",
    description: "Tres décadas siendo líderes en el mercado náutico mexicano.",
  },
  {
    icon: Shield,
    title: "Respaldo Total",
    description: "Garantía y soporte técnico en todos nuestros productos.",
  },
  {
    icon: Wrench,
    title: "Servicio Especializado",
    description: "Técnicos certificados para mantenimiento y reparación.",
  },
  {
    icon: Users,
    title: "Atención Personalizada",
    description: "Asesoría experta para encontrar el equipo ideal.",
  },
];

const About = () => {
  return (
    <section id="nosotros" className="py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Image */}
          <div className="relative">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <img
                src={boatDeck}
                alt="Vista desde embarcación"
                className="w-full h-[500px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/30 to-transparent" />
            </div>
            {/* Floating Card */}
            <div className="absolute -bottom-8 -right-8 bg-card p-6 rounded-xl shadow-xl border border-border hidden md:block">
              <div className="text-4xl font-display font-bold text-primary">30+</div>
              <div className="text-muted-foreground">Años de experiencia</div>
            </div>
          </div>

          {/* Content */}
          <div>
            <span className="text-secondary font-semibold uppercase tracking-wider text-sm">
              Sobre Nosotros
            </span>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mt-2 mb-6">
              Tu Aliado en el Mundo{" "}
              <span className="text-primary">Náutico</span>
            </h2>
            <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
              En <strong className="text-foreground">Aqua Servi</strong>, nos especializamos en la distribución de motores marinos, 
              embarcaciones y equipos náuticos de las marcas más reconocidas. Nuestra misión es brindarte 
              productos de la más alta calidad con el respaldo y servicio que mereces.
            </p>

            {/* Features Grid */}
            <div className="grid sm:grid-cols-2 gap-6">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="flex gap-4 p-4 rounded-xl bg-card border border-border hover:border-primary/30 transition-colors"
                >
                  <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                    <feature.icon className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">{feature.title}</h3>
                    <p className="text-sm text-muted-foreground">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
