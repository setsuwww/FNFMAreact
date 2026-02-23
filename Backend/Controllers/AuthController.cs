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
        if (string.IsNullOrEmpty(dto.Email) || string.IsNullOrEmpty(dto.Password) || string.IsNullOrEmpty(dto.Username))
            return BadRequest("Username, email, atau password kosong");

        if (await _db.Users.AnyAsync(u => u.Email == dto.Email))
            return BadRequest("Email sudah terdaftar");

        if (await _db.Users.AnyAsync(u => u.Username == dto.Username))
            return BadRequest("Username sudah terpakai");

        var user = new User
        {
            Username = dto.Username,
            Email = dto.Email,
            Password = PasswordHelper.Hash(dto.Password),
            Role = UserRole.User // default role
        };

        _db.Users.Add(user);
        await _db.SaveChangesAsync();

        return Ok("Register sukses");
    }

    [HttpPost("login")]
    public async Task<IActionResult> Login([FromBody] LoginDto dto)
    {
        var user = await _db.Users.FirstOrDefaultAsync(u => u.Email == dto.Email);
        if (user == null || !PasswordHelper.Verify(dto.Password, user.Password))
            return Unauthorized("Email atau password salah");

        var token = JwtHelper.GenerateToken(user, _config);

        return Ok(new { token, email = user.Email, username = user.Username, role = user.Role.ToString() });
    }
}
