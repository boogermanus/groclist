using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using GrocListApi.Core.Interfaces;
using GrocListApi.Core.Models;
using Microsoft.EntityFrameworkCore;

namespace GrocListApi.Infrastructure.Repositories
{
    public class GrocListRepository : BaseRepository<GrocList>, IGrocListRepository
    {
        public GrocListRepository(AppDbContext context) : base(context)
        {
            
        }

        public override async Task<IEnumerable<GrocList>> GetAll()
        {
            return await Entities
                .Include(e => e.User)
                .ToListAsync();
        }

        public override async Task<GrocList> Get(int id)
        {
            return await Entities
                .Include(e => e.User)
                .FirstOrDefaultAsync(e => e.Id == id);
        }

        public override async Task<GrocList> Add(GrocList entity)
        {
            entity.CreatedDate = DateTime.Now.ToUniversalTime();
            entity.IsComplete = false;
            return await base.Add(entity);
        }
    }
}