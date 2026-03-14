using AutoMapper;
using Conexus.Business.DTOs;
using Conexus.Business.Interfaces;
using Conexus.Data.Interfaces;
using Conexus.Data.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Conexus.Business.Services
{
    public class ClienteService : IClienteService
    {
        private readonly IClienteRepository _clienteRepository;
        private readonly IMapper _mapper;

        public ClienteService(IClienteRepository clienteRepository, IMapper mapper)
        {
            _clienteRepository = clienteRepository;
            _mapper = mapper;
        }

        public async Task<IEnumerable<ClienteDto>> GetAllAsync()
        {
            var clientes = await _clienteRepository.GetAllAsync();
            return _mapper.Map<IEnumerable<ClienteDto>>(clientes);
        }

        public async Task<ClienteDto?> GetByIdAsync(int id)
        {
            var cliente = await _clienteRepository.GetByIdAsync(id);
            return cliente == null ? null : _mapper.Map<ClienteDto>(cliente);
        }

        public async Task<ClienteDto?> GetByIdentificacionAsync(string identificacion)
        {
            var cliente = await _clienteRepository.GetByIdentificacionAsync(identificacion);
            return cliente == null ? null : _mapper.Map<ClienteDto>(cliente);
        }

        public async Task<ClienteDto> CreateAsync(ClienteDto clienteDto)
        {
            var cliente = _mapper.Map<Cliente>(clienteDto);
            var created = await _clienteRepository.CreateAsync(cliente);
            return _mapper.Map<ClienteDto>(created);
        }

        public async Task<ClienteDto> UpdateAsync(ClienteDto clienteDto)
        {
            var cliente = _mapper.Map<Cliente>(clienteDto);
            var updated = await _clienteRepository.UpdateAsync(cliente);
            return _mapper.Map<ClienteDto>(updated);
        }

        public async Task<bool> DeleteAsync(int id)
        {
            return await _clienteRepository.DeleteAsync(id);
        }
     }
    }
