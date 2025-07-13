import { Navigate, useLocation } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  const location = useLocation();

  const isAdminRoute = location.pathname.startsWith("/admin");

  if (!token) {
    return (
      <Navigate
        to={isAdminRoute ? "/admin/login" : "/login"}
        replace
      />
    );
  }

  return children;
};

export default PrivateRoute;
