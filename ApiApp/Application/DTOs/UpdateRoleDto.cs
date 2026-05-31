using System.ComponentModel.DataAnnotations;

public class UpdateRoleDto
{
    [Required]
    public UserRole Role { get; set; }
}