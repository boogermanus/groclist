using System.Threading.Tasks;
using GrocListApi.Core.Interfaces;
using GrocListApi.Core.Models;
using GrocListApi.Core.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace GrocListApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class GroceryListItemController : Controller
    {
        private readonly IGroceryListItemService _groceryListItemService;

        public GroceryListItemController(IGroceryListItemService groceryListItemService)
        {
            _groceryListItemService = groceryListItemService;
        }

        [AllowAnonymous]
        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var all = await _groceryListItemService.GetAll();

            return Ok(all.ToApiModels());
        }
    }
}