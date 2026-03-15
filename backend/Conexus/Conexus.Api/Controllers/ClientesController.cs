using Conexus.Business.DTOs;
using Conexus.Business.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace Conexus.Api.Controllers
{

    [ApiController]
    [Route("api/[controller]")]
    public class ClientesController : ControllerBase
    {
        private readonly IClienteService _clienteService;

        public ClientesController(IClienteService clienteService)
        {
            _clienteService = clienteService;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var clientes = await _clienteService.GetAllAsync();
            return Ok(clientes);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var cliente = await _clienteService.GetByIdAsync(id);
            if (cliente == null) return NotFound();
            return Ok(cliente);
        }

        [HttpGet("identificacion/{identificacion}")]
        public async Task<IActionResult> GetByIdentificacion(string identificacion)
        {
            var cliente = await _clienteService.GetByIdentificacionAsync(identificacion);
            if (cliente == null) return NotFound();
            return Ok(cliente);
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] ClienteDto clienteDto)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            var created = await _clienteService.CreateAsync(clienteDto);
            return CreatedAtAction(nameof(GetById), new { id = created.IdCliente }, created);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, [FromBody] ClienteDto clienteDto)
        {
            if (id != clienteDto.IdCliente) return BadRequest("El ID no coincide");
            if (!ModelState.IsValid) return BadRequest(ModelState);
            var updated = await _clienteService.UpdateAsync(clienteDto);
            return Ok(updated);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var result = await _clienteService.DeleteAsync(id);
            if (!result) return NotFound();
            return NoContent();
        }
    }
}
