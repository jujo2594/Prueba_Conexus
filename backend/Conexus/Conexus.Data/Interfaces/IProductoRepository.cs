using Conexus.Data.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Conexus.Data.Interfaces
{
    public interface IProductoRepository : IRepository<Producto>
    {
        Task<Producto?> GetByCodigoAsync(string codigo);

        Task<IEnumerable<Producto>> GetByNombreAsync(string nombre);
    }
}
