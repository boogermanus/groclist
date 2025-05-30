using GrocListApi.Core.ApiModels;

namespace GrocListApi.Core.Interfaces;

public interface IInfoRepository
{
    Task<int> ListCount(string userId);
    Task<int> ItemCount(string userId);
    Task<string?[]> PopularItems(string userId);
    Task<string?[]> PopularLists(string userId);
    Task<List<InfoItemModel>> GetItems(string userId);
}