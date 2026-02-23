import { Anchor, Facebook, Phone, MessageCircle, Clock } from "lucide-react";
import { useNavigate } from "react-router-dom";
import logo from "@/assets/logo.png";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const navigate = useNavigate();

  const handleNav = (path: string, hash?: string) => {
    if (hash) {
      navigate("/");
      setTimeout(() => {
        document.getElementById(hash)?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    } else {
      navigate(path);
    }
  };

  return (
    <footer className="bg-primary text-primary-foreground">
      {/* Main footer */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-3 gap-12">
          {/* Brand */}
          <div>
            <img src={logo} alt="Aqua Servi" className="h-14 mb-6" />
            <p className="text-primary-foreground/70 text-sm leading-relaxed max-w-sm">
              Con mas de 30 años de experiencia, somos tu aliado confiable en el mundo nautico.
              Productos de calidad y servicio excepcional.
            </p>
            <div className="flex gap-3 mt-6">
              <a
                href="https://www.facebook.com/share/1Dks3dEU5K/?mibextid=wwXIfr"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-primary-foreground/10 flex items-center justify-center hover:bg-secondary transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Links */}
          <div>
            <h3 className="font-display font-semibold text-lg mb-6">Navegacion</h3>
            <ul className="space-y-3">
              {[
                { label: "Inicio", path: "/", hash: "inicio" },
                { label: "Nosotros", path: "/", hash: "nosotros" },
                { label: "Catalogo", path: "/catalogo" },
                { label: "Servicios", path: "/", hash: "servicios" },
                { label: "Contacto", path: "/", hash: "contacto" },
              ].map((item) => (
                <li key={item.label}>
                  <button
                    onClick={() => handleNav(item.path, item.hash)}
                    className="text-primary-foreground/70 hover:text-secondary transition-colors text-sm"
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-display font-semibold text-lg mb-6">Contacto</h3>
            <ul className="space-y-4 text-sm">
              <li className="flex items-center gap-3 text-primary-foreground/70">
                <Phone className="w-4 h-4 text-secondary flex-shrink-0" />
                <span>(998) 880 0590</span>
              </li>
              <li className="flex items-center gap-3 text-primary-foreground/70">
                <MessageCircle className="w-4 h-4 text-secondary flex-shrink-0" />
                <span>(984) 317 5479</span>
              </li>
              <li className="flex items-start gap-3 text-primary-foreground/70">
                <Clock className="w-4 h-4 text-secondary mt-0.5 flex-shrink-0" />
                <div>
                  <p>Lun - Vie: 8:00 AM - 5:00 PM</p>
                  <p>Sab: 8:00 AM - 2:00 PM</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="border-t border-primary-foreground/10">
        <div className="container mx-auto px-4 py-5 flex flex-col md:flex-row justify-between items-center gap-3">
          <p className="text-primary-foreground/50 text-xs">
            {currentYear} Aqua Servi. Todos los derechos reservados.
          </p>
          <p className="text-primary-foreground/50 text-xs flex items-center gap-2">
            <Anchor className="w-3 h-3 text-secondary" />
            Respaldo - Servicio - Calidad
          </p>
          <p className="text-primary-foreground/30 text-[10px] tracking-wide uppercase">
            Página creada por Angelbh
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
