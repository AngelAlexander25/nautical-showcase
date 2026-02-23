import { useState, useEffect } from "react";
import { Menu, X, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLocation, useNavigate } from "react-router-dom";
import logo from "@/assets/logo.png";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const isHome = location.pathname === "/";

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { href: "#inicio", label: "Inicio", path: "/" },
    { href: "#nosotros", label: "Nosotros", path: "/#nosotros" },
    { href: "/catalogo", label: "Catalogo", path: "/catalogo" },
    { href: "#servicios", label: "Servicios", path: "/#servicios" },
    { href: "#contacto", label: "Contacto", path: "/#contacto" },
  ];

  const handleNav = (link: typeof navLinks[0]) => {
    setIsMenuOpen(false);
    if (link.path.startsWith("/#")) {
      if (!isHome) {
        navigate("/");
        setTimeout(() => {
          document.getElementById(link.href.replace("#", ""))?.scrollIntoView({ behavior: "smooth" });
        }, 100);
      } else {
        document.getElementById(link.href.replace("#", ""))?.scrollIntoView({ behavior: "smooth" });
      }
    } else if (link.path === "/") {
      navigate("/");
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      navigate(link.path);
    }
  };

  const handleWhatsApp = () => {
    window.open("https://wa.me/529843175479?text=Hola,%20me%20interesa%20informacion%20sobre%20sus%20productos", "_blank");
  };

  const transparent = isHome && !isScrolled;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        transparent
          ? "bg-transparent"
          : "bg-background/95 backdrop-blur-md border-b border-border/50 shadow-sm"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          <button onClick={() => { navigate("/"); window.scrollTo({ top: 0, behavior: "smooth" }); }} className="flex items-center gap-3">
            <img
              src={logo}
              alt="Aqua Servi Logo"
              className="h-14 w-auto transition-all duration-300"
            />
          </button>

          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <button
                key={link.label}
                onClick={() => handleNav(link)}
                className={`font-medium transition-colors duration-200 text-sm uppercase tracking-wide ${
                  transparent
                    ? "text-white/85 hover:text-white"
                    : "text-foreground/80 hover:text-primary"
                }`}
              >
                {link.label}
              </button>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-4">
            <Button
              onClick={handleWhatsApp}
              className="bg-primary hover:bg-primary/90 text-primary-foreground gap-2"
            >
              <MessageCircle className="w-4 h-4" />
              Contactanos
            </Button>
          </div>

          <button
            className={`md:hidden p-2 ${transparent ? "text-white" : "text-foreground"}`}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {isMenuOpen && (
          <nav className={`md:hidden py-4 border-t ${transparent ? "border-white/20" : "border-border/50"}`}>
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <button
                  key={link.label}
                  onClick={() => handleNav(link)}
                  className={`text-left font-medium transition-colors duration-200 py-2 ${
                    transparent ? "text-white/85 hover:text-white" : "text-foreground/80 hover:text-primary"
                  }`}
                >
                  {link.label}
                </button>
              ))}
              <Button onClick={handleWhatsApp} className="bg-primary hover:bg-primary/90 text-primary-foreground gap-2 mt-2">
                <MessageCircle className="w-4 h-4" />
                Contactanos
              </Button>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
