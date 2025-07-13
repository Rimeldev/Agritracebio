import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import ForgotPassword from './pages/ForgotPassword';
import Register from './pages/Register';
import Dashboard from './pages/farmer/Dashboard';
import Culture from './pages/farmer/Culture';
import Authorization from './pages/controler/Authorization';
import VerificationPage from './pages/VerificationPage';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminAccount from './pages/admin/AdminAccount';
import Exportateur from './pages/Exportateur/DashboardExportateur';
import Trace from './pages/trace';
import MyAccount from './pages/MyAccount';
import AddCulture from './pages/farmer/AddCulture';
import ResetPassword from "./pages/ResetPassword";
import PrivateRoute from "./components/PrivateRoute";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LoginAdmin from './pages/admin/LoginAdmin';

function App() {
  return (
    <>
      <Routes>
        {/* Routes publiques */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin/login" element={<LoginAdmin />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/VerificationPage" element={<VerificationPage />} />
        <Route path="/trace" element={<Trace />} />

        {/* Routes protégées */}
        <Route path="/farmer/Dashboard" element={
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        } />

        <Route path="/farmer/Culture" element={
          <PrivateRoute>
            <Culture />
          </PrivateRoute>
        } />

        <Route path="/AddCulture" element={
          <PrivateRoute>
            <AddCulture />
          </PrivateRoute>
        } />

        <Route path="/mon-compte" element={
          <PrivateRoute>
            <MyAccount />
          </PrivateRoute>
        } />

        <Route path="/admin" element={
          <PrivateRoute>
            <AdminDashboard />
          </PrivateRoute>
        } />

        <Route path="/admin/account" element={
          <PrivateRoute>
            <AdminAccount />
          </PrivateRoute>
        } />

        <Route path="/controler/Authorization" element={
          <PrivateRoute>
            <Authorization />
          </PrivateRoute>
        } />

        <Route path="/exportateur/Dashboard" element={
          <PrivateRoute>
            <Exportateur />
          </PrivateRoute>
        } />
      </Routes>

      <ToastContainer position="top-right" autoClose={3000} />
    </>
  );
}

export default App;
