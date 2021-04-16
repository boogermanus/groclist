using System.ComponentModel.DataAnnotations;

namespace GrocListApi.Core.ApiModels
{
    public class LoginModel
    {
        [EmailAddress]
        public string Email { get; set; }
        [Required]
        public string Password { get; set; }
    }
}