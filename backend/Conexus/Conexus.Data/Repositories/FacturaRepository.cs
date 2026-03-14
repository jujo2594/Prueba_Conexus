using Conexus.Data.Data;
using Conexus.Data.Interfaces;
using Conexus.Data.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Conexus.Data.Repositories
{
    public class FacturaRepository : BaseRepository<Factura>, IFacturaRepository
    {
        public FacturaRepository(ConexusDbContext context) : base(context)
        {
        }

        public async Task<Factura?> GetFacturaCompletaAsync(int idFactura)
        {
            return await _context.Facturas
                .Include(f => f.IdClienteNavigation)
                .Include(f => f.IdEmisorNavigation)
                .Include(f => f.DetalleFacturas)
                    .ThenInclude(d => d.IdProductoNavigation)
                .FirstOrDefaultAsync(f => f.IdFactura == idFactura);
        }

        public async Task<IEnumerable<Factura>> GetAllFacturasCompletasAsync()
        {
            return await _context.Facturas
                .Include(f => f.IdClienteNavigation)
                .Include(f => f.IdEmisorNavigation)
                .Include(f => f.DetalleFacturas)
                    .ThenInclude(d => d.IdProductoNavigation)
                .ToListAsync();
        }

        public async Task<IEnumerable<Factura>> GetByClienteAsync(int idCliente)
        {
            return await _context.Facturas
                .Include(f => f.IdClienteNavigation)
                .Include(f => f.IdEmisorNavigation)
                .Include(f => f.DetalleFacturas)
                    .ThenInclude(d => d.IdProductoNavigation)
                .Where(f => f.IdCliente == idCliente)
                .ToListAsync();
        }

        public async Task<IEnumerable<Factura>> GetByEmisorAsync(int idEmisor)
        {
            return await _context.Facturas
                .Include(f => f.IdClienteNavigation)
                .Include(f => f.IdEmisorNavigation)
                .Include(f => f.DetalleFacturas)
                    .ThenInclude(d => d.IdProductoNavigation)
                .Where(f => f.IdEmisor == idEmisor)
                .ToListAsync();
        }

        public async Task<IEnumerable<DetalleFactura>> GetDetallesForDashboardAsync()
        {
            return await _context.DetalleFacturas
                .Include(d => d.IdProductoNavigation)
                .ToListAsync();
        }

        public async Task<DetalleFactura> AddDetalleAsync(DetalleFactura detalle)
        {
            await _context.DetalleFacturas.AddAsync(detalle);
            await _context.SaveChangesAsync();
            return detalle;
        }

        public async Task<bool> DeleteDetalleAsync(int idDetalle)
        {
            var detalle = await _context.DetalleFacturas.FindAsync(idDetalle);
            if (detalle == null) return false;

            _context.DetalleFacturas.Remove(detalle);
            await _context.SaveChangesAsync();
            return true;
        }
    }
}
