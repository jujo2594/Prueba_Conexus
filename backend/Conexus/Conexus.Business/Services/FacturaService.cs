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
    public class FacturaService : IFacturaService
    {
        private readonly IFacturaRepository _facturaRepository;
        private readonly IMapper _mapper;

        public FacturaService(IFacturaRepository facturaRepository, IMapper mapper)
        {
            _facturaRepository = facturaRepository;
            _mapper = mapper;
        }

        public async Task<IEnumerable<FacturaDto>> GetAllAsync()
        {
            var facturas = await _facturaRepository.GetAllFacturasCompletasAsync();
            return _mapper.Map<IEnumerable<FacturaDto>>(facturas);
        }

        public async Task<FacturaDto?> GetByIdAsync(int id)
        {
            var factura = await _facturaRepository.GetFacturaCompletaAsync(id);
            return factura == null ? null : _mapper.Map<FacturaDto>(factura);
        }

        public async Task<IEnumerable<FacturaDto>> GetByClienteAsync(string identificacion)
        {
            var facturas = await _facturaRepository.GetByClienteAsync(identificacion);
            return _mapper.Map<IEnumerable<FacturaDto>>(facturas);
        }

        public async Task<IEnumerable<FacturaDto>> GetByEmisorAsync(string identificacion)
        {
            var facturas = await _facturaRepository.GetByEmisorAsync(identificacion);
            return _mapper.Map<IEnumerable<FacturaDto>>(facturas);
        }

        public async Task<FacturaDto> CreateAsync(FacturaDto facturaDto)
        {
            var factura = _mapper.Map<Factura>(facturaDto);
            factura.FechaFactura = DateTime.Now;
            //Permite calcular el total de cada factura 
            factura.TotalFactura = facturaDto.Detalles.Sum(d => d.Total);
            var created = await _facturaRepository.CreateAsync(factura);
            return _mapper.Map<FacturaDto>(created);
        }

        public async Task<FacturaDto> UpdateAsync(FacturaDto facturaDto)
        {
            var factura = _mapper.Map<Factura>(facturaDto);
            factura.TotalFactura = facturaDto.Detalles.Sum(d => d.Total);
            var updated = await _facturaRepository.UpdateAsync(factura);
            return _mapper.Map<FacturaDto>(updated);
        }

        public async Task<bool> DeleteAsync(int id)
        {
            return await _facturaRepository.DeleteAsync(id);
        }

        public async Task<DetalleFacturaDto> AddDetalleAsync(DetalleFacturaDto detalleDto)
        {
            var detalle = _mapper.Map<DetalleFactura>(detalleDto);

            // Calcular subtotal y total
            detalle.Subtotal = detalle.Cantidad * detalle.PrecioUnitario;
            detalle.Total = detalle.Subtotal;

            var created = await _facturaRepository.AddDetalleAsync(detalle);
            return _mapper.Map<DetalleFacturaDto>(created);
        }

        public async Task<bool> DeleteDetalleAsync(int idDetalle)
        {
            return await _facturaRepository.DeleteDetalleAsync(idDetalle);
        }

        public async Task<IEnumerable<DashboardDto>> GetDashboardDataAsync()
        {
            var detalles = await _facturaRepository.GetDetallesForDashboardAsync();

            // Agrupar ventas por producto
            var ventasPorProducto = detalles
                .GroupBy(d => d.IdProductoNavigation?.NombreProducto ?? "Sin nombre")
                .Select(g => new
                {
                    NombreProducto = g.Key,
                    TotalVentas = g.Sum(d => d.Total)
                })
                .ToList();

            // Calcular total general para porcentajes
            var totalGeneral = ventasPorProducto.Sum(v => v.TotalVentas);

            // Calcular porcentaje de cada producto
            return ventasPorProducto.Select(v => new DashboardDto
            {
                NombreProducto = v.NombreProducto,
                TotalVentas = v.TotalVentas,
                Porcentaje = totalGeneral > 0
                    ? Math.Round((v.TotalVentas / totalGeneral) * 100, 2)
                    : 0
            });
        }
    }
}
