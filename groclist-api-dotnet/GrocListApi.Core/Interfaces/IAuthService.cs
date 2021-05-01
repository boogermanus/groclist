using System.IdentityModel.Tokens.Jwt;
using System.Threading.Tasks;
using GrocListApi.Core.ApiModels;
using GrocListApi.Core.Models;
using Microsoft.AspNetCore.Identity;

namespace GrocListApi.Core.Interfaces
{
    public interface IAuthService
    {
        Task<IdentityResult> Register(RegistrationModel model);
        Task<AuthModel> Login(LoginModel model);
        Task<bool> ChangePassword(ChangePasswordModel model);
        public JwtSecurityToken Decode(AuthModel model);
        public bool Validate(AuthModel model);
    }
}