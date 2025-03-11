import React, { useState } from "react";
import MetodoPago from "./../components/metodoPago";
import CarritoUI from "./../components/carrito";

export default function Ventas() {
  const [clienteId, setClienteId] = useState(null);

  return (
    <div>
      {/* 🔹 Se pasa la función `setClienteId` para que `MetodoPago` actualice el ID */}
      <MetodoPago setClienteId={setClienteId} />

      {/* 🔹 Pasamos `clienteId` a `CarritoUI` para que lo use en sus componentes hijos */}
      <CarritoUI clienteId={clienteId} />
    </div>
  );
}
