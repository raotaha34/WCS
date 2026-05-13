namespace wcm.ViewModels
{

        public class AdminIssueVM
        {
            public int Id { get; set; }

            public string Title { get; set; } = string.Empty;

            public string ResidentName { get; set; } = string.Empty;

            public string Category { get; set; } = string.Empty;

            public string Status { get; set; } = string.Empty;

            public DateTime CreatedAt { get; set; }
        }
}
