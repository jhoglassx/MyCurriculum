using Microsoft.EntityFrameworkCore;
using MyCurriculum.Models;

namespace MyCurriculum.DataContext
{
    public class Context:DbContext
    {
        public Context(DbContextOptions<Context> options) : base(options)
        {
            Database.EnsureCreated();
        }

        public DbSet<Account> Accounts { get; set; }
        public DbSet<AcademicEducation> AcademicEducations { get; set; }
        public DbSet<Curriculum> Curriculums { get; set; }
        public DbSet<Address> Addresses { get; set; }
        public DbSet<Course> Courses { get; set; }
        public DbSet<Experience> Experiences { get; set; }
        public DbSet<Skill> Skills { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<AcademicEducation>(entity =>
            {
                entity.HasOne(a => a.Curriculum).WithMany(c => c.AcademicEducations);
            });

            modelBuilder.Entity<Address>(entity =>
            {
                entity.HasOne(a => a.Curriculum).WithMany(c => c.Addresses);
            });

            modelBuilder.Entity<Experience>(entity =>
            {
                entity.HasOne(a => a.Curriculum).WithMany(c => c.Experiences);
            });

            modelBuilder.Entity<Skill>(entity =>
            {
                entity.HasOne(a => a.Curriculum).WithMany(c => c.Skills);
            });
        }
    }
}
