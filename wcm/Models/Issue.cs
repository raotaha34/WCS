

using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
namespace wcm.Models
{
        public class Issue
        {
            public int Id { get; set; }

            [Required]
            [StringLength(150)]
            public string? Title { get; set; }

            [Required]
            public string? Description { get; set; }

            [Required]
            [StringLength(100)]
            public string? Category { get; set; }

            [Required]
            [StringLength(200)]
            public string? Location { get; set; }

            [StringLength(300)]
            public string? ImagePath { get; set; }

            [StringLength(50)]
            public string Status { get; set; } = "Pending";

            public string? UserId { get; set; }

            [ForeignKey("UserId")]
            public virtual ApplicationUser? User { get; set; }

            public DateTime CreatedAt { get; set; } = DateTime.Now;

            // Navigation
            public virtual ICollection<IssueComment>? Comments { get; set; }
        }
    
}
