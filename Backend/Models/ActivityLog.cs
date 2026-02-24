namespace Backend.Models;

public enum ActivityType
{
    Upload,
    Delete,
    Rename,
    Move
}

public class ActivityLog
{
    public int Id { get; set; }
    public int UserId { get; set; }
    public User User { get; set; }

    public string TargetName { get; set; } = "";
    public ActivityType ActivityType { get; set; }
    public DateTime Timestamp { get; set; } = DateTime.UtcNow;
}
