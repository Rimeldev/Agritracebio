import ananasImg from '../assets/ananas.png';
import instiImg from '../assets/insti.png';
import unstimImg from '../assets/unstim.png';
import Header from '../components/Header';
import '../index.css';
import { MapPin, Phone } from "lucide-react";


export default function Home() {
  return (
    <>
      <Header />

      <div className="min-h-screen">
        {/* SECTION HERO */}
        <div className="min-h-screen bg-gradient-to-br from-white to-yellow-200 flex items-center justify-center px-4 py-10">
  <div className="max-w-6xl w-full flex flex-col md:flex-row items-center md:items-start gap-10">
    
    {/* Image Ananas */}
    <div className="flex justify-center md:justify-start w-full md:w-1/2">
      <img
        src={ananasImg}
        alt="Ananas"
        className="w-500 md:w-500 object-contain animate-ondulation"
      />
    </div>

    {/* Texte d'accueil */}
    <div className="w-full md:w-1/2 text-center md:text-left">
      <h1 className="text-3xl md:text-5xl font-bold text-primary mb-4">
        Bienvenue sur <span className="text-green-900">AgriTraceBio</span>
      </h1>
      <p className="text-green-900 text-lg md:text-2xl leading-relaxed">
        Suivez l’origine de votre ananas<br className="hidden md:block" />
        en un simple scan.
      </p>
    </div>
  </div>
</div>

        {/* SECTION VIDÉO */}
        <div className="mt-20">
          <div className="text-center mt-16 pb-20 px-4">
            <h2 className="text-xl font-bold mb-2">COMMENT SCANNER VOTRE ANANAS</h2>
            <div className="w-60 h-1 bg-green-600 mx-auto mt-3" />
            <div className="w-24 h-1 bg-primary mx-auto mb-10" />
          <div className="flex justify-center">
            <iframe
              className="w-full max-w-md sm:max-w-lg md:max-w-2xl rounded-lg shadow-lg aspect-video"
              src="https://www.youtube.com/embed/ZiBszp0uGk8"
              title="Tutoriel vidéo"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>

          </div>
        </div>
      </div>

      {/* FOOTER */}
      <footer className="bg-[#356F05FF] text-white py-10 px-6 md:px-20">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10">
          
          {/* Colonne 1 : Logos + description */}
          <div>
            <div className="flex items-center space-x-3 mb-4">
              <img src={unstimImg} alt="Logo 1" className="h-12 bg-white" />
              <img src={instiImg} alt="Logo 2" className="h-12 bg-white" />
            </div>
            <p className="text-sm leading-relaxed">
              AgriTraceBio vise à repositionner l’ananas béninois sur les marchés
              internationaux en garantissant la traçabilité des pratiques culturales
              et la transparence de la chaîne logistique.
            </p>
          </div>

          {/* Colonne 2 : Liens utiles */}
          <div>
            <h3 className="font-bold uppercase mb-3">Liens utiles</h3>
            <ul className="text-sm space-y-2">
              <li>
                <a href="#" className="hover:underline">
                  Université nationale des sciences, technologies, ingénierie et mathématiques
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Institut National Supérieur De Technologie Industrielle de Lokossa
                </a>
              </li>
            </ul>
          </div>

          {/* Colonne 3 : Ressources */}
          <div>
            <h3 className="font-bold uppercase mb-3">Ressources</h3>
            <ul className="text-sm space-y-2">
              <li><a href="#" className="hover:underline">Questions fréquentes (FAQ)</a></li>
              <li><a href="#" className="hover:underline">Indicateurs clés</a></li>
              <li><a href="#" className="hover:underline">Success stories</a></li>
            </ul>
          </div>

          {/* Colonne 4 : Coordonnées */}
          <div>
            <h3 className="font-bold uppercase mb-3">Coordonnées</h3>
            <ul className="text-sm space-y-3">
              <li className="flex items-center space-x-2">
                <MapPin className="h-4 w-4" />
                <span>BP 393 Lokossa</span>
              </li>
              <li className="flex items-center space-x-2">
                <Phone className="h-4 w-4" />
                <a href="tel:+2290122330662" className="hover:underline">+229 012 233 0662</a>
              </li>
            </ul>
          </div>

        </div>
      </footer>
    </>
  );
}
