using Microsoft.AspNetCore.Mvc;

namespace GrocListApi.Controllers
{
    [ApiController]
    [Route("/")]
    public class GrocListController : Controller
    {
        public IActionResult Get()
        {
            return Ok("GrocList API");
        }
    }
}