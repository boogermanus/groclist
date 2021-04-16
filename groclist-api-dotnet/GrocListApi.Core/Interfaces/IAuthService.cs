using GrocListApi.Core.ApiModels;
using GrocListApi.Core.Models;

namespace GrocListApi.Core.Interfaces
{
    public interface IAuthService
    {
        User Register(RegistrationModel model);
        AuthModel Login(LoginModel model);

    }
}