import React, { useState } from 'react';
import Sidebar from '@/components/Sidebar';
import UserMenu from '@/components/UserMenu';

const MyAccount = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [lastName, setLastName] = useState('');
  const [firstName, setFirstName] = useState('');
  const [email, setEmail] = useState('johndoe@example.com');
  const [address, setAddress] = useState('');
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleDeleteAccount = () => {
    if (window.confirm("⚠️ Êtes-vous sûr de vouloir supprimer votre compte ? Cette action est irréversible.")) {
      alert("Votre compte a été supprimé.");
      // Appel API de suppression ici
    }
  };

  const handleSave = (e) => {
    e.preventDefault();
    alert("Modifications enregistrées.");
    // Appel API d'enregistrement ici
  };

  const handlePasswordChange = (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      alert("❌ Les mots de passe ne correspondent pas.");
      return;
    }
    alert("Mot de passe modifié avec succès.");
    // Appel API de changement de mot de passe ici
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar isOpen={sidebarOpen} toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />

      <div className="flex-1 flex flex-col">
        {/* Header top-right */}
        <div className="flex justify-end p-4">
          <UserMenu farmerName="Agriculteur" />
        </div>

        <main className="flex-1 p-6 bg-gray-50 overflow-y-auto">
          <h1 className="text-3xl font-bold text-green-900 mb-8">Mon compte</h1>

          {/* Infos personnelles */}
          <section className="bg-white border border-gray-200 rounded-lg p-6 mb-10 shadow">
            <h2 className="text-xl font-semibold text-green-800 mb-6">Informations personnelles</h2>
            <form onSubmit={handleSave} className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nom *</label>
                <input
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  placeholder="Votre nom"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Prénom *</label>
                <input
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  placeholder="Votre prénom"
                  required
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  placeholder="Votre email"
                  required
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Adresse</label>
                <input
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  placeholder="Votre adresse"
                />
              </div>
              <div className="md:col-span-2 flex gap-4 justify-start mt-2">
                <button
                  type="submit"
                  className="bg-green-700 text-white px-6 py-2 rounded hover:bg-green-800 transition"
                >
                  Enregistrer
                </button>
                <button
                  type="reset"
                  className="border border-gray-300 px-6 py-2 rounded hover:bg-gray-100"
                >
                  Annuler
                </button>
              </div>
            </form>
          </section>

          {/* Modification du mot de passe */}
          <section className="bg-white border border-gray-200 rounded-lg p-6 mb-10 shadow">
            <h2 className="text-xl font-semibold text-green-800 mb-6">Modifier le mot de passe</h2>
            <form onSubmit={handlePasswordChange} className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Ancien mot de passe *</label>
                <input
                  type="password"
                  value={oldPassword}
                  onChange={(e) => setOldPassword(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nouveau mot de passe *</label>
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Confirmation *</label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  required
                />
              </div>
              <div className="md:col-span-3 flex gap-4 justify-start mt-2">
                <button
                  type="submit"
                  className="bg-green-700 text-white px-6 py-2 rounded hover:bg-green-800 transition"
                >
                  Modifier
                </button>
                <button
                  type="reset"
                  className="border border-gray-300 px-6 py-2 rounded hover:bg-gray-100"
                >
                  Annuler
                </button>
              </div>
            </form>
          </section>

          {/* Suppression de compte */}
          <section className="bg-white border border-red-200 rounded-lg p-6 shadow">
            <h2 className="text-xl font-semibold text-red-700 mb-4">Supprimer mon compte</h2>
            <p className="text-sm text-gray-600 mb-4">
              Attention : cette action est <strong>irréversible</strong>. Toutes vos données seront supprimées.
            </p>
            <button
              onClick={handleDeleteAccount}
              className="bg-red-600 text-white px-6 py-2 rounded hover:bg-red-700 transition"
            >
              Supprimer mon compte
            </button>
          </section>
        </main>
      </div>
    </div>
  );
};

export default MyAccount;
