using GrocListApi.Core.Interfaces;
using GrocListApi.Core.Models;
using Microsoft.EntityFrameworkCore;

namespace GrocListApi.Infrastructure.Repositories;

public class GroceryListUserRepository : BaseRepository<GroceryListUser>, IGroceryListUserRepository
{
    public GroceryListUserRepository(AppDbContext context) : base(context)
    {
        
    }

    public async Task<GroceryListUser?> GetForGroceryListAndUser(int groceryListId, string userId)
    {
        return await Entities.FirstOrDefaultAsync(glu => glu.GroceryListId == groceryListId && glu.UserId == userId);
    }
    
}