import { useLocation } from 'react-router-dom';
import { useState } from 'react';
import { Menu, X } from 'lucide-react'; // icônes menu et fermeture
import logo from '../assets/logo.png';
import { Link } from 'react-router-dom';

const Header = () => {
  const location = useLocation();
  const isHomePage = location.pathname === '/';
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="bg-[#284411] text-light border-b-[1px] border-accent py-2 relative z-50">
      <div className="container mx-auto px-4 flex justify-between items-center">
        
       {/* Logo cliquable */}
  <Link to="/">
    <img src={logo} alt="Logo" className="h-15" />
  </Link>

        {/* Menu hamburger (mobile) */}
        {isHomePage && (
          <div className="md:hidden">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="text-white"
              aria-label="Ouvrir le menu"
            >
              {menuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        )}

        {/* Liens visibles en desktop */}
        {isHomePage && (
          <div className="hidden md:flex items-center space-x-4">
            <a href="/login" className="text-white font-semibold">
              SE CONNECTER
            </a>
            <a
              href="/register"
              className="bg-white text-primary font-semibold px-4 py-2 rounded-md shadow hover:bg-[#FFFFFFCF]"
            >
              CRÉER UN COMPTE
            </a>
          </div>
        )}
      </div>

      {/* Menu mobile (visible quand ouvert) */}
      {menuOpen && (
        <div className="md:hidden bg-[#284411] px-6 pb-4 flex flex-col gap-3">
          <a
            href="/login"
            className="text-white font-semibold border-b border-white pb-2"
            onClick={() => setMenuOpen(false)}
          >
            SE CONNECTER
          </a>
          <a
            href="/register"
            className="text-[#284411] bg-white font-semibold px-4 py-2 rounded-md text-center shadow"
            onClick={() => setMenuOpen(false)}
          >
            CRÉER UN COMPTE
          </a>
        </div>
      )}
    </header>
  );
};

export default Header;
