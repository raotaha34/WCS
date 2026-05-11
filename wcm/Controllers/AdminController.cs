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
        public IActionResult Index()
        {
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
                    FullName = r.User.FullName,
                    Email = r.User.Email,
                    PhoneNumber = r.User.PhoneNumber,
                    UnitNumber = r.User.UnitNumber,
                    IsActive = r.User.IsActive
                })
                .ToListAsync();

            return View(residents);
        }

        // ================= CREATE RESIDENT =================

        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> CreateResident(CreateResidentViewModel model)
        {
            if (!ModelState.IsValid)
            {
                return View("Resident");
            }

            // Check existing email
            var existingUser = await _userManager.FindByEmailAsync(model.Email);

            if (existingUser != null)
            {
                TempData["Error"] = "Email already exists";
                return View("Resident");
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
    }
}
