using Microsoft.EntityFrameworkCore;
using web_api.Models;

namespace web_api.Data
{
    public class MyDbContext: DbContext
    {
        public MyDbContext(DbContextOptions options): base(options) { }

        public DbSet<Client> Clients { get; set; }
    }
}
