using System.ComponentModel.DataAnnotations;

namespace wcm.Models
{
  
    public class Notice
        {
            public int Id { get; set; }

            [Required]
            [StringLength(200)]
            public string? Title { get; set; }

            [Required]
            public string? Description { get; set; }

            [StringLength(50)]
            public string? Category { get; set; }

            public DateTime PublishDate { get; set; } = DateTime.Now;

            public DateTime? ExpiryDate { get; set; }

            public bool IsImportant { get; set; } = false;

            public bool IsActive { get; set; } = true;
        }
    
}
