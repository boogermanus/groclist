using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using GrocListApi.Core.ApiModels;
using GrocListApi.Core.Interfaces;

namespace GrocListApi.Core.Models;

public class GroceryListUser  : IEntity
{
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    [Key]
    public int Id { get; set; }
    public required int GroceryListId { get; set; }
    public GroceryList? GroceryList { get; set; }
    public required string UserId { get; set; }
    public User? User { get; set; }

    public GroceryListUserModel ToApiModel()
    {
        return new GroceryListUserModel
        {
            GroceryListId = GroceryListId,
            UserId = UserId,
            Username = User?.UserName ?? string.Empty,
        };
    }
}