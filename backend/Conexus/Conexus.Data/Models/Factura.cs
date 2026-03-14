using System;
using System.Collections.Generic;

namespace Conexus.Data.Models;

public partial class Factura
{
    public int IdFactura { get; set; }

    public int IdCliente { get; set; }

    public int IdEmisor { get; set; }

    public DateTime FechaFactura { get; set; }

    public decimal TotalFactura { get; set; }

    public virtual ICollection<DetalleFactura> DetalleFacturas { get; set; } = new List<DetalleFactura>();

    public virtual Cliente IdClienteNavigation { get; set; } = null!;

    public virtual Emisor IdEmisorNavigation { get; set; } = null!;
}
