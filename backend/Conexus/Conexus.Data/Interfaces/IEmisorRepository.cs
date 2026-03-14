using Conexus.Data.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Conexus.Data.Interfaces
{
    public interface IEmisorRepository : IRepository<Emisor>
    {
        Task<Emisor?> GetByIdentificacionAsync(string identificacion);

        Task<Emisor?> GetByRazonSocialAsync(string razonSocial);
    }
}
