using System.ComponentModel.DataAnnotations.Schema;
namespace wcm.Models{
    public class EventRegistration
        {
            public int Id { get; set; }

            public int EventId { get; set; }

            public string? UserId { get; set; }

            [ForeignKey("EventId")]
            public virtual Event? Event { get; set; }

            [ForeignKey("UserId")]
            public virtual ApplicationUser? User { get; set; }

            public DateTime RegisteredAt { get; set; } = DateTime.Now;
        }
    }
