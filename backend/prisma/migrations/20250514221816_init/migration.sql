-- CreateTable
CREATE TABLE "Empresa" (
    "id_empresa" SERIAL NOT NULL,
    "id_estado" INTEGER NOT NULL,
    "logo_empresa" TEXT,
    "nombre" TEXT NOT NULL,
    "rif" TEXT,
    "correo" TEXT,
    "direccion" TEXT,
    "telefono" TEXT,

    CONSTRAINT "Empresa_pkey" PRIMARY KEY ("id_empresa")
);

-- CreateTable
CREATE TABLE "Almacen" (
    "id_almacen" SERIAL NOT NULL,
    "id_empresa" INTEGER NOT NULL,
    "nombre" TEXT NOT NULL,
    "correo" TEXT,
    "direccion" TEXT,
    "telefono" TEXT,

    CONSTRAINT "Almacen_pkey" PRIMARY KEY ("id_almacen")
);

-- CreateTable
CREATE TABLE "User" (
    "id_user" SERIAL NOT NULL,
    "id_empresa" INTEGER NOT NULL,
    "id_rol" INTEGER NOT NULL,
    "id_almacen" INTEGER NOT NULL,
    "id_estado" INTEGER NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "foto_user" TEXT,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id_user")
);

-- CreateTable
CREATE TABLE "Proveedor" (
    "id_proveedor" SERIAL NOT NULL,
    "id_empresa" INTEGER NOT NULL,
    "nombre" TEXT NOT NULL,
    "rif" TEXT NOT NULL,
    "correo" TEXT,
    "direccion" TEXT,
    "telefono" TEXT,

    CONSTRAINT "Proveedor_pkey" PRIMARY KEY ("id_proveedor")
);

-- CreateTable
CREATE TABLE "Clientes" (
    "id_cliente" SERIAL NOT NULL,
    "id_empresa" INTEGER NOT NULL,
    "cedula" TEXT NOT NULL,
    "nombre" TEXT NOT NULL,
    "apellido" TEXT,
    "direccion" TEXT,
    "correo" TEXT,
    "telefono" TEXT,

    CONSTRAINT "Clientes_pkey" PRIMARY KEY ("id_cliente")
);

-- CreateTable
CREATE TABLE "Producto" (
    "id_producto" SERIAL NOT NULL,
    "id_producto_padre" INTEGER,
    "id_estado" INTEGER NOT NULL,
    "id_empresa" INTEGER NOT NULL,
    "id_proveedor" INTEGER,
    "sku" TEXT NOT NULL,
    "nombre" TEXT NOT NULL,
    "foto" TEXT,
    "descripcion" TEXT,
    "costo" DECIMAL(10,2),
    "precio" DECIMAL(10,2) NOT NULL,

    CONSTRAINT "Producto_pkey" PRIMARY KEY ("id_producto")
);

-- CreateTable
CREATE TABLE "Rol" (
    "id_rol" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "descripcion" TEXT,

    CONSTRAINT "Rol_pkey" PRIMARY KEY ("id_rol")
);

-- CreateTable
CREATE TABLE "ListaProductos" (
    "id_lista_productos" SERIAL NOT NULL,
    "id_productos" INTEGER NOT NULL,
    "id_ventas" INTEGER NOT NULL,
    "cantidad" INTEGER NOT NULL,
    "monto_unitario" DECIMAL(10,2) NOT NULL,
    "monto_total" DECIMAL(10,2) NOT NULL,

    CONSTRAINT "ListaProductos_pkey" PRIMARY KEY ("id_lista_productos")
);

-- CreateTable
CREATE TABLE "Stock" (
    "id_stock" SERIAL NOT NULL,
    "id_producto" INTEGER NOT NULL,
    "id_almacen" INTEGER NOT NULL,
    "id_movimiento_stock" INTEGER NOT NULL,
    "cantidad" INTEGER NOT NULL,
    "fecha_creacion" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "fecha_actualizacion" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Stock_pkey" PRIMARY KEY ("id_stock")
);

-- CreateTable
CREATE TABLE "MovimientoStock" (
    "id_movimiento_stock" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "descripcion" TEXT,

    CONSTRAINT "MovimientoStock_pkey" PRIMARY KEY ("id_movimiento_stock")
);

-- CreateTable
CREATE TABLE "Ventas" (
    "id_ventas" SERIAL NOT NULL,
    "id_usuario" INTEGER NOT NULL,
    "id_cliente" INTEGER NOT NULL,
    "id_estado" INTEGER NOT NULL,
    "monto_total" DECIMAL(10,2) NOT NULL,
    "fecha" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Ventas_pkey" PRIMARY KEY ("id_ventas")
);

-- CreateTable
CREATE TABLE "VentaPago" (
    "id_venta_pago" SERIAL NOT NULL,
    "id_metodo_pago" INTEGER NOT NULL,
    "id_venta" INTEGER NOT NULL,
    "tasa_cambio" DECIMAL(10,2),
    "monto_pagado_usd" DECIMAL(10,2),
    "fecha" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "VentaPago_pkey" PRIMARY KEY ("id_venta_pago")
);

-- CreateTable
CREATE TABLE "MetodoPago" (
    "id_metodo_pago" SERIAL NOT NULL,
    "id_moneda" INTEGER NOT NULL,
    "nombre" TEXT NOT NULL,
    "icon" TEXT,
    "fecha_creacion" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "fecha_actualizacion" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "MetodoPago_pkey" PRIMARY KEY ("id_metodo_pago")
);

