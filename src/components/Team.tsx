import { Wrench, HeadphonesIcon, Settings, ShieldCheck } from "lucide-react";

const team = [
  {
    icon: Wrench,
    name: "Equipo de Mantenimiento",
    role: "Técnicos Certificados",
    description: "Especialistas en reparación y mantenimiento preventivo de motores fuera de borda.",
  },
  {
    icon: HeadphonesIcon,
    name: "Soporte al Cliente",
    role: "Atención Personalizada",
    description: "Disponibles para resolver todas tus dudas y brindarte la mejor experiencia.",
  },
  {
    icon: Settings,
    name: "Servicio Técnico",
    role: "Diagnóstico Especializado",
    description: "Análisis profesional y soluciones efectivas para tu embarcación.",
  },
  {
    icon: ShieldCheck,
    name: "Control de Calidad",
    role: "Garantía de Servicio",
    description: "Verificación exhaustiva para asegurar el mejor funcionamiento.",
  },
];

const Team = () => {
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="text-secondary font-semibold uppercase tracking-wider text-sm">
            Nuestro Equipo
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mt-2 mb-4">
            Personal de <span className="text-primary">Soporte</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Contamos con un equipo altamente capacitado para brindarte el mejor servicio de mantenimiento.
          </p>
        </div>

        {/* Team Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {team.map((member, index) => (
            <div
              key={index}
              className="group text-center p-8 rounded-2xl bg-card border border-border hover:border-primary/30 transition-all duration-300 hover:shadow-xl"
            >
              {/* Icon */}
              <div className="w-20 h-20 mx-auto rounded-full bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                <member.icon className="w-10 h-10 text-primary" />
              </div>

              {/* Info */}
              <h3 className="font-display text-xl font-semibold text-foreground mb-1">
                {member.name}
              </h3>
              <p className="text-secondary font-medium text-sm mb-4">{member.role}</p>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {member.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Team;
