using System;

namespace GrocListApi.Core.ApiModels
{
    public class GroceryListModel
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public DateTime CreatedDate { get; set; }
        public bool IsComplete { get; set; }
        public string UserId { get; set; }
        public string User { get; set; }
    }
}