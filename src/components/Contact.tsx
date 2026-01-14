import { useState } from "react";
import { Send, Phone, Mail, MapPin, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

const Contact = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    product: "",
    message: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Construir mensaje para WhatsApp
    const whatsappMessage = encodeURIComponent(
      `*Nueva Consulta - Aqua Servi*\n\n` +
      `*Nombre:* ${formData.name}\n` +
      `*Email:* ${formData.email}\n` +
      `*Teléfono:* ${formData.phone}\n` +
      `*Producto de interés:* ${formData.product}\n` +
      `*Mensaje:* ${formData.message}`
    );
    
    // Abrir WhatsApp con el mensaje
    window.open(`https://wa.me/5215512345678?text=${whatsappMessage}`, "_blank");
    
    toast({
      title: "¡Mensaje preparado!",
      description: "Te redirigimos a WhatsApp para enviar tu consulta.",
    });
    
    // Limpiar formulario
    setFormData({ name: "", email: "", phone: "", product: "", message: "" });
  };

  const handleDirectWhatsApp = () => {
    window.open("https://wa.me/5215512345678?text=Hola,%20me%20gustaría%20recibir%20información%20sobre%20sus%20productos", "_blank");
  };

  return (
    <section id="contacto" className="py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-16">
          {/* Contact Info */}
          <div>
            <span className="text-secondary font-semibold uppercase tracking-wider text-sm">
              Contáctanos
            </span>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mt-2 mb-6">
              ¿Listo para <span className="text-primary">Navegar?</span>
            </h2>
            <p className="text-muted-foreground text-lg mb-10 leading-relaxed">
              Estamos aquí para ayudarte a encontrar el equipo perfecto. Contáctanos y un asesor 
              especializado te atenderá de inmediato.
            </p>

            {/* Contact Cards */}
            <div className="space-y-6 mb-10">
              <div className="flex items-start gap-4 p-5 rounded-xl bg-card border border-border">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Phone className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">Teléfono</h3>
                  <p className="text-muted-foreground">+52 55 1234 5678</p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-5 rounded-xl bg-card border border-border">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Mail className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">Email</h3>
                  <p className="text-muted-foreground">contacto@aquaservi.com</p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-5 rounded-xl bg-card border border-border">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">Ubicación</h3>
                  <p className="text-muted-foreground">Ciudad de México, México</p>
                </div>
              </div>
            </div>

            {/* WhatsApp Button */}
            <Button
              onClick={handleDirectWhatsApp}
              size="lg"
              className="w-full sm:w-auto bg-[#25D366] hover:bg-[#20BD5A] text-primary-foreground gap-3 whatsapp-pulse"
            >
              <MessageCircle className="w-5 h-5" />
              Escríbenos por WhatsApp
            </Button>
          </div>

          {/* Contact Form */}
          <div className="bg-card rounded-2xl p-8 border border-border shadow-xl">
            <h3 className="font-display text-2xl font-semibold text-foreground mb-6">
              Envía tu Consulta
            </h3>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">
                    Nombre Completo *
                  </label>
                  <Input
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Tu nombre"
                    required
                    className="bg-background"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">
                    Teléfono *
                  </label>
                  <Input
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+52 55 1234 5678"
                    required
                    className="bg-background"
                  />
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">
                  Email *
                </label>
                <Input
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="tu@email.com"
                  required
                  className="bg-background"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">
                  Producto de Interés
                </label>
                <Input
                  name="product"
                  value={formData.product}
                  onChange={handleChange}
                  placeholder="Ej: Motor Yamaha 115 HP"
                  className="bg-background"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">
                  Mensaje *
                </label>
                <Textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Cuéntanos qué necesitas..."
                  rows={4}
                  required
                  className="bg-background resize-none"
                />
              </div>

              <Button
                type="submit"
                size="lg"
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground gap-2"
              >
                <Send className="w-4 h-4" />
                Enviar por WhatsApp
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
