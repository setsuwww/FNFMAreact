using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Backend.Data;
using Backend.DTOs;
using Backend.Helpers;
using Backend.Models;

namespace Backend.Controllers;

[ApiController]
[Route("api/auth")]
public class AuthController : ControllerBase
{
    private readonly AppDbContext _db;
    private readonly IConfiguration _config;

    public AuthController(AppDbContext db, IConfiguration config)
    {
        _db = db;
        _config = config;
    }

    [HttpPost("register")]
    public async Task<IActionResult> Register([FromBody] RegisterDto dto)
    {
        if (dto == null || string.IsNullOrEmpty(dto.Username) || string.IsNullOrEmpty(dto.Password))
            return BadRequest("Username atau password kosong");

        if (await _db.Users.AnyAsync(u => u.Username == dto.Username))
            return BadRequest("Username sudah ada");

        var user = new User
        {
            Username = dto.Username,
            Email = dto.Email,
            Password = PasswordHelper.Hash(dto.Password),
            Role = "User"
        };

        _db.Users.Add(user);
        await _db.SaveChangesAsync();

        return Ok("Register sukses");
    }

    [HttpPost("login")]
    public async Task<IActionResult> Login(LoginDto dto)
    {
        var user = await _db.Users.FirstOrDefaultAsync(u => u.Email == dto.Email);
        if (user == null || !PasswordHelper.Verify(dto.Password, user.PasswordHash))
            return Unauthorized("Username atau password salah");

        var token = JwtHelper.GenerateToken(user, _config);
        return Ok(new { token, email = user.Email, role = user.Role });
    }
}
