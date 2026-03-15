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

        Task<IEnumerable<Factura>> GetByClienteAsync(string identificacion);
        Task<IEnumerable<Factura>> GetByEmisorAsync(string identificacion);

        Task<IEnumerable<DetalleFactura>> GetDetallesForDashboardAsync();

        Task<DetalleFactura> AddDetalleAsync(DetalleFactura detalle);

        Task<bool> DeleteDetalleAsync(int idDetalle);
    }
}
