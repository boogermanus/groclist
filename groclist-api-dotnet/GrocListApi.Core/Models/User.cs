using GrocListApi.Core.ApiModels;
using Microsoft.AspNetCore.Identity;

namespace GrocListApi.Core.Models
{
    public class User : IdentityUser
    {
        public string? Name { get; set; }

        public UserModel ToApiModel()
        {
            return new UserModel
            {
                Id = Id,
                Username = UserName,
                Email = Email
            };
        }
    }
}