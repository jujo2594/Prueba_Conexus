using Conexus.Data.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Conexus.Data.Interfaces
{
    public interface IFacturaRepository : IRepository<Factura>
    {
        Task<Factura?> GetFacturaCompletaAsync(int idFactura);

        Task<IEnumerable<Factura>> GetAllFacturasCompletasAsync();

        Task<IEnumerable<Factura>> GetByClienteAsync(int idCliente);

        Task<IEnumerable<Factura>> GetByEmisorAsync(int idEmisor);

        Task<IEnumerable<DetalleFactura>> GetDetallesForDashboardAsync();

        Task<DetalleFactura> AddDetalleAsync(DetalleFactura detalle);

        Task<bool> DeleteDetalleAsync(int idDetalle);
    }
}
