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

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            var all = await _groceryListService.GetAll();
            return Ok(all.ToApiModels().ToList());
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> Get(int id)
        {
            try
            {
                var groceryList = await _groceryListService.Get(id);

                if (groceryList == null)
                    return NotFound();

                return Ok(groceryList.ToApiModel());
            }
            catch (UnauthorizedAccessException e)
            {
                return Unauthorized(e);
            }
        }
        
        [HttpPost]
        public async Task<IActionResult> Post([FromBody] GroceryListModel groceryList)
        {
            try
            {
                var newList = await _groceryListService.Add(groceryList.ToDomainModel());
                return Ok(newList.ToApiModel());
            }
            catch (UnauthorizedAccessException uae)
            {
                return Unauthorized(uae);
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
                var updatedList = await _groceryListService.Update(updatedGroceryList.ToDomainModel());
                return Ok(updatedList?.ToApiModel());
            }
            catch (UnauthorizedAccessException uae)
            {
                return Unauthorized(uae);
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
            catch (UnauthorizedAccessException uae)
            {
                return Unauthorized(uae);
            }
            catch (Exception e)
            {
                ModelState.AddModelError("Delete", e.Message);
                return BadRequest(ModelState);
            }
        }

        [HttpGet("GetAllForUser")]
        public async Task<IActionResult> GetAllForUser()
        {
            var lists = await _groceryListService.GetAllForUser();
            return Ok(lists);
        }
    }
}