using System.Collections.Generic;
using System.Threading.Tasks;
using GrocListApi.Core.Models;

namespace GrocListApi.Core.Interfaces
{
    public interface IGroceryListItemService
    {
        Task<IEnumerable<GroceryListItem>> GetAll();
        Task<GroceryListItem> Get(int id);
        Task<GroceryListItem> Add(GroceryListItem groceryListItem);
        Task<GroceryListItem> Update(GroceryListItem groceryListItem);
        Task<GroceryListItem> Delete(GroceryListItem groceryListItem);
        Task<IEnumerable<GroceryListItem>> GetSuggestions(string query);
    }
}