import { useState, useEffect } from "react"; 
import moment from 'moment-timezone';
import { obtenerDatosPorDni, obtenerDatosPorRuc } from "../services/reniecService";
import { registrarVenta } from "../services/ventaService"; // 🆕 Para registrar venta
import "./../assets/metpago.css";

export default function MetodoPago({ 
  setClienteId,      // No se quita nada de tu lógica
  totalCarrito, 
  carrito, 
  setCarrito,
  setProductos,    
  onFinalizarVenta 
}) {
  // ESTADOS
  const [tipoVenta, setTipoVenta] = useState("Venta rápida");
  const [tipoPago, setTipoPago] = useState("Efectivo");
  const [dniRuc, setDniRuc] = useState("");
  const [nombreCliente, setNombreCliente] = useState("");
  const [montoEfectivo, setMontoEfectivo] = useState("");
  const [montoTarjeta, setMontoTarjeta] = useState("");
  const [vuelto, setVuelto] = useState(0);

  // ID interno para la BD (no romper tu setClienteId)
  const [myClienteId, setMyClienteId] = useState(null);

  const carritoVacio = totalCarrito === 0;

  const montoSuficiente =
    (tipoPago === "Efectivo" && parseFloat(montoEfectivo) >= totalCarrito) ||
    (tipoPago === "Tarjeta/POS" && parseFloat(montoTarjeta) >= totalCarrito) ||
    (tipoPago === "Mixto" && parseFloat(montoEfectivo) + parseFloat(montoTarjeta) >= totalCarrito);

  const dniRucDisabled = tipoVenta === "Venta rápida";
  const tipoPagoDisabled = carritoVacio;
  const montoEfectivoDisabled = tipoPago === "Tarjeta/POS" || carritoVacio;
  const montoTarjetaDisabled = tipoPago === "Efectivo" || carritoVacio;

  const isBoleta = tipoVenta === "Venta con Boleta";
  const isFactura = tipoVenta === "Venta con Factura";
  const maxLength = isBoleta ? 8 : isFactura ? 11 : 11;

  // Cambio de tipo de venta
  const handleTipoVentaChange = (e) => {
    const selectedTipoVenta = e.target.value;
    setTipoVenta(selectedTipoVenta);
    setDniRuc("");
    setNombreCliente("");
    setClienteId(null);    
    setMyClienteId(null);  
  };

  // Cambio de tipo de pago
  const handleTipoPagoChange = (e) => {
    const nuevoTipoPago = e.target.value;
    setTipoPago(nuevoTipoPago);
  
    if (nuevoTipoPago === "Tarjeta/POS") {
      setMontoTarjeta(totalCarrito.toFixed(2));
      setMontoEfectivo("");
      setVuelto(0);
    } else if (nuevoTipoPago === "Efectivo") {
      setMontoTarjeta("");
      setVuelto(0);
    } else if (nuevoTipoPago === "Mixto") {
      setMontoTarjeta("");
      setMontoEfectivo("");
      setVuelto(0);
    }
  };

  // Tecla Espacio
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === " " && montoSuficiente) {
        handleFinalizarVenta();
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [montoSuficiente]);

  // Cálculo del vuelto
  useEffect(() => {
    const efectivo = parseFloat(montoEfectivo) || 0;
    const tarjeta = parseFloat(montoTarjeta) || 0;

    if (tipoPago === "Efectivo") {
      setVuelto(efectivo > totalCarrito ? efectivo - totalCarrito : 0);
    } else if (tipoPago === "Mixto") {
      const totalPagado = efectivo + tarjeta;
      setVuelto(totalPagado > totalCarrito ? totalPagado - totalCarrito : 0);
    } else {
      setVuelto(0);
    }
  }, [montoEfectivo, montoTarjeta, totalCarrito, tipoPago]);

  // "Venta rápida" => asignar un cliente genérico
  useEffect(() => {
    if (tipoVenta === "Venta rápida") {
      obtenerDatosPorDni("00000000")
        .then((data) => {
          if (data) {
            setNombreCliente(data.nombre_cliente || "Cliente genérico");
            setClienteId(data.id_cliente || 1);
            setMyClienteId(data.id_cliente || 1);
          } else {
            setNombreCliente("Cliente no encontrado");
            setClienteId(1);
            setMyClienteId(1);
          }
        })
        .catch((error) => {
          console.error("Error al obtener cliente con DNI 00000000:", error);
        });
    }
  }, [tipoVenta]);

  // Buscar DNI/RUC
  const handleBuscarDniRuc = async (e) => {
    const numeroIngresado = e.target.value.replace(/\D/g, "");
    setDniRuc(numeroIngresado);

    if (isBoleta && numeroIngresado.length === 8) {
      const data = await obtenerDatosPorDni(numeroIngresado);
      if (data) {
        setNombreCliente(data.nombre_cliente || "Nombre no disponible");
        setClienteId(data.id_cliente || 1); 
        setMyClienteId(data.id_cliente || 1);
      } else {
        setNombreCliente("DNI no encontrado");
        setClienteId(1);
        setMyClienteId(1);
      }
    } else if (isFactura && numeroIngresado.length === 11) {
      const data = await obtenerDatosPorRuc(numeroIngresado);
      if (data) {
        setNombreCliente(data.nombre_cliente || "Razón social no disponible");
        setClienteId(data.id_cliente || 1);
        setMyClienteId(data.id_cliente || 1);
      } else {
        setNombreCliente("RUC no encontrado");
        setClienteId(1);
        setMyClienteId(1);
      }
    } else {
      setNombreCliente("");
      setClienteId(1);
      setMyClienteId(1);
    }
  };

  // Finalizar venta
  const handleFinalizarVenta = async () => {
    if (totalCarrito === 0) {
      alert("⚠️ No se puede finalizar la venta sin productos.");
      return;
    }

    const montoTotal =
      tipoPago === "Efectivo"
        ? parseFloat(montoEfectivo)
        : tipoPago === "Mixto"
        ? parseFloat(montoEfectivo) + parseFloat(montoTarjeta)
        : parseFloat(montoTarjeta);

    if (montoTotal < totalCarrito) {
      alert("⚠️ El monto ingresado no cubre el total de la venta.");
      return;
    }

    const vueltoCalculado =
      tipoPago === "Efectivo" || tipoPago === "Mixto"
        ? montoTotal - totalCarrito
        : 0;

    // Datos para la boleta
    const ventaBoleta = {
      tipoVenta,
      tipoPago,
      dniRuc,
      nombreCliente,
      total: totalCarrito,
      montoEfectivo: parseFloat(montoEfectivo) || 0,
      montoTarjeta: parseFloat(montoTarjeta) || 0,
      vuelto: vueltoCalculado,
      productos: carrito,
    };
    console.log("✅ Venta Finalizada (Boleta):", ventaBoleta);

    // Boleta
    if (onFinalizarVenta) {
      onFinalizarVenta(ventaBoleta);
    }

    // Registrar en la BD
    try {
      const datosParaBD = {
        vendedor_id: 1,
        cliente_id: myClienteId || 1,
        fecha: moment().tz('America/Lima').format('YYYY-MM-DD'),  // Fecha en Lima
        hora: moment().tz('America/Lima').format('HH:mm:ss'),    // Hora en Lima
        tipo_comprobante:
          tipoVenta === "Venta rápida"
            ? "RAPIDA"
            : tipoVenta === "Venta con Boleta"
            ? "BOLETA"
            : "FACTURA",
        importe_total: totalCarrito,
      };

      console.log("📤 Registrando venta en BD...", datosParaBD);

      const respuesta = await registrarVenta(datosParaBD);
      if (respuesta) {
        console.log("✅ Venta registrada en la BD:", respuesta);
      }
    } catch (error) {
      console.error("❌ Error al registrar la venta:", error);
    }

    resetVenta();
  };

  // Reset
  const resetVenta = () => {
    setTipoVenta("Venta rápida");
    setTipoPago("Efectivo");
    setDniRuc("");
    setNombreCliente("");
    setMontoEfectivo("");
    setMontoTarjeta("");
    setVuelto(0);
    setCarrito([]);
    setProductos((prevProductos) =>
      prevProductos.map((producto) => {
        const vendido = carrito.find((p) => p.id_producto === producto.id_producto);
        return vendido
          ? { ...producto, stock_disponible: producto.stock_disponible - vendido.cantidad }
          : producto;
      })
    );
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
            placeholder={
              isBoleta 
                ? "Ingresa DNI (8 dígitos)" 
                : isFactura 
                  ? "Ingresa RUC (11 dígitos)" 
                  : "Ingresa DNI/RUC"
            }
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
          <button className="btn-finalizar" onClick={handleFinalizarVenta}>
            Finalizar Venta
          </button>
        </div>
      )}
    </div>
  );
}
