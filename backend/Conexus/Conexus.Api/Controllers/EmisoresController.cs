using Conexus.Business.DTOs;
using Conexus.Business.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace Conexus.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class EmisoresController : ControllerBase
    {
        private readonly IEmisorService _emisorService;

        public EmisoresController(IEmisorService emisorService)
        {
            _emisorService = emisorService;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var emisores = await _emisorService.GetAllAsync();
            return Ok(emisores);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var emisor = await _emisorService.GetByIdAsync(id);
            if (emisor == null) return NotFound();
            return Ok(emisor);
        }

        [HttpGet("identificacion/{identificacion}")]
        public async Task<IActionResult> GetByIdentificacion(string identificacion)
        {
            var emisor = await _emisorService.GetByIdentificacionAsync(identificacion);
            if (emisor == null) return NotFound();
            return Ok(emisor);
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] EmisorDto emisorDto)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            var created = await _emisorService.CreateAsync(emisorDto);
            return CreatedAtAction(nameof(GetById), new { id = created.IdEmisor }, created);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, [FromBody] EmisorDto emisorDto)
        {
            if (id != emisorDto.IdEmisor) return BadRequest("El ID no coincide");
            if (!ModelState.IsValid) return BadRequest(ModelState);
            var updated = await _emisorService.UpdateAsync(emisorDto);
            return Ok(updated);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var result = await _emisorService.DeleteAsync(id);
            if (!result) return NotFound();
            return NoContent();
        }
    
    }
}
