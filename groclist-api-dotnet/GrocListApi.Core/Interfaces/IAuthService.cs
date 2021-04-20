using System.Threading.Tasks;
using GrocListApi.Core.ApiModels;
using GrocListApi.Core.Models;
using Microsoft.AspNetCore.Identity;

namespace GrocListApi.Core.Interfaces
{
    public interface IAuthService
    {
        Task<IdentityResult> Register(RegistrationModel model);
        AuthModel Login(LoginModel model);

    }
}