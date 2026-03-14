namespace Conexus.Business.DTOs
{
    public class EmisorDto
    {
        public int IdEmisor { get; set; }
        public string Identificacion { get; set; } = string.Empty;
        public string RazonSocial { get; set; } = string.Empty;
        public string Telefono { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string Direccion { get; set; } = string.Empty;
    }
}
