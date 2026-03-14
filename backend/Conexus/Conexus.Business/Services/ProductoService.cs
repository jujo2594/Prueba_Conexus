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
    public class ProductoService : IProductoService
    {
        private readonly IProductoRepository _productoRepository;
        private readonly IMapper _mapper;

        public ProductoService(IProductoRepository productoRepository, IMapper mapper)
        {
            _productoRepository = productoRepository;
            _mapper = mapper;
        }

        public async Task<IEnumerable<ProductoDto>> GetAllAsync()
        {
            var productos = await _productoRepository.GetAllAsync();
            return _mapper.Map<IEnumerable<ProductoDto>>(productos);
        }

        public async Task<ProductoDto?> GetByIdAsync(int id)
        {
            var producto = await _productoRepository.GetByIdAsync(id);
            return producto == null ? null : _mapper.Map<ProductoDto>(producto);
        }

        public async Task<ProductoDto?> GetByCodigoAsync(string codigo)
        {
            var producto = await _productoRepository.GetByCodigoAsync(codigo);
            return producto == null ? null : _mapper.Map<ProductoDto>(producto);
        }

        public async Task<IEnumerable<ProductoDto>> GetByNombreAsync(string nombre)
        {
            var productos = await _productoRepository.GetByNombreAsync(nombre);
            return _mapper.Map<IEnumerable<ProductoDto>>(productos);
        }

        public async Task<ProductoDto> CreateAsync(ProductoDto productoDto)
        {
            var producto = _mapper.Map<Producto>(productoDto);
            var created = await _productoRepository.CreateAsync(producto);
            return _mapper.Map<ProductoDto>(created);
        }

        public async Task<ProductoDto> UpdateAsync(ProductoDto productoDto)
        {
            var producto = _mapper.Map<Producto>(productoDto);
            var updated = await _productoRepository.UpdateAsync(producto);
            return _mapper.Map<ProductoDto>(updated);
        }

        public async Task<bool> DeleteAsync(int id)
        {
            return await _productoRepository.DeleteAsync(id);
        }
    }
}
