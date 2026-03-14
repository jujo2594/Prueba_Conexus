using Conexus.Data.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Conexus.Data.Interfaces
{
    public interface IClienteRepository : IRepository<Cliente>
    {
        Task<Cliente?> GetByIdentificacionAsync(string identificacion);
        Task<Cliente?> GetByEmailAsync(string email);
    }
}
