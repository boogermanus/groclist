using System.ComponentModel.DataAnnotations;

namespace GrocListApi.Core.ApiModels
{
    public class ChangePasswordModel : LoginModel
    {
        [Required]
        public string ConfirmPassword { get; set; }
    }
}