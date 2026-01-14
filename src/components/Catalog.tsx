import { useState } from "react";
import ProductCard from "./ProductCard";
import { Button } from "@/components/ui/button";

// Importar imágenes de motores
import motorF300 from "@/assets/products/motor-f300.png";
import motorF250 from "@/assets/products/motor-f250.png";
import motorF200 from "@/assets/products/motor-f200.png";
import motorF150 from "@/assets/products/motor-f150.png";
import motorF115 from "@/assets/products/motor-f115.png";
import motorF100 from "@/assets/products/motor-f100.png";
import motor85 from "@/assets/products/motor-85.png";
import motorF75 from "@/assets/products/motor-f75.png";
import motorF70 from "@/assets/products/motor-f70.png";
import motorF60 from "@/assets/products/motor-f60.png";
import motorF50 from "@/assets/products/motor-f50.png";
import motorF40 from "@/assets/products/motor-f40.png";
import motorF30 from "@/assets/products/motor-f30.png";
import motorF25 from "@/assets/products/motor-f25.png";
import motorF20 from "@/assets/products/motor-f20.png";
import motorF15 from "@/assets/products/motor-f15.png";

// Importar imágenes de lanchas
import lanchaW267 from "@/assets/products/lancha-w267.png";
import lanchaR18 from "@/assets/products/lancha-r18.png";
import lanchaR22 from "@/assets/products/lancha-r22.png";
import lanchaW23M from "@/assets/products/lancha-w23m.png";
import lanchaR14 from "@/assets/products/lancha-r14.png";
import lanchaW16 from "@/assets/products/lancha-w16.png";
import lanchaJ18 from "@/assets/products/lancha-j18.png";
import lanchaW22 from "@/assets/products/lancha-w22.png";
import lanchaC23 from "@/assets/products/lancha-c23.png";
import lanchaW23II from "@/assets/products/lancha-w23ii.png";

