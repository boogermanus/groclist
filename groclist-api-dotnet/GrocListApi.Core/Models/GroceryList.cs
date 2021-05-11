using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using GrocListApi.Core.ApiModels;
using GrocListApi.Core.Interfaces;

namespace GrocListApi.Core.Models
{
    public class GroceryList : IEntity
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        [Required]
        public string Name { get; set; }
        public DateTime CreatedDate { get; set; }
        public bool IsComplete { get; set; }
        [Required]
        public string UserId { get; set; }
        public User User { get; set; }
        public ICollection<GroceryListItem> Items { get; set; }

        public GroceryListModel ToApiModel()
        {
            return new GroceryListModel
            {
                Id = Id,
                Name = Name,
                CreatedDate = CreatedDate,
                IsComplete = IsComplete,
                UserId = UserId,
                User = User?.ToApiModel(),
                Items = Items?.ToApiModels().ToList() ?? new List<GroceryListItemModel>()
            };
        }
    }

    public static class GroceryListExtensions
    {
        public static IEnumerable<GroceryListModel> ToApiModels(this IEnumerable<GroceryList> list) =>
            list.Select(gl => gl.ToApiModel());

    }
}