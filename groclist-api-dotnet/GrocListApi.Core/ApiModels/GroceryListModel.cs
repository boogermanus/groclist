using System;
using GrocListApi.Core.Models;

namespace GrocListApi.Core.ApiModels
{
    public class GroceryListModel
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public DateTime CreatedDate { get; set; }
        public bool IsComplete { get; set; }
        public string UserId { get; set; }
        public UserModel User { get; set; }

        public GroceryList ToDomainModel()
        {
            return new GroceryList
            {
                Id = Id,
                Name = Name,
                CreatedDate = CreatedDate,
                IsComplete = IsComplete,
                UserId = UserId
            };
        }
    }
}