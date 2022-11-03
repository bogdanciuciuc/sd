using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using web_api.Data;
using web_api.Models;

namespace web_api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ClientsController : Controller
    {
        private readonly MyDbContext _context;

        public ClientsController(MyDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllClients()
        {
            var clients = await _context.Clients.ToListAsync();
            return Ok(clients);
        }

        [HttpPost]
        public async Task<IActionResult> AddClient([FromBody] Client clientRequest)
        {
            clientRequest.id = Guid.NewGuid();
            clientRequest.role = "client";
            await _context.Clients.AddAsync(clientRequest);
            await _context.SaveChangesAsync();

            return Ok(clientRequest);
        }

        [HttpGet]
        [Route("{id:Guid}")]
        public async Task<IActionResult> GetClient([FromRoute] Guid id)
        {
            var client = await _context.Clients.FirstOrDefaultAsync(x => x.id == id);

            if (client == null)
            {
                return NotFound();
            }

            return Ok(client);
        }

        [HttpPut]
        [Route("{id:Guid}")]
        public async Task<IActionResult> UpdateClient([FromRoute] Guid id, Client updatedClientRequest)
        {
            var client = await _context.Clients.FindAsync(id);

            if (client == null)
            {
                return NotFound();
            }

            client.name = updatedClientRequest.name;
            client.email = updatedClientRequest.email;
            client.password = updatedClientRequest.password;
            client.role = updatedClientRequest.role;

            await _context.SaveChangesAsync();

            return Ok(client);
        }

        [HttpDelete]
        [Route("{id:Guid}")]
        public async Task<IActionResult> DeleteClient([FromRoute] Guid id)
        {
            var client = await _context.Clients.FindAsync(id);

            if (client == null)
                return NotFound();

            _context.Clients.Remove(client);
            await _context.SaveChangesAsync();

            return Ok(client);
        }

        [HttpPut]
        public async Task<IActionResult> LoginClient([FromRoute] string email,
            [FromRoute] string password)
        {
            var client = await _context.Clients
                .Where(c => c.email.Equals(email) && c.password.Equals(password))
                .FirstOrDefaultAsync();

            if (client == null)
                return NotFound(email);

            return Ok(client);
        }
    }
}
