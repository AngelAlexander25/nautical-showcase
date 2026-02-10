import { useState } from "react";
import { Send, Phone, MapPin, MessageCircle, Clock, Facebook } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

const Contact = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    service: "",
    message: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const whatsappMessage = encodeURIComponent(
      `*Solicitud de Cita - Aqua Servi*\n\n` +
      `*Nombre:* ${formData.name}\n` +
      `*Telefono:* ${formData.phone}\n` +
      `*Servicio:* ${formData.service}\n` +
      `*Mensaje:* ${formData.message}`
    );
    
    window.open(`https://wa.me/529843175479?text=${whatsappMessage}`, "_blank");
    
    toast({
      title: "Mensaje preparado",
      description: "Te redirigimos a WhatsApp para agendar tu cita.",
    });
    
    setFormData({ name: "", phone: "", service: "", message: "" });
  };

  const handleDirectWhatsApp = () => {
    window.open("https://wa.me/529843175479?text=Hola,%20me%20gustaria%20recibir%20informacion%20sobre%20sus%20productos", "_blank");
  };

  return (
    <section id="contacto" className="py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-16">
          {/* Contact Info */}
          <div>
            <span className="text-secondary font-semibold uppercase tracking-wider text-sm">
              Contactanos
            </span>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mt-2 mb-6">
              Listo para <span className="text-primary">Navegar?</span>
            </h2>
            <p className="text-muted-foreground text-lg mb-10 leading-relaxed">
              Estamos aqui para ayudarte a encontrar el equipo perfecto. Contactanos y un asesor 
              especializado te atendera de inmediato.
            </p>

            {/* Contact Cards */}
            <div className="space-y-6 mb-10">
              <div className="flex items-start gap-4 p-5 rounded-xl bg-card border border-border">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Phone className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">Telefono</h3>
                  <p className="text-muted-foreground">(998) 880 0590</p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-5 rounded-xl bg-card border border-border">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <MessageCircle className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">WhatsApp</h3>
                  <p className="text-muted-foreground">(984) 317 5479</p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-5 rounded-xl bg-card border border-border">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Clock className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">Horario</h3>
                  <p className="text-muted-foreground">Lunes a Viernes: 8:00 AM - 5:00 PM</p>
                  <p className="text-muted-foreground">Sabados: 8:00 AM - 2:00 PM</p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-5 rounded-xl bg-card border border-border">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Facebook className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">Facebook</h3>
                  <a
                    href="https://www.facebook.com/share/1Dks3dEU5K/?mibextid=wwXIfr"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline"
                  >
                    Visitanos en Facebook
                  </a>
                </div>
              </div>
            </div>

            {/* WhatsApp Button */}
            <Button
              onClick={handleDirectWhatsApp}
              size="lg"
              className="w-full sm:w-auto bg-[#25D366] hover:bg-[#20BD5A] text-white gap-3 whatsapp-pulse"
            >
              <MessageCircle className="w-5 h-5" />
              Escribenos por WhatsApp
            </Button>
          </div>

          {/* Contact Form - Agenda cita */}
          <div className="bg-card rounded-2xl p-8 border border-border shadow-xl">
            <h3 className="font-display text-2xl font-semibold text-foreground mb-6">
              Agenda tu Cita
            </h3>
            <form onSubmit={handleSubmit} className="space-y-5">
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
                  Telefono *
                </label>
                <Input
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="(998) 123 4567"
                  required
                  className="bg-background"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">
                  Servicio de Interes
                </label>
                <Input
                  name="service"
                  value={formData.service}
                  onChange={handleChange}
                  placeholder="Ej: Mantenimiento de motor, Cotizacion de lancha"
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
                  placeholder="Cuentanos que necesitas..."
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
                Agendar Cita por WhatsApp
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
