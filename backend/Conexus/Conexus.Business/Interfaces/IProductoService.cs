using Conexus.Business.DTOs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Conexus.Business.Interfaces
{
    public interface IProductoService
    {
        Task<IEnumerable<ProductoDto>> GetAllAsync();
        Task<ProductoDto?> GetByIdAsync(int id);
        Task<ProductoDto?> GetByCodigoAsync(string codigo);
        Task<IEnumerable<ProductoDto>> GetByNombreAsync(string nombre);
        Task<ProductoDto> CreateAsync(ProductoDto productoDto);
        Task<ProductoDto> UpdateAsync(ProductoDto productoDto);
        Task<bool> DeleteAsync(int id);
    }
}
