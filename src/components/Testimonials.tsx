import { Star, Quote } from "lucide-react";
import AnimatedSection, { StaggerContainer, StaggerItem } from "./AnimatedSection";

const testimonials = [
  {
    name: "Roberto Mendez",
    role: "Pescador Profesional",
    content: "Excelente servicio y productos de primera calidad. Mi motor Yamaha ha funcionado perfectamente durante 5 anos gracias al mantenimiento que me dan.",
    rating: 5,
  },
  {
    name: "Maria Garcia",
    role: "Propietaria de Yate",
    content: "La asesoria que recibi fue excepcional. Me ayudaron a elegir la lancha perfecta para mi familia. Totalmente recomendados.",
    rating: 5,
  },
  {
    name: "Carlos Hernandez",
    role: "Operador Turistico",
    content: "Llevo anos trabajando con ellos y nunca me han fallado. El soporte tecnico es rapido y profesional.",
    rating: 5,
  },
  {
    name: "Ana Rodriguez",
    role: "Entusiasta Nautica",
    content: "Desde que compre mi motor aqui, la experiencia de navegacion ha sido increible. El equipo siempre esta disponible para cualquier duda.",
    rating: 5,
  },
];

const Testimonials = () => {
  return (
    <section className="py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        {/* Header */}
        <AnimatedSection className="text-center mb-16">
          <span className="text-secondary font-semibold uppercase tracking-wider text-sm">
            Testimonios
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mt-2 mb-4">
            Lo que Dicen Nuestros <span className="text-primary">Clientes</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            La satisfaccion de nuestros clientes es nuestra mayor recompensa.
          </p>
        </AnimatedSection>

        {/* Testimonials Grid */}
        <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {testimonials.map((testimonial, index) => (
            <StaggerItem key={index}>
              <div className="bg-card rounded-2xl p-6 border border-border hover:border-primary/30 transition-all duration-300 hover:shadow-lg relative h-full">
                <Quote className="absolute top-4 right-4 w-8 h-8 text-primary/10" />
                
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-secondary text-secondary" />
                  ))}
                </div>

                <p className="text-muted-foreground text-sm mb-6 leading-relaxed">
                  "{testimonial.content}"
                </p>

                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <span className="text-primary font-semibold text-sm">
                      {testimonial.name.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <p className="font-semibold text-foreground text-sm">{testimonial.name}</p>
                    <p className="text-muted-foreground text-xs">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
};

export default Testimonials;
