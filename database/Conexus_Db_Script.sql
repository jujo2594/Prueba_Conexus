CREATE DATABASE Conexus_Db;

USE Conexus_Db;

/* CREACION DE LAS TABLAS DE MI BASE DE DATOS */

CREATE TABLE [Clientes] (
  [id_cliente] integer PRIMARY KEY IDENTITY(1, 1),
  [identificacion] varchar(50) UNIQUE NOT NULL,
  [nombres] varchar(100) NOT NULL,
  [apellidos] varchar(100) NOT NULL,
  [telefono] varchar(50) NOT NULL,
  [email] varchar(50) UNIQUE NOT NULL,
  [direccion] varchar(100) NOT NULL
)
GO

CREATE TABLE [Emisor] (
  [id_emisor] integer PRIMARY KEY IDENTITY(1, 1),
  [identificacion] varchar(50) UNIQUE NOT NULL,
  [razon_social] varchar(100) NOT NULL,
  [telefono] varchar(50) NOT NULL,
  [email] varchar(50) UNIQUE NOT NULL,
  [direccion] varchar(100) NOT NULL
)
GO

CREATE TABLE [Factura] (
  [id_factura] integer PRIMARY KEY IDENTITY(1, 1),
  [id_cliente] integer NOT NULL,
  [id_emisor] integer NOT NULL,
  [fecha_factura] timestamp DEFAULT 'now()',
  [total_factura] decimal(18,2) NOT NULL,
  CONSTRAINT [chk_positive_total_factura] CHECK (total_factura >= 0)
)
GO

CREATE TABLE [DetalleFactura] (
  [id_detalle_factura] integer PRIMARY KEY IDENTITY(1, 1),
  [id_factura] integer NOT NULL,
  [id_producto] integer NOT NULL,
  [cantidad] integer NOT NULL,
  [precio_unitario] decimal(18,2) NOT NULL,
  [subtotal] decimal(18,2) NOT NULL,
  [total] decimal(18,2) NOT NULL,
  CONSTRAINT [chk_positive_cantidad] CHECK (cantidad >= 0),
  CONSTRAINT [chk_positive_precio_unitario] CHECK (precio_unitario >= 0),
  CONSTRAINT [chk_positive_total] CHECK (total >= 0)
)
GO

CREATE TABLE [Producto] (
  [id_producto] integer PRIMARY KEY IDENTITY(1, 1),
  [nombre_producto] varchar(100) NOT NULL,
  [codigo] varchar(50) UNIQUE NOT NULL,
  [descripcion] varchar(255),
  [precio_base] decimal(18,2) NOT NULL,
  CONSTRAINT [chk_positive_precio_base] CHECK (precio_base >= 0)
)
GO

/* DEFINIR LOS INDICES DE LAS DIFERENTE TABLAS */

CREATE INDEX [idx_clientes_identificacion] ON [Clientes] ("identificacion")
GO

CREATE INDEX [idx_clientes_nombre] ON [Clientes] ("nombres", "apellidos")
GO

CREATE INDEX [idx_emisor_identificacion] ON [Emisor] ("identificacion")
GO

CREATE INDEX [idx_emisor_razon_social] ON [Emisor] ("razon_social")
GO

CREATE INDEX [idx_factura_fecha] ON [Factura] ("fecha_factura")
GO

CREATE UNIQUE INDEX [idx_detalle_factura_producto] ON [DetalleFactura] ("id_factura", "id_producto")
GO

CREATE INDEX [idx_detalle_id_producto] ON [DetalleFactura] ("id_producto")
GO

CREATE INDEX [idx_producto_nombre] ON [Producto] ("nombre_producto")
GO

/* DEFINIR LAS RESTRICCIONES, LAS DIFERENTES LLAVES FORANEAS DE MIS TABLAS */

ALTER TABLE [Factura] ADD CONSTRAINT [fk_factura_cliente]
FOREIGN KEY ([id_cliente]) REFERENCES [Clientes] ([id_cliente])
GO
ALTER TABLE [Factura] ADD CONSTRAINT [fk_factura_emisor]
FOREIGN KEY ([id_emisor]) REFERENCES [Emisor] ([id_emisor])
GO
ALTER TABLE [DetalleFactura] ADD CONSTRAINT [fk_detalle_factura]
FOREIGN KEY ([id_factura]) REFERENCES [Factura] ([id_factura])
GO
ALTER TABLE [DetalleFactura] ADD CONSTRAINT [fk_detalle_producto]
FOREIGN KEY ([id_producto]) REFERENCES [Producto] ([id_producto])
GO