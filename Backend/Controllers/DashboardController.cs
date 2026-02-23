using Microsoft.AspNetCore.Mvc;
using Backend.Middleware;

namespace Backend.Controllers;

[ApiController]
[Route("api/dashboard")]
public class DashboardController : ControllerBase
{
    [HttpGet("admin")]
    public IActionResult AdminDashboard()
    {
        return Ok("Welcome Admin!");
    }

    [HttpGet("user")]
    public IActionResult UserDashboard()
    {
        return Ok("Welcome User!");
    }
}
