import React, { useState, useEffect } from 'react';
import AdminHeader from '@/components/AdminHeader';
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { getMyProfile } from "@/services/getMyProfileService";
import { updateProfile } from "@/services/updateProfileService";
import { uploadAvatar } from "@/services/avatarService";
import { changePassword } from "@/services/changePasswordService";
import { deleteMyAccount } from "@/services/deleteAccountService";

const MyAccount = () => {
  const navigate = useNavigate();

  const [photo, setPhoto] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [lastName, setLastName] = useState('');
  const [firstName, setFirstName] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await getMyProfile();
        setLastName(res.nom || '');
        setFirstName(res.prenom || '');
        setEmail(res.email || '');
        setAddress(res.adresse || '');
        setPhone(res.telephone || '');
        if (res.avatar) {
           const correctedPath = res.avatar.replace("files/avatars", "avatars");
setPreviewUrl(`http://127.0.0.1:5000/${correctedPath}`);
        }
      } catch (err) {
          toast.error(err?.response?.data?.message || "Erreur lors du chargement du profil.");
      }
    };
    fetchProfile();
  }, []);

  const isValidPhone = (value) => /^\+?\d{8,15}$/.test(value);

  const handleSave = async (e) => {
    e.preventDefault();
    if (phone && !isValidPhone(phone)) {
      toast.error("Le numéro de téléphone est invalide.");
      return;
    }

    try {
      setLoading(true);
      if (photo) {
        const resAvatar = await uploadAvatar(photo);
        toast.success(resAvatar.message);
      }

      const res = await updateProfile({
        nom: lastName,
        prenom: firstName,
        email,
        adresse: address,
        telephone: phone,
      });

      toast.success(res.message || "Profil mis à jour !");
      navigate("/admin");
    } catch (error) {
      toast.error(error?.response?.data?.message || "Erreur lors de la mise à jour.");
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      toast.error("Les mots de passe ne correspondent pas.");
      return;
    }

    try {
      setLoading(true);
      await changePassword({ old_password: oldPassword, new_password: newPassword });
      toast.success("Mot de passe modifié avec succès !");
      setOldPassword(""); setNewPassword(""); setConfirmPassword("");
    } catch (error) {
      toast.error(error?.response?.data?.message || "Erreur de modification.");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteAccount = async () => {
    if (window.confirm("⚠️ Êtes-vous sûr de vouloir supprimer votre compte ? Cette action est irréversible.")) {
      try {
        await deleteMyAccount();
        toast.success("Compte supprimé.");
        localStorage.clear();
        navigate("/login");
      } catch (err) {
        toast.error(err?.response?.data?.message || "Erreur lors de la suppression.");
      }
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <AdminHeader />
      <main className="p-6 bg-gray-50 overflow-y-auto">
        <h1 className="text-3xl font-bold text-green-900 mb-8">Mon compte</h1>

        {/* Informations personnelles */}
        <section className="bg-white border border-gray-200 rounded-lg p-6 mb-10 shadow">
          <h2 className="text-xl font-semibold text-green-800 mb-6">Informations personnelles</h2>
          <form onSubmit={handleSave} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Photo de profil</label>
              {previewUrl && (
                <img src={previewUrl} alt="Aperçu" className="h-24 w-24 rounded-full object-cover mb-2 border" />
              )}
              <input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files[0];
                  if (file) {
                    setPhoto(file);
                    setPreviewUrl(URL.createObjectURL(file));
                  }
                }}
                className="w-full p-2 border border-gray-300 rounded-md"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Nom *</label>
              <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} className="w-full p-2 border border-gray-300 rounded-md" required />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Prénom *</label>
              <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} className="w-full p-2 border border-gray-300 rounded-md" required />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Téléphone</label>
              <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} className="w-full p-2 border border-gray-300 rounded-md" placeholder="Ex : +229..." />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full p-2 border border-gray-300 rounded-md" required />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Adresse</label>
              <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} className="w-full p-2 border border-gray-300 rounded-md" />
            </div>
            <div className="md:col-span-2 flex gap-4 justify-start mt-2">
              <button type="submit" disabled={loading} className="bg-green-700 text-white px-6 py-2 rounded hover:bg-green-800 transition disabled:opacity-50">Enregistrer</button>
              <button type="reset" className="border border-gray-300 px-6 py-2 rounded hover:bg-gray-100">Annuler</button>
            </div>
          </form>
        </section>

        {/* Mot de passe */}
        <section className="bg-white border border-gray-200 rounded-lg p-6 mb-10 shadow">
          <h2 className="text-xl font-semibold text-green-800 mb-6">Modifier le mot de passe</h2>
          <form onSubmit={handlePasswordChange} className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <input type="password" placeholder="Ancien" value={oldPassword} onChange={(e) => setOldPassword(e.target.value)} className="p-2 border border-gray-300 rounded-md" required />
            <input type="password" placeholder="Nouveau" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} className="p-2 border border-gray-300 rounded-md" required />
            <input type="password" placeholder="Confirmer" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className="p-2 border border-gray-300 rounded-md" required />
            <div className="md:col-span-3 mt-2">
              <button type="submit" disabled={loading} className="bg-green-700 text-white px-6 py-2 rounded hover:bg-green-800 transition disabled:opacity-50">Modifier</button>
            </div>
          </form>
        </section>

        {/* Suppression */}
        <section className="bg-white border border-red-200 rounded-lg p-6 shadow">
          <h2 className="text-xl font-semibold text-red-700 mb-4">Supprimer mon compte</h2>
          <p className="text-sm text-gray-600 mb-4">Attention : cette action est <strong>irréversible</strong>.</p>
          <button onClick={handleDeleteAccount} className="bg-red-600 text-white px-6 py-2 rounded hover:bg-red-700 transition">Supprimer mon compte</button>
        </section>
      </main>
    </div>
  );
};

export default MyAccount;
