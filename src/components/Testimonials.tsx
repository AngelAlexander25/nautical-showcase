import { Star, Quote } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import AnimatedSection from "./AnimatedSection";

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
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <AnimatedSection className="text-center mb-16">
          <span className="text-secondary font-semibold uppercase tracking-wider text-sm">
            Testimonios
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-primary mt-2 mb-4">
            Lo que Dicen Nuestros Clientes
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            La satisfaccion de nuestros clientes es nuestra mayor recompensa.
          </p>
        </AnimatedSection>

        <AnimatedSection delay={0.2}>
          <Carousel
            opts={{ align: "start", loop: true }}
            className="w-full max-w-5xl mx-auto"
          >
            <CarouselContent className="-ml-4">
              {testimonials.map((testimonial, index) => (
                <CarouselItem key={index} className="pl-4 md:basis-1/2">
                  <div className="bg-card rounded-2xl p-8 border border-border hover:border-primary/30 transition-all duration-300 hover:shadow-lg relative h-full">
                    <Quote className="absolute top-6 right-6 w-10 h-10 text-primary/10" />

                    <div className="flex gap-1 mb-5">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="w-5 h-5 fill-secondary text-secondary" />
                      ))}
                    </div>

                    <p className="text-muted-foreground mb-8 leading-relaxed text-base">
                      "{testimonial.content}"
                    </p>

                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                        <span className="text-primary font-semibold">
                          {testimonial.name.charAt(0)}
                        </span>
                      </div>
                      <div>
                        <p className="font-semibold text-foreground">{testimonial.name}</p>
                        <p className="text-muted-foreground text-sm">{testimonial.role}</p>
                      </div>
                    </div>
                  </div>
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

export default Testimonials;
