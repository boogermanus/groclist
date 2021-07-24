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
        private readonly IUserService _userService;
        
        public GroceryListService(IGroceryListRepository groceryListRepository, IUserService userService)
        {
            _groceryListRepository = groceryListRepository;
            _userService = userService;
        }
        
        public async Task<IEnumerable<GroceryList>> GetAll()
        {
            if(string.IsNullOrEmpty(_userService.CurrentUserId))
                return await _groceryListRepository.GetAll();

            return await _groceryListRepository.GetGroceryListsForUser(_userService.CurrentUserId);
        }

        public async Task<GroceryList> Get(int id)
        {
            var groceryList = await _groceryListRepository.Get(id);

            if (groceryList.UserId != _userService.CurrentUserId)
                throw new UnauthorizedAccessException();

            return groceryList;
        }

        public async Task<GroceryList> Add(GroceryList groceryList)
        {
            groceryList.CreatedDate = DateTime.Now.ToUniversalTime();
            groceryList.IsComplete = false;

            return await _groceryListRepository.Add(groceryList);
        }

        public async Task<GroceryList> Update(GroceryList groceryList)
        {
            var current = await _groceryListRepository.Get(groceryList.Id);

            if (current.UserId != _userService.CurrentUserId)
                throw new UnauthorizedAccessException();
            
            return await _groceryListRepository.Update(groceryList);
        }
        
        public async Task<GroceryList> Delete(GroceryList groceryList)
        {
            var current = await _groceryListRepository.Get(groceryList.Id);

            if (current.UserId != _userService.CurrentUserId)
                throw new UnauthorizedAccessException();
            
            return await _groceryListRepository.Delete(groceryList.Id);
        }
    }
}