import React from "react";
import "./../assets/slidebar.css";
import { FaHome, FaShoppingCart, FaUser } from "react-icons/fa"; // Usa react-icons

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="sidebar-option">
        <FaHome className="icon" />
        <span>Inicio</span>
      </div>
      <div className="sidebar-option">
        <FaShoppingCart className="icon" />
        <span>Ventas</span>
      </div>
      <div className="sidebar-option">
        <FaUser className="icon" />
        <span>Reportes</span>
      </div>
    </div>
  );
};

export default Sidebar;
