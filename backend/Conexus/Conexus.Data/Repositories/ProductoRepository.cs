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
    public class ProductoRepository : BaseRepository<Producto>, IProductoRepository
    {
        public ProductoRepository(ConexusDbContext context) : base(context)
        {
        }

        public async Task<Producto?> GetByCodigoAsync(string codigo)
        {
            return await _dbSet
                .FirstOrDefaultAsync(p => p.Codigo == codigo);
        }

        public async Task<IEnumerable<Producto>> GetByNombreAsync(string nombre)
        {
            return await _dbSet
                .Where(p => p.NombreProducto.Contains(nombre))
                .ToListAsync();
        }
    }
}
