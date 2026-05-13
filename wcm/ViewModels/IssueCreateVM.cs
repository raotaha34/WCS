namespace wcm.ViewModels
{
        public class IssueCreateVM
        {
            public string? Title { get; set; }

            public string? Description { get; set; }

            public string? Category { get; set; }

            public string? Location { get; set; }

            public IFormFile? Image { get; set; }
        }
    
}
