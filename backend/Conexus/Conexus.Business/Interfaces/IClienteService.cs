using Conexus.Business.DTOs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Conexus.Business.Interfaces
{
    public interface IClienteService
    {
        Task<IEnumerable<ClienteDto>> GetAllAsync();
        Task<ClienteDto?> GetByIdAsync(int id);
        Task<ClienteDto?> GetByIdentificacionAsync(string identificacion);
        Task<ClienteDto> CreateAsync(ClienteDto clienteDto);
        Task<ClienteDto> UpdateAsync(ClienteDto clienteDto);
        Task<bool> DeleteAsync(int id);
    }
}
