namespace GrocListApi.Extensions;

public static class AppBuilderExtensions
{
    public static WebApplication BuildApp(this WebApplicationBuilder builder)
    {
        var app = builder.Build();

        if (app.Environment.IsDevelopment())
        {
            app.UseDeveloperExceptionPage();
            app.UseSwagger();
            app.UseSwaggerUI();
        }

        app.UseCors(options =>
        {
            options.WithOrigins(["https://permutate.us", "http://localhost:4200"]);
            options.AllowAnyHeader();
            options.AllowAnyMethod();
        });

        app.UseAuthentication();
        app.UseRouting();
        app.UseAuthorization();
        app.MapControllers();

        return app;
    }
}
