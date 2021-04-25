using System;
using System.Linq;
using System.Threading.Tasks;
using GrocListApi.Core.ApiModels;
using GrocListApi.Core.Interfaces;
using GrocListApi.Core.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace GrocListApi.Controllers
{
    [Route("api/[controller]")]
    [Authorize]
    [ApiController]
    public class GroceryListsController : Controller
    {
        private readonly IGroceryListService _groceryListService;

        public GroceryListsController(IGroceryListService groceryListService)
        {
            _groceryListService = groceryListService;
        }

        [AllowAnonymous]
        [HttpGet]
        public async Task<IActionResult> Get()
        {
            var all = await _groceryListService.GetAll();
            return Ok(all.ToApiModels());
        }

        [AllowAnonymous]
        [HttpGet("{id}")]
        public async Task<IActionResult> Get(int id)
        {
            var groceryList = await _groceryListService.Get(id);

            if (groceryList == null)
                return NotFound();

            return Ok(groceryList.ToApiModel());
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

        [HttpPut("{id}")]
        public async Task<IActionResult> Put(int id, [FromBody] GroceryListModel updatedGroceryList)
        {
            var groceryList = await _groceryListService.Get(id);
        
            if (groceryList == null)
                return NotFound();

            try
            {
                // I don't like this, but I don't want to refact the service layer right now
                updatedGroceryList.Id = groceryList.Id;
                updatedGroceryList.CreatedDate = groceryList.CreatedDate;
                
                var updatedList = await _groceryListService.Update(updatedGroceryList.ToDomainModel());
                return Ok(updatedList.ToApiModel());
            }
            catch (Exception e)
            {
                ModelState.AddModelError("Put", e.Message);
                return BadRequest(ModelState);
            }
        }
        
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var groceryList = await _groceryListService.Get(id);

            if (groceryList == null)
                return NotFound();

            try
            {
                await _groceryListService.Delete(groceryList);
                return NoContent();
            }
            catch (Exception e)
            {
                ModelState.AddModelError("Delete", e.Message);
                return BadRequest(ModelState);
            }
        }
    }
}