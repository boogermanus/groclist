using System.ComponentModel.DataAnnotations;
using GrocListApi.Core.Models;

namespace GrocListApi.Core.ApiModels
{
    public class RegistrationModel
    {
        [EmailAddress]
        public required string Username { get; set; }
        public required string Password { get; set; }
        [Display(Name = "Confirm Password")]
        [Compare("Password", ErrorMessage = "Passwords do not match.")]
        public required string ConfirmPassword { get; set; }
        public string? Name { get; set; } = string.Empty;

        public User ToDomainModel()
        {
            return new User
            {
                UserName = Username,
                Name = Name,
                Email = Username
            };
        }
    }
}