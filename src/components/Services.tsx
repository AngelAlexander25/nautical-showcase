import { Settings, Truck, FileCheck, Headphones, Wrench, Shield } from "lucide-react";

const services = [
  {
    icon: Truck,
    title: "Entrega Nacional",
    description: "Envíos a todo México con seguimiento en tiempo real y manejo especializado.",
  },
  {
    icon: Wrench,
    title: "Servicio Técnico",
    description: "Mantenimiento preventivo y correctivo por técnicos certificados.",
  },
  {
    icon: FileCheck,
    title: "Asesoría Especializada",
    description: "Te ayudamos a elegir el equipo ideal según tus necesidades.",
  },
  {
    icon: Shield,
    title: "Garantía Extendida",
    description: "Protección adicional para tu inversión con cobertura amplia.",
  },
  {
    icon: Settings,
    title: "Refacciones Originales",
    description: "Amplio inventario de partes y accesorios originales.",
  },
  {
    icon: Headphones,
    title: "Soporte 24/7",
    description: "Atención continua para resolver cualquier emergencia.",
  },
];

const Services = () => {
  return (
    <section id="servicios" className="py-24 bg-ocean-gradient text-primary-foreground">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="text-secondary font-semibold uppercase tracking-wider text-sm">
            Lo que Ofrecemos
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-bold mt-2 mb-4">
            Nuestros <span className="text-secondary">Servicios</span>
          </h2>
          <p className="text-primary-foreground/80 text-lg max-w-2xl mx-auto">
            Más que vender productos, te ofrecemos una experiencia completa con servicios de primera clase.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="group p-8 rounded-2xl bg-primary-foreground/5 backdrop-blur-sm border border-primary-foreground/10 hover:bg-primary-foreground/10 transition-all duration-300"
            >
              <div className="w-14 h-14 rounded-xl bg-secondary/20 flex items-center justify-center mb-6 group-hover:bg-secondary/30 transition-colors">
                <service.icon className="w-7 h-7 text-secondary" />
              </div>
              <h3 className="font-display text-xl font-semibold mb-3">{service.title}</h3>
              <p className="text-primary-foreground/70 leading-relaxed">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
