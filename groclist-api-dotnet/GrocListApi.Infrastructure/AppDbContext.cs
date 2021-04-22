﻿using GrocListApi.Core.Models;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace GrocListApi.Infrastructure
{
    public class AppDbContext : IdentityDbContext<User>
    {
        public DbSet<GroceryList> GrocLists { get; set; }
        
        public AppDbContext(DbContextOptions options) : base(options)
        {
            
        }
    }
}