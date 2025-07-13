import { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

import logo2Img from "../assets/4.png";
import Header from "../components/Header";
import { forgotPassword } from "../services/forgotPasswordService";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email) {
      toast.error("Veuillez entrer votre adresse e-mail.");
      return;
    }

    try {
      setLoading(true);
      localStorage.setItem("reset_email", email);
      await forgotPassword(email);
      toast.success("Lien de réinitialisation envoyé !");
    } catch (err) {
      toast.error(
        err?.response?.data?.message || "Erreur lors de l'envoi du lien."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />

      <main className="flex-grow flex items-center justify-center px-4 pb-10">
        <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md mt-8">
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
              Réinitialiser le mot de passe
            </h2>
          </div>

          <div className="flex justify-between text-sm text-gray-600 mb-6 border-b border-gray-300 pb-2">
            <span className="font-bold text-green-800">
              Étape 1. Email
            </span>
            <span className="text-gray-400">
              Étape 2. Nouveau mot de passe
            </span>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Adresse e-mail
              </label>
              <input
                type="email"
                placeholder="Votre adresse e-mail"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 border border-gray-500 rounded-lg focus:outline-none focus:ring-1 focus:ring-green-600"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full bg-green-800 hover:bg-green-900 text-white py-2 rounded-lg font-semibold transition ${
                loading ? "opacity-60 cursor-not-allowed" : ""
              }`}
            >
              {loading ? "Envoi en cours..." : "Envoyer un lien de réinitialisation"}
            </button>
          </form>

          <p className="text-center text-sm text-gray-600 mt-4">
            <Link to="/login" className="text-green-800 font-semibold hover:underline">
              Connexion
            </Link>
          </p>
        </div>
      </main>
    </div>
  );
}
