import { useState, useRef } from "react";
import Header from "../components/Header";
import logo2Img from "../assets/4.png";

export default function Verification() {
  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const [error, setError] = useState("");
  const inputRefs = useRef([]);

  const handleChange = (index, value) => {
    if (!/^[0-9]?$/.test(value)) return;

    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);

    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const finalCode = code.join("");

    if (finalCode.length < 6) {
      setError("Veuillez entrer les 6 chiffres.");
      return;
    }

    try {
      const res = await fetch("/api/verify-code", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code: finalCode }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Code invalide");
      }

      window.location.href = "/dashboard";
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />

      {/* Vérification Form */}
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
              Vérification du code
            </h2>
          </div>

          <p className="text-gray-600 text-sm text-center mb-6">
            Entrez le code à 6 chiffres que vous avez reçu par email.
          </p>

          <form onSubmit={handleSubmit}>
            <div className="flex justify-between gap-2 mb-4">
              {code.map((digit, index) => (
                <input
                  key={index}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  ref={(el) => (inputRefs.current[index] = el)}
                  className="w-12 h-12 text-center border border-gray-500 rounded-lg text-lg font-bold focus:outline-none focus:ring-2 focus:ring-green-600"
                />
              ))}
            </div>

            {error && (
              <p className="text-red-600 text-sm mb-4 text-center">{error}</p>
            )}

            <button
              type="submit"
              className="w-full bg-green-800 hover:bg-green-900 text-white py-2 rounded-lg font-semibold transition"
            >
              Valider
            </button>
          </form>

          <p className="text-center text-sm text-gray-600 mt-4">
            Pas reçu de code ?{" "}
            <button
              type="button"
              onClick={() => alert("Code renvoyé (fonction à implémenter)")}
              className="text-green-800 font-semibold hover:underline"
            >
              Renvoyer le code
            </button>
          </p>
        </div>
      </main>
    </div>
  );
}
