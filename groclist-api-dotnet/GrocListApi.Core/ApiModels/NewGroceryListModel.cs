using GrocListApi.Core.Models;

namespace GrocListApi.Core.ApiModels;

public class NewGroceryListModel 
{
    public string Name { get; set; }
    public string UserId { get; set; }

    public GroceryList ToDomainModel() 
    {
        return new GroceryList
        {
            Name = Name,
            UserId = UserId
        };
    }
}