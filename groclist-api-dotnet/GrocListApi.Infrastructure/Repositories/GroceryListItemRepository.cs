using System.Collections.Generic;
using System.Threading.Tasks;
using GrocListApi.Core.Interfaces;
using GrocListApi.Core.Models;

namespace GrocListApi.Infrastructure.Repositories
{
    public class GroceryListItemRepository : BaseRepository<GroceryListItem>, IGroceryListItemRepository
    {
        public GroceryListItemRepository(AppDbContext context) : base(context)
        {
            
        }
        
        public Task<IEnumerable<GroceryListItem>> GetAll()
        {
            throw new System.NotImplementedException();
        }

        public Task<GroceryListItem> Get(int id)
        {
            throw new System.NotImplementedException();
        }

        public Task<GroceryListItem> Add(GroceryListItem entity)
        {
            throw new System.NotImplementedException();
        }

        public Task<GroceryListItem> Update(GroceryListItem entity)
        {
            throw new System.NotImplementedException();
        }

        public Task<GroceryListItem> Delete(int id)
        {
            throw new System.NotImplementedException();
        }

        public Task<IEnumerable<GroceryListItem>> GetForGroceryListId(int id)
        {
            throw new System.NotImplementedException();
        }
        
    }
}