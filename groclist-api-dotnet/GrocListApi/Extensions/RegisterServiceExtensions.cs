using System.Text;
using GrocListApi.Core.Interfaces;
using GrocListApi.Core.Models;
using GrocListApi.Core.Services;
using GrocListApi.Infrastructure;
using GrocListApi.Infrastructure.Repositories;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi;

namespace GrocListApi.Extensions;

public static class RegisterServiceExtensions
{
    public static IServiceCollection RegisterCommonServices(this IServiceCollection services)
    {
        services.AddEndpointsApiExplorer();
        services.AddSwaggerGen(options =>
        {
            options.AddSecurityDefinition("bearer", new OpenApiSecurityScheme
            {
                Type = SecuritySchemeType.Http,
                BearerFormat = "JWT",
                In = ParameterLocation.Header,
                Scheme = "bearer"
            });
            options.AddSecurityRequirement(document => new OpenApiSecurityRequirement
            {
                [new OpenApiSecuritySchemeReference("bearer", document)] = []
            });
        });
        services.AddControllers()
            .AddNewtonsoftJson(options =>
            {
                options.SerializerSettings.ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore;
            });
        services.AddHttpContextAccessor();

        return services;
    }

    public static IServiceCollection RegisterDatabaseServices(this IServiceCollection services, IConfiguration configuration)
    {
        var connectionString = configuration.GetConnectionString("DefaultConnection")
            ?? throw new InvalidOperationException("Connection string 'DefaultConnection' not found.");

        services.AddDbContext<AppDbContext>(options => options.UseSqlite(connectionString));
        services.AddIdentity<User, IdentityRole>(options => options.Password.RequireDigit = false)
            .AddEntityFrameworkStores<AppDbContext>();
        services.AddAuthentication(options =>
        {
            options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
            options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
        })
        .AddJwtBearer(options =>
        {
            options.TokenValidationParameters = new TokenValidationParameters
            {
                ValidateIssuer = false,
                ValidateAudience = false,
                ValidateLifetime = true,
                ValidateIssuerSigningKey = true,
                IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(configuration["Jwt:Key"] ?? string.Empty))
            };
        });

        return services;
    }

    public static IServiceCollection RegisterAppServices(this IServiceCollection services)
    {
        services.AddScoped<IGroceryListRepository, GroceryListRepository>();
        services.AddScoped<IGroceryListItemRepository, GroceryListItemRepository>();
        services.AddScoped<IGroceryListUserRepository, GroceryListUserRepository>();
        services.AddScoped<IAuthService, AuthService>();
        services.AddScoped<IGroceryListService, GroceryListService>();
        services.AddScoped<IGroceryListItemService, GroceryListItemService>();
        services.AddScoped<IInfoRepository, InfoRepository>();
        services.AddScoped<IInfoService, InfoService>();
        services.AddTransient<IUserService, UserService>();

        return services;
    }
}
