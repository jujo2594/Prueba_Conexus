using Conexus.Business.DTOs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Conexus.Business.Interfaces
{
    public interface IFacturaService
    {
        Task<IEnumerable<FacturaDto>> GetAllAsync();
        Task<FacturaDto?> GetByIdAsync(int id);
        Task<IEnumerable<FacturaDto>> GetByClienteAsync(int idCliente);
        Task<IEnumerable<FacturaDto>> GetByEmisorAsync(int idEmisor);
        Task<FacturaDto> CreateAsync(FacturaDto facturaDto);
        Task<FacturaDto> UpdateAsync(FacturaDto facturaDto);
        Task<bool> DeleteAsync(int id);
        Task<DetalleFacturaDto> AddDetalleAsync(DetalleFacturaDto detalleDto);
        Task<bool> DeleteDetalleAsync(int idDetalle);
        Task<IEnumerable<DashboardDto>> GetDashboardDataAsync();
    }
}
