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

            var factura = new Factura
            {
                IdCliente = facturaDto.IdCliente,
                IdEmisor = facturaDto.IdEmisor,
                FechaFactura = DateTime.Now,
                TotalFactura = facturaDto.Detalles.Sum(d => d.Total)
            };

            var created = await _facturaRepository.CreateAsync(factura);

            foreach (var detalleDto in facturaDto.Detalles)
            {
                var detalle = new DetalleFactura
                {
                    IdFactura = created.IdFactura,
                    IdProducto = detalleDto.IdProducto,
                    Cantidad = detalleDto.Cantidad,
                    PrecioUnitario = detalleDto.PrecioUnitario,
                    Subtotal = detalleDto.Cantidad * detalleDto.PrecioUnitario,
                    Total = detalleDto.Cantidad * detalleDto.PrecioUnitario
                };
                await _facturaRepository.AddDetalleAsync(detalle);
            }

            var facturaCompleta = await _facturaRepository.GetFacturaCompletaAsync(created.IdFactura);
            return _mapper.Map<FacturaDto>(facturaCompleta);
        }

        public async Task<FacturaDto> UpdateAsync(FacturaDto facturaDto)
        {
            // 1. Obtener la factura actual con sus detalles
            var facturaActual = await _facturaRepository.GetFacturaCompletaAsync(facturaDto.IdFactura);
            if (facturaActual == null) throw new Exception("Factura no encontrada");

            // 2. Eliminar todos los detalles existentes
            foreach (var detalle in facturaActual.DetalleFacturas.ToList())
            {
                await _facturaRepository.DeleteDetalleAsync(detalle.IdDetalleFactura);
            }

            // 3. Actualizar datos de la factura
            facturaActual.IdCliente = facturaDto.IdCliente;
            facturaActual.IdEmisor = facturaDto.IdEmisor;
            facturaActual.TotalFactura = facturaDto.Detalles.Sum(d => d.Total);

            await _facturaRepository.UpdateAsync(facturaActual);

            // 4. Agregar los nuevos detalles
            foreach (var detalleDto in facturaDto.Detalles)
            {
                var detalle = new DetalleFactura
                {
                    IdFactura = facturaDto.IdFactura,
                    IdProducto = detalleDto.IdProducto,
                    Cantidad = detalleDto.Cantidad,
                    PrecioUnitario = detalleDto.PrecioUnitario,
                    Subtotal = detalleDto.Cantidad * detalleDto.PrecioUnitario,
                    Total = detalleDto.Cantidad * detalleDto.PrecioUnitario
                };
                await _facturaRepository.AddDetalleAsync(detalle);
            }

            // 5. Retornar la factura completa actualizada
            var facturaCompleta = await _facturaRepository.GetFacturaCompletaAsync(facturaDto.IdFactura);
            return _mapper.Map<FacturaDto>(facturaCompleta);
        }

        public async Task<bool> DeleteAsync(int id)
        {

            var factura = await _facturaRepository.GetFacturaCompletaAsync(id);
            if (factura == null) return false;

            foreach (var detalle in factura.DetalleFacturas.ToList())
            {
                await _facturaRepository.DeleteDetalleAsync(detalle.IdDetalleFactura);
            }

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
