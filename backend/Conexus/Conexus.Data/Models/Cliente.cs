using System;
using System.Collections.Generic;

namespace Conexus.Data.Models;

public partial class Cliente
{
    public int IdCliente { get; set; }

    public string Identificacion { get; set; } = null!;

    public string Nombres { get; set; } = null!;

    public string Apellidos { get; set; } = null!;

    public string Telefono { get; set; } = null!;

    public string Email { get; set; } = null!;

    public string Direccion { get; set; } = null!;

    public virtual ICollection<Factura> Facturas { get; set; } = new List<Factura>();
}
