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
                .ToListAsync();
        }

        public override async Task<GroceryList> Get(int id)
        {
            return await Entities
                .Include(e => e.User)
                .FirstOrDefaultAsync(e => e.Id == id);
        }
    }
}