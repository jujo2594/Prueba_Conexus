using System;
using System.Collections.Generic;

namespace Conexus.Data.Models;

public partial class Producto
{
    public int IdProducto { get; set; }

    public string NombreProducto { get; set; } = null!;

    public string Codigo { get; set; } = null!;

    public string? Descripcion { get; set; }

    public decimal PrecioBase { get; set; }

    public virtual ICollection<DetalleFactura> DetalleFacturas { get; set; } = new List<DetalleFactura>();
}
