using GrocListApi.Core.ApiModels;
using GrocListApi.Core.Interfaces;

namespace GrocListApi.Core.Services;

public class InfoService : IInfoService
{
    private readonly IInfoRepository _infoRepository;
    private readonly IUserService _userService;
    public InfoService(IInfoRepository repository, IUserService service)
    {
        _infoRepository = repository;
        _userService = service;
    }
    
    public async Task<int> ItemCount()
    {
        return await _infoRepository.ItemCount(_userService.CurrentUserId);
    }

    public async Task<int> ListCount()
    {
        return await _infoRepository.ListCount(_userService.CurrentUserId);
    }

    public async Task<string?[]> PopularItems()
    {
        return await _infoRepository.PopularItems(_userService.CurrentUserId);
    }

    public async Task<string?[]> PopularLists()
    {
        return await _infoRepository.PopularLists(_userService.CurrentUserId);
    }

    public async Task<List<InfoItemModel>> GetItems()
    {
        return await _infoRepository.GetItems(_userService.CurrentUserId);
    }
}