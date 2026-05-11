
using System.ComponentModel.DataAnnotations.Schema;

namespace wcm.Models
{
        public class Notification
        {
            public int Id { get; set; }

            public string ? UserId { get; set; }

            public string? Title { get; set; }

            public string? Message { get; set; }

            public bool IsRead { get; set; } = false;

            [ForeignKey("UserId")]
            public virtual ApplicationUser? User { get; set; }

            public DateTime CreatedAt { get; set; } = DateTime.Now;
        }
    
}
