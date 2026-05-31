using Microsoft.EntityFrameworkCore;


public class UserService
{
    private readonly AppDbContext _context;
    private readonly ILogger<UserService> _logger;
    public UserService(AppDbContext context, ILogger<UserService> logger)
    {
        _context = context;
        _logger = logger;
    }

    public async Task<List<UserDto>> GetAll()
    {
        return await _context.Users
        .Select(u => new UserDto{ 
            Id = u.Id,
            Name = u.Name,
            Role = u.Role 
        })
        .ToListAsync();
    }

    public async Task<UserDto> GetUserInfo(int id)
    {
        var user = await _context.Users
        .Where(u => u.Id == id)
        .Select(u => new UserDto 
        {
            Id = u.Id,
            Name = u.Name,
            Role = u.Role
        })
        .FirstOrDefaultAsync();
        
        if (user == null)
            throw new KeyNotFoundException("User not found");

        _logger.LogInformation("User {Id} {Name} fetched from DB", user.Id, user.Name);  

        return user;
    }

    public async Task Create(int id, AdminCreateUserDto dto)
    {
        var exists = await _context.Users.AnyAsync(u => u.Name == dto.Name);

        if (exists)
            throw new ArgumentException("Name already exists");

        if (!Enum.IsDefined(typeof(UserRole), dto.Role))
            throw new ArgumentException("Invalid role");

        var user = new User
        {
            Name = dto.Name,
            Password = BCrypt.Net.BCrypt.HashPassword(dto.Password),
            Role = dto.Role
        };
        _logger.LogInformation("{Name} created user: Id: {Id}, Name = {Name}, Role: {Role}", id, user.Id, user.Name, user.Role);
        
        _context.Users.Add(user);
        await _context.SaveChangesAsync();
    }

    public async Task<UserDto?> Update(int id, UpdateUserDto dto)
    {
        var user = await _context.Users.FindAsync(id);

        if (user == null)
            return null;

        if (!string.IsNullOrEmpty(dto.Name))
            user.Name = dto.Name;

        if (!string.IsNullOrEmpty(dto.Password))
            user.Password = BCrypt.Net.BCrypt.HashPassword(dto.Password);

        await _context.SaveChangesAsync();

        return new UserDto
        {
            Id = user.Id,
            Name = user.Name,
            Role = user.Role
        };
    }

    public async Task UpdateRole(int id, UserRole role)
    {
        if (!Enum.IsDefined(typeof(UserRole), role))
            throw new Exception("Invalid role");
            
        var user = await _context.Users.FindAsync(id);
        if (user == null)
            throw new Exception("User not found");
        
        user.Role = role;

        await _context.SaveChangesAsync();
    }

    public async Task<bool> Delete(int id)
    {
        var user = await _context.Users.FindAsync(id);
        if (user == null)
        {
            return false;
        }
        _context.Users.Remove(user);
        await _context.SaveChangesAsync();
        return true;
    }
}