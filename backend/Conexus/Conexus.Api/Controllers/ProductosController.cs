using Conexus.Business.DTOs;
using Conexus.Business.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace Conexus.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ProductosController : ControllerBase
    {
        private readonly IProductoService _productoService;

        public ProductosController(IProductoService productoService)
        {
            _productoService = productoService;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var productos = await _productoService.GetAllAsync();
            return Ok(productos);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var producto = await _productoService.GetByIdAsync(id);
            if (producto == null) return NotFound();
            return Ok(producto);
        }

        [HttpGet("codigo/{codigo}")]
        public async Task<IActionResult> GetByCodigo(string codigo)
        {
            var producto = await _productoService.GetByCodigoAsync(codigo);
            if (producto == null) return NotFound();
            return Ok(producto);
        }

        [HttpGet("nombre/{nombre}")]
        public async Task<IActionResult> GetByNombre(string nombre)
        {
            var productos = await _productoService.GetByNombreAsync(nombre);
            return Ok(productos);
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] ProductoDto productoDto)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            var created = await _productoService.CreateAsync(productoDto);
            return CreatedAtAction(nameof(GetById), new { id = created.IdProducto }, created);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, [FromBody] ProductoDto productoDto)
        {
            if (id != productoDto.IdProducto) return BadRequest("El ID no coincide");
            if (!ModelState.IsValid) return BadRequest(ModelState);
            var updated = await _productoService.UpdateAsync(productoDto);
            return Ok(updated);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var result = await _productoService.DeleteAsync(id);
            if (!result) return NotFound();
            return NoContent();
        }
    }
}
