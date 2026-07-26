using GrocListApi.Extensions;

var builder = WebApplication.CreateBuilder(args);
builder.WebHost.UseUrls("http://localhost:5003");

builder.Services.RegisterCommonServices()
    .RegisterDatabaseServices(builder.Configuration)
    .RegisterAppServices();

builder.BuildApp().Run();
