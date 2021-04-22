using System.Collections.Generic;
using System.Threading.Tasks;
using GrocListApi.Core.Models;

namespace GrocListApi.Core.Interfaces
{
    public interface IGroceryListService
    {
        Task<IEnumerable<GroceryList>> GetAll();
        Task<GroceryList> Get(int id);
        Task<GroceryList> Add(GroceryList groceryList);
        Task<GroceryList> Update(GroceryList groceryList);
        Task<GroceryList> Delete(GroceryList groceryList);
    }
}