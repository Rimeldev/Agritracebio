import { useState } from "react";
import { Link } from "react-router-dom";

import logo2Img from "../assets/4.png";
import appleImg from "../assets/apple.png";
import googleImg from "../assets/google.png";
import Header from "../components/Header";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { registerUser } from "../services/authService";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";




export default function Register() {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    nom: "",
    prenom: "",
    adresse: "",
    telephone: "",
    type_utilisateur: "",
    email: "",
    password: "",
    confirmPassword: "",
    acceptTerms: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handlePhoneChange = (value) => {
    setFormData((prev) => ({
      ...prev,
      telephone: `+${value}`,
    }));
  };

const navigate = useNavigate(); // pour la redirection

 const handleSubmit = async (e) => {
  e.preventDefault();

  if (!formData.acceptTerms) {
    toast.error("Veuillez accepter les conditions.");
    return;
  }

  if (formData.password !== formData.confirmPassword) {
    toast.error("Les mots de passe ne correspondent pas.");
    return;
  }

  const payload = {
    nom: formData.nom,
    prenom: formData.prenom,
    email: formData.email,
    password: formData.password,
    type_utilisateur: formData.type_utilisateur,
    telephone: formData.telephone,
    adresse: formData.adresse,
  };

  setLoading(true); // Démarre le chargement

  try {
    const response = await registerUser(payload);
    toast.success(response.message || "Inscription réussie !");
    navigate("/VerificationPage", { state: { email: formData.email } });
  } catch (error) {
    toast.error(error?.response?.data?.message || "Erreur lors de l’inscription.");
  } finally {
    setLoading(false); // Arrête le chargement
  }
};



  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />

      <main className="flex-grow flex items-center justify-center px-4 pb-30">
        <div className="bg-white p-6 rounded-xl shadow-md w-full max-w-2xl mt-8">
           {/* Logo */}
          <div className="flex flex-col items-center mb-6">
            <div className="flex items-center space-x-2 h-20">
              <img
                src={logo2Img}
                alt="logo2"
                className="w-50 h-50 object-contain"
              />
            </div>
            <h2 className="text-2xl font-semibold text-green-800 mt-2">
              Créer un compte
            </h2>
          </div>

          <div className="space-y-3 mb-6">
            <button className="w-full flex items-center justify-center gap-2 bg-white border border-gray-300 text-gray-800 py-2 rounded-lg hover:bg-gray-100 transition">
              <img src={googleImg} alt="Google" className="w-5 h-5" />
              S’inscrire avec Google
            </button>
            <button className="w-full flex items-center justify-center gap-2 bg-black text-white py-2 rounded-lg hover:opacity-90 transition">
              <img src={appleImg} alt="Apple" className="w-5 h-5" />
              S’inscrire avec Apple
            </button>
          </div>

          <div className="flex items-center my-6">
            <div className="flex-grow h-px bg-gray-300" />
            <span className="px-3 text-gray-500 text-sm">ou</span>
            <div className="flex-grow h-px bg-gray-300" />
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex gap-4">
              <div className="w-1/2">
                <label className="block text-sm font-semibold text-gray-700 mb-1">Nom</label>
                <input
                  name="nom"
                  type="text"
                  value={formData.nom}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-500 rounded-lg focus:outline-none focus:ring-1 focus:ring-green-600"
                  placeholder="Nom"
                />
              </div>
              <div className="w-1/2">
                <label className="block text-sm font-semibold text-gray-700 mb-1">Prénom</label>
                <input
                  name="prenom"
                  type="text"
                  value={formData.prenom}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-500 rounded-lg focus:outline-none focus:ring-1 focus:ring-green-600"
                  placeholder="Prénom"
                />
              </div>
            </div>

            <div className="flex gap-4">
              <div className="w-1/2">
                <label className="block text-sm font-semibold text-gray-700 mb-1">Adresse</label>
                <input
                  name="adresse"
                  type="text"
                  value={formData.adresse}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-500 rounded-lg focus:outline-none focus:ring-1 focus:ring-green-600"
                  placeholder="Adresse"
                />
              </div>
              <div className="w-1/2">
                <label className="block text-sm font-semibold text-gray-700 mb-1">Téléphone</label>
                <PhoneInput
                  country="bj"
                  enableSearch
                  value={formData.telephone}
                  onChange={handlePhoneChange}
                  inputStyle={{
                    width: "100%",
                    height: "40px",
                    borderRadius: "8px",
                    border: "1px solid #6B7280",
                  }}
                  buttonStyle={{
                    border: "1px solid #6B7280",
                    borderTopLeftRadius: "8px",
                    borderBottomLeftRadius: "8px",
                  }}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Rôle</label>
              <select
                name="type_utilisateur"
                value={formData.type_utilisateur}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-500 rounded-lg focus:outline-none focus:ring-1 focus:ring-green-600"
              >
                <option value="">Choisir un rôle</option>
                <option value="agriculteur">Producteur</option>
                <option value="exportateur">Exportateur</option>
                <option value="controlleur">Contrôleur</option>

              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Email</label>
              <input
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-500 rounded-lg focus:outline-none focus:ring-1 focus:ring-green-600"
                placeholder="Adresse e-mail"
              />
            </div>

            <div className="flex gap-4">
              <div className="w-1/2">
                <label className="block text-sm font-semibold text-gray-700 mb-1">Mot de passe</label>
                <input
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-500 rounded-lg focus:outline-none focus:ring-1 focus:ring-green-600"
                  placeholder="Mot de passe"
                />
              </div>
              <div className="w-1/2">
                <label className="block text-sm font-semibold text-gray-700 mb-1">Confirmer</label>
                <input
                  name="confirmPassword"
                  type="password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-500 rounded-lg focus:outline-none focus:ring-1 focus:ring-green-600"
                  placeholder="Confirmer mot de passe"
                />
              </div>
            </div>

            <div className="flex items-center text-sm text-gray-700">
              <input
                type="checkbox"
                name="acceptTerms"
                checked={formData.acceptTerms}
                onChange={handleChange}
                className="mr-2"
              />
              <span>
                J'accepte{" "}
                <span className="text-green-700 font-semibold">
                  que AgriTraceBio puisse me contacter par e-mail ou téléphone.
                </span>
              </span>
            </div>

          <button
  type="submit"
  disabled={loading}
  className={`w-full bg-green-800 hover:bg-green-900 text-white py-2 rounded-lg font-semibold transition ${
    loading ? "opacity-60 cursor-not-allowed" : ""
  }`}
>
  {loading ? "Création du compte..." : "Créer un compte"}
</button>


            <p className="text-center text-sm text-gray-600 mt-4">
              Vous avez déjà un compte ?{" "}
              <Link to="/login" className="text-green-800 font-semibold hover:underline">
                Se connecter
              </Link>
            </p>
          </form>
        </div>
      </main>
    </div>
  );
}
