using System.ComponentModel.DataAnnotations;
using GrocListApi.Core.Models;

namespace GrocListApi.Core.ApiModels
{
    public class RegistrationModel
    {
        [Required]
        [EmailAddress]
        public string Username { get; set; }
        [Required]
        public string Password { get; set; }
        [Required]
        public string ConfirmPassword {get; set; }
        public string Name { get; set; }

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