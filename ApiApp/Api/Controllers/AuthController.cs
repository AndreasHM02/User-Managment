using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;


[ApiController]
[Route("api/auth")]
[Authorize]
public class AuthController : ControllerBase
{

    private readonly AuthService _authService;
    private readonly ILogger<AuthController> _logger;

    public AuthController(AuthService authService, ILogger<AuthController> logger)
    {
        _authService = authService;
        _logger = logger;
    }

    [HttpPost("register")]
    [AllowAnonymous]
    public async Task<IActionResult> Create(CreateUserDto dto)
    {
        try
        {
            var result = await _authService.Create(dto);
            _logger.LogInformation("User {Name} created", result.User.Name);
            return Ok( result );
        }
        catch (InvalidOperationException ex)
        {
            _logger.LogWarning(ex, "Registration failed for {Name}", dto.Name);
            return BadRequest(new { message = ex });
        }
    }

    [HttpPost("login")]
    [AllowAnonymous]
    public async Task<IActionResult> Login(LoginDto dto)
    {
        try
        {
            var result = await _authService.Login(dto);
            _logger.LogInformation("User {Id} {Name} logged in", result.User.Id, result.User.Name);
            return Ok( result );
        }
        catch (UnauthorizedAccessException ex)
        {
            _logger.LogWarning(ex, "Failed login attempt for {Name}", dto.Name);
            return Unauthorized(new { message = "Invalid username or password"});
        }
    }  
}