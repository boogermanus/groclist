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
using Microsoft.OpenApi.Models;

namespace GrocListApi
{
    public class Startup
    {
        
        private IConfiguration Configuration { get; }
        
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }
        
        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddEndpointsApiExplorer();
            services.AddSwaggerGen(options => {
                options.AddSecurityDefinition("bearer", new OpenApiSecurityScheme
                {
                    Type = SecuritySchemeType.Http,
                    BearerFormat = "JWT",
                    In = ParameterLocation.Header,
                    Scheme = "bearer"
                });
                options.OperationFilter<AddAuthHeaderOperationFilter>();
            });
            services.AddControllers()
                .AddNewtonsoftJson(options => {
                    options.SerializerSettings.ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore;
                });
            services.AddDbContext<AppDbContext>(options =>
                options.UseSqlite(Configuration.GetConnectionString("DefaultConnection")));
                
            services.AddIdentity<User, IdentityRole>(options => {
                options.Password.RequireDigit = false;
            })
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
                    IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(Configuration["Jwt:Key"] 
                        ?? string.Empty))
                };
            });

            
            // for the user service
            services.AddHttpContextAccessor();

            // repositories
            services.AddScoped<IGroceryListRepository, GroceryListRepository>();
            services.AddScoped<IGroceryListItemRepository, GroceryListItemRepository>();
            // services
            services.AddScoped<IAuthService, AuthService>();
            services.AddScoped<IGroceryListService, GroceryListService>();
            services.AddScoped<IGroceryListItemService, GroceryListItemService>();
            services.AddScoped<IInfoRepository, InfoRepository>();
            services.AddScoped<IInfoService, InfoService>();
            // has to be transient to catch the request context
            services.AddTransient<IUserService, UserService>();

        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
                app.UseSwagger();
                app.UseSwaggerUI();
            }

            // not needed in my hosting environment
            // app.UseHttpsRedirection();

            app.UseCors(options =>
            {
                options.WithOrigins(["https://permutate.us", "http://localhost:4200"]);
                options.AllowAnyHeader();
                options.AllowAnyMethod();
            });
            
            app.UseAuthentication();
            app.UseRouting();
            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}
