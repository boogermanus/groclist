using System.Runtime.CompilerServices;
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

        public async Task<GroceryList?> Get(int id, string userId)
        {
            // return await Entities
            //     .Include(e => e.User)
            //     .Include(e => e.Items)
            //     .GroupJoin(DbContext.GroceryListUsers,
            //         gl => gl.Id,
            //         glu => glu.GroceryListId,
            //         (gl, glu) => new { gl, sublist = glu }
            //     )
            //     .SelectMany(joined => joined.sublist.DefaultIfEmpty(),
            //         (gl, glu) => new {gl, glu})
            //     .Where(join => join.gl.gl.Id == id)
            //     .Select(q => q.gl.gl)
            //     .FirstOrDefaultAsync(e => e.Id == id);

            return await Entities
                .Include(e => e.User)
                .Include(e => e.Items)
                .Include(e => e.GroceryListUsers)
                .Where(e => e.Id == id && (e.UserId == userId || e.GroceryListUsers.Any(glu => glu.UserId == userId)))
                .FirstOrDefaultAsync();
        }

        public async Task<IEnumerable<GroceryList>> GetGroceryListsForUser(string userId)
        {
            // return await Entities
            //     .Include(e => e.User)
            //     .Include(e => e.Items)
            //     .GroupJoin(DbContext.GroceryListUsers,
            //         gl => gl.Id,
            //         glu => glu.GroceryListId,
            //         (gl, glu) => new { gl, sublist = glu }
            //     )
            //     .SelectMany(joined => joined.sublist.DefaultIfEmpty(),
            //         (gl, glu) => new { gl, glu })
            //     .Where(join => !join.gl.gl.IsComplete && (join.gl.gl.UserId == userId || join.glu.UserId == userId))
            //     .Select(q => q.gl.gl)
            //     .ToListAsync();

            return await Entities
                .Include(e => e.Items)
                .Include(e => e.GroceryListUsers)
                .Where(e => !e.IsComplete &&  (e.UserId == userId || e.GroceryListUsers.Any(glu => glu.UserId == userId)))
                .ToListAsync();
        }

        public async Task<IEnumerable<GroceryList>> GetAllGroceryListForUser(string userId)
        {
            // return await Entities
            //     .Include(e => e.User)
            //     .Include(e => e.Items)
            //     .GroupJoin(DbContext.GroceryListUsers,
            //         gl => gl.Id,
            //         glu => glu.GroceryListId,
            //         (gl, glu) => new { gl, sublist = glu }
            //     )
            //     .SelectMany(joined => joined.sublist.DefaultIfEmpty(),
            //         (gl, glu) => new { gl, glu })
            //     .Where(join => join.gl.gl.UserId == userId || join.glu.UserId == userId)
            //     .Select(q => q.gl.gl)
            //     .ToListAsync();
            
            return await Entities
                .Include(e => e.Items)
                .Include(e => e.GroceryListUsers)
                .Where(e => e.UserId == userId || e.GroceryListUsers.Any(glu => glu.UserId == userId))
                .ToListAsync();
        }

        public async Task<IEnumerable<string?>> GetSuggestions(string text)
        {
            if (string.IsNullOrWhiteSpace(text))
                return [];

            return await Entities.FromSql(
                    FormattableStringFactory.Create($"SELECT * FROM GroceryList WHERE Name like '{text}%'")
                )
                .Select(q => q.Name)
                .Distinct()
                .ToListAsync();
        }
    }
}