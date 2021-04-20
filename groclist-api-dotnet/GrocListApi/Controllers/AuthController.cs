using System;
using System.Linq;
using System.Threading.Tasks;
using GrocListApi.Core.ApiModels;
using GrocListApi.Core.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace GrocListApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : Controller
    {
        private readonly IAuthService _authService;

        public AuthController(IAuthService authService)
        {
            _authService = authService;
        }
        
        [HttpGet]
        public IActionResult Get()
        {
            return Ok(new Random().Next(1, int.MaxValue));
        }

        [AllowAnonymous]
        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] RegistrationModel model)
        {
            var result = await _authService.Register(model);

            if (result.Succeeded)
                return Ok();
            
            result.Errors.ToList().ForEach(e => ModelState.AddModelError(e.Code, e.Description));

            return BadRequest(ModelState);
        }
    }
}