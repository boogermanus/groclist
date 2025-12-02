using GrocListApi.Core.Models;

namespace GrocListApi.Core.ApiModels;

public class GroceryListUserModel
{
    public int Id { get; set; }
    public required string Username { get; set; }
    public int GroceryListId { get; set; }
    public string UserId { get; set; } = string.Empty;

    public GroceryListUser ToDomainModel()
    {
        return new GroceryListUser
        {
            GroceryListId = GroceryListId,
            UserId = UserId,
        };
    }
}