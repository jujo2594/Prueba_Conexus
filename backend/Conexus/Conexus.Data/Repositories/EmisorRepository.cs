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
    public class EmisorRepository : BaseRepository<Emisor>, IEmisorRepository
    {
        public EmisorRepository(ConexusDbContext context) : base(context)
        {
        }

        public async Task<Emisor?> GetByIdentificacionAsync(string identificacion)
        {
            return await _dbSet
                .FirstOrDefaultAsync(e => e.Identificacion == identificacion);
        }

        public async Task<Emisor?> GetByRazonSocialAsync(string razonSocial)
        {
            return await _dbSet
                .FirstOrDefaultAsync(e => e.RazonSocial == razonSocial);
        }
    }
}
