using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using GrocListApi.Core.Interfaces;

namespace GrocListApi.Core.Models
{
    public class GrocList : IEntity
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        [Required]
        public string Name { get; set; }
        public DateTime CreatedDate { get; set; }
        public bool IsComplete { get; set; }
        public string UserId { get; set; }
        public User User { get; set; }
    }
}