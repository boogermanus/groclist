using GrocListApi.Core.ApiModels;
using GrocListApi.Core.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace GrocListApi.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize]
public class InfoController: ControllerBase
{
    private readonly IInfoService _infoService;
    public InfoController(IInfoService service)
    {
        _infoService = service;;
    }

    [HttpGet("getinfo")]
    public async Task<IActionResult> GetInfo()
    {
        var itemCount = await _infoService.ItemCount();
        var listCount = await _infoService.ListCount();
        var popularItems = await _infoService.PopularItems();
        var popularLists = await _infoService.PopularLists();

        return Ok(new InfoModel
        {
            ItemCount = itemCount,
            ListCount = listCount,
            PopularItems = popularItems,
            PopularLists = popularLists
        });
    }

    // [HttpGet("itemcount")]
    // public async Task<IActionResult> GetItemCount()
    // {
    //     return Ok(await _infoService.ItemCount());
    // }

    // [HttpGet("listcount")]
    // public async Task<IActionResult> GetListCount()
    // {
    //     return Ok(await _infoService.ListCount());
    // }

    // [HttpGet("popularitems")]
    // public async Task<IActionResult> GetPopularItems()
    // {
    //     return Ok(await _infoService.PopularItems());
    // }

    // [HttpGet("popularlists")]
    // public async Task<IActionResult> GetPopularLists()
    // {
    //     return Ok(await _infoService.PopularLists());
    // }

    // [HttpGet("getitems")]
    // public async Task<IActionResult> GetItems()
    // {
    //     return Ok(await _infoService.GetItems());
    // }

}