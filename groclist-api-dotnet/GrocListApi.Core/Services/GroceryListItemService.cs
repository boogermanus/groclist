using System.Collections.Generic;
using System.Threading.Tasks;
using GrocListApi.Core.Interfaces;
using GrocListApi.Core.Models;

namespace GrocListApi.Core.Services
{
    public class GroceryListItemService : IGroceryListItemService
    {
        private readonly IGroceryListItemRepository _groceryListItemRepository;

        public GroceryListItemService(IGroceryListItemRepository groceryListItemRepository)
        {
            _groceryListItemRepository = groceryListItemRepository;
        }
        
        public async Task<IEnumerable<GroceryListItem>> GetAll()
        {
            return await _groceryListItemRepository.GetAll();
        }

        public async Task<GroceryListItem> Get(int id)
        {
            return await _groceryListItemRepository.Get(id);
        }

        public async Task<GroceryListItem> Add(GroceryListItem groceryListItem)
        {
            groceryListItem.IsCollected = false;
            return await _groceryListItemRepository.Add(groceryListItem);
        }

        public async Task<GroceryListItem> Update(GroceryListItem groceryListItem)
        {
            return await _groceryListItemRepository.Update(groceryListItem);
        }

        public async Task<GroceryListItem> Delete(GroceryListItem groceryListItem)
        {
            return await _groceryListItemRepository.Delete(groceryListItem.Id);
        }

        public async Task<IEnumerable<GroceryListItem>> GetForGroceryListId(int id)
        {
            return await _groceryListItemRepository.GetForGroceryListId(id);
        }
    }
}