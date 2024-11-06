using System.Security.Claims;
using GrocListApi.Core.Interfaces;
using Microsoft.AspNetCore.Http;

namespace GrocListApi.Core.Services
{
    public class UserService : IUserService
    {
        private IHttpContextAccessor _context;

        public UserService(IHttpContextAccessor context)
        {
            _context = context;
        }

        public ClaimsPrincipal? User => _context.HttpContext?.User;
        public string CurrentUserId => User?.FindFirstValue(ClaimTypes.NameIdentifier) ?? string.Empty;
        public bool? IsAdmin => User?.IsInRole("Admin") ?? false;
    }
}