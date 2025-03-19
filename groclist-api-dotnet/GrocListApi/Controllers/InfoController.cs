using GrocListApi.Core.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace GrocListApi.Controllers;

[ApiController]
[Route("api/controller")]
public class InfoController: ControllerBase
{
    private readonly IInfoService _infoService;
    public InfoController(IInfoService service)
    {
        _infoService = service;;
    }

    [HttpGet("itemcount")]
    public async Task<IActionResult> GetItemCount()
    {
        return Ok(await _infoService.ItemCount());
    }
}