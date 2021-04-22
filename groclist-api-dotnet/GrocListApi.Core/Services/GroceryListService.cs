using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using GrocListApi.Core.Interfaces;
using GrocListApi.Core.Models;

namespace GrocListApi.Core.Services
{
    public class GroceryListService : IGroceryListService
    {
        private readonly IGroceryListRepository _groceryListRepository;

        public GroceryListService(IGroceryListRepository groceryListRepository)
        {
            _groceryListRepository = groceryListRepository;
        }
        public async Task<IEnumerable<GroceryList>> GetAll()
        {
            return await _groceryListRepository.GetAll();
        }

        public async Task<GroceryList> Get(int id)
        {
            return await _groceryListRepository.Get(id);
        }

        public async Task<GroceryList> Add(GroceryList groceryList)
        {
            groceryList.CreatedDate = DateTime.Now.ToUniversalTime();
            groceryList.IsComplete = false;

            return await _groceryListRepository.Add(groceryList);
        }

        public async Task<GroceryList> Update(GroceryList groceryList)
        {
            return await _groceryListRepository.Update(groceryList);
        }

        public async Task<GroceryList> Delete(GroceryList groceryList)
        {
            return await _groceryListRepository.Delete(groceryList.Id);
        }
    }
}