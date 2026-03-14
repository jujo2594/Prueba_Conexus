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
    public class EmisorService : IEmisorService
    {
        private readonly IEmisorRepository _emisorRepository;
        private readonly IMapper _mapper;

        public EmisorService(IEmisorRepository emisorRepository, IMapper mapper)
        {
            _emisorRepository = emisorRepository;
            _mapper = mapper;
        }

        public async Task<IEnumerable<EmisorDto>> GetAllAsync()
        {
            var emisores = await _emisorRepository.GetAllAsync();
            return _mapper.Map<IEnumerable<EmisorDto>>(emisores);
        }

        public async Task<EmisorDto?> GetByIdAsync(int id)
        {
            var emisor = await _emisorRepository.GetByIdAsync(id);
            return emisor == null ? null : _mapper.Map<EmisorDto>(emisor);
        }

        public async Task<EmisorDto?> GetByIdentificacionAsync(string identificacion)
        {
            var emisor = await _emisorRepository.GetByIdentificacionAsync(identificacion);
            return emisor == null ? null : _mapper.Map<EmisorDto>(emisor);
        }

        public async Task<EmisorDto> CreateAsync(EmisorDto emisorDto)
        {
            var emisor = _mapper.Map<Emisor>(emisorDto);
            var created = await _emisorRepository.CreateAsync(emisor);
            return _mapper.Map<EmisorDto>(created);
        }

        public async Task<EmisorDto> UpdateAsync(EmisorDto emisorDto)
        {
            var emisor = _mapper.Map<Emisor>(emisorDto);
            var updated = await _emisorRepository.UpdateAsync(emisor);
            return _mapper.Map<EmisorDto>(updated);
        }

        public async Task<bool> DeleteAsync(int id)
        {
            return await _emisorRepository.DeleteAsync(id);
        }
    }
}
