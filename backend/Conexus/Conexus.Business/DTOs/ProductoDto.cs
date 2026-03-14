namespace Conexus.Business.DTOs
{
    public class ProductoDto
    {
        public int IdProducto { get; set; }
        public string Codigo { get; set; } = string.Empty;
        public string NombreProducto { get; set; } = string.Empty;
        public string? Descripcion { get; set; }
        public decimal PrecioBase { get; set; }
    }
}
