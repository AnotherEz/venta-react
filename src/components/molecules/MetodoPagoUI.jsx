import React from "react";
import "./../../assets/metpago.css";

// Importa el custom hook
import { useMetodoPago } from "./../../hooks/useMetodoPago";

// Importa los subcomponentes
import TipoVentaSelector from "./../atoms/TipoVentaSelector";
import DniRucInput from "./../atoms//DniRucInput";
import TipoPagoSelector from "./../atoms/TipoPagoSelector";
import MontosPago from "./../atoms/MontosPago";
import BotonFinalizarVenta from "./../atoms/BotonFinalizarVenta";

export default function MetodoPago({
  setClienteId,
  totalCarrito,
  carrito,
  setCarrito,
  setProductos,
  onFinalizarVenta,
}) {
  const {
    tipoVenta,
    tipoPago,
    dniRuc,
    nombreCliente,
    montoEfectivo,
    montoTarjeta,
    vuelto,
    maxLength,
    dniRucDisabled,
    tipoPagoDisabled,
    montoEfectivoDisabled,
    montoTarjetaDisabled,
    montoSuficiente,
    carritoVacio,
    handleTipoVentaChange,
    handleTipoPagoChange,
    handleBuscarDniRuc,
    handleFinalizarVenta,

    // ⏬ Asegúrate de que tu hook exponga los setters:
    setMontoEfectivo,
    setMontoTarjeta,
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
      <h2 className="titulo">Método de pago</h2>
      <div className="formulario">
        {/* Tipo de Venta */}
        <TipoVentaSelector
          tipoVenta={tipoVenta}
          onChangeTipoVenta={handleTipoVentaChange}
        />

        {/* DNI / RUC */}
        <DniRucInput
          dniRuc={dniRuc}
          nombreCliente={nombreCliente}
          disabled={dniRucDisabled}
          maxLength={maxLength}
          isBoleta={isBoleta}
          isFactura={isFactura}
          onChangeDniRuc={handleBuscarDniRuc}
        />

        {/* Tipo de Pago */}
        <TipoPagoSelector
          tipoPago={tipoPago}
          disabled={tipoPagoDisabled}
          onChangeTipoPago={handleTipoPagoChange}
        />

        {/* Montos */}
        <MontosPago
          montoEfectivo={montoEfectivo}
          montoTarjeta={montoTarjeta}
          vuelto={vuelto}
          montoEfectivoDisabled={montoEfectivoDisabled}
          montoTarjetaDisabled={montoTarjetaDisabled}
          onChangeMontoEfectivo={(valor) => setMontoEfectivo(valor)}
          onChangeMontoTarjeta={(valor) => setMontoTarjeta(valor)}
        />
      </div>

      {/* Botón para finalizar la venta */}
      <BotonFinalizarVenta
        totalCarrito={totalCarrito}
        montoSuficiente={montoSuficiente}
        onFinalizar={handleFinalizarVenta}
      />
    </div>
  );
}
