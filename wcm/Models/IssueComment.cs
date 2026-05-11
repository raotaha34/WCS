      
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
namespace wcm.Models
{

        public class IssueComment
        {
            public int Id { get; set; }

            public int IssueId { get; set; }

            public string? UserId { get; set; }

            [Required]
            public string? Comment { get; set; }

            [ForeignKey("IssueId")]
            public virtual Issue? Issue { get; set; }

            [ForeignKey("UserId")]
            public virtual ApplicationUser? User { get; set; }

            public DateTime CreatedAt { get; set; } = DateTime.Now;
        }
    }

