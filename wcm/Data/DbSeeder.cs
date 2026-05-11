using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.DependencyInjection;
using wcm.Models;

namespace wcm.Data
{
    public static class DbSeeder
    {
        public static async Task SeedAsync(IServiceProvider serviceProvider)
        {
            var userManager = serviceProvider.GetRequiredService<UserManager<ApplicationUser>>();
            var roleManager = serviceProvider.GetRequiredService<RoleManager<IdentityRole>>();

            // ================= ROLES =================
            string[] roles = { "Admin", "User" };

            foreach (var role in roles)
            {
                if (!await roleManager.RoleExistsAsync(role))
                {
                    await roleManager.CreateAsync(new IdentityRole(role));
                }
            }

            // ================= ADMIN USER =================
            var adminEmail = "raotaha33@gmail.com";

            var adminUser = await userManager.FindByEmailAsync(adminEmail);

            if (adminUser == null)
            {
                Console.WriteLine("Creating admin user...");
                adminUser = new ApplicationUser
                {
                    UserName = adminEmail,
                    Email = adminEmail,
                    EmailConfirmed = true,
                    FullName = "Admin",
                    UnitNumber = "U-001"
                };

                var result = await userManager.CreateAsync(adminUser, "Raotaha33!");

                if (result.Succeeded)
                {
                    await userManager.AddToRoleAsync(adminUser, "Admin");
                    Console.WriteLine($"Admin user created: {adminEmail}");
                }
                else
                {
                    Console.WriteLine($"Failed to create admin user:");
                    foreach (var error in result.Errors)
                    {
                        Console.WriteLine($"  - {error.Code}: {error.Description}");
                    }
                }
            }
            else
            {
                Console.WriteLine($"Admin user already exists: {adminEmail}");
                var adminRoles = await userManager.GetRolesAsync(adminUser);
                if (!adminRoles.Contains("Admin"))
                {
                    await userManager.AddToRoleAsync(adminUser, "Admin");
                    Console.WriteLine($"Admin role assigned to: {adminEmail}");
                }
            }

            // ================= NORMAL USER =================
            var userEmail = "wali33ahmed@gmail.com";

            var normalUser = await userManager.FindByEmailAsync(userEmail);

            if (normalUser == null)
            {
                Console.WriteLine("Creating normal user...");
                normalUser = new ApplicationUser
                {
                    UserName = userEmail,
                    Email = userEmail,
                    EmailConfirmed = true,
                    FullName = "User",
                    UnitNumber = "U-002"
                };

                var result = await userManager.CreateAsync(normalUser, "Wali33@ahmed33!");

                if (result.Succeeded)
                {
                    await userManager.AddToRoleAsync(normalUser, "User");
                    Console.WriteLine($"Normal user created: {userEmail}");
                }
                else
                {
                    Console.WriteLine($"Failed to create normal user:");
                    foreach (var error in result.Errors)
                    {
                        Console.WriteLine($"  - {error.Code}: {error.Description}");
                    }
                }
            }
            else
            {
                Console.WriteLine($"Normal user already exists: {userEmail}");
                var userRoles = await userManager.GetRolesAsync(normalUser);
                if (!userRoles.Contains("User"))
                {
                    await userManager.AddToRoleAsync(normalUser, "User");
                    Console.WriteLine($"User role assigned to: {userEmail}");
                }
            }

            // ================= NEW USER =================
            var newEmail = "uzairahmed123@gmail.com";

            var newUser = await userManager.FindByEmailAsync(newEmail);

            if (newUser == null)
            {
                Console.WriteLine("Creating new user...");
                newUser = new ApplicationUser
                {
                    UserName = newEmail,
                    Email = newEmail,
                    EmailConfirmed = true,
                    FullName = "Uzair Ahmed",
                    UnitNumber = "U-003"
                };

                var result = await userManager.CreateAsync(newUser, "Uzairahmed123@");

                if (result.Succeeded)
                {
                    await userManager.AddToRoleAsync(newUser, "User");
                    Console.WriteLine($"New user created: {newEmail}");
                }
                else
                {
                    Console.WriteLine($"Failed to create new user:");
                    foreach (var error in result.Errors)
                    {
                        Console.WriteLine($"  - {error.Code}: {error.Description}");
                    }
                }
            }
            else
            {
                Console.WriteLine($"New user already exists: {newEmail}");
                var newUserRoles = await userManager.GetRolesAsync(newUser);
                if (!newUserRoles.Contains("User"))
                {
                    await userManager.AddToRoleAsync(newUser, "User");
                    Console.WriteLine($"User role assigned to: {newEmail}");
                }
            }
        }
    }
}