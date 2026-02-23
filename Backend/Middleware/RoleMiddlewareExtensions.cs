using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Routing;

namespace Backend.Middleware;

public class RoleEndpointMetadata
{
    public string[] Roles { get; set; } = Array.Empty<string>();
}

public static class RoleMiddlewareExtensions
{
    public static RouteHandlerBuilder UseRole(this RouteHandlerBuilder builder, params string[] roles)
    {
        builder.WithMetadata(new RoleEndpointMetadata { Roles = roles });
        return builder;
    }
}
