using System.Threading.Tasks;
using GrocListApi.Core.ApiModels;
using GrocListApi.Core.Interfaces;
using GrocListApi.Core.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;

namespace GrocListApi.Core.Services
{
    public class AuthService : IAuthService
    {
        private readonly UserManager<User> _userManager;
        private readonly IConfiguration _configuration;
        
        public AuthService(UserManager<User> userManager, IConfiguration configuration)
        {
            _userManager = userManager;
            _configuration = configuration;
        }
        
        public async Task<IdentityResult> Register(RegistrationModel model)
        {
            return await _userManager.CreateAsync(model.ToDomainModel(), model.Password);
        }

        public AuthModel Login(LoginModel model)
        {
            throw new System.NotImplementedException();
        }
    }
}