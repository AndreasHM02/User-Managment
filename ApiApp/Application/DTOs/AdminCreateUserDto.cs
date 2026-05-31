using System.ComponentModel.DataAnnotations;
public class AdminCreateUserDto
{
    [Required]
    [MinLength(3)]
    public string Name { get; set; }

    [Required]
    [MinLength(6)]
    public string Password { get; set; }

    [Required]
    public UserRole Role { get; set; }
}
