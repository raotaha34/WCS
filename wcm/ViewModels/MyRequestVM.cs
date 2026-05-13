namespace wcm.ViewModels
{
   
        public class MyRequestVM
        {
            public int Id { get; set; }

            public string Title { get; set; } = string.Empty;

            public string Category { get; set; } = string.Empty;

            public string Status { get; set; } = string.Empty;

            public DateTime CreatedAt { get; set; }
        }
    
}
