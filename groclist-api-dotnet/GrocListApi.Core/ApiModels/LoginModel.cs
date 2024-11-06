using System.ComponentModel.DataAnnotations;

namespace GrocListApi.Core.ApiModels
{
    public class LoginModel
    {
        [EmailAddress]
        public required string Username { get; set; }
        [Required]
        public required string Password { get; set; }
    }
}