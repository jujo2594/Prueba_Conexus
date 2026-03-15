using Conexus.Business.DTOs;
using Conexus.Business.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace Conexus.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class FacturasController : ControllerBase
    {
        private readonly IFacturaService _facturaService;

        public FacturasController(IFacturaService facturaService)
        {
            _facturaService = facturaService;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var facturas = await _facturaService.GetAllAsync();
            return Ok(facturas);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var factura = await _facturaService.GetByIdAsync(id);
            if (factura == null) return NotFound();
            return Ok(factura);
        }

        [HttpGet("cliente/{idCliente}")]
        public async Task<IActionResult> GetByCliente(int idCliente)
        {
            var facturas = await _facturaService.GetByClienteAsync(idCliente);
            return Ok(facturas);
        }

        [HttpGet("emisor/{idEmisor}")]
        public async Task<IActionResult> GetByEmisor(int idEmisor)
        {
            var facturas = await _facturaService.GetByEmisorAsync(idEmisor);
            return Ok(facturas);
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] FacturaDto facturaDto)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            var created = await _facturaService.CreateAsync(facturaDto);
            return CreatedAtAction(nameof(GetById), new { id = created.IdFactura }, created);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, [FromBody] FacturaDto facturaDto)
        {
            if (id != facturaDto.IdFactura) return BadRequest("El ID no coincide");
            if (!ModelState.IsValid) return BadRequest(ModelState);
            var updated = await _facturaService.UpdateAsync(facturaDto);
            return Ok(updated);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var result = await _facturaService.DeleteAsync(id);
            if (!result) return NotFound();
            return NoContent();
        }

        [HttpPost("detalle")]
        public async Task<IActionResult> AddDetalle([FromBody] DetalleFacturaDto detalleDto)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            var created = await _facturaService.AddDetalleAsync(detalleDto);
            return Ok(created);
        }

        [HttpDelete("detalle/{idDetalle}")]
        public async Task<IActionResult> DeleteDetalle(int idDetalle)
        {
            var result = await _facturaService.DeleteDetalleAsync(idDetalle);
            if (!result) return NotFound();
            return NoContent();
        }

        [HttpGet("dashboard")]
        public async Task<IActionResult> GetDashboard()
        {
            var data = await _facturaService.GetDashboardDataAsync();
            return Ok(data);
        }
    }
}
