using System.ComponentModel.DataAnnotations;


namespace wcm.ViewModels
{
    public class EventViewModel
    {
        public int Id { get; set; }

        public string? Title { get; set; }

        public DateTime EventDate { get; set; }

        public string? Venue { get; set; }

        public string? Description { get; set; }

        public bool IsActive { get; set; }
    }
}
