using Conexus.Business.DTOs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Conexus.Business.Interfaces
{
    public interface IEmisorService
    {
        Task<IEnumerable<EmisorDto>> GetAllAsync();
        Task<EmisorDto?> GetByIdAsync(int id);
        Task<EmisorDto?> GetByIdentificacionAsync(string identificacion);
        Task<EmisorDto> CreateAsync(EmisorDto emisorDto);
        Task<EmisorDto> UpdateAsync(EmisorDto emisorDto);
        Task<bool> DeleteAsync(int id);
    }
}
