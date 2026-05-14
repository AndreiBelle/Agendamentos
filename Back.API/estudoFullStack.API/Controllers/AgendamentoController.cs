using estudoFullStack.API.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Mvc;
using estudoFullStack.API.Data;

namespace estudoFullStack.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AgendamentoController : ControllerBase
    {
            private readonly AppDbContext _context;

            public AgendamentoController(AppDbContext context)
            {
                _context = context;
            }


        [HttpGet]
        public async Task<ActionResult<IEnumerable<Agendamento>>> GetAgendamentos()
        {
            return await _context.Agendamentos.ToListAsync();
        }


        [HttpPost]
        public IActionResult PostAgendamento([FromBody] Agendamento novoAgendamento)
        {
            if (novoAgendamento == null)
            {
                return BadRequest("Dados inválidos!");
            }

            novoAgendamento.criado_em = DateTime.Now;
            _context.Agendamentos.Add(novoAgendamento);
            _context.SaveChanges();

            return Ok(novoAgendamento);
        }

        [HttpDelete("{id}")]
        public IActionResult DeleteAgendamento(int id)
        {
            var agendamento = _context.Agendamentos.Find(id);

            if (agendamento == null)
            {
                return NotFound("Agendamento não encontrado!");
            }

            _context.Agendamentos.Remove(agendamento);
            _context.SaveChanges();

            return NoContent();
        }
        

        
    }
}
