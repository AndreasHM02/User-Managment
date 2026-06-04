using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using System.Security.Claims;
using Microsoft.AspNetCore.Identity;




[ApiController]
[Route("api/users")]
public class UsersController : ControllerBase
{
    private readonly UserService _userService;
    private readonly ILogger<UsersController> _logger;

    public UsersController(UserService userService, ILogger<UsersController> logger)
    {
        _userService = userService;
        _logger = logger;
    }

    private int GetCurrentUserId()
    {
        var claim = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        
        if ( !int.TryParse(claim, out int id))
            throw new UnauthorizedAccessException();

        return id;
    }


    [HttpGet]
    [Authorize(Roles = "Admin")]
    public async Task<IActionResult> GetAll()
    {
        try
        {
            var result = await _userService.GetAll();
            _logger.LogInformation("Users delivered");
            return Ok( result );
        }
        catch
        {
            _logger.LogWarning("Failed returning the users");
            return BadRequest("Failed to retrieve users");
        }
    }
        
    
    [HttpGet("me")]
    [Authorize]
    public async Task<IActionResult> GetUserInfo()
    {
        try
        {
            var id = GetCurrentUserId();

            var user = await _userService.GetUserInfo(id);

            _logger.LogInformation("User info for {Id} {Name}", user.Name, user.Id);
            return Ok( user );
        } 
        catch (UnauthorizedAccessException ex)
        {
            _logger.LogWarning(ex, "Authorization failed");
            return Unauthorized();
        } 
        catch (KeyNotFoundException ex)
        {
            _logger.LogWarning(ex, "Failed to locate user in the database");
            return NotFound( new { message = ex.Message});
        }
    }


    [HttpGet("{id}")]
    [Authorize(Roles = "Admin")]
    public async Task<IActionResult> GetUserById(int id)
    {
        try
        {
            var user = await _userService.GetUserInfo(id);

            return Ok( user );
        } 
        catch (KeyNotFoundException ex)
        {
            _logger.LogWarning(ex, "Failed to locate user in the database");
            return NotFound( new { message = ex.Message});
        }  
    }

    [HttpPost]
    [Authorize(Roles = "Admin")]
    public async Task<IActionResult> Create(AdminCreateUserDto dto)
    {
        try
        {
            int id = GetCurrentUserId();
            await _userService.Create(id, dto);
            return Ok( new { message = "User created" } );
        }
        catch (UnauthorizedAccessException ex)
        {
            _logger.LogWarning(ex, "Authorization failed");
            return Unauthorized();
        } 
        catch (ArgumentException ex)
        {
            _logger.LogWarning(ex, "Failed to create user");
            return BadRequest( new { message = ex.Message} );
        }
        
    }

    [HttpPut("{id}")]
    [Authorize]
    public async Task<IActionResult> Update(int id, UpdateUserDto dto)
    {
        var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

        if (!int.TryParse(userIdClaim, out int userId))
            return Unauthorized();
        
        var isAdmin = User.IsInRole("Admin");

        if (userId != id && !isAdmin)
            return Forbid();

        var result = await _userService.Update(id, dto);

        if (result == null)
            return NotFound();

        return Ok(result);
    }

    [HttpPut("role/{id}")]
    [Authorize(Roles = "Admin")]
    public async Task<IActionResult> UpdateRole(int id, UserRole role)
    {
        await _userService.UpdateRole(id, role);
        return Ok( new { message = "User role updated" })
;
    }
    
    [HttpDelete("{id}")]
    [Authorize(Roles = "Admin")]
    public async Task<IActionResult> Delete(int id)
    {
        var success = await _userService.Delete(id);
        if (success)
            return Ok(new { message = "User deleted successfully" });
        
        return NotFound(new { message = "User not found" });
    }

}

