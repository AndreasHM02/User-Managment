using System.ComponentModel.DataAnnotations;
public class UpdateUserDto
{

    [Required]
    [MinLength(3)]
    public string Name { get; set; }

    [Required]
    [MinLength(4)]
    public string Password { get; set; }

}