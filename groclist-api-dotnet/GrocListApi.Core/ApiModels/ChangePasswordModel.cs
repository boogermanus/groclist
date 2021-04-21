using System.ComponentModel.DataAnnotations;

namespace GrocListApi.Core.ApiModels
{
    public class ChangePasswordModel
    {
        [Required]
        [EmailAddress]
        public string Username { get; set; }
        [Required]
        public string Password { get; set; }
        [Required]
        public string ConfirmPassword { get; set; }
    }
}