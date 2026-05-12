using wcm.Models;
using wcm.ViewModels;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace wcm.Controllers
{
    [Authorize]
    public class AdminSettingsController : Controller
    {
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly SignInManager<ApplicationUser> _signInManager;

        public AdminSettingsController(
            UserManager<ApplicationUser> userManager,
            SignInManager<ApplicationUser> signInManager)
        {
            _userManager = userManager;
            _signInManager = signInManager;
        }

        // ================= GET =================
        [HttpGet]
        public async Task<IActionResult> Setting()
        {
            var user = await _userManager.GetUserAsync(User);

            if (user == null)
                return RedirectToAction("Login", "Account");

            var model = new ProfileUpdateVM
            {
                FullName = user.FullName,
                Email = user.Email,
                Phone = user.PhoneNumber
            };

            return View(model);
        }

        // ================= PROFILE UPDATE =================
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> UpdateProfile(ProfileUpdateVM model)
        {
            if (!ModelState.IsValid)
                return RedirectToAction("Setting");

            var user = await _userManager.GetUserAsync(User);

            if (user == null)
                return Unauthorized();

            user.FullName = model.FullName;
            user.PhoneNumber = model.Phone;

            // email + username sync
            var emailResult = await _userManager.SetEmailAsync(user, model.Email);
            var usernameResult = await _userManager.SetUserNameAsync(user, model.Email);

            if (!emailResult.Succeeded || !usernameResult.Succeeded)
            {
                TempData["Error"] = "Email update failed";
                return RedirectToAction("Setting");
            }

            await _userManager.UpdateAsync(user);
            await _signInManager.RefreshSignInAsync(user);

            TempData["Success"] = "Profile updated successfully";
            return RedirectToAction("Setting");
        }

        // ================= PASSWORD =================
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> UpdatePassword(ChangePasswordVM model)
        {
            if (!ModelState.IsValid)
                return RedirectToAction("Setting");

            var user = await _userManager.GetUserAsync(User);

            if (user == null)
                return Unauthorized();

            if (model.NewPassword != model.ConfirmPassword)
            {
                TempData["Error"] = "Passwords do not match";
                return RedirectToAction("Setting");
            }

            var result = await _userManager.ChangePasswordAsync(
                user,
                model.CurrentPassword,
                model.NewPassword
            );

            if (result.Succeeded)
            {
                TempData["Success"] = "Password updated successfully";
                await _signInManager.RefreshSignInAsync(user);
            }
            else
            {
                TempData["Error"] = string.Join(", ", result.Errors.Select(e => e.Description));
            }

            return RedirectToAction("Setting");
        }
    }
}