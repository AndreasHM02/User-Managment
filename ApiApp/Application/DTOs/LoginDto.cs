using System.ComponentModel.DataAnnotations;

public class LoginDto
{
    [Required]
    [MinLength(2)]
    public string Name { get; set; }

    [Required]
    [MinLength(6)]
    public required string Password { get; set; }
}