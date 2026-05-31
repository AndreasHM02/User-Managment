using System.ComponentModel.DataAnnotations;
public class CreateUserDto
{
    [Required]
    [MinLength(3)]
    public string Name { get; set; }

    [Required]
    [MinLength(6)]
    public string Password { get; set; }

}
