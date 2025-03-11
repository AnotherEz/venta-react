import { useState, useEffect } from "react";
import { obtenerDatosPorDni, obtenerDatosPorRuc } from "./../services/reniecService";
import "./../assets/metpago.css"; // Importamos el CSS

export default function MetodoPago({ setClienteId, totalCarrito, carrito, onFinalizarVenta }) {

  // Estados
  const [tipoVenta, setTipoVenta] = useState("Venta rápida");
  const [tipoPago, setTipoPago] = useState("Efectivo");
  const [dniRuc, setDniRuc] = useState("");
  const [nombreCliente, setNombreCliente] = useState(""); // Para almacenar el nombre autocompletado
  const [montoEfectivo, setMontoEfectivo] = useState("");
  const [montoTarjeta, setMontoTarjeta] = useState("");
  const [vuelto, setVuelto] = useState(0);

  // 🔹 Si el total es 0, deshabilitamos las opciones de pago
  const carritoVacio = totalCarrito === 0;


  const montoSuficiente =
  (tipoPago === "Efectivo" && parseFloat(montoEfectivo) >= totalCarrito) ||
  (tipoPago === "Tarjeta/POS" && parseFloat(montoTarjeta) >= totalCarrito) ||
  (tipoPago === "Mixto" && parseFloat(montoEfectivo) + parseFloat(montoTarjeta) >= totalCarrito);
  // Validaciones dinámicas
  const dniRucDisabled = tipoVenta === "Venta rápida";
  const tipoPagoDisabled = carritoVacio;
  const montoEfectivoDisabled = tipoPago === "Tarjeta/POS" || carritoVacio;
  const montoTarjetaDisabled = tipoPago === "Efectivo" || carritoVacio;

  // Definir el tipo de documento esperado
  const isBoleta = tipoVenta === "Venta con Boleta";
  const isFactura = tipoVenta === "Venta con Factura";
  const maxLength = isBoleta ? 8 : isFactura ? 11 : 11; // 8 para DNI, 11 para RUC

  // 🔹 Manejo del cambio de tipo de venta
  const handleTipoVentaChange = (e) => {
    const selectedTipoVenta = e.target.value;
    setTipoVenta(selectedTipoVenta);
    setDniRuc("");
    setNombreCliente("");

    if (setClienteId) {
      setClienteId(null); // Reiniciar clienteId al cambiar tipo de venta
    }
  };

  const handleTipoPagoChange = (e) => {
    const nuevoTipoPago = e.target.value;
    setTipoPago(nuevoTipoPago);
  
    if (nuevoTipoPago === "Tarjeta/POS") {
      setMontoTarjeta(totalCarrito.toFixed(2)); // 🔹 Llena automáticamente con el total
      setMontoEfectivo(""); // 🔹 Se borra el efectivo
      setVuelto(0); // 🔹 No hay vuelto en este caso
    } else if (nuevoTipoPago === "Efectivo") {
      setMontoTarjeta(""); // 🔹 Se borra el monto de la tarjeta
      setVuelto(0); // 🔹 Resetear vuelto hasta que se ingrese efectivo
    } else if (nuevoTipoPago === "Mixto") {
      setMontoTarjeta(""); // 🔹 Se limpia para ingresar manualmente
      setMontoEfectivo(""); // 🔹 Se limpia también
      setVuelto(0); // 🔹 Resetear vuelto hasta que se ingrese efectivo
    }
  };
  
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === " " && montoSuficiente) {
        handleFinalizarVenta();
      }
    };
  
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [montoSuficiente]);
  
  // 🔹 Cálculo del vuelto basado en tipo de pago
  useEffect(() => {
    const efectivo = parseFloat(montoEfectivo) || 0;
    const tarjeta = parseFloat(montoTarjeta) || 0;

    if (tipoPago === "Efectivo") {
      setVuelto(efectivo > totalCarrito ? efectivo - totalCarrito : 0);
    } else if (tipoPago === "Mixto") {
      const totalPagado = efectivo + tarjeta;
      setVuelto(totalPagado > totalCarrito ? totalPagado - totalCarrito : 0);
    } else {
      setVuelto(0); // 🔹 No hay vuelto en Tarjeta/POS
    }
  }, [montoEfectivo, montoTarjeta, totalCarrito, tipoPago]);

  // 🔹 Validar y buscar en la API
  const handleBuscarDniRuc = async (e) => {
    const numeroIngresado = e.target.value.replace(/\D/g, ""); // 🔹 Solo números
    setDniRuc(numeroIngresado);
  
    if (isBoleta && numeroIngresado.length === 8) {
      // 🔍 Buscar por DNI
      const data = await obtenerDatosPorDni(numeroIngresado);
      if (data) {
        setNombreCliente(data.nombre_cliente || "Nombre no disponible");
        if (setClienteId) {
          setClienteId(data.id_cliente || null);
        }
      } else {
        setNombreCliente("DNI no encontrado");
        if (setClienteId) {
          setClienteId(null);
        }
      }
    } else if (isFactura && numeroIngresado.length === 11) {
      // 🔍 Buscar por RUC
      const data = await obtenerDatosPorRuc(numeroIngresado);
      if (data) {
        setNombreCliente(data.nombre_cliente || "Razón social no disponible");
        if (setClienteId) {
          setClienteId(data.id_cliente || null);
        }
      } else {
        setNombreCliente("RUC no encontrado");
        if (setClienteId) {
          setClienteId(null);
        }
      }
    } else {
      // 🛑 Limpiar si la entrada no es válida
      setNombreCliente("");
      if (setClienteId) {
        setClienteId(null);
      }
    }
  };
  const handleFinalizarVenta = () => {
    if (totalCarrito === 0) {
      alert("⚠️ No se puede finalizar la venta sin productos.");
      return;
    }
  
    if (tipoPago === "Mixto" && (parseFloat(montoEfectivo) + parseFloat(montoTarjeta) < totalCarrito)) {
      alert("⚠️ El monto total ingresado no cubre el total de la venta.");
      return;
    }
  
    // ✅ Verificar si carrito está llegando correctamente
    console.log("🛒 Carrito antes de finalizar venta:", carrito);
  
    const venta = {
      tipoVenta,
      tipoPago,
      dniRuc,
      nombreCliente,
      total: totalCarrito,
      montoEfectivo: parseFloat(montoEfectivo) || 0,
      montoTarjeta: parseFloat(montoTarjeta) || 0,
      vuelto,
      productos: carrito, // ✅ Agregar los productos al objeto de venta
    };
  
    console.log("✅ Venta Finalizada:", venta);
  
    if (onFinalizarVenta) {
      onFinalizarVenta(venta); // ✅ Enviar `venta` con los productos a `CarritoUI`
    }
  
    // Resetear valores
    setTipoVenta("Venta rápida");
    setTipoPago("Efectivo");
    setDniRuc("");
    setNombreCliente("");
    setMontoEfectivo("");
    setMontoTarjeta("");
    setVuelto(0);
  };
  

  return (
    <div className="metodo-pago-container">
      <h2 className="titulo">Método de pago</h2>
      <div className="formulario">
        {/* Tipo de Venta y DNI/RUC */}
        <div className="grupo">
          <label>Tipo de Venta</label>
          <select value={tipoVenta} onChange={handleTipoVentaChange}>
            <option>Venta rápida</option>
            <option>Venta con Boleta</option>
            <option>Venta con Factura</option>
          </select>
        </div>

        <div className="grupo">
          <label>DNI / RUC</label>
          <input
            type="text"
            value={dniRuc}
            onChange={handleBuscarDniRuc}
            disabled={dniRucDisabled}
            placeholder={isBoleta ? "Ingresa DNI (8 dígitos)" : isFactura ? "Ingresa RUC (11 dígitos)" : "Ingresa DNI/RUC"}
            maxLength={maxLength}
          />
          <p className="subtexto">
            {nombreCliente ? `Nombre/Razón social: ${nombreCliente}` : "Nombre/Razón social"}
          </p>
        </div>

        {/* Tipo de Pago y Montos */}
        <div className="grupo">
          <label>Tipo de Pago</label>
          <select value={tipoPago} onChange={handleTipoPagoChange} disabled={tipoPagoDisabled}>
            <option>Efectivo</option>
            <option>Tarjeta/POS</option>
            <option>Mixto</option>
          </select>
        </div>

        <div className="grupo">
          <label>Monto en efectivo</label>
          <input
            type="number"
            value={montoEfectivo}
            onChange={(e) => setMontoEfectivo(e.target.value)}
            disabled={montoEfectivoDisabled}
          />
        </div>

        <div className="grupo">
          <label>Monto en Tarjeta/POS</label>
          <input
            type="number"
            value={montoTarjeta}
            onChange={(e) => setMontoTarjeta(e.target.value)}
            disabled={montoTarjetaDisabled}
          />
        </div>

        <div className="vuelto-container">
          <p>Vuelto a dar</p>
          <p className="vuelto-monto">S/ {vuelto.toFixed(2)}</p>
        </div>
      </div>
      {/* Botón para finalizar la venta */}
      {totalCarrito > 0 && montoSuficiente && (
        <div className="finalizar-container">
          <button 
            className="btn-finalizar"
            onClick={handleFinalizarVenta}
          >
            Finalizar Venta
          </button>
        </div>
      )}


    </div>
  );
  
}
