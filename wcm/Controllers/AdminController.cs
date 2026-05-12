using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using wcm.Data;
using wcm.Models;
using wcm.ViewModels;

namespace wcm.Controllers
{
    public class AdminController : Controller
    {
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly ApplicationDbContext _context;

        public AdminController(
            UserManager<ApplicationUser> userManager,
            ApplicationDbContext context)
        {
            _userManager = userManager;
            _context = context;
        }
        public async Task<IActionResult> Index()
        {
            ViewData["ResidentCount"] = await _context.ResidentProfiles.CountAsync();

            return View();
        }
        //ResidentProfile view
        public async Task<IActionResult> Resident()
{
    var residents = await _context.ResidentProfiles
        .Include(r => r.User)
        .Select(r => new ResidentViewModel
        {
            Id = r.Id,
            FullName = r.User!.FullName,
            Email = r.User.Email,
            PhoneNumber = r.User.PhoneNumber,
            UnitNumber = r.User.UnitNumber,
            IsActive = r.User.IsActive
        })
        .ToListAsync();

    return View(residents); // ✅ correct
}

        // ================= CREATE RESIDENT =================

        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> CreateResident(CreateResidentViewModel model)
        {
            if (!ModelState.IsValid)
            {
                return RedirectToAction("Resident");
            }

            // Check existing email
            var existingUser = await _userManager.FindByEmailAsync(model.Email);

            if (existingUser != null)
            {
                TempData["Error"] = "Email already exists";
                return RedirectToAction("Resident");
            }

            // ================= CREATE APPLICATION USER =================

            var user = new ApplicationUser
            {
                UserName = model.Email,
                Email = model.Email,
                PhoneNumber = model.PhoneNumber,
                FullName = model.FullName,
                UnitNumber = model.UnitNumber,
                EmailConfirmed = true,
                IsActive = true
            };

            var result = await _userManager.CreateAsync(user, model.Password);

            if (result.Succeeded)
            {
                // Add role
                await _userManager.AddToRoleAsync(user, "User");

                // ================= SAVE RESIDENT PROFILE =================

                var resident = new ResidentProfile
                {
                    UserId = user.Id,
                    FullName = model.FullName,
                    UnitNumber = model.UnitNumber,
                    Email = model.Email,
                    PhoneNumber = model.PhoneNumber,
                    IsActive = true
                };

                _context.ResidentProfiles.Add(resident);

                await _context.SaveChangesAsync();

                TempData["Success"] = "Resident created successfully";

                return RedirectToAction("Resident");
            }

            foreach (var error in result.Errors)
            {
                ModelState.AddModelError("", error.Description);
            }
            return RedirectToAction("Resident");
        }

        //edit resident 
        [HttpGet]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> EditResident(int id)
        {
            var resident = await _context.ResidentProfiles
                .Include(r => r.User)
                .FirstOrDefaultAsync(r => r.Id == id);

            if (resident == null)
                return NotFound();

            if (resident.User == null)
                return NotFound();

            var model = new ResidentViewModel
            {
                Id = resident.Id,
                FullName = resident.User.FullName,
                Email = resident.User.Email,
                PhoneNumber = resident.User.PhoneNumber,
                UnitNumber = resident.User.UnitNumber,
                IsActive = resident.User.IsActive
            };

            return Json(model);
        }


        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> EditResident(ResidentViewModel model)
        {
            if (!ModelState.IsValid)
            {
                TempData["Error"] = "Invalid data";
                return RedirectToAction("Resident");
            }

            var resident = await _context.ResidentProfiles
                .Include(r => r.User)
                .FirstOrDefaultAsync(r => r.Id == model.Id);

            if (resident == null)
            {
                TempData["Error"] = "Resident not found";
                return RedirectToAction("Resident");
            }

            if (resident.User == null)
            {
                TempData["Error"] = "User not found";
                return RedirectToAction("Resident");
            }

            // ================= UPDATE APPLICATION USER =================
            resident.User.FullName = model.FullName;
            resident.User.PhoneNumber = model.PhoneNumber;
            resident.User.UnitNumber = model.UnitNumber;
            resident.User.IsActive = model.IsActive;

            await _userManager.SetEmailAsync(resident.User, model.Email);
            await _userManager.SetUserNameAsync(resident.User, model.Email);
            await _userManager.UpdateAsync(resident.User);

            // ================= UPDATE RESIDENT PROFILE =================
            resident.FullName = model.FullName;
            resident.Email = model.Email;
            resident.PhoneNumber = model.PhoneNumber;
            resident.UnitNumber = model.UnitNumber;
            resident.IsActive = model.IsActive;

            await _context.SaveChangesAsync();

            TempData["Success"] = "Resident updated successfully";
            return RedirectToAction("Resident");
        }

        //Delete[HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> DeleteResident(int id)
        {
            var resident = await _context.ResidentProfiles
                .Include(r => r.User)
                .FirstOrDefaultAsync(r => r.Id == id);

            if (resident == null)
            {
                TempData["Error"] = "Resident not found";
                return RedirectToAction("Resident");
            }

            try
            {
                var user = resident.User;

                // 1. Remove Resident FIRST (faster, avoids FK issues)
                _context.ResidentProfiles.Remove(resident);
                await _context.SaveChangesAsync();

                // 2. THEN delete Identity user
                if (user != null)
                {
                    var result = await _userManager.DeleteAsync(user);

                    if (!result.Succeeded)
                    {
                        TempData["Error"] = "User delete failed";
                        return RedirectToAction("Resident");
                    }
                }

                TempData["Success"] = "Deleted successfully";
            }
            catch (Exception ex)
            {
                TempData["Error"] = "Delete failed: " + ex.Message;
            }

            return RedirectToAction("Resident");
        }

