import { useState } from "react";
import { NavLink } from "react-router-dom";

import {
  LayoutDashboard,
  PackageCheck,
  ClipboardList,
  FileCheck2,
  Truck,
  Leaf,
  BadgeCheck,
} from "lucide-react";

import logo from "../assets/logo.png";
import toggleIcon from "../assets/icons/toggleIcon.png";

const Sidebar = ({ userType = "farmer" }) => {
  const [isOpen, setIsOpen] = useState(true);
  const toggleSidebar = () => setIsOpen(!isOpen);

  let menuItems = [];

  if (userType === "controlleur") {
    menuItems = [
      {
        to: "/controler/Authorization",
        label: "Tableau de bord",
        icon: <ClipboardList className="h-5 w-5" />,
      },
      {
        to: "/controleur/demandes",
        label: "Demandes reçues",
        icon: <FileCheck2 className="h-5 w-5" />,
      },
      {
        to: "/controleur/certificats",
        label: "Certificats émis",
        icon: <BadgeCheck className="h-5 w-5" />,
      },
    ];
  } else if (userType === "exportateur") {
    menuItems = [
      {
        to: "/exportateur/Dashboard",
        label: "Tableau de bord",
        icon: <LayoutDashboard className="h-5 w-5" />,
      },
      {
        to: "/exportateur/Culture",
        label: "Cultures affiliées",
        icon: <Leaf className="h-5 w-5" />,
      },
      {
        to: "/exportateur/mes-demandes",
        label: "Demandes d'inspection",
        icon: <ClipboardList className="h-5 w-5" />,
      },
      {
        to: "/exportateur/validation",
        label: "Validation finale",
        icon: <Truck className="h-5 w-5" />,
      },
      {
        to: "/exportateur/certificats",
        label: "Certificats",
        icon: <FileCheck2 className="h-5 w-5" />,
      },
    ];
  } else {
    menuItems = [
      {
        to: "/farmer/Dashboard",
        label: "Tableau de bord",
        icon: <LayoutDashboard className="h-5 w-5" />,
      },
      {
        to: "/farmer/Culture",
        label: "Cultures",
        icon: <Leaf className="h-5 w-5" />,
      },
    ];
  }

  return (
    <aside
      className={`min-h-screen bg-white border-r border-gray-100 shadow-md
        flex flex-col transition-all duration-300
        ${isOpen ? "w-52" : "w-16"}
      `}
    >
      {/* En-tête */}
      <div className="flex items-center justify-between bg-[#233D1C] p-2">
        {isOpen && <img src={logo} alt="Logo" className="h-10" />}
        <button
          onClick={toggleSidebar}
          className="p-1 rounded hover:bg-gray-200"
          aria-label={isOpen ? "Fermer le menu" : "Ouvrir le menu"}
        >
          <img src={toggleIcon} alt="Toggle menu" className="h-6 w-6" />
        </button>
      </div>

      {/* Menu */}
      <nav className="mt-4 flex flex-col gap-2 px-2 flex-1">
        {menuItems.map((item) => (
          <SidebarItem
            key={item.to}
            to={item.to}
            icon={item.icon}
            label={isOpen ? item.label : ""}
          />
        ))}
      </nav>
    </aside>
  );
};

const SidebarItem = ({ to, icon, label }) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `flex items-center gap-3 px-4 py-2 rounded-lg transition-colors ${
          isActive
            ? "bg-[#DDE3C2] border-l-4 border-[#FFCA28] text-black"
            : "hover:bg-[#F0F2E8] text-gray-700"
        }`
      }
    >
      {icon}
      {label && <span className="text-sm font-medium">{label}</span>}
    </NavLink>
  );
};

export default Sidebar;
