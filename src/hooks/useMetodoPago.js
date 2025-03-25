// src/hooks/useMetodoPago.js
import { useState, useEffect } from "react";
import moment from "moment-timezone";
import { obtenerDatosPorDni, obtenerDatosPorRuc } from "./../services/reniecService";
import { registrarVenta } from "./../services/ventaService";

export function useMetodoPago({
  setClienteId,
  totalCarrito,
  carrito,
  setCarrito,
  setProductos,
  onFinalizarVenta,
}) {
  // ====================================
  //  ESTADOS
  // ====================================
  const [tipoVenta, setTipoVenta] = useState("Venta rápida");
  const [tipoPago, setTipoPago] = useState("Efectivo");

  const [dniRuc, setDniRuc] = useState("");
  const [nombreCliente, setNombreCliente] = useState("");

  // Guardamos montos como STRING para permitir decimales
  const [montoEfectivo, setMontoEfectivo] = useState("");
  const [montoTarjeta, setMontoTarjeta] = useState("");

  const [vuelto, setVuelto] = useState(0);

  // Este ID interno lo usas para la BD
  const [myClienteId, setMyClienteId] = useState(null);

  // ====================================
  //  FLAGS y DERIVADOS
  // ====================================
  const carritoVacio = totalCarrito === 0;
  const isBoleta = tipoVenta === "Venta con Boleta";
  const isFactura = tipoVenta === "Venta con Factura";
  const maxLength = isBoleta ? 8 : isFactura ? 11 : 11;

  // Convierto a número cuando haga cálculos
  const montoEfectivoNum = parseFloat(montoEfectivo) || 0;
  const montoTarjetaNum = parseFloat(montoTarjeta) || 0;

  // Verifica si el monto cubre el total
  const montoSuficiente =
    (tipoPago === "Efectivo" && montoEfectivoNum >= totalCarrito) ||
    (tipoPago === "Tarjeta/POS" && montoTarjetaNum >= totalCarrito) ||
    (tipoPago === "Mixto" && (montoEfectivoNum + montoTarjetaNum) >= totalCarrito);

  // Deshabilita inputs según tu lógica
  const dniRucDisabled = tipoVenta === "Venta rápida";
  const tipoPagoDisabled = carritoVacio;
  const montoEfectivoDisabled = (tipoPago === "Tarjeta/POS") || carritoVacio;
  const montoTarjetaDisabled = (tipoPago === "Efectivo") || carritoVacio;

  // ====================================
  //  CAMBIO TIPO DE VENTA
  // ====================================
  const handleTipoVentaChange = (e) => {
    const selected = e.target.value;
    setTipoVenta(selected);

    // Limpiamos datos cada vez que cambian
    setDniRuc("");
    setNombreCliente("");
    setClienteId(null);
    setMyClienteId(null);
  };

  // ====================================
  //  CAMBIO TIPO DE PAGO
  // ====================================
  const handleTipoPagoChange = (e) => {
    const nuevoTipoPago = e.target.value;
    // Solo si cambia de verdad
    if (nuevoTipoPago !== tipoPago) {
      setTipoPago(nuevoTipoPago);

      // Mantengo tu lógica original
      if (nuevoTipoPago === "Tarjeta/POS") {
        setMontoTarjeta(totalCarrito.toFixed(2)); // Forzamos total
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
    }
  };

  // =====================================
  //  TECLA ESPACIO => FINALIZAR VENTA
  // =====================================
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === " " && montoSuficiente) {
        handleFinalizarVenta();
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [montoSuficiente]);

  // =====================================
  //  CALCULAR VUELTO
  // =====================================
  useEffect(() => {
    if (tipoPago === "Efectivo") {
      setVuelto(montoEfectivoNum > totalCarrito ? montoEfectivoNum - totalCarrito : 0);
    } else if (tipoPago === "Mixto") {
      const totalPagado = montoEfectivoNum + montoTarjetaNum;
      setVuelto(totalPagado > totalCarrito ? totalPagado - totalCarrito : 0);
    } else {
      setVuelto(0);
    }
  }, [montoEfectivo, montoTarjeta, totalCarrito, tipoPago]);

  // =====================================
  //  "VENTA RÁPIDA" => CLIENTE GENÉRICO
  // =====================================
  useEffect(() => {
    if (tipoVenta === "Venta rápida") {
      obtenerDatosPorDni("00000000") // ← Ojo: revisa si tu servicio soporta "00000000"
        .then((data) => {
          if (data && data.id_cliente) {  
            // TODO: Ajusta a la forma real de tu data
            setNombreCliente(data.nombre_cliente || "Cliente genérico");
            setClienteId(data.id_cliente);
            setMyClienteId(data.id_cliente);
          } else {
            setNombreCliente("Cliente no encontrado");
            setClienteId(null);
            setMyClienteId(null);
          }
        })
        .catch((error) => {
          console.error("Error al obtener cliente con DNI 00000000:", error);
        });
    }
  }, [tipoVenta]);

  // =====================================
  //  BUSCAR DNI/RUC (Boleta o Factura)
  // =====================================
  const handleBuscarDniRuc = async (e) => {
    const numeroIngresado = e.target.value.replace(/\D/g, "");
    setDniRuc(numeroIngresado);

    // Lógica solo si coincide con la cantidad de dígitos
    if (isBoleta && numeroIngresado.length === 8) {
      const data = await obtenerDatosPorDni(numeroIngresado);
      if (data && data.id_cliente) {
        // TODO: Ajusta "data.id_cliente" a lo que retorne tu backend (podría ser "data.id")
        setNombreCliente(data.nombre_cliente || "Nombre no disponible");
        setClienteId(data.id_cliente);
        setMyClienteId(data.id_cliente);
      } else {
        setNombreCliente("DNI no encontrado");
        setClienteId(null);
        setMyClienteId(null);
      }
    } else if (isFactura && numeroIngresado.length === 11) {
      const data = await obtenerDatosPorRuc(numeroIngresado);
      if (data && data.id_cliente) {
        // TODO: Ajusta si tu backend retorna "data.id" o similar
        setNombreCliente(data.nombre_cliente || "Razón social no disponible");
        setClienteId(data.id_cliente);
        setMyClienteId(data.id_cliente);
      } else {
        setNombreCliente("RUC no encontrado");
        setClienteId(null);
        setMyClienteId(null);
      }
    } else {
      // Si no coincide con 8 o 11, limpiamos
      setNombreCliente("");
      setClienteId(null);
      setMyClienteId(null);
    }
  };

  // =====================================
  //  FINALIZAR VENTA
  // =====================================
  const handleFinalizarVenta = async () => {
    if (totalCarrito === 0) {
      alert("⚠️ No se puede finalizar la venta sin productos.");
      return;
    }

    // Calculamos el monto total
    let montoTotal = 0;
    if (tipoPago === "Efectivo") {
      montoTotal = montoEfectivoNum;
    } else if (tipoPago === "Mixto") {
      montoTotal = montoEfectivoNum + montoTarjetaNum;
    } else {
      // Tarjeta/POS
      montoTotal = montoTarjetaNum;
    }

    if (montoTotal < totalCarrito) {
      alert("⚠️ El monto ingresado no cubre el total de la venta.");
      return;
    }

    const vueltoCalculado =
      tipoPago === "Efectivo" || tipoPago === "Mixto"
        ? montoTotal - totalCarrito
        : 0;

    const ventaBoleta = {
      tipoVenta,
      tipoPago,
      dniRuc,
      nombreCliente,
      total: totalCarrito,
      montoEfectivo: montoEfectivoNum,
      montoTarjeta: montoTarjetaNum,
      vuelto: vueltoCalculado,
      productos: carrito,
    };
    console.log("✅ Venta Finalizada (Boleta):", ventaBoleta);

    // Notificar al padre para boleta/voucher
    if (onFinalizarVenta) {
      onFinalizarVenta(ventaBoleta);
    }

    // Registrar en la BD
    try {
      const datosParaBD = {
        vendedor_id: 1,
        // Usa `myClienteId` para la BD
        cliente_id: myClienteId || null, 
        fecha: moment().tz("America/Lima").format("YYYY-MM-DD"),
        hora: moment().tz("America/Lima").format("HH:mm:ss"),
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
      } else {
        alert("⚠️ La venta no se registró en la base de datos. Intenta nuevamente.");
      }
    } catch (error) {
      console.error("❌ Error al registrar la venta:", error);
      alert("❌ Ocurrió un error al registrar la venta.");
    }

    // Reset
    resetVenta();
  };

  // =====================================
  //  RESET
  // =====================================
  const resetVenta = () => {
    setTipoVenta("Venta rápida");
    setTipoPago("Efectivo");
    setDniRuc("");
    setNombreCliente("");
    setMontoEfectivo("");
    setMontoTarjeta("");
    setVuelto(0);
    setCarrito([]);

    // Disminuir stock según el carrito
    setProductos((prev) =>
      prev.map((producto) => {
        const vendido = carrito.find((p) => p.id_producto === producto.id_producto);
        return vendido
          ? {
              ...producto,
              stock_disponible: producto.stock_disponible - vendido.cantidad,
            }
          : producto;
      })
    );
  };

  // =====================================
  //  RETORNO DE DATOS Y MÉTODOS
  // =====================================
  return {
    // Estados
    tipoVenta,
    tipoPago,
    dniRuc,
    nombreCliente,
    montoEfectivo,
    montoTarjeta,
    vuelto,
    maxLength,

    // Flags
    dniRucDisabled,
    tipoPagoDisabled,
    montoEfectivoDisabled,
    montoTarjetaDisabled,
    montoSuficiente,
    carritoVacio,

    // Métodos
    handleTipoVentaChange,
    handleTipoPagoChange,
    handleBuscarDniRuc,
    handleFinalizarVenta,

    // Si lo necesitas en tu UI
    setMontoEfectivo,
    setMontoTarjeta,
  };
}
