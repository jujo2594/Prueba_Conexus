using System;
using System.Collections.Generic;
using Conexus.Data.Models;
using Microsoft.EntityFrameworkCore;

namespace Conexus.Data.Data;

public partial class ConexusDbContext : DbContext
{
    public ConexusDbContext()
    {
    }

    public ConexusDbContext(DbContextOptions<ConexusDbContext> options)
        : base(options)
    {
    }

    public virtual DbSet<Cliente> Clientes { get; set; }

    public virtual DbSet<DetalleFactura> DetalleFacturas { get; set; }

    public virtual DbSet<Emisor> Emisores { get; set; }

    public virtual DbSet<Factura> Facturas { get; set; }

    public virtual DbSet<Producto> Productos { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Cliente>(entity =>
        {
            entity.HasKey(e => e.IdCliente).HasName("PK__Clientes__677F38F593608062");

            entity.HasIndex(e => e.Email, "UQ__Clientes__AB6E6164D5486841").IsUnique();

            entity.HasIndex(e => e.Identificacion, "UQ__Clientes__C196DEC7686A9788").IsUnique();

            entity.HasIndex(e => e.Identificacion, "idx_clientes_identificacion");

            entity.HasIndex(e => new { e.Nombres, e.Apellidos }, "idx_clientes_nombre");

            entity.Property(e => e.IdCliente).HasColumnName("id_cliente");
            entity.Property(e => e.Apellidos)
                .HasMaxLength(100)
                .IsUnicode(false)
                .HasColumnName("apellidos");
            entity.Property(e => e.Direccion)
                .HasMaxLength(100)
                .IsUnicode(false)
                .HasColumnName("direccion");
            entity.Property(e => e.Email)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("email");
            entity.Property(e => e.Identificacion)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("identificacion");
            entity.Property(e => e.Nombres)
                .HasMaxLength(100)
                .IsUnicode(false)
                .HasColumnName("nombres");
            entity.Property(e => e.Telefono)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("telefono");
        });

        modelBuilder.Entity<DetalleFactura>(entity =>
        {
            entity.HasKey(e => e.IdDetalleFactura).HasName("PK__DetalleF__F6BFE34387D588FD");

            entity.ToTable("DetalleFactura");

            entity.HasIndex(e => new { e.IdFactura, e.IdProducto }, "idx_detalle_factura_producto").IsUnique();

            entity.HasIndex(e => e.IdProducto, "idx_detalle_id_producto");

            entity.Property(e => e.IdDetalleFactura).HasColumnName("id_detalle_factura");
            entity.Property(e => e.Cantidad).HasColumnName("cantidad");
            entity.Property(e => e.IdFactura).HasColumnName("id_factura");
            entity.Property(e => e.IdProducto).HasColumnName("id_producto");
            entity.Property(e => e.PrecioUnitario)
                .HasColumnType("decimal(18, 2)")
                .HasColumnName("precio_unitario");
            entity.Property(e => e.Subtotal)
                .HasColumnType("decimal(18, 2)")
                .HasColumnName("subtotal");
            entity.Property(e => e.Total)
                .HasColumnType("decimal(18, 2)")
                .HasColumnName("total");

            entity.HasOne(d => d.IdFacturaNavigation).WithMany(p => p.DetalleFacturas)
                .HasForeignKey(d => d.IdFactura)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("fk_detalle_factura");

            entity.HasOne(d => d.IdProductoNavigation).WithMany(p => p.DetalleFacturas)
                .HasForeignKey(d => d.IdProducto)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("fk_detalle_producto");
        });

        modelBuilder.Entity<Emisor>(entity =>
        {
            entity.HasKey(e => e.IdEmisor).HasName("PK__Emisor__86987B71B969CDFB");

            entity.ToTable("Emisor");

            entity.HasIndex(e => e.Email, "UQ__Emisor__AB6E6164C99F75D6").IsUnique();

            entity.HasIndex(e => e.Identificacion, "UQ__Emisor__C196DEC7C012063D").IsUnique();

            entity.HasIndex(e => e.Identificacion, "idx_emisor_identificacion");

            entity.HasIndex(e => e.RazonSocial, "idx_emisor_razon_social");

            entity.Property(e => e.IdEmisor).HasColumnName("id_emisor");
            entity.Property(e => e.Direccion)
                .HasMaxLength(100)
                .IsUnicode(false)
                .HasColumnName("direccion");
            entity.Property(e => e.Email)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("email");
            entity.Property(e => e.Identificacion)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("identificacion");
            entity.Property(e => e.RazonSocial)
                .HasMaxLength(100)
                .IsUnicode(false)
                .HasColumnName("razon_social");
            entity.Property(e => e.Telefono)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("telefono");
        });

        modelBuilder.Entity<Factura>(entity =>
        {
            entity.HasKey(e => e.IdFactura).HasName("PK__Factura__6C08ED533F25AF1C");

            entity.ToTable("Factura");

            entity.HasIndex(e => e.FechaFactura, "idx_factura_fecha");

            entity.Property(e => e.IdFactura).HasColumnName("id_factura");
            entity.Property(e => e.FechaFactura)
                .HasDefaultValueSql("(getdate())")
                .HasColumnType("datetime")
                .HasColumnName("fecha_factura");
            entity.Property(e => e.IdCliente).HasColumnName("id_cliente");
            entity.Property(e => e.IdEmisor).HasColumnName("id_emisor");
            entity.Property(e => e.TotalFactura)
                .HasColumnType("decimal(18, 2)")
                .HasColumnName("total_factura");

            entity.HasOne(d => d.IdClienteNavigation).WithMany(p => p.Facturas)
                .HasForeignKey(d => d.IdCliente)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("fk_factura_cliente");

            entity.HasOne(d => d.IdEmisorNavigation).WithMany(p => p.Facturas)
                .HasForeignKey(d => d.IdEmisor)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("fk_factura_emisor");
        });

        modelBuilder.Entity<Producto>(entity =>
        {
            entity.HasKey(e => e.IdProducto).HasName("PK__Producto__FF341C0D2B6F17A3");

            entity.ToTable("Producto");

            entity.HasIndex(e => e.Codigo, "UQ__Producto__40F9A206A54EBD46").IsUnique();

            entity.HasIndex(e => e.NombreProducto, "idx_producto_nombre");

            entity.Property(e => e.IdProducto).HasColumnName("id_producto");
            entity.Property(e => e.Codigo)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("codigo");
            entity.Property(e => e.Descripcion)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("descripcion");
            entity.Property(e => e.NombreProducto)
                .HasMaxLength(100)
                .IsUnicode(false)
                .HasColumnName("nombre_producto");
            entity.Property(e => e.PrecioBase)
                .HasColumnType("decimal(18, 2)")
                .HasColumnName("precio_base");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
