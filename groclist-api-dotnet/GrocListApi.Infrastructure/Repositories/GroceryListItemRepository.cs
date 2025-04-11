using System.Collections.Generic;
using System.Linq;
using System.Runtime.CompilerServices;
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

        public async Task<IEnumerable<string?>> GetSuggestions(string text)
        {
            if (string.IsNullOrWhiteSpace(text))
                return Array.Empty<string>();
            
            var sql = $"SELECT * FROM GroceryListItems WHERE Name like '{text}%'";
            var fs = FormattableStringFactory.Create(sql);
            var query = Entities.FromSql(fs);

            var result = await query
                .Select(s => s.Name)
                .Distinct()
                .Take(3)
                .ToListAsync();

            return result;
        }
    }
}