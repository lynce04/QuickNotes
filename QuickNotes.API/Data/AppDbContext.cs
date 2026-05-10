using Microsoft.EntityFrameworkCore;
using QuickNotes.API.Models;
namespace QuickNotes.API.Data
{
    public class AppDbContext : DbContext
    {
        public DbSet<Note> Notes { get; set; }

        public AppDbContext(DbContextOptions<AppDbContext>options) : base(options)
        {
        }
    }
}
