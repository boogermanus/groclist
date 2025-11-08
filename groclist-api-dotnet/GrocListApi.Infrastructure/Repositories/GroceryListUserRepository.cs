using GrocListApi.Core.Interfaces;
using GrocListApi.Core.Models;

namespace GrocListApi.Infrastructure.Repositories;

public class GroceryListUserRepository : BaseRepository<GroceryListUser>, IGroceryListUserRepository
{
    public GroceryListUserRepository(AppDbContext context) : base(context)
    {

    }
    
}