import { useState } from "react";
import { obtenerDatosPorDni, obtenerDatosPorRuc } from "./../services/reniecService";
import "./../assets/metpago.css"; // Importamos el CSS

export default function MetodoPago({ setClienteId }) {
  // Estados
  const [tipoVenta, setTipoVenta] = useState("Venta rápida");
  const [tipoPago, setTipoPago] = useState("Efectivo");
  const [dniRuc, setDniRuc] = useState("");
  const [nombreCliente, setNombreCliente] = useState(""); // Para almacenar el nombre autocompletado
  const [montoEfectivo, setMontoEfectivo] = useState("");
  const [montoTarjeta, setMontoTarjeta] = useState("");
  const [carritoVacio, setCarritoVacio] = useState(true);
  const [vuelto, setVuelto] = useState(0);

  // Validaciones dinámicas
  const dniRucDisabled = tipoVenta === "Venta rápida";
  const tipoPagoDisabled = carritoVacio;
  const montoEfectivoDisabled = tipoPago === "Tarjeta/POS" || carritoVacio;
  const montoTarjetaDisabled = tipoPago === "Efectivo" || carritoVacio;

  // Definir el tipo de documento esperado
  const isBoleta = tipoVenta === "Venta con Boleta";
  const isFactura = tipoVenta === "Venta con Factura";
  const maxLength = isBoleta ? 8 : isFactura ? 11 : 11; // 8 para DNI, 11 para RUC

  // Manejo del cambio de tipo de venta
  const handleTipoVentaChange = (e) => {
    const selectedTipoVenta = e.target.value;
    setTipoVenta(selectedTipoVenta);
    setDniRuc("");
    setNombreCliente("");
    setClienteId(null); // Reiniciar clienteId al cambiar tipo de venta
  };

  // Manejo del cambio de tipo de pago
  const handleTipoPagoChange = (e) => {
    setTipoPago(e.target.value);
    if (e.target.value === "Tarjeta/POS") setMontoEfectivo("");
    if (e.target.value === "Efectivo") setMontoTarjeta("");
  };

  // Cálculo del vuelto
  const totalCompra = 100; // Simulación del total de compra
  const calcularVuelto = () => {
    const efectivo = parseFloat(montoEfectivo) || 0;
    setVuelto(efectivo > totalCompra ? efectivo - totalCompra : 0);
  };

  // Validar y buscar en la API
  const handleBuscarDniRuc = async (e) => {
    const numeroIngresado = e.target.value;
    setDniRuc(numeroIngresado);

    if (isBoleta && numeroIngresado.length === 8) {
      // 🔍 Buscar por DNI
      const data = await obtenerDatosPorDni(numeroIngresado);
      if (data) {
        setNombreCliente(data.nombre_cliente || "Nombre no disponible");
        setClienteId(data.id_cliente || null);
      } else {
        setNombreCliente("DNI no encontrado");
        setClienteId(null);
      }
    } else if (isFactura && numeroIngresado.length === 11) {
      // 🔍 Buscar por RUC
      const data = await obtenerDatosPorRuc(numeroIngresado);
      if (data) {
        setNombreCliente(data.nombre_cliente || "Razón social no disponible");
        setClienteId(data.id_cliente || null);
      } else {
        setNombreCliente("RUC no encontrado");
        setClienteId(null);
      }
    } else {
      // 🛑 Limpiar si la entrada no es válida
      setNombreCliente("");
      setClienteId(null);
    }
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
            type="text"
            value={montoEfectivo}
            onChange={(e) => {
              setMontoEfectivo(e.target.value);
              calcularVuelto();
            }}
            disabled={montoEfectivoDisabled}
          />
        </div>

        <div className="grupo">
          <label>Monto en Tarjeta/POS</label>
          <input
            type="text"
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
    </div>
  );
}
