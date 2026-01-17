import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const team = [
  {
    name: "Carlos Mendoza",
    role: "Técnico en Motores Fuera de Borda",
    description: "15 años de experiencia en reparación y mantenimiento de motores Yamaha. Certificado por la marca.",
    initials: "CM",
  },
  {
    name: "Roberto Sánchez",
    role: "Especialista en Fibra de Vidrio",
    description: "Experto en reparación de cascos y estructuras de embarcaciones. Acabados de primera calidad.",
    initials: "RS",
  },
  {
    name: "Miguel Ángel Torres",
    role: "Técnico Electromecánico",
    description: "Diagnóstico y reparación de sistemas eléctricos marinos. Instalación de accesorios.",
    initials: "MT",
  },
  {
    name: "Jorge Hernández",
    role: "Mecánico de Motores 2T y 4T",
    description: "Especializado en ajuste, calibración y puesta a punto de motores de dos y cuatro tiempos.",
    initials: "JH",
  },
  {
    name: "Luis Fernando Díaz",
    role: "Técnico en Propulsión",
    description: "Mantenimiento de hélices, propelas y sistemas de transmisión marina.",
    initials: "LD",
  },
  {
    name: "Alejandro Ruiz",
    role: "Pintor Naval",
    description: "Preparación, pintura y acabado de embarcaciones. Aplicación de gelcoat y antifouling.",
    initials: "AR",
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
            Personal de <span className="text-primary">Mantenimiento</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Técnicos especializados listos para dar servicio y mantenimiento a tu motor o embarcación.
          </p>
        </div>

        {/* Team Carousel */}
        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full max-w-6xl mx-auto"
        >
          <CarouselContent className="-ml-4">
            {team.map((member, index) => (
              <CarouselItem key={index} className="pl-4 md:basis-1/2 lg:basis-1/3">
                <div className="group h-full p-8 rounded-2xl bg-card border border-border hover:border-primary/30 transition-all duration-300 hover:shadow-xl text-center">
                  {/* Avatar */}
                  <div className="w-24 h-24 mx-auto rounded-full bg-primary flex items-center justify-center mb-6">
                    <span className="text-primary-foreground font-display font-bold text-2xl">
                      {member.initials}
                    </span>
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
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="hidden md:flex -left-12" />
          <CarouselNext className="hidden md:flex -right-12" />
        </Carousel>
      </div>
    </section>
  );
};

export default Team;
