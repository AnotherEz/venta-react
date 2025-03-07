import { useState } from "react";
import "./../assets/metpago.css"; // Importamos el CSS

export default function MetodoPago() {
  // Estados
  const [tipoVenta, setTipoVenta] = useState("Venta rápida");
  const [tipoPago, setTipoPago] = useState("Efectivo");
  const [dniRuc, setDniRuc] = useState("");
  const [montoEfectivo, setMontoEfectivo] = useState("");
  const [montoTarjeta, setMontoTarjeta] = useState("");
  const [carritoVacio, setCarritoVacio] = useState(true);
  const [vuelto, setVuelto] = useState(0);

  // Validaciones dinámicas
  const dniRucDisabled = tipoVenta === "Venta rápida";
  const tipoPagoDisabled = carritoVacio;
  const montoEfectivoDisabled = tipoPago === "Tarjeta/POS" || carritoVacio;
  const montoTarjetaDisabled = tipoPago === "Efectivo" || carritoVacio;

  // Manejo del cambio de tipo de venta
  const handleTipoVentaChange = (e) => {
    const selectedTipoVenta = e.target.value;
    setTipoVenta(selectedTipoVenta);

    if (selectedTipoVenta === "Venta rápida") {
      setDniRuc("");
    }
  };

  // Manejo del cambio de tipo de pago
  const handleTipoPagoChange = (e) => {
    const selectedTipoPago = e.target.value;
    setTipoPago(selectedTipoPago);

    if (selectedTipoPago === "Tarjeta/POS") {
      setMontoEfectivo("");
    }
    if (selectedTipoPago === "Efectivo") {
      setMontoTarjeta("");
    }
  };

  // Cálculo del vuelto
  const totalCompra = 100; // Simulación del total de compra
  const calcularVuelto = () => {
    const efectivo = parseFloat(montoEfectivo) || 0;
    setVuelto(efectivo > totalCompra ? efectivo - totalCompra : 0);
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
            onChange={(e) => setDniRuc(e.target.value)}
            disabled={dniRucDisabled}
            placeholder="Ingresa DNI / RUC"
          />
          <p className="subtexto">Nombre/Razón social</p>
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
