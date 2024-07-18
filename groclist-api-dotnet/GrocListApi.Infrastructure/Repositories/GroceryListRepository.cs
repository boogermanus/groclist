using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using GrocListApi.Core.Interfaces;
using GrocListApi.Core.Models;
using Microsoft.EntityFrameworkCore;

namespace GrocListApi.Infrastructure.Repositories
{
    public class GroceryListRepository : BaseRepository<GroceryList>, IGroceryListRepository
    {
        public GroceryListRepository(AppDbContext context) : base(context)
        {
            
        }

        public override async Task<IEnumerable<GroceryList>> GetAll()
        {
            return await Entities
                .Include(e => e.User)
                .Include(e => e.Items)
                .ToListAsync();
        }

        public override async Task<GroceryList> Get(int id)
        {
            return await Entities
                .Include(e => e.User)
                .Include(e => e.Items)
                .FirstAsync(e => e.Id == id && !e.IsComplete);
        }

        public async Task<IEnumerable<GroceryList>> GetGroceryListsForUser(string userId)
        {
            return await Entities
                .Include(e => e.User)
                .Include(e => e.Items)
                .Where(e => e.UserId == userId && !e.IsComplete)
                .ToListAsync();
        }

        public async Task<IEnumerable<GroceryList>> GetAllGroceryListForUser(string userId)
        {
            var groceryLists = await Entities.
                Where(gr => gr.UserId == userId)
                .ToListAsync();

            return groceryLists;
        }

    }
}