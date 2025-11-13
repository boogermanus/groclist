using GrocListApi.Core.Models;

namespace GrocListApi.Core.Interfaces;

public interface IGroceryListUserRepository : IBaseRepository<GroceryListUser>
{
    Task<GroceryListUser?> GetForGroceryListAndUser(int groceryListId, string userId);
}