namespace Conexus.Business.DTOs
{
    public class DashboardDto
    {
        public string NombreProducto { get; set; } = string.Empty;
        public decimal TotalVentas { get; set; }
        public decimal Porcentaje { get; set; }
    }
}
