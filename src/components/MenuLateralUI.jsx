import React from "react";
import { useNavigate } from "react-router-dom";
import "./../assets/slidebar.css";
import { FaHome, FaShoppingCart, FaUser } from "react-icons/fa";

const Sidebar = () => {
  const navigate = useNavigate();

  return (
    <div className="sidebar">
      <div className="sidebar-option" onClick={() => navigate("/")}> 
        <FaHome className="icon" />
        <span>Inicio</span>
      </div>
      <div className="sidebar-option" onClick={() => navigate("/ventas")}> 
        <FaShoppingCart className="icon" />
        <span>Ventas</span>
      </div>
      <div className="sidebar-option" onClick={() => navigate("/compras")}> 
        <FaUser className="icon" />
        <span>Compras</span>
      </div>
      <div className="sidebar-option" onClick={() => navigate("/reportes")}> 
        <FaUser className="icon" />
        <span>Reportes</span>
      </div>
    </div>
  );
};

export default Sidebar;
