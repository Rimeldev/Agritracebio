
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/farmer/Dashboard';
import Culture from './pages/farmer/Culture';
import Authorization from './pages/controler/Authorization';
import VerificationPage from './pages/VerificationPage';
import AdminDashboard from './pages/admin/AdminDashboard';
import Exportateur from './pages/Exportateur/DashboardExportateur';
import Trace from './pages/trace';


function App() {
  return (
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/VerificationPage" element={<VerificationPage />} />
        <Route path="/farmer/Dashboard" element={<Dashboard />} />
        <Route path="/farmer/Culture" element={<Culture/>} />
        <Route path="/controler/Authorization" element={<Authorization/>} />
        <Route path="/admin" element={<AdminDashboard/>} />
        <Route path="/trace" element={<Trace/>} />
        <Route path="/exportateur/Dashboard" element={<Exportateur/>} />
      </Routes>
  );
}

export default App;