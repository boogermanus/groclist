using System;
using Microsoft.AspNetCore.Mvc;

namespace GrocListApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : Controller
    {
        [HttpGet]
        public IActionResult Get()
        {
            return Ok(new Random().Next(1, int.MaxValue));
        }
    }
}