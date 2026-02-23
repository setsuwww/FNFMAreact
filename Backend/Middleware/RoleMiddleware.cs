using Microsoft.AspNetCore.Http;
using System.Linq;
using System.IdentityModel.Tokens.Jwt;

namespace Backend.Middleware;

public class RoleMiddleware
{
    private readonly RequestDelegate _next;

    public RoleMiddleware(RequestDelegate next)
    {
        _next = next;
    }

    public async Task InvokeAsync(HttpContext context)
    {
        var endpoint = context.GetEndpoint();
        if (endpoint == null)
        {
            await _next(context);
            return;
        }

        var rolesMetadata = endpoint.Metadata.GetMetadata<RoleEndpointMetadata>();
        if (rolesMetadata == null || rolesMetadata.Roles.Length == 0)
        {
            await _next(context);
            return;
        }

        var authHeader = context.Request.Headers["Authorization"].FirstOrDefault();
        if (authHeader == null || !authHeader.StartsWith("Bearer "))
        {
            context.Response.StatusCode = 401;
            await context.Response.WriteAsync("Token tidak ditemukan");
            return;
        }

        var token = authHeader.Substring("Bearer ".Length).Trim();

        try
        {
            var jwt = new JwtSecurityTokenHandler().ReadJwtToken(token);
            var roleClaim = jwt.Claims.FirstOrDefault(c => c.Type == "role")?.Value;

            if (roleClaim == null || !rolesMetadata.Roles.Contains(roleClaim))
            {
                context.Response.StatusCode = 403;
                await context.Response.WriteAsync("Anda tidak memiliki akses");
                return;
            }

            await _next(context);
        }
        catch
        {
            context.Response.StatusCode = 401;
            await context.Response.WriteAsync("Token tidak valid");
        }
    }
}