        public async Task<IActionResult> Issue()
        {
            var issues = await _context.Issues
                .Include(i => i.User)
                .Select(i => new
                {
                    i.Id,
                    i.Title,
                    i.Description,
                    i.Category,
                    i.Status,
                    i.CreatedAt,
                    User = new
                    {
                        i.User!.FullName,
                        i.User.UnitNumber
                    }
                })
                .ToListAsync();

            return View(issues);
        }

        public async Task<IActionResult> Notice()
        {
            var notices = await _context.Notices
            .Select(n => new NoticeViewModel
            {
                Id = n.Id,
                Title = n.Title,
                Category = n.Category,
                Description = n.Description,
                PublishDate = n.PublishDate
            })
            .ToListAsync();

            return View(notices);
        }
        //Notice create ===============


        [HttpGet]
        public IActionResult Create()
        {
            return View();
        }
        //====notice post
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Create(Notice model)
        {
            if (!ModelState.IsValid)
            {
                TempData["Error"] = "Invalid notice data";
                return RedirectToAction("Index");
            }

            model.PublishDate = DateTime.Now; 

            _context.Notices.Add(model);
            await _context.SaveChangesAsync();

            TempData["Success"] = "Notice created successfully";
            return RedirectToAction("Notice");
        }


        //========Edit post===============
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Edit(NoticeViewModel model)
        {
            if (model == null || model.Id == 0)
            {
                TempData["Error"] = "Invalid data";
                return RedirectToAction("Notice");
            }

            var notice = await _context.Notices.FindAsync(model.Id);

            if (notice == null)
            {
                TempData["Error"] = "Notice not found";
                return RedirectToAction("Notice");
            }

            notice.Title = model.Title;
            notice.Category = model.Category;
            notice.Description = model.Description;

            _context.Notices.Update(notice);

            await _context.SaveChangesAsync();

            TempData["Success"] = "Notice updated successfully";

            return RedirectToAction("Notice");
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Delete(int id)
        {
            var notice = await _context.Notices.FindAsync(id);

            if (notice == null)
                return NotFound();

            _context.Notices.Remove(notice);
            await _context.SaveChangesAsync();

            TempData["Success"] = "Notice deleted successfully";
            return RedirectToAction("Notice");
        }



        //Event
        public async Task<IActionResult> Event()
        {
            var events = await _context.Events
                .OrderByDescending(e => e.EventDate)
                .Select(e => new EventViewModel
                {
                    Id = e.Id,
                    Title = e.Title,
                    EventDate = e.EventDate,
                    Venue = e.Venue,
                    Description = e.Description,
                    IsActive = e.IsActive
                })
                .ToListAsync();

            return View(events);
        }

        //Creat event
        [HttpGet]
        public IActionResult CreateEvent()
        {
            return View();
        }

        // create  post
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> CreateEvent(EventViewModel model)
        {
            if (string.IsNullOrEmpty(model.Title))
            {
                TempData["Error"] = "Title is required";
                return RedirectToAction("Event");
            }

            var entity = new Event
            {
                Title = model.Title,
                EventDate = model.EventDate,
                Venue = model.Venue,
                Description = model.Description,
                IsActive = true,
                CreatedAt = DateTime.Now
            };

            _context.Events.Add(entity);
            await _context.SaveChangesAsync();

            TempData["Success"] = "Event created successfully";
            return RedirectToAction("Event");
        }
        //================= edit 
        // =========================
        // GET EVENT FOR EDIT MODAL



        [HttpGet]
        public async Task<IActionResult> GetEvent(int id)
        {
            var entity = await _context.Events
                .FirstOrDefaultAsync(x => x.Id == id);

            if (entity == null)
                return NotFound();

            return Json(new
            {
                id = entity.Id,
                title = entity.Title,
                eventDate = entity.EventDate.ToString("yyyy-MM-ddTHH:mm"),
                venue = entity.Venue,
                description = entity.Description
            });
        }

        // ================= UPDATE EVENT =================
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> EditEvent(EventViewModel model)
        {
            if (model == null || model.Id == 0)
            {
                TempData["Error"] = "Invalid data";
                return RedirectToAction(nameof(Event));
            }

            var entity = await _context.Events
                .FirstOrDefaultAsync(x => x.Id == model.Id);

            if (entity == null)
            {
                TempData["Error"] = "Event not found";
                return RedirectToAction(nameof(Event));
            }

            entity.Title = model.Title;
            entity.EventDate = model.EventDate;
            entity.Venue = model.Venue;
            entity.Description = model.Description;

            await _context.SaveChangesAsync();

            TempData["Success"] = "Event updated successfully";
            return RedirectToAction(nameof(Event));
        }

        //delete event method
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> DeleteEvent(int id)
        {
            var eventData = await _context.Events.FindAsync(id);

            if (eventData == null)
            {
                TempData["Error"] = "Event not found";
                return RedirectToAction("Event");
            }

            _context.Events.Remove(eventData);

            await _context.SaveChangesAsync();

            TempData["Success"] = "Event deleted successfully";

            return RedirectToAction("Event");
        }











        public IActionResult Setting()
        {
            return View();
        }


    }
}
