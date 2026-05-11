

using System.ComponentModel.DataAnnotations;
namespace wcm.Models
{
        public class ContactMessage
        {
            public int Id { get; set; }

            [Required]
            [StringLength(100)]
            public string? Name { get; set; }

            [Required]
            [EmailAddress]
            public string? Email { get; set; }

            [Required]
            [StringLength(200)]
            public string?  Subject { get; set; }

            [Required]
            public string? Message { get; set; }

            public bool IsRead { get; set; } = false;

            public DateTime SentAt { get; set; } = DateTime.Now;
        }
    }
