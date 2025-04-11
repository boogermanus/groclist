using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using GrocListApi.Core.Interfaces;
using GrocListApi.Core.Models;
using Microsoft.EntityFrameworkCore;

namespace GrocListApi.Infrastructure.Repositories
{
    public class GroceryListItemRepository : BaseRepository<GroceryListItem>, IGroceryListItemRepository
    {
        public GroceryListItemRepository(AppDbContext context) : base(context)
        {
            
        }
        
        public override async Task<IEnumerable<GroceryListItem>> GetAll()
        {
            return await Entities
                .Include(e => e.GroceryList)
                .ToListAsync();
        }

        public override async Task<GroceryListItem?> Get(int id)
        {
            return await Entities
                .Include(e => e.GroceryList)
                .FirstOrDefaultAsync(e => e.Id == id);
        }

        public async Task<IEnumerable<GroceryListItem>> GetSuggestions(string text)
        {
            if (string.IsNullOrWhiteSpace(text))
                return Array.Empty<GroceryListItem>();

            var query = Entities.FromSql($"SELECT * FROM GroceryListItems WHERE Name like '{text}%'");

            var result = await query
                .Select(gli => new GroceryListItem
                {
                    Name = gli.Name
                })
                .Distinct()
                .Take(3)
                .ToListAsync();

            return result;
        }
    }
}