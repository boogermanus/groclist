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
        private readonly IGrocListRepository _grocListRepository;

        public GroceryListsController(IGrocListRepository grocListRepository)
        {
            _grocListRepository = grocListRepository;
        }
        
        [HttpPost]
        public async Task<IActionResult> Post([FromBody] GrocList grocList)
        {
            try
            {
                return Ok(await _grocListRepository.Add(grocList));
            }
            catch (Exception e)
            {
                ModelState.AddModelError("Post", e.Message);
                return BadRequest(ModelState);
            }    
        }
    }
}