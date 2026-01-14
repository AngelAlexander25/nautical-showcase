import { useState } from "react";
import { Filter } from "lucide-react";
import ProductCard from "./ProductCard";
import { Button } from "@/components/ui/button";
import motorsImage from "@/assets/motors.png";

// Productos de ejemplo basados en IMEMSA
const products = [
  {
    id: "1",
    name: "Motor Fuera de Borda Yamaha 115 HP",
    category: "Motores",
    image: motorsImage,
    description: "Motor fuera de borda de 4 tiempos, potencia confiable para embarcaciones medianas. Tecnología de inyección electrónica.",
    features: ["4 tiempos", "115 HP", "Inyección electrónica"],
    externalUrl: "https://imemsa.com.mx/",
  },
  {
    id: "2",
    name: "Motor Yamaha 200 HP V6",
    category: "Motores",
    image: "https://images.unsplash.com/photo-1605281317010-fe5ffe798166?w=600&h=400&fit=crop",
    description: "Potencia superior V6 con sistema de control digital. Ideal para embarcaciones de alto rendimiento.",
    features: ["V6", "200 HP", "Control digital"],
    externalUrl: "https://imemsa.com.mx/",
  },
  {
    id: "3",
    name: "Motor Yamaha 40 HP",
    category: "Motores",
    image: "https://images.unsplash.com/photo-1567899378494-47b22a2ae96a?w=600&h=400&fit=crop",
    description: "Compacto y eficiente, perfecto para lanchas pequeñas y pesca deportiva.",
    features: ["4 tiempos", "40 HP", "Ligero"],
    externalUrl: "https://imemsa.com.mx/",
  },
  {
    id: "4",
    name: "Lancha de Pesca Deportiva 22'",
    category: "Embarcaciones",
    image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=600&h=400&fit=crop",
    description: "Diseño optimizado para pesca deportiva con amplio espacio y estabilidad.",
    features: ["22 pies", "Fibra de vidrio", "Consola central"],
    externalUrl: "https://imemsa.com.mx/",
  },
  {
    id: "5",
    name: "Yate de Recreo 35'",
    category: "Yates",
    image: "https://images.unsplash.com/photo-1567899378494-47b22a2ae96a?w=600&h=400&fit=crop",
    description: "Lujo y confort para navegación de placer. Cabina equipada y diseño elegante.",
    features: ["35 pies", "Cabina completa", "2 camarotes"],
    externalUrl: "https://imemsa.com.mx/",
  },
  {
    id: "6",
    name: "Jet Ski Yamaha WaveRunner",
    category: "Motos Acuáticas",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=400&fit=crop",
    description: "Diversión y adrenalina en el agua. Rendimiento superior y manejo ágil.",
    features: ["3 plazas", "Alto rendimiento", "GPS integrado"],
    externalUrl: "https://imemsa.com.mx/",
  },
];

const categories = ["Todos", "Motores", "Embarcaciones", "Yates", "Motos Acuáticas"];

const Catalog = () => {
  const [activeCategory, setActiveCategory] = useState("Todos");

  const filteredProducts = activeCategory === "Todos"
    ? products
    : products.filter((p) => p.category === activeCategory);

  return (
    <section id="catalogo" className="py-24 bg-background">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="text-secondary font-semibold uppercase tracking-wider text-sm">
            Nuestros Productos
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mt-2 mb-4">
            Catálogo de <span className="text-primary">Productos</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Explora nuestra selección de motores marinos, embarcaciones y equipos náuticos de las mejores marcas.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((category) => (
            <Button
              key={category}
              variant={activeCategory === category ? "default" : "outline"}
              onClick={() => setActiveCategory(category)}
              className={
                activeCategory === category
                  ? "bg-primary text-primary-foreground"
                  : "border-border text-foreground hover:border-primary hover:text-primary"
              }
            >
              {category}
            </Button>
          ))}
        </div>

        {/* Products Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} {...product} />
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-16">
          <p className="text-muted-foreground mb-4">
            ¿No encuentras lo que buscas? Contáctanos para productos personalizados.
          </p>
          <Button
            size="lg"
            onClick={() => document.getElementById("contacto")?.scrollIntoView({ behavior: "smooth" })}
            className="bg-secondary hover:bg-secondary/90 text-secondary-foreground"
          >
            Solicitar Cotización Especial
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Catalog;
