using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using estudoFullStack.API.Models;

namespace estudoFullStack.API.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        public DbSet<Agendamento> Agendamentos { get; set; }
    }
}
