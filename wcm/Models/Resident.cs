using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace wcm.Models
{
    public class ResidentProfile
    {
        public int Id { get; set; }

        // Link to Identity User
        [Required]
        public string? UserId { get; set; }

        [ForeignKey("UserId")]
        public virtual ApplicationUser? User { get; set; }

        // ===== TABLE FIELDS =====

        [Required]
        public string? FullName { get; set; }

        [Required]
        public string? UnitNumber { get; set; }

        [Required]
        public string? Email { get; set; }

        public string? PhoneNumber { get; set; }

        public bool IsActive { get; set; } = true;
    }
}