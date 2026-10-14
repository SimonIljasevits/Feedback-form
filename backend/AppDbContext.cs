using FeedbackFormAPI.Model;
using Microsoft.EntityFrameworkCore;

namespace FeedbackFormAPI
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        public DbSet<SubjectFeedback> SubjectFeedback { get; set; }
    }
}
