using System.ComponentModel.DataAnnotations;

namespace GrocListApi.Core.ApiModels
{
    public class ChangePasswordModel
    {
        public required string Password { get; set; }
        public required string NewPassword { get; set; }
        [Display(Name = "Confirm Password")]
        [Compare("NewPassword", ErrorMessage = "Passwords do not match.")]
        public required string ConfirmNewPassword { get; set; }
    }
}