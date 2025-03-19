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

    public Task<int> ListCount()
    {
        throw new NotImplementedException();
    }

    public Task<string> PopularItems()
    {
        throw new NotImplementedException();
    }

    public Task<string> PopularLists()
    {
        throw new NotImplementedException();
    }
}