using Microsoft.AspNetCore.Mvc;

namespace wcm.Models
{
        public class DashboardStats
        {
            public int TotalResidents { get; set; }

            public int TotalEvents { get; set; }

            public int TotalIssues { get; set; }

            public int PendingIssues { get; set; }

            public int TotalNotices { get; set; }
        }
    }

