using GrocListApi.Core.ApiModels;
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

    public async Task<string?[]> PopularItems(string userId)
    {
        //throw new NotImplementedException();
        return await _context.GroceryListItems
            .Include(gri => gri.GroceryList)
            .Where(gri => gri.GroceryList.UserId == userId)
            .GroupBy(gb => gb.Name)
            .Select(s => new
            {
                Name = s.Key,
                Count = s.Count()
            })
            .OrderByDescending(s => s.Count)
            .Select(s => s.Name)
            .Take(3)
            .ToArrayAsync();
    }

    public async Task<string?[]> PopularLists(string userId)
    {
        return await _context.GroceryList
            .Where(gr => gr.UserId == userId)
            .GroupBy(gb => gb.Name)
            .Select(s => new
            {
                Name = s.Key,
                Count = s.Count()
            })
            .OrderByDescending(obd => obd.Count)
            .Select(s => s.Name)
            .Take(3)
            .ToArrayAsync();
    }

    public async Task<List<InfoItemModel>> GetItems(string userId)
    {
        return await _context.GroceryListItems
        .Include(gri => gri.GroceryList)
        .Where(gri => gri.GroceryList.UserId == userId)
        .GroupBy(gb => gb.Name)
        .Select(s => new InfoItemModel { Name = s.Key ?? string.Empty, Count = s.Count() })
        .OrderByDescending(s => s.Count)
        .ToListAsync();
    }
}