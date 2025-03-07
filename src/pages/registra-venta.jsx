import { useState } from "react";
import { Input, Button, Card, CardContent, CardHeader, CardTitle, Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "./../components/componentes";

export default function SalesSystem() {
  const [quantity, setQuantity] = useState(0);

  return (
    <div className="p-6 space-y-6">
      {/* Método de Pago */}
      <Card>
        <CardHeader>
          <CardTitle>Método de pago</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-3 gap-4">
          <div>
            <label className="text-sm">Tipo de Venta</label>
            <select className="w-full p-2 border rounded-md">
              <option>Venta rápida</option>
              <option>Venta detallada</option>
            </select>
          </div>
          <div>
            <label className="text-sm">DNI / RUC</label>
            <Input placeholder="Ingresa DNI / RUC" />
          </div>
          <div>
            <label className="text-sm">Monto Efectivo</label>
            <Input placeholder="S/" />
          </div>
        </CardContent>
      </Card>

      {/* Producto */}
      <Card>
        <CardHeader>
          <CardTitle>Producto</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Input placeholder="Escanea o escribe el código/nombre" />
          <div className="grid grid-cols-5 gap-4">
            <div>
              <label className="text-sm">Cantidad</label>
              <Input type="number" value={quantity} onChange={(e) => setQuantity(e.target.value)} />
            </div>
            <div>
              <label className="text-sm">Categoría</label>
              <Input disabled value="-" />
            </div>
            <div>
              <label className="text-sm">Precio Unitario</label>
              <Input disabled value="S/ 0.00" />
            </div>
            <div>
              <label className="text-sm">Stock disponible</label>
              <Input disabled value="0" />
            </div>
          </div>
          <div className="flex space-x-4">
            <Button>Agregar producto al carrito</Button>
            <Button variant="destructive">Eliminar producto</Button>
          </div>
        </CardContent>
      </Card>

      {/* Carrito */}
      <Card>
        <CardHeader>
          <CardTitle>Carrito</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Código</TableHead>
                <TableHead>Producto</TableHead>
                <TableHead>Presentación</TableHead>
                <TableHead>Cantidad</TableHead>
                <TableHead>Precio x Un/Kg</TableHead>
                <TableHead>Descuento</TableHead>
                <TableHead>Subtotal</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell colSpan={0} className="text-center text-gray-500">
                  No hay productos en el carrito.
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
          <div className="flex justify-between mt-4">
            <div className="text-lg">Descuentos: S/ 0.00</div>
            <div className="text-lg font-bold">Total a pagar: S/ 0.00</div>
            <Button size="lg">Finalizar venta</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
