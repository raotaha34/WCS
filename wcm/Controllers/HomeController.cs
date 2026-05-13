using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using wcm.Data;
using wcm.Models;
using wcm.ViewModels;

namespace wcm.Controllers
{
    public class HomeController : Controller
    {
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly ApplicationDbContext _context;

        public HomeController(
            UserManager<ApplicationUser> userManager,
            ApplicationDbContext context)
        {
            _userManager = userManager;
            _context = context;
        }

        // ================= DASHBOARD =================
        public async Task<IActionResult> Index()
        {
            var user = await _userManager.GetUserAsync(User);

            ViewData["UserName"] = user?.FullName ?? "Guest";

            var recentNotices = await _context.Notices
                .OrderByDescending(n => n.PublishDate)
                .Take(5)
                .Select(n => new UserNoticeVM
                {
                    Id = n.Id,
                    Title = n.Title!,
                    Category = n.Category!,
                    Description = n.Description!,
                    PublishDate = n.PublishDate,

                    // since you don't have Notice -> User relation
                    UserName = user != null ? user.FullName! : "Admin"
                })
                .ToListAsync();
            // Counts
            ViewData["TotalRequests"] =
                await _context.Issues
                    .CountAsync(i => i.UserId == user.Id);

            ViewData["OpenRequests"] =
                await _context.Issues
                    .CountAsync(i =>
                        i.UserId == user.Id &&
                        i.Status == "OpenIssue");

            ViewData["InProgressRequests"] =
                await _context.Issues
                    .CountAsync(i =>
                        i.UserId == user.Id &&
                        i.Status == "In Progress");

            ViewData["ResolvedRequests"] =
                await _context.Issues
                    .CountAsync(i =>
                        i.UserId == user.Id &&
                        i.Status == "Resolved");
            return View(recentNotices);
        }

        // ================= EVENTS =================
        public async Task<IActionResult> Event()
        {
            var events = await _context.Events
                .Where(e => e.IsActive)
                .OrderBy(e => e.EventDate)
                .Select(e => new UserEventVM
                {
                    Id = e.Id,
                    Title = e.Title!,
                    Venue = e.Venue!,
                    Description = e.Description!,
                    EventDate = e.EventDate,
                    IsActive = e.IsActive
                })
                .ToListAsync();

            return View(events);
        }

        // ================= NOTICES (ALL) =================
        public async Task<IActionResult> Notice()
        {
            var notices = await _context.Notices
                .OrderByDescending(n => n.PublishDate)
                .Select(n => new UserNoticeVM
                {
                    Id = n.Id,
                    Title = n.Title!,
                    Category = n.Category!,
                    Description = n.Description!,
                    PublishDate = n.PublishDate,

                    UserName = "Admin" // static because no relation exists
                })
                .ToListAsync();

            return View(notices);
        }

        // ================= MY REQUESTS =================
        public async Task<IActionResult> MyRequests()
        {
            var user = await _userManager.GetUserAsync(User);

            if (user == null)
            {
                return RedirectToAction("Login", "Account");
            }

            var requests = await _context.Issues
                .Where(i => i.UserId == user.Id) // ONLY logged-in user data
                .OrderByDescending(i => i.CreatedAt)
                .Select(i => new MyRequestVM
                {
                    Id = i.Id,
                    Title = i.Title!,
                    Category = i.Category!,
                    Status = i.Status,
                    CreatedAt = i.CreatedAt
                })
                .ToListAsync();

            return View(requests);
        }

        // ================= REPORT ISSUE =================
        public IActionResult ReportIssue()
        {
            return View();
        }


        [HttpPost]
        [Authorize]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> ReportIssue(IssueCreateVM model)
        {
            if (!ModelState.IsValid)
            {
                return View(model);
            }

            var user = await _userManager.GetUserAsync(User);

            if (user == null)
            {
                return RedirectToAction("Login", "Account");
            }

            string? imagePath = null;

            // ================= IMAGE UPLOAD =================
            if (model.Image != null)
            {
                var uploadsFolder = Path.Combine(
                    Directory.GetCurrentDirectory(),
                    "wwwroot/uploads/issues"
                );

                // create folder if not exists
                if (!Directory.Exists(uploadsFolder))
                {
                    Directory.CreateDirectory(uploadsFolder);
                }

                var uniqueFileName =
                    Guid.NewGuid().ToString() +
                    Path.GetExtension(model.Image.FileName);

                var filePath = Path.Combine(uploadsFolder, uniqueFileName);

                using (var stream = new FileStream(filePath, FileMode.Create))
                {
                    await model.Image.CopyToAsync(stream);
                }

                imagePath = "/uploads/issues/" + uniqueFileName;
            }

            // ================= SAVE ISSUE =================
            var issue = new Issue
            {
                Title = model.Title,
                Description = model.Description,
                Category = model.Category,
                Location = model.Location,
                ImagePath = imagePath,
                Status = "OpenIssue",
                UserId = user.Id,
                CreatedAt = DateTime.Now
            };

            _context.Issues.Add(issue);

            await _context.SaveChangesAsync();

            TempData["Success"] = "Issue reported successfully";

            return RedirectToAction("MyRequests");
        }

        // ================= CONTACT =================
        public IActionResult Contact()
        {
            return View();
        }
    }
}