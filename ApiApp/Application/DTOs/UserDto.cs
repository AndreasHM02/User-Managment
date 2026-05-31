using System.ComponentModel.DataAnnotations;
public class UserDto
{
    [Required]
    public int Id { get; set; }

    [Required]
    public string Name { get; set; }

    [Required]
    public UserRole Role { get; set; }
}