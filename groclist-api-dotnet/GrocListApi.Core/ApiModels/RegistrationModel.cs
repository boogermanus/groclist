using System.ComponentModel.DataAnnotations;

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
    }
}