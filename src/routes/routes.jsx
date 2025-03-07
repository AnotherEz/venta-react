import { Route, Routes } from "react-router-dom";
import MetodoPago from "../components/componentes";
import Sidebar from "../components/slidebar";
import CarritoUI from "../components/carrito";
/* import Header from "../components/templates/Header";
import Default from "../components/templates/Default";
import Footer from "../components/templates/Footer";
import Home from "../pages/Informative/Home";
import Servicios from "../pages/Informative/Home";
import Login from "../pages/Auth/login";
import Register from "../pages/Auth/register";
import Dashboard from "../pages/User/dashboard";
 */


const AppRoutes = () => {
  return (
    <Routes>
        <Route path="/" element={
  <div className="app-container">
    <Sidebar />
    <div className="main-content">
      <MetodoPago />
      <CarritoUI />
    </div>
  </div>
} />
      {/* <Route path="*" element={<Default />} />
      <Route path="/" element={<><Header /><Home /><Footer /></>} />
      <Route path="/servicios" element={<><Header /><Servicios /><Footer /></>} />
      <Route path="/login" element={<Login />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/register" element={<Register />} /> */}
    </Routes>
  );
};

export default AppRoutes;
