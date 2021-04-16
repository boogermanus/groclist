using Microsoft.AspNetCore.Identity;

namespace GrocListApi.Core.Models
{
    public class User : IdentityUser
    {
        public string Name { get; set; }
    }
}