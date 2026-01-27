using GrocListApi.Core.ApiModels;
using GrocListApi.Core.Interfaces;
using GrocListApi.Core.Models;
using Microsoft.AspNetCore.Identity;

namespace GrocListApi.Core.Services
{
    public class GroceryListService : IGroceryListService
    {
        private readonly IGroceryListRepository _groceryListRepository;
        private readonly IUserService _userService;
        private readonly IGroceryListUserRepository _groceryListUserRepository;
        private readonly UserManager<User> _userManager;

        public GroceryListService(IGroceryListRepository groceryListRepository, IUserService userService,
            IGroceryListUserRepository groceryListUserRepository, UserManager<User> userManager)
        {
            _groceryListRepository = groceryListRepository;
            _userService = userService;
            _groceryListUserRepository = groceryListUserRepository;
            _userManager = userManager;
        }

        public async Task<IEnumerable<GroceryList>> GetAll()
        {
            if (string.IsNullOrEmpty(_userService.CurrentUserId))
                return await _groceryListRepository.GetAll();

            return await _groceryListRepository.GetGroceryListsForUser(_userService.CurrentUserId);
        }

        public async Task<GroceryList?> Get(int id)
        {
            var groceryList = await _groceryListRepository.Get(id);

            return groceryList;
        }

        public async Task<GroceryList?> GetAsync(int id)
        {
            var groceryList = await _groceryListRepository.Get(id, _userService.CurrentUserId);

            return groceryList;
        }

        public async Task<GroceryList> Add(GroceryList groceryList)
        {
            groceryList.CreatedDate = DateTime.Now.ToUniversalTime();
            groceryList.IsComplete = false;

            return await _groceryListRepository.Add(groceryList);
        }

        public async Task<GroceryList?> Update(GroceryList groceryList)
        {
            var current = await _groceryListRepository.Get(groceryList.Id);
            var users = await _groceryListUserRepository.GetGroceryListUsersForGroceryList(groceryList.Id);
            if (current?.UserId != _userService.CurrentUserId || users.All(u => u.UserId != _userService.CurrentUserId))
                throw new UnauthorizedAccessException();

            return await _groceryListRepository.Update(groceryList);
        }

        public async Task<GroceryList?> Delete(GroceryList groceryList)
        {
            var current = await _groceryListRepository.Get(groceryList.Id);
            var users = await _groceryListUserRepository.GetGroceryListUsersForGroceryList(groceryList.Id);

            if (current?.UserId != _userService.CurrentUserId || users.All(u => u.UserId != _userService.CurrentUserId))
                throw new UnauthorizedAccessException();

            return await _groceryListRepository.Delete(groceryList.Id);
        }

        public async Task<IEnumerable<GroceryList>> GetAllForUser()
        {
            var lists = await _groceryListRepository.GetAllGroceryListForUser(_userService.CurrentUserId);
            return lists;
        }

        public async Task<IEnumerable<string?>> GetSuggestions(string text)
        {
            return await _groceryListRepository.GetSuggestions(text);
        }

        public async Task<GroceryListUserModel> AddUserToGroceryList(GroceryListUserModel model)
        {
            var current = await _groceryListRepository.Get(model.GroceryListId);
            
            if (current?.UserId != _userService.CurrentUserId)
                throw new UnauthorizedAccessException();
            
            // see if the user exists or throw
            User? existingUser = null;
            if (!string.IsNullOrEmpty(model.Username))
            {
                existingUser = await _userManager.FindByNameAsync(model.Username);
            }

            if (existingUser == null)
                throw new Exception($"User {model.Username} not found");

            // see if the item exists
            var existing =
                await _groceryListUserRepository.GetForGroceryListAndUser(model.GroceryListId, existingUser.Id);
            
            // add if not then add
            if (existing != null)
                return existing.ToApiModel();

            model.UserId = existingUser.Id;
            
            var result = await _groceryListUserRepository.Add(model.ToDomainModel());

            return result.ToApiModel();
        }
        
        public async Task<GroceryListUserModel?> DeleteUserFromGroceryListAsync(GroceryListUserModel model)
        {
            var current = await _groceryListRepository.Get(model.GroceryListId);
            
            if (current?.UserId != _userService.CurrentUserId)
                throw new UnauthorizedAccessException();
            
            var existing =
                await _groceryListUserRepository.GetForGroceryListAndUser(model.GroceryListId, model.UserId);
            
            if (existing == null)
                return null;

            var result = await _groceryListUserRepository.Delete(existing.Id);

            return result.ToApiModel();
        }
    }
}