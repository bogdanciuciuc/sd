using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using web_api.Data;
using web_api.Models;

namespace web_api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class Auth : Controller
    {
        private readonly MyDbContext _context;

        public Auth(MyDbContext context)
        {
            _context = context;
        }

        [HttpPost("login")]
        public async Task<IActionResult> LogIn([FromBody] Client client)
        {
            if (client == null)
            {
                return BadRequest();
            }

            var dbClient = await _context.Clients
                .FirstOrDefaultAsync(x => x.email == client.email &&
                x.password == client.password);
            
            if(dbClient == null)
            {
                return NotFound(client);
            }

            return Ok(client);
        }

        [HttpPost("signup")]
        public async Task<IActionResult> SignUp([FromBody] Client client)
        {
            if (client == null)
            {
                return BadRequest();
            }

            var dbClient = await _context.Clients
                .FirstOrDefaultAsync(x => x.email == client.email);

            if (dbClient != null)
            {
                return BadRequest(new {Message = "Client already exists!"});
            }

            client.id = new Guid();
            client.role = "client";

            await _context.Clients.AddAsync(client);
            await _context.SaveChangesAsync();

            return Ok(client);
        }
    }
}
