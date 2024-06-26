using System.ComponentModel.DataAnnotations;

namespace GrocListApi.Core.ApiModels
{
    public class ChangePasswordModel
    {
        [Required]
        public string Password { get; set; }
        [Required]
        public string NewPassword { get; set; }
        [Required]
        [Display(Name = "Confirm Password")]
        [Compare("NewPassword", ErrorMessage = "Passwords do not match.")]
        public string ConfirmNewPassword { get; set; }
    }
}