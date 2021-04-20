using System.ComponentModel.DataAnnotations;
using GrocListApi.Core.Models;

namespace GrocListApi.Core.ApiModels
{
    public class RegistrationModel
    {
        [Required]
        [EmailAddress]
        public string Email { get; set; }
        [Required]
        public string Password { get; set; }
        [Required]
        public string Name { get; set; }

        public User ToDomainModel()
        {
            return new User
            {
                UserName = Email,
                Name = Name
            };
        }
    }
}