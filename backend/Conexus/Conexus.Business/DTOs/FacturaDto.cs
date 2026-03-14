namespace Conexus.Business.DTOs
{
    public class FacturaDto
    {
        public int IdFactura { get; set; }
        public int IdCliente { get; set; }
        public string NombreCliente { get; set; } = string.Empty;
        public int IdEmisor { get; set; }
        public string RazonSocial { get; set; } = string.Empty;
        public DateTime FechaFactura { get; set; }
        public decimal TotalFactura { get; set; }
        public List<DetalleFacturaDto> Detalles { get; set; } = new();
    }
}
