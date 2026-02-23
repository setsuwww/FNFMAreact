using Microsoft.EntityFrameworkCore;
using Backend.Data;
using Backend.Helpers;

namespace Backend;

public class Program
{
    public static void Main(string[] args)
    {
        var builder = WebApplication.CreateBuilder(args);

        var databaseUrl = Environment.GetEnvironmentVariable("DATABASE_URL")
            ?? throw new Exception("DATABASE_URL is not set.");

        var npgsqlConn = PostgresHelper.ConvertPostgresUrl(databaseUrl);

        builder.Services.AddDbContext<AppDbContext>(options =>
            options.UseNpgsql(npgsqlConn));

        builder.Services.AddControllers();

        builder.Services.AddCors(options =>
        {
            options.AddPolicy("AllowFrontend",
                policy =>
                {
                    policy.WithOrigins("http://localhost:5173")
                          .AllowAnyHeader()
                          .AllowAnyMethod();
                });
        });

        var app = builder.Build();

        app.UseCors("AllowFrontend");

        app.MapControllers();

        app.Run();
    }
}
