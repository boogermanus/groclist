using System.Security.Claims;
using Microsoft.AspNetCore.Http;
namespace GrocListApi.Core.Interfaces
{
    public interface IUserService
    {
        public ClaimsPrincipal User { get; }
        public string CurrentUserId { get; }
    }
}