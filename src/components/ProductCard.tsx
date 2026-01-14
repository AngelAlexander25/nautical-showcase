import { MessageCircle, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface ProductCardProps {
  id: string;
  name: string;
  category: string;
  image: string;
  description: string;
  features?: string[];
  externalUrl?: string;
}

const ProductCard = ({ id, name, category, image, description, features, externalUrl }: ProductCardProps) => {
  const handleWhatsApp = () => {
    const message = encodeURIComponent(
      `Hola, me interesa obtener información sobre el producto: ${name}. ¿Podrían ayudarme?`
    );
    window.open(`https://wa.me/5215512345678?text=${message}`, "_blank");
  };

  return (
    <Card className="group overflow-hidden border-border hover:border-primary/30 transition-all duration-300 hover:shadow-xl bg-card">
      {/* Image */}
      <div className="relative overflow-hidden aspect-[4/3]">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <Badge className="absolute top-4 left-4 bg-secondary text-secondary-foreground">
          {category}
        </Badge>
      </div>

      <CardContent className="p-6">
        <h3 className="font-display text-xl font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
          {name}
        </h3>
        <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
          {description}
        </p>
        {features && features.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {features.slice(0, 3).map((feature, index) => (
              <span
                key={index}
                className="text-xs bg-muted text-muted-foreground px-2 py-1 rounded-md"
              >
                {feature}
              </span>
            ))}
          </div>
        )}
      </CardContent>

      <CardFooter className="p-6 pt-0 flex gap-3">
        <Button
          onClick={handleWhatsApp}
          className="flex-1 bg-[#25D366] hover:bg-[#20BD5A] text-primary-foreground gap-2"
        >
          <MessageCircle className="w-4 h-4" />
          Consultar
        </Button>
        {externalUrl && (
          <Button
            variant="outline"
            size="icon"
            onClick={() => window.open(externalUrl, "_blank")}
            className="border-border hover:border-primary hover:text-primary"
          >
            <ExternalLink className="w-4 h-4" />
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
