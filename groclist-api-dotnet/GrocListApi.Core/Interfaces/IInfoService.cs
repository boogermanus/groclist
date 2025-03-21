using GrocListApi.Core.ApiModels;

namespace GrocListApi.Core.Interfaces;

public interface IInfoService 
{
  Task<int> ListCount();
  Task<int> ItemCount();
  Task<string?[]> PopularItems();
  Task<string?[]> PopularLists();  
  Task<List<InfoItemModel>> GetItems();
}