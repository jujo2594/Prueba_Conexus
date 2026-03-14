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
    public class ClienteRepository : BaseRepository<Cliente>, IClienteRepository
    {
        public ClienteRepository(ConexusDbContext context) : base(context)
        {
        }

        public async Task<Cliente?> GetByIdentificacionAsync(string identificacion)
        {
            return await _dbSet
                .FirstOrDefaultAsync(c => c.Identificacion == identificacion);
        }

        public async Task<Cliente?> GetByEmailAsync(string email)
        {
            return await _dbSet
                .FirstOrDefaultAsync(c => c.Email == email);
        }
    }
}
