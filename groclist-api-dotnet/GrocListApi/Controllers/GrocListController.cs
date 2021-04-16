using Microsoft.AspNetCore.Mvc;

namespace GrocListApi.Controllers
{
    [ApiController]
    [Route("/")]
    public class GrocListController : ControllerBase
    {
        public IActionResult Get()
        {
            return Ok("GrocList API");
        }
    }
}