using System;
using System.Threading.Tasks;
using GrocListApi.Core.Interfaces;
using GrocListApi.Core.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace GrocListApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class GroceryListsController : Controller
    {
        private readonly IGroceryListRepository _groceryListRepository;

        public GroceryListsController(IGroceryListRepository groceryListRepository)
        {
            _groceryListRepository = groceryListRepository;
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            return Ok(await _groceryListRepository.GetAll());
        }
        
        [HttpPost]
        public async Task<IActionResult> Post([FromBody] GroceryList groceryList)
        {
            try
            {
                return Ok(await _groceryListRepository.Add(groceryList));
            }
            catch (Exception e)
            {
                ModelState.AddModelError("Post", e.Message);
                return BadRequest(ModelState);
            }    
        }
    }
}