-- CreateTable
CREATE TABLE "Moneda" (
    "id_moneda" SERIAL NOT NULL,
    "codigo" TEXT,
    "icon" TEXT,
    "nombre" TEXT NOT NULL,
    "simbolo" TEXT,
    "tasa_cambio" DECIMAL(10,2),
    "fecha_creacion" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "fecha_actualizacion" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Moneda_pkey" PRIMARY KEY ("id_moneda")
);

-- CreateTable
CREATE TABLE "Estado" (
    "id_estado" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,

    CONSTRAINT "Estado_pkey" PRIMARY KEY ("id_estado")
);

-- CreateTable
CREATE TABLE "Revoked_tokens" (
    "id_revoked_tokens" SERIAL NOT NULL,
    "token" TEXT NOT NULL,
    "id_usuario" INTEGER NOT NULL,
    "revoked_at" TIMESTAMP(3) NOT NULL,
    "reason" TEXT NOT NULL,

    CONSTRAINT "Revoked_tokens_pkey" PRIMARY KEY ("id_revoked_tokens")
);

-- CreateIndex
CREATE UNIQUE INDEX "Empresa_rif_key" ON "Empresa"("rif");

-- CreateIndex
CREATE UNIQUE INDEX "Empresa_correo_key" ON "Empresa"("correo");

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "Rol_nombre_key" ON "Rol"("nombre");

-- CreateIndex
CREATE UNIQUE INDEX "Moneda_codigo_key" ON "Moneda"("codigo");

-- CreateIndex
CREATE UNIQUE INDEX "Estado_nombre_key" ON "Estado"("nombre");

-- AddForeignKey
ALTER TABLE "Empresa" ADD CONSTRAINT "Empresa_id_estado_fkey" FOREIGN KEY ("id_estado") REFERENCES "Estado"("id_estado") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Almacen" ADD CONSTRAINT "Almacen_id_empresa_fkey" FOREIGN KEY ("id_empresa") REFERENCES "Empresa"("id_empresa") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_id_empresa_fkey" FOREIGN KEY ("id_empresa") REFERENCES "Empresa"("id_empresa") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_id_rol_fkey" FOREIGN KEY ("id_rol") REFERENCES "Rol"("id_rol") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_id_almacen_fkey" FOREIGN KEY ("id_almacen") REFERENCES "Almacen"("id_almacen") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_id_estado_fkey" FOREIGN KEY ("id_estado") REFERENCES "Estado"("id_estado") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Proveedor" ADD CONSTRAINT "Proveedor_id_empresa_fkey" FOREIGN KEY ("id_empresa") REFERENCES "Empresa"("id_empresa") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Clientes" ADD CONSTRAINT "Clientes_id_empresa_fkey" FOREIGN KEY ("id_empresa") REFERENCES "Empresa"("id_empresa") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Producto" ADD CONSTRAINT "Producto_id_estado_fkey" FOREIGN KEY ("id_estado") REFERENCES "Estado"("id_estado") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Producto" ADD CONSTRAINT "Producto_id_empresa_fkey" FOREIGN KEY ("id_empresa") REFERENCES "Empresa"("id_empresa") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Producto" ADD CONSTRAINT "Producto_id_proveedor_fkey" FOREIGN KEY ("id_proveedor") REFERENCES "Proveedor"("id_proveedor") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Producto" ADD CONSTRAINT "Producto_id_producto_padre_fkey" FOREIGN KEY ("id_producto_padre") REFERENCES "Producto"("id_producto") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ListaProductos" ADD CONSTRAINT "ListaProductos_id_productos_fkey" FOREIGN KEY ("id_productos") REFERENCES "Producto"("id_producto") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ListaProductos" ADD CONSTRAINT "ListaProductos_id_ventas_fkey" FOREIGN KEY ("id_ventas") REFERENCES "Ventas"("id_ventas") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Stock" ADD CONSTRAINT "Stock_id_producto_fkey" FOREIGN KEY ("id_producto") REFERENCES "Producto"("id_producto") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Stock" ADD CONSTRAINT "Stock_id_almacen_fkey" FOREIGN KEY ("id_almacen") REFERENCES "Almacen"("id_almacen") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Stock" ADD CONSTRAINT "Stock_id_movimiento_stock_fkey" FOREIGN KEY ("id_movimiento_stock") REFERENCES "MovimientoStock"("id_movimiento_stock") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Ventas" ADD CONSTRAINT "Ventas_id_usuario_fkey" FOREIGN KEY ("id_usuario") REFERENCES "User"("id_user") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Ventas" ADD CONSTRAINT "Ventas_id_cliente_fkey" FOREIGN KEY ("id_cliente") REFERENCES "Clientes"("id_cliente") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Ventas" ADD CONSTRAINT "Ventas_id_estado_fkey" FOREIGN KEY ("id_estado") REFERENCES "Estado"("id_estado") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VentaPago" ADD CONSTRAINT "VentaPago_id_metodo_pago_fkey" FOREIGN KEY ("id_metodo_pago") REFERENCES "MetodoPago"("id_metodo_pago") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VentaPago" ADD CONSTRAINT "VentaPago_id_venta_fkey" FOREIGN KEY ("id_venta") REFERENCES "Ventas"("id_ventas") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MetodoPago" ADD CONSTRAINT "MetodoPago_id_moneda_fkey" FOREIGN KEY ("id_moneda") REFERENCES "Moneda"("id_moneda") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Revoked_tokens" ADD CONSTRAINT "Revoked_tokens_id_usuario_fkey" FOREIGN KEY ("id_usuario") REFERENCES "User"("id_user") ON DELETE RESTRICT ON UPDATE CASCADE;
