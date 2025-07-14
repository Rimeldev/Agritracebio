// components/DashboardLayout.jsx
import Sidebar from "./Sidebar";

const DashboardLayout = ({ children }) => {
  const userRole = sessionStorage.getItem("user_role") ; // valeur par défaut au cas où

  return (
    <div className="flex min-h-screen bg-[#F9FAF8]">
      <Sidebar userType={userRole} />
      <main className="flex-1 p-4">
        {children}
      </main>
    </div>
  );
};

export default DashboardLayout;
