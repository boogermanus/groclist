namespace GrocListApi.Core.Interfaces;

public interface IInfoService 
{
  Task<int> ListCount();
  Task<int> ItemCount();
  Task<string> PopularItems();
  Task<string> PopularLists();  
}