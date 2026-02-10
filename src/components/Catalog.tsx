import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { MessageCircle, ChevronLeft, ChevronRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import AnimatedSection, { StaggerContainer, StaggerItem } from "./AnimatedSection";

interface Product {
  id: string;
  name: string;
  description: string;
  features: string[];
  images: string[]; // Array of image URLs - empty for now
}

interface ProductLine {
  id: string;
  title: string;
  subtitle: string;
  products: Product[];
  placeholderImage: string; // placeholder until real images are added
}

const productLines: ProductLine[] = [
  {
    id: "productiva",
    title: "Linea Productiva",
    subtitle: "Motores fuera de borda, Lanchas, Hieleras",
    placeholderImage: "",
    products: [
      {
        id: "p1",
        name: "Motor Yamaha F300",
        description: "Motor fuera de borda V6 de 4 tiempos, maxima potencia para embarcaciones grandes.",
        features: ["4 Tiempos", "300 HP", "V6"],
        images: [],
      },
      {
        id: "p2",
        name: "Motor Yamaha F250",
        description: "Potente motor V6 de 250 HP. Ideal para embarcaciones de alto rendimiento.",
        features: ["4 Tiempos", "250 HP", "V6"],
        images: [],
      },
      {
        id: "p3",
        name: "Motor Yamaha F200",
        description: "Motor de 200 HP con control digital. Eficiencia y potencia.",
        features: ["4 Tiempos", "200 HP", "Control Digital"],
        images: [],
      },
      {
        id: "p4",
        name: "Motor Yamaha F150",
        description: "Motor versatil de 150 HP. Excelente relacion potencia-peso.",
        features: ["4 Tiempos", "150 HP", "Inyeccion"],
        images: [],
      },
      {
        id: "p5",
        name: "Motor Yamaha F115",
        description: "Motor eficiente de 115 HP. Diseno compacto y potente.",
        features: ["4 Tiempos", "115 HP", "Compacto"],
        images: [],
      },
      {
        id: "p6",
        name: "Lancha IMEMSA W-267BA",
        description: "Lancha de fibra de vidrio de 26.7 pies. Diseno versatil para pesca y recreacion.",
        features: ["26.7 pies", "Fibra de vidrio", "Consola central"],
        images: [],
      },
      {
        id: "p7",
        name: "Lancha IMEMSA R-22",
        description: "Lancha de 22 pies con amplio espacio. Confortable y estable.",
        features: ["22 pies", "Fibra de vidrio", "Espaciosa"],
        images: [],
      },
      {
        id: "p8",
        name: "Hielera Marina Premium",
        description: "Hielera de alta capacidad para uso marino. Mantiene temperatura por 5 dias.",
        features: ["Alta capacidad", "5 dias", "Uso marino"],
        images: [],
      },
    ],
  },
  {
    id: "deportiva",
    title: "Linea Deportiva",
    subtitle: "Lanchas Deportivas, Seascooters, Acuamotos, Remolques",
    placeholderImage: "",
    products: [
      {
        id: "d1",
        name: "Lancha Deportiva IMEMSA W-23M",
        description: "Lancha de 23 pies con diseno moderno y elegante para deportes acuaticos.",
        features: ["23 pies", "Deportiva", "Moderna"],
        images: [],
      },
      {
        id: "d2",
        name: "Lancha IMEMSA W-23 II",
        description: "Lancha deportiva de 23 pies con graficos distintivos.",
        features: ["23 pies", "Deportiva", "Distintiva"],
        images: [],
      },
      {
        id: "d3",
        name: "Seascooter Yamaha",
        description: "Vehiculo submarino personal para exploracion acuatica.",
        features: ["Electrico", "Portatil", "Recreativo"],
        images: [],
      },
      {
        id: "d4",
        name: "Acuamoto Yamaha WaveRunner",
        description: "Moto acuatica de alto rendimiento para maxima diversion.",
        features: ["Alto rendimiento", "Deportiva", "Yamaha"],
        images: [],
      },
      {
        id: "d5",
        name: "Remolque para Lancha",
        description: "Remolque galvanizado para transporte seguro de embarcaciones.",
        features: ["Galvanizado", "Resistente", "Universal"],
        images: [],
      },
    ],
  },
  {
    id: "fuerza",
    title: "Linea de Fuerza",
    subtitle: "Bombas de agua, Motores multiusos, Generadores",
    placeholderImage: "",
    products: [
      {
        id: "f1",
        name: "Bomba de Agua Yamaha",
        description: "Bomba de agua de alta presion para uso industrial y agricola.",
        features: ["Alta presion", "Industrial", "Yamaha"],
        images: [],
      },
      {
        id: "f2",
        name: "Motor Multiusos Yamaha MX800",
        description: "Motor multiproposito para diversas aplicaciones industriales.",
        features: ["Multiusos", "Potente", "Confiable"],
        images: [],
      },
      {
        id: "f3",
        name: "Generador Yamaha EF2000iS",
        description: "Generador inverter portatil silencioso para uso residencial.",
        features: ["Inverter", "Silencioso", "Portatil"],
        images: [],
      },
    ],
  },
  {
    id: "lubricantes",
    title: "Linea de Lubricantes",
    subtitle: "Aceites YAMALUBE YAMAHA",
    placeholderImage: "",
    products: [
      {
        id: "lu1",
        name: "Yamalube 4T",
        description: "Aceite premium para motores de 4 tiempos marinos Yamaha.",
        features: ["4 Tiempos", "Premium", "Marino"],
        images: [],
      },
      {
        id: "lu2",
        name: "Yamalube 2T",
        description: "Aceite para motores de 2 tiempos con formula de baja emision.",
        features: ["2 Tiempos", "Baja emision", "Proteccion"],
        images: [],
      },
      {
        id: "lu3",
        name: "Yamalube Gear Oil",
        description: "Aceite para cajas de cambios y transmisiones marinas.",
        features: ["Transmision", "Proteccion", "Durabilidad"],
        images: [],
      },
    ],
  },
];

const Catalog = () => {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handleWhatsApp = (productName: string) => {
    const message = encodeURIComponent(
      `Hola, me interesa obtener informacion y cotizacion del producto: ${productName}. Podrian ayudarme?`
    );
    window.open(`https://wa.me/529843175479?text=${message}`, "_blank");
  };

  const openProductDetail = (product: Product) => {
    setSelectedProduct(product);
    setCurrentImageIndex(0);
  };

  return (
    <section id="catalogo" className="py-24 bg-background">
      <div className="container mx-auto px-4">
        {/* Header */}
        <AnimatedSection className="text-center mb-16">
          <span className="text-secondary font-semibold uppercase tracking-wider text-sm">
            Nuestros Productos
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mt-2 mb-4">
            Catalogo de <span className="text-primary">Productos</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Explora nuestra seleccion completa de productos. Contactanos por WhatsApp para cotizaciones.
          </p>
        </AnimatedSection>

        {/* Product Lines Grid */}
        <StaggerContainer className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {productLines.map((line) => (
            <div key={line.id} className="group">
              {/* Line Title */}
              <div className="border-b-2 border-primary pb-3 mb-4">
                <h3 className="font-display text-lg font-bold text-primary uppercase tracking-wide">
                  {line.title}
                </h3>
              </div>

              {/* Subcategories list */}
              <ul className="space-y-2 mb-6">
                {line.subtitle.split(", ").map((item, i) => (
                  <li key={i} className="text-foreground text-sm">
                    {item}
                  </li>
                ))}
              </ul>

              {/* Placeholder image area */}
              <div className="aspect-square bg-muted rounded-lg flex items-center justify-center border-2 border-dashed border-border mb-6">
                <span className="text-muted-foreground text-sm text-center px-4">
                  Imagen de linea
                </span>
              </div>

              {/* Products list */}
              <div className="space-y-3">
                {line.products.map((product) => (
                  <button
                    key={product.id}
                    onClick={() => openProductDetail(product)}
                    className="w-full text-left p-3 rounded-lg border border-border hover:border-primary/50 hover:bg-accent/50 transition-all duration-200 group/item"
                  >
                    <h4 className="text-sm font-semibold text-foreground group-hover/item:text-primary transition-colors">
                      {product.name}
                    </h4>
                    <p className="text-xs text-muted-foreground mt-1 line-clamp-1">
                      {product.description}
                    </p>
                  </button>
                ))}
              </div>
            </div>
          ))}
        </StaggerContainer>

        {/* CTA */}
        <div className="text-center mt-16">
          <p className="text-muted-foreground mb-4">
            No encuentras lo que buscas? Contactanos para productos personalizados.
          </p>
          <Button
            size="lg"
            onClick={() => document.getElementById("contacto")?.scrollIntoView({ behavior: "smooth" })}
            className="bg-secondary hover:bg-secondary/90 text-secondary-foreground"
          >
            Solicitar Cotizacion Especial
          </Button>
        </div>
      </div>

      {/* Product Detail Modal */}
      <Dialog open={!!selectedProduct} onOpenChange={() => setSelectedProduct(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="font-display text-2xl text-foreground">
              {selectedProduct?.name}
            </DialogTitle>
          </DialogHeader>

          {selectedProduct && (
            <div className="space-y-6">
              {/* Image gallery */}
              <div className="relative aspect-[4/3] bg-muted rounded-lg overflow-hidden flex items-center justify-center border border-border">
                {selectedProduct.images.length > 0 ? (
                  <>
                    <img
                      src={selectedProduct.images[currentImageIndex]}
                      alt={selectedProduct.name}
                      className="w-full h-full object-cover"
                    />
                    {selectedProduct.images.length > 1 && (
                      <>
                        <button
                          onClick={() => setCurrentImageIndex((prev) => (prev - 1 + selectedProduct.images.length) % selectedProduct.images.length)}
                          className="absolute left-2 top-1/2 -translate-y-1/2 bg-background/80 rounded-full p-2 hover:bg-background"
                        >
                          <ChevronLeft className="w-5 h-5" />
                        </button>
                        <button
                          onClick={() => setCurrentImageIndex((prev) => (prev + 1) % selectedProduct.images.length)}
                          className="absolute right-2 top-1/2 -translate-y-1/2 bg-background/80 rounded-full p-2 hover:bg-background"
                        >
                          <ChevronRight className="w-5 h-5" />
                        </button>
                      </>
                    )}
                  </>
                ) : (
                  <span className="text-muted-foreground">Imagen del producto</span>
                )}
              </div>

              {/* Thumbnail row */}
              {selectedProduct.images.length > 1 && (
                <div className="flex gap-2 overflow-x-auto">
                  {selectedProduct.images.map((img, i) => (
                    <button
                      key={i}
                      onClick={() => setCurrentImageIndex(i)}
                      className={`w-16 h-16 rounded-md overflow-hidden border-2 flex-shrink-0 ${
                        i === currentImageIndex ? "border-primary" : "border-border"
                      }`}
                    >
                      <img src={img} alt="" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}

              {/* Info */}
              <p className="text-muted-foreground leading-relaxed">{selectedProduct.description}</p>

              {/* Features */}
              <div className="flex flex-wrap gap-2">
                {selectedProduct.features.map((feature, i) => (
                  <Badge key={i} variant="secondary" className="bg-accent text-accent-foreground">
                    {feature}
                  </Badge>
                ))}
              </div>

              {/* WhatsApp CTA */}
              <Button
                onClick={() => handleWhatsApp(selectedProduct.name)}
                className="w-full bg-[#25D366] hover:bg-[#20BD5A] text-white gap-2"
                size="lg"
              >
                <MessageCircle className="w-5 h-5" />
                Solicitar Cotizacion por WhatsApp
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default Catalog;
