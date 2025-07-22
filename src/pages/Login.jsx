import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import logo2Img from "../assets/4.png";
import appleImg from "../assets/apple.png";
import googleImg from "../assets/google.png";
import Header from "../components/Header";
import { loginUser } from "../services/authService";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error("Veuillez remplir tous les champs.");
      return;
    }

    try {
      setLoading(true);
      const res = await loginUser({ email, password });
      toast.success(res.message || "Connexion réussie !");
      localStorage.setItem("token", res.data.access_token);
      localStorage.setItem("user_id", res.data.user.id);
      localStorage.setItem("user_role", res.data.user.type_utilisateur);
      localStorage.setItem("is_admin", res.data.user.is_admin);
      sessionStorage.setItem("user_role", res.data.user.type_utilisateur);

    // Redirection selon le rôle
    const role = res.data.user.type_utilisateur;

    switch (role) {
      case "agriculteur":
        navigate("/farmer/Dashboard");
        break;
      case "exportateur":
        navigate("/exportateur/Dashboard");
        break;
      case "controlleur":
        navigate("/controleur/demandes");
        break;
      default:
        toast.error("Rôle inconnu. Contactez l'administrateur.");
        break;
    }
  } catch (error) {
    toast.error(error?.response?.data?.message || "Identifiants invalides.");
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
              Se connecter
            </h2>
          </div>

          {/* Boutons tiers */}
          <div className="space-y-3 mb-6">
            <button className="w-full flex items-center justify-center gap-2 bg-white border border-gray-300 text-gray-800 py-2 rounded-lg hover:bg-gray-100 transition">
              <img src={googleImg} alt="Google logo" className="w-5 h-5" />
              Se connecter avec Google
            </button>

            <button className="w-full flex items-center justify-center gap-2 bg-black text-white py-2 rounded-lg hover:opacity-90 transition">
              <img src={appleImg} alt="Apple logo" className="w-5 h-5" />
              Se connecter avec Apple
            </button>
          </div>

          <div className="flex items-center my-6">
            <div className="flex-grow h-px bg-gray-300" />
            <span className="px-3 text-gray-500 text-sm">ou</span>
            <div className="flex-grow h-px bg-gray-300" />
          </div>

          {/* Formulaire */}
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700 font-semibold mb-1">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Adresse e-mail"
                className="w-full px-4 py-2 border border-gray-500 rounded-lg focus:outline-none focus:ring-1 focus:ring-green-600"
              />
            </div>

            <div className="mb-4">
              <div className="flex justify-between items-center mb-1">
                <label className="text-gray-700 font-semibold">Mot de passe</label>
                <Link to="/forgot-password" className="text-green-600 text-sm hover:underline">
  Mot de passe oublié ?
</Link>

              </div>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Mot de passe"
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
              {loading ? "Connexion..." : "Se connecter"}
            </button>
          </form>

          <p className="text-center text-sm text-gray-600 mt-4">
            Vous n'avez pas de compte ?{" "}
            <Link to="/register" className="text-green-800 font-semibold hover:underline">
              Créer un compte
            </Link>
          </p>
        </div>
      </main>
    </div>
  );
}
