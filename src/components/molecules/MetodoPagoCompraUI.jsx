import React from "react";
import "./../../assets/metpago.css";

// Importa el custom hook
import { useMetodoPago } from "../../hooks/useMetodoPago";

// Importa solo el componente necesario
import DniRucInput from "../atoms/DniRucInput";

export default function MetodoPagoCompra({ setClienteId, totalCarrito, carrito, setCarrito, setProductos, onFinalizarVenta }) {
  const {
    dniRuc,
    nombreCliente,
    maxLength,
    dniRucDisabled,
    handleBuscarDniRuc,
    tipoVenta,
  } = useMetodoPago({
    setClienteId,
    totalCarrito,
    carrito,
    setCarrito,
    setProductos,
    onFinalizarVenta,
  });

  const isBoleta = tipoVenta === "Venta con Boleta";
  const isFactura = tipoVenta === "Venta con Factura";

  return (
    <div className="metodo-pago-container">
      <h2 className="titulo">Buscar Proveedor</h2>
      <div className="formulario">
        <DniRucInput
          dniRuc={dniRuc}
          nombreCliente={nombreCliente}
          disabled={dniRucDisabled}
          maxLength={maxLength}
          isBoleta={isBoleta}
          isFactura={isFactura}
          onChangeDniRuc={handleBuscarDniRuc}
        />
      </div>
    </div>
  );
}