// Productos basados en catálogo IMEMSA
const products = [
  // MOTORES 4 TIEMPOS - Alta Potencia
  {
    id: "m1",
    name: "Yamaha F300 GET",
    category: "Motores 4T",
    image: motorF300,
    description: "Motor fuera de borda V6 de 4 tiempos, máxima potencia para embarcaciones grandes.",
    features: ["4 Tiempos", "300 HP", "V6"],
    externalUrl: "https://imemsa.com.mx/",
  },
  {
    id: "m2",
    name: "Yamaha F300 DET",
    category: "Motores 4T",
    image: motorF250,
    description: "Motor V6 de alta potencia con tecnología digital. Rendimiento excepcional.",
    features: ["4 Tiempos", "300 HP", "Digital"],
    externalUrl: "https://imemsa.com.mx/",
  },
  {
    id: "m3",
    name: "Yamaha F250 PET",
    category: "Motores 4T",
    image: motorF250,
    description: "Potente motor V6 de 250 HP. Ideal para embarcaciones de alto rendimiento.",
    features: ["4 Tiempos", "250 HP", "V6"],
    externalUrl: "https://imemsa.com.mx/",
  },
  {
    id: "m4",
    name: "Yamaha F200 BETX",
    category: "Motores 4T",
    image: motorF200,
    description: "Motor de 200 HP con control digital. Eficiencia y potencia.",
    features: ["4 Tiempos", "200 HP", "Control Digital"],
    externalUrl: "https://imemsa.com.mx/",
  },
  {
    id: "m5",
    name: "Yamaha F150 FETX",
    category: "Motores 4T",
    image: motorF150,
    description: "Motor versátil de 150 HP. Excelente relación potencia-peso.",
    features: ["4 Tiempos", "150 HP", "Inyección"],
    externalUrl: "https://imemsa.com.mx/",
  },
  {
    id: "m6",
    name: "Yamaha F115 BET2",
    category: "Motores 4T",
    image: motorF115,
    description: "Motor eficiente de 115 HP. Diseño compacto y potente.",
    features: ["4 Tiempos", "115 HP", "Compacto"],
    externalUrl: "https://imemsa.com.mx/",
  },
  {
    id: "m7",
    name: "Yamaha F115 BEHTX",
    category: "Motores 4T",
    image: motorF115,
    description: "Versión mejorada del F115 con características premium.",
    features: ["4 Tiempos", "115 HP", "Premium"],
    externalUrl: "https://imemsa.com.mx/",
  },
  {
    id: "m8",
    name: "Yamaha F100 GE",
    category: "Motores 4T",
    image: motorF100,
    description: "Motor confiable de 100 HP para uso comercial y recreativo.",
    features: ["4 Tiempos", "100 HP", "Versátil"],
    externalUrl: "https://imemsa.com.mx/",
  },
  {
    id: "m9",
    name: "Yamaha F75 FEHT",
    category: "Motores 4T",
    image: motorF75,
    description: "Motor compacto de 75 HP. Ideal para lanchas medianas.",
    features: ["4 Tiempos", "75 HP", "Eficiente"],
    externalUrl: "https://imemsa.com.mx/",
  },
  {
    id: "m10",
    name: "Yamaha F70A",
    category: "Motores 4T",
    image: motorF70,
    description: "Motor de 70 HP con excelente economía de combustible.",
    features: ["4 Tiempos", "70 HP", "Económico"],
    externalUrl: "https://imemsa.com.mx/",
  },
  {
    id: "m11",
    name: "Yamaha FT60 GEHDL",
    category: "Motores 4T",
    image: motorF60,
    description: "Motor de 60 HP de alto torque para trabajo pesado.",
    features: ["4 Tiempos", "60 HP", "Alto Torque"],
    externalUrl: "https://imemsa.com.mx/",
  },
  {
    id: "m12",
    name: "Yamaha FT50 CEHDL",
    category: "Motores 4T",
    image: motorF50,
    description: "Motor de 50 HP compacto y confiable.",
    features: ["4 Tiempos", "50 HP", "Compacto"],
    externalUrl: "https://imemsa.com.mx/",
  },
  {
    id: "m13",
    name: "Yamaha F40 FEHDL",
    category: "Motores 4T",
    image: motorF40,
    description: "Motor portátil de 40 HP. Fácil de transportar.",
    features: ["4 Tiempos", "40 HP", "Portátil"],
    externalUrl: "https://imemsa.com.mx/",
  },
  {
    id: "m14",
    name: "Yamaha F30 BEHDL",
    category: "Motores 4T",
    image: motorF30,
    description: "Motor ligero de 30 HP para embarcaciones pequeñas.",
    features: ["4 Tiempos", "30 HP", "Ligero"],
    externalUrl: "https://imemsa.com.mx/",
  },
  {
    id: "m15",
    name: "Yamaha F25 GMHL",
    category: "Motores 4T",
    image: motorF25,
    description: "Motor portátil de 25 HP. Arranque manual.",
    features: ["4 Tiempos", "25 HP", "Manual"],
    externalUrl: "https://imemsa.com.mx/",
  },
  {
    id: "m16",
    name: "Yamaha F20 CMHL",
    category: "Motores 4T",
    image: motorF20,
    description: "Motor ultraligero de 20 HP para uso recreativo.",
    features: ["4 Tiempos", "20 HP", "Ultraligero"],
    externalUrl: "https://imemsa.com.mx/",
  },
  {
    id: "m17",
    name: "Yamaha F15 CMHL",
    category: "Motores 4T",
    image: motorF15,
    description: "Motor compacto de 15 HP. Perfecto para botes auxiliares.",
    features: ["4 Tiempos", "15 HP", "Auxiliar"],
    externalUrl: "https://imemsa.com.mx/",
  },
  // MOTORES 2 TIEMPOS
  {
    id: "m18",
    name: "Yamaha 200AETX (SST)",
    category: "Motores 2T",
    image: motorF200,
    description: "Motor 2 tiempos de 200 HP. Potencia máxima.",
    features: ["2 Tiempos", "200 HP", "SST"],
    externalUrl: "https://imemsa.com.mx/",
  },
  {
    id: "m19",
    name: "Yamaha 150 AETX (SST)",
    category: "Motores 2T",
    image: motorF150,
    description: "Motor 2 tiempos de 150 HP para alto rendimiento.",
    features: ["2 Tiempos", "150 HP", "SST"],
    externalUrl: "https://imemsa.com.mx/",
  },
  {
    id: "m20",
    name: "Yamaha 85AE",
    category: "Motores 2T",
    image: motor85,
    description: "Motor 2 tiempos de 85 HP. Confiable y potente.",
    features: ["2 Tiempos", "85 HP", "Comercial"],
    externalUrl: "https://imemsa.com.mx/",
  },
  {
    id: "m21",
    name: "Yamaha E75BMHDY (SST)",
    category: "Motores 2T",
    image: motorF75,
    description: "Motor Enduro de 75 HP para trabajo pesado.",
    features: ["2 Tiempos", "75 HP", "Enduro"],
    externalUrl: "https://imemsa.com.mx/",
  },
  {
    id: "m22",
    name: "Yamaha E60HMHDL (SST)",
    category: "Motores 2T",
    image: motorF60,
    description: "Motor Enduro de 60 HP. Resistente y duradero.",
    features: ["2 Tiempos", "60 HP", "Enduro"],
    externalUrl: "https://imemsa.com.mx/",
  },
  {
    id: "m23",
    name: "Yamaha E40JMHL",
    category: "Motores 2T",
    image: motorF40,
    description: "Motor 2 tiempos de 40 HP económico.",
    features: ["2 Tiempos", "40 HP", "Económico"],
    externalUrl: "https://imemsa.com.mx/",
  },
  {
    id: "m24",
    name: "Yamaha E25 BMH",
    category: "Motores 2T",
    image: motorF25,
    description: "Motor Enduro de 25 HP para pesca comercial.",
    features: ["2 Tiempos", "25 HP", "Enduro"],
    externalUrl: "https://imemsa.com.mx/",
  },
  // LANCHAS IMEMSA
  {
    id: "l1",
    name: "IMEMSA W-267BA",
    category: "Lanchas",
    image: lanchaW267,
    description: "Lancha de fibra de vidrio de 26.7 pies. Diseño versátil para pesca y recreación.",
    features: ["26.7 pies", "Fibra de vidrio", "Consola central"],
    externalUrl: "https://imemsa.com.mx/",
  },
  {
    id: "l2",
    name: "IMEMSA R-18",
    category: "Lanchas",
    image: lanchaR18,
    description: "Lancha compacta de 18 pies. Ideal para pesca deportiva.",
    features: ["18 pies", "Fibra de vidrio", "Pesca"],
    externalUrl: "https://imemsa.com.mx/",
  },
  {
    id: "l3",
    name: "IMEMSA R-22",
    category: "Lanchas",
    image: lanchaR22,
    description: "Lancha de 22 pies con amplio espacio. Confortable y estable.",
    features: ["22 pies", "Fibra de vidrio", "Espaciosa"],
    externalUrl: "https://imemsa.com.mx/",
  },
  {
    id: "l4",
    name: "IMEMSA W-23M",
    category: "Lanchas",
    image: lanchaW23M,
    description: "Lancha de 23 pies con diseño moderno y elegante.",
    features: ["23 pies", "Diseño moderno", "Versátil"],
    externalUrl: "https://imemsa.com.mx/",
  },
  {
    id: "l5",
    name: "IMEMSA R-14",
    category: "Lanchas",
    image: lanchaR14,
    description: "Lancha pequeña de 14 pies. Perfecta para iniciantes.",
    features: ["14 pies", "Compacta", "Económica"],
    externalUrl: "https://imemsa.com.mx/",
  },
  {
    id: "l6",
    name: "IMEMSA W-16",
    category: "Lanchas",
    image: lanchaW16,
    description: "Lancha de 16 pies ideal para paseos y pesca ligera.",
    features: ["16 pies", "Recreativa", "Ligera"],
    externalUrl: "https://imemsa.com.mx/",
  },
  {
    id: "l7",
    name: "IMEMSA J-18",
    category: "Lanchas",
    image: lanchaJ18,
    description: "Lancha de 18 pies con interior amplio. Cómoda navegación.",
    features: ["18 pies", "Interior amplio", "Cómoda"],
    externalUrl: "https://imemsa.com.mx/",
  },
  {
    id: "l8",
    name: "IMEMSA W-22",
    category: "Lanchas",
    image: lanchaW22,
    description: "Lancha de 22 pies con diseño angular moderno.",
    features: ["22 pies", "Diseño angular", "Moderna"],
    externalUrl: "https://imemsa.com.mx/",
  },
  {
    id: "l9",
    name: "IMEMSA W-22BA",
    category: "Lanchas",
    image: lanchaW22,
    description: "Versión mejorada del W-22 con más accesorios.",
    features: ["22 pies", "Equipada", "Premium"],
    externalUrl: "https://imemsa.com.mx/",
  },
  {
    id: "l10",
    name: "IMEMSA C-23",
    category: "Lanchas",
    image: lanchaC23,
    description: "Lancha de pesca de 23 pies con consola central.",
    features: ["23 pies", "Consola central", "Pesca deportiva"],
    externalUrl: "https://imemsa.com.mx/",
  },
  {
    id: "l11",
    name: "IMEMSA W-23 II",
    category: "Lanchas",
    image: lanchaW23II,
    description: "Lancha deportiva de 23 pies con gráficos distintivos.",
    features: ["23 pies", "Deportiva", "Distintiva"],
    externalUrl: "https://imemsa.com.mx/",
  },
  {
    id: "l12",
    name: "IMEMSA W-23NT",
    category: "Lanchas",
    image: lanchaW23M,
    description: "Lancha de trabajo de 23 pies. Resistente y durable.",
    features: ["23 pies", "Trabajo pesado", "Resistente"],
    externalUrl: "https://imemsa.com.mx/",
  },
];

const categories = ["Todos", "Motores 4T", "Motores 2T", "Lanchas"];

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
            Explora nuestra selección completa de motores Yamaha y lanchas IMEMSA. Contáctanos por WhatsApp para cotizaciones.
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

        {/* Products Count */}
        <p className="text-center text-muted-foreground mb-8">
          Mostrando {filteredProducts.length} productos
        </p>

        {/* Products Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
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
