using System.Collections.Generic;
using System.Threading.Tasks;
using GrocListApi.Core.Models;

namespace GrocListApi.Core.Interfaces
{
    public interface IGroceryListRepository : IBaseRepository<GroceryList>
    {
        public Task<IEnumerable<GroceryList>> GetGroceryListsForUser(string userId);
        Task<IEnumerable<GroceryList>> GetAllGroceryListForUser(string userId);
    }
}