using GrocListApi.Core.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace GrocListApi.Infrastructure.Repositories;

public class InfoRepository : IInfoRepository
{
    private readonly AppDbContext _context;
    
    public InfoRepository(AppDbContext context)
    {
        _context = context;
    }

    public async Task<int> ItemCount(string userId)
    {
        return await _context.GroceryListItems
            .Include(gri => gri.GroceryList)
            .CountAsync(gri => gri.GroceryList.UserId == userId);
    }

    public async Task<int> ListCount(string userId)
    {
        return await _context.GroceryList.CountAsync(gr => gr.UserId == userId);
    }

    public Task<string> PopularItems(string userId)
    {
        throw new NotImplementedException();
    }

    public Task<string> PopularLists(string userId)
    {
        throw new NotImplementedException();
    }
}