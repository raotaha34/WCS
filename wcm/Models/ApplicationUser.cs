using Microsoft.AspNetCore.Identity;
using System.ComponentModel.DataAnnotations;

namespace wcm.Models
{    
        public class ApplicationUser : IdentityUser
        {
            [Required]
            [StringLength(100)]
            public string? FullName { get; set; }

           
            [StringLength(20)]
            public string? UnitNumber { get; set; }

            [StringLength(200)]
            public string? ProfileImage { get; set; }

            public bool IsActive { get; set; } = true;

            public DateTime CreatedAt { get; set; } = DateTime.Now;

            // Navigation Properties
            public virtual ResidentProfile? ResidentProfile { get; set; }

            public virtual ICollection<Issue>? Issues { get; set; }

            public virtual ICollection<EventRegistration>? EventRegistrations { get; set; }

            public virtual ICollection<Notification>? Notifications { get; set; }
        }
    }

