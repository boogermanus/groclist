using System.Collections.Generic;
using System.Threading.Tasks;
using GrocListApi.Core.Models;

namespace GrocListApi.Core.Interfaces
{
    public interface IGroceryListItemRepository : IBaseRepository<GroceryListItem>
    {
        Task<IEnumerable<GroceryListItem>> GetForGroceryListId(int id);
    }
}