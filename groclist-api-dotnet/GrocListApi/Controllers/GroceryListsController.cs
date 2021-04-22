using System;
using System.Threading.Tasks;
using GrocListApi.Core.Interfaces;
using GrocListApi.Core.Models;
using Microsoft.AspNetCore.Mvc;

namespace GrocListApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class GroceryListsController : Controller
    {
        private readonly IGroceryListService _groceryListService;

        public GroceryListsController(IGroceryListService groceryListService)
        {
            _groceryListService = groceryListService;
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            return Ok(await _groceryListService.GetAll());
        }
        
        [HttpPost]
        public async Task<IActionResult> Post([FromBody] GroceryList groceryList)
        {
            try
            {
                return Ok(await _groceryListService.Add(groceryList));
            }
            catch (Exception e)
            {
                ModelState.AddModelError("Post", e.Message);
                return BadRequest(ModelState);
            }    
        }
    }
}