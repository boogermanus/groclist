using GrocListApi.Core.Models;

namespace GrocListApi.Core.ApiModels;

public class GroceryListUserModel
{
    public required string Username { get; set; }
    public required int GroceryListId { get; set; }
    public required string UserId  { get; set; }

    public GroceryListUser ToDomainModel()
    {
        return new GroceryListUser
        {
            GroceryListId = GroceryListId,
            UserId = UserId,
        };
    }
}