using Microsoft.AspNetCore.Mvc;
using System.ComponentModel.DataAnnotations;

namespace wcm.Models
{

        public class AppSetting
        {
            public int Id { get; set; }

            [StringLength(150)]
            public string? CommunityName { get; set; }

            [StringLength(300)]
            public string? CommunityAddress { get; set; }

            [StringLength(100)]
            public string? ContactEmail { get; set; }

            [StringLength(20)]
            public string? ContactPhone { get; set; }

            [StringLength(300)]
            public string? LogoPath { get; set; }

            [StringLength(300)]
            public string? BannerImage { get; set; }
        }
    }

