using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using wcm.Models;

namespace wcm.Data;

public class ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
    : IdentityDbContext<ApplicationUser>(options)
{
    public DbSet<ResidentProfile> ResidentProfiles { get; set; }

    public DbSet<Event> Events { get; set; }

    public DbSet<EventRegistration> EventRegistrations { get; set; }

    public DbSet<Notice> Notices { get; set; }

    public DbSet<Issue> Issues { get; set; }

    public DbSet<IssueComment> IssueComments { get; set; }

    public DbSet<ContactMessage> ContactMessages { get; set; }

    public DbSet<Notification> Notifications { get; set; }

    public DbSet<AppSetting> AppSettings { get; set; }

    
}