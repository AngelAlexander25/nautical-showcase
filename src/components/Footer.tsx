import { Anchor, Facebook, Instagram, Youtube, Mail, Phone } from "lucide-react";
import logo from "@/assets/logo.png";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-navy text-primary-foreground">
      <div className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <img src={logo} alt="Aqua Servi" className="h-16 mb-6 brightness-0 invert" />
            <p className="text-primary-foreground/70 mb-6 max-w-md leading-relaxed">
              Con más de 30 años de experiencia, somos tu aliado confiable en el mundo náutico. 
              Ofrecemos productos de calidad y servicio excepcional.
            </p>
            <div className="flex gap-4">
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-primary-foreground/10 flex items-center justify-center hover:bg-secondary transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-primary-foreground/10 flex items-center justify-center hover:bg-secondary transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-primary-foreground/10 flex items-center justify-center hover:bg-secondary transition-colors"
                aria-label="Youtube"
              >
                <Youtube className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-display font-semibold text-lg mb-6">Enlaces Rápidos</h3>
            <ul className="space-y-3">
              {["Inicio", "Nosotros", "Catálogo", "Servicios", "Contacto"].map((item) => (
                <li key={item}>
                  <a
                    href={`#${item.toLowerCase()}`}
                    className="text-primary-foreground/70 hover:text-secondary transition-colors"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-display font-semibold text-lg mb-6">Contacto</h3>
            <ul className="space-y-4">
              <li className="flex items-center gap-3 text-primary-foreground/70">
                <Phone className="w-4 h-4 text-secondary" />
                <span>+52 55 1234 5678</span>
              </li>
              <li className="flex items-center gap-3 text-primary-foreground/70">
                <Mail className="w-4 h-4 text-secondary" />
                <span>contacto@aquaservi.com</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-primary-foreground/10">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-primary-foreground/60 text-sm text-center md:text-left">
              © {currentYear} Aqua Servi. Todos los derechos reservados.
            </p>
            <p className="text-primary-foreground/60 text-sm flex items-center gap-2">
              <Anchor className="w-4 h-4 text-secondary" />
              Respaldo • Servicio • Calidad
            </p>
          </div>
          
          {/* Credits */}
          <div className="mt-6 pt-4 border-t border-primary-foreground/10 text-center">
            <p className="text-primary-foreground/50 text-xs">
              🎨 Portafolio diseñado y desarrollado por <span className="text-secondary font-medium">Oswa</span>
            </p>
            <p className="text-primary-foreground/40 text-xs mt-1">
              * Este es un proyecto ficticio creado con fines demostrativos para portafolio.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
