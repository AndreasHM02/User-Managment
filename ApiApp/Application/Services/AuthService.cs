using Microsoft.EntityFrameworkCore;
public class AuthService
{
    private readonly AppDbContext _context;
    private readonly JwtService _jwt;
    private readonly ILogger<AuthService> _logger;

    public AuthService(AppDbContext context, JwtService jwt, ILogger<AuthService> logger)
    {
        _context = context;
        _jwt = jwt;
        _logger = logger;
    }


    public async Task<AuthResponseDto> Create(CreateUserDto dto)
    {
        var exists = await _context.Users.AnyAsync(u => u.Name == dto.Name);
        if (exists)
            throw new InvalidOperationException("Name already exists");

        var hashedPassword = BCrypt.Net.BCrypt.HashPassword(dto.Password);

        var user = new User { 
            Name = dto.Name,
            Password = hashedPassword, 
            Role = UserRole.User
        };

        _context.Users.Add(user);
        await _context.SaveChangesAsync();
        _logger.LogInformation("User created: Id: {Id}, Name = {Name}, Role: {Role}", user.Id, user.Name, user.Role);
        return new AuthResponseDto
        {
            Token = _jwt.GenerateToken(user),
            User = new UserDto { Id = user.Id, Name = user.Name, Role = user.Role }
        };
    }

    public async Task<AuthResponseDto> Login(LoginDto dto)
    {
        var user = await _context.Users.FirstOrDefaultAsync(u => u.Name == dto.Name);

        if (user == null || !BCrypt.Net.BCrypt.Verify(dto.Password, user.Password))
            throw new UnauthorizedAccessException("Invalid username or password");

        return new AuthResponseDto
        {
            Token = _jwt.GenerateToken(user),
            User = new UserDto { Id = user.Id, Name = user.Name, Role = user.Role }
        };

    }

}