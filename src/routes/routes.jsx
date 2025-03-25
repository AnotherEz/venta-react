import { Route, Routes } from "react-router-dom";
import Sidebar from "../components/MenuLateralUI";
import Home from "../pages/HomeUI";
import ReporteVentasUI from "../pages/ReporteUI";
import Ventas from "../pages/VentaUI";
import IngresoInventarioUI from "../pages/Compras";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={
        <div className="app-container">
          <Sidebar />
          <div className="main-content">
            <Home />
          </div>
        </div>
      } />

      <Route path="/ventas" element={
        <div className="app-container">
          <Sidebar />
          <div className="main-content">
            <Ventas />
          </div>
        </div>
      } />

      <Route path="/compras" element={
        <div className="app-container">
          <Sidebar />
          <div className="main-content">
            <IngresoInventarioUI/>
          </div>
        </div>
      } />

      <Route path="/reportes" element={
        <div className="app-container">
          <Sidebar />
          <div className="main-content">
            <ReporteVentasUI />
          </div>
        </div>
      } />
    </Routes>
  );
};

export default AppRoutes;
