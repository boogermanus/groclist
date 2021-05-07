using System;
using System.Threading.Tasks;
using GrocListApi.Core.ApiModels;
using GrocListApi.Core.Interfaces;
using GrocListApi.Core.Models;
using GrocListApi.Core.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace GrocListApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize]
    public class GroceryListItemController : Controller
    {
        private readonly IGroceryListItemService _groceryListItemService;

        public GroceryListItemController(IGroceryListItemService groceryListItemService)
        {
            _groceryListItemService = groceryListItemService;
        }

        // allow admin
        [AllowAnonymous]
        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var all = await _groceryListItemService.GetAll();

            return Ok(all.ToApiModels());
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> Get(int id)
        {
            var item = await _groceryListItemService.Get(id);

            if (item == null)
                return NotFound();

            return Ok(item.ToApiModel());
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Put(int id, [FromBody]GroceryListItemModel model)
        {
            try
            {
                var current = await _groceryListItemService.Get(id);

                if (current == null)
                    return NotFound();

                var updated = await _groceryListItemService.Update(model.ToDomainModel());

                return Ok(updated.ToApiModel());
            }
            catch (Exception e)
            {
                ModelState.AddModelError("Put", e.Message);
                return BadRequest(ModelState);
            }
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id, [FromBody] GroceryListItemModel model)
        {
            try
            {
                var current = await _groceryListItemService.Get(id);

                if (current == null)
                    return NotFound();

                var updated = await _groceryListItemService.Update(model.ToDomainModel());

                return Ok(updated.ToApiModel());
            }
            catch (Exception e)
            {
                ModelState.AddModelError("Delete", e.Message);
                return BadRequest(ModelState);
            }
        }
    }
}