using System.ComponentModel.DataAnnotations.Schema;
using GrocListApi.Core.ApiModels;
using GrocListApi.Core.Interfaces;

namespace GrocListApi.Core.Models
{
    public class GroceryListItem : IEntity
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        public string Name { get; set; }
        public bool IsCollected { get; set; }
        public bool HasCoupon { get; set; }
        public int GroceryListId { get; set; }
        public GroceryList GroceryList { get; set; }

        public GroceryListItemModel ToApiModel()
        {
            return new GroceryListItemModel
            {
                Id = Id,
                Name = Name,
                IsCollected = IsCollected,
                HasCoupon = HasCoupon,
                GroceryListId = GroceryListId,
                GroceryList = GroceryList?.Name ?? string.Empty
            };
        }
    }
}