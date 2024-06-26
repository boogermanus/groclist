using System.ComponentModel.DataAnnotations;
using GrocListApi.Core.Models;

namespace GrocListApi.Core.ApiModels
{
    public class GroceryListItemModel
    {
        public int Id { get; set; }
        [Required]
        public string? Name { get; set; }
        public bool IsCollected { get; set; }
        public bool HasCoupon { get; set; }
        [Required]
        public int GroceryListId { get; set; }
        public string? GroceryList { get; set; }

        public GroceryListItem ToDomainModel()
        {
            return new GroceryListItem
            {
                Id = Id,
                Name = Name,
                IsCollected = IsCollected,
                HasCoupon = HasCoupon,
                GroceryListId = GroceryListId
            };
        }
    }
}