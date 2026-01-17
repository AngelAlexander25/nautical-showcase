import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Roberto Méndez",
    role: "Pescador Profesional",
    content: "Excelente servicio y productos de primera calidad. Mi motor Yamaha ha funcionado perfectamente durante 5 años gracias al mantenimiento que me dan.",
    rating: 5,
  },
  {
    name: "María García",
    role: "Propietaria de Yate",
    content: "La asesoría que recibí fue excepcional. Me ayudaron a elegir la lancha perfecta para mi familia. Totalmente recomendados.",
    rating: 5,
  },
  {
    name: "Carlos Hernández",
    role: "Operador Turístico",
    content: "Llevo años trabajando con ellos y nunca me han fallado. El soporte técnico es rápido y profesional.",
    rating: 5,
  },
  {
    name: "Ana Rodríguez",
    role: "Entusiasta Náutica",
    content: "Desde que compré mi motor aquí, la experiencia de navegación ha sido increíble. El equipo siempre está disponible para cualquier duda.",
    rating: 5,
  },
];

const Testimonials = () => {
  return (
    <section className="py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="text-secondary font-semibold uppercase tracking-wider text-sm">
            Testimonios
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mt-2 mb-4">
            Lo que Dicen Nuestros <span className="text-primary">Clientes</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            La satisfacción de nuestros clientes es nuestra mayor recompensa.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-card rounded-2xl p-6 border border-border hover:border-primary/30 transition-all duration-300 hover:shadow-lg relative"
            >
              <Quote className="absolute top-4 right-4 w-8 h-8 text-primary/10" />
              
              {/* Rating */}
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-secondary text-secondary" />
                ))}
              </div>

              {/* Content */}
              <p className="text-muted-foreground text-sm mb-6 leading-relaxed">
                "{testimonial.content}"
              </p>

              {/* Author */}
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
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
