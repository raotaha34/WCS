namespace wcm.ViewModels
{
    public class UserNoticeVM{
        public int Id { get; set; }

        public string Title { get; set; } = string.Empty;

        public string Category { get; set; } = string.Empty;

        public string Description { get; set; } = string.Empty;

        public DateTime PublishDate { get; set; }
        public string UserName { get; set; } = string.Empty;
    }
}

