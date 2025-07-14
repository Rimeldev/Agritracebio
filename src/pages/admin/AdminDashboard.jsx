import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import AdminHeader from "@/components/AdminHeader";
import UsersTab from "@/components/UsersTab";
import CulturesTab from "@/components/CulturesTab";
import DispositifsTab from "@/components/DeviceTab";
import { getAllCulturesAdmin } from "@/services/getAllCulturesAdmin";
import { addDispositifToCulture,getAllDispositifsAdmin } from "@/services/dispositifService";
import { getAllUsers,getDeletedUsers,toggleAdminRole,toggleUserSuspension } from "@/services/userService";

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("utilisateurs");

  // Utilisateurs
  const [users, setUsers] = useState([]); // ✅ Correct
  const [userFilter, setUserFilter] = useState("Tous"); // ✅ Correct
  const [showDeleted, setShowDeleted] = useState(false);

  // Cultures
  const [selectedFarmer, setSelectedFarmer] = useState("Tous");
  const [cultures, setCultures] = useState([]);
  const [userMap, setUserMap] = useState({});

  // Dispositifs
  const [showAddModal, setShowAddModal] = useState(false);
  const [newDispositif, setNewDispositif] = useState({ nom: "", culture_id: "" });
  const [dispositifs, setDispositifs] = useState([]);

  // Charger les utilisateurs selon le filtre
 useEffect(() => {
  const fetchUsers = async () => {
    try {
      if (showDeleted) {
        // Récupérer uniquement les comptes supprimés
        const deletedUsers = await getDeletedUsers();
        setUsers(deletedUsers);
      } else {
        const typeMap = {
          Tous: null,
          Agriculteur: "agriculteur",
          Contrôleur: "controlleur",
          Exportateur: "exportateur",
        };
        const userType = typeMap[userFilter];
        const data = await getAllUsers(userType);
        setUsers(data);
      }
    } catch (error) {
      console.error("Erreur lors du chargement des utilisateurs :", error);
      toast.error("Erreur lors du chargement des utilisateurs.");
    }
  };

  if (activeTab === "utilisateurs") {
    fetchUsers();
  }
}, [userFilter, showDeleted, activeTab]);

const toggleSuspension = async (user) => {
  try {
    const action = user.is_active ? "suspendre" : "réactiver";
    if (!window.confirm(`Voulez-vous vraiment ${action} ${user.prenom} ${user.nom} ?`)) return;

    await toggleUserSuspension(user.id);

    toast.success(
      user.is_active
        ? `${user.prenom} ${user.nom} a été suspendu.`
        : `${user.prenom} ${user.nom} a été réactivé.`
    );

    // Mise à jour locale de la liste des users
    setUsers((prevUsers) =>
      prevUsers.map((u) =>
        u.id === user.id ? { ...u, is_active: !u.is_active } : u
      )
    );
  } catch (error) {
    toast.error("Erreur lors de la modification du statut utilisateur.");
    console.error(error);
  }
};

// Charger les dispositifs (à chaque fois que l'onglet est "dispositifs")
useEffect(() => {
  const fetchDispositifs = async () => {
    try {
      const data = await getAllDispositifsAdmin();
      setDispositifs(data);
    } catch (error) {
      console.error("Erreur lors du chargement des dispositifs :", error);
      toast.error("Erreur lors du chargement des dispositifs.");
    }
  };

  if (activeTab === "dispositifs") {
    fetchDispositifs();
  }
}, [activeTab]);

  // Charger les cultures
  useEffect(() => {
    const fetchCultures = async () => {
      try {
        const data = await getAllCulturesAdmin(
          selectedFarmer !== "Tous" ? selectedFarmer : null
        );

        setCultures(data);

        // Construire la map user_id -> nom
        const newMap = {};
data.forEach((culture) => {
  if (culture.user && culture.user.id &&
  culture.user.is_deleted === false) {
    newMap[culture.user.id] = `${culture.user.prenom} ${culture.user.nom}`;
  }
});
setUserMap(newMap);



      } catch (error) {
        console.error("Erreur lors du chargement des cultures :", error);
        toast.error("Erreur lors du chargement des cultures.");
      }
    };

    if (activeTab === "cultures" || activeTab === "dispositifs") {
      fetchCultures();
    }
  }, [selectedFarmer, activeTab]);

 const promoteToAdmin = async (user) => {
  try {
    const confirmMsg = user.is_admin
      ? `Retirer le rôle admin à ${user.prenom} ${user.nom} ?`
      : `Donner le rôle admin à ${user.prenom} ${user.nom} ?`;

    if (!window.confirm(confirmMsg)) return;

    await toggleAdminRole(user.id);

    toast.success(
      user.is_admin
        ? `${user.prenom} ${user.nom} n'est plus admin.`
        : `${user.prenom} ${user.nom} est maintenant admin.`
    );

    // Mise à jour locale de la liste users (toggle is_admin)
    setUsers((prevUsers) =>
      prevUsers.map((u) =>
        u.id === user.id ? { ...u, is_admin: !u.is_admin } : u
      )
    );
  } catch (error) {
    toast.error("Erreur lors de la modification du rôle admin.");
    console.error(error);
  }
};


  // Ajouter un dispositif
  const addDispositif = async () => {
    if (newDispositif.nom && newDispositif.culture_id) {
      try {
        console.log("Données envoyées :", newDispositif);
        const res = await addDispositifToCulture({
          nom: newDispositif.nom,
          culture_id: newDispositif.culture_id,
        });

        toast.success("Dispositif ajouté avec succès !");
        setNewDispositif({ nom: "", culture_id: "" });
        setShowAddModal(false);

        setDispositifs((prev) => [...prev, res.data]);
      } catch (error) {
        console.error("Erreur lors de l'ajout :", error.response?.data || error.message);
        toast.error(error.response?.data?.message || "Erreur lors de l'ajout du dispositif.");
      }
    }
  };

  const activateDispositif = (d) => toast.success(`Dispositif "${d.nom}" activé.`);
  const deactivateDispositif = (d) => toast.warn(`Dispositif "${d.nom}" désactivé.`);

  return (
    <div className="flex">
      <div className="flex-1 flex flex-col">
        <AdminHeader />
        <main className="p-6 bg-gray-50 space-y-6">
          <div className="flex space-x-6 border-b pb-2">
            {["Utilisateurs", "Cultures", "Dispositifs"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab.toLowerCase())}
                className={`text-sm pb-2 border-b-2 ${
                  activeTab === tab.toLowerCase()
                    ? "border-green-600 text-green-700 font-semibold"
                    : "border-transparent text-gray-500 hover:text-green-600"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {activeTab === "utilisateurs" && (
            <UsersTab
              users={users}
              userFilter={userFilter}
              showDeleted={showDeleted}
              setUserFilter={setUserFilter}
              setShowDeleted={setShowDeleted}
              toggleSuspension={toggleSuspension}
              promoteToAdmin={promoteToAdmin}
            />
          )}

          {activeTab === "cultures" && (
            <CulturesTab
              cultures={cultures}
              userMap={userMap}
              selectedFarmer={selectedFarmer}
              setSelectedFarmer={setSelectedFarmer}
            />
          )}

          {activeTab === "dispositifs" && (
            <DispositifsTab
              dispositifs={dispositifs}
              cultures={cultures}
              showAddModal={showAddModal}
              setShowAddModal={setShowAddModal}
              newDispositif={newDispositif}
              setNewDispositif={setNewDispositif}
              addDispositif={addDispositif}
              activateDispositif={activateDispositif}
              deactivateDispositif={deactivateDispositif}
            />
          )}
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
