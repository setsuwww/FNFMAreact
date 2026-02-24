namespace Backend.Models;

public class FileItem
{
    public int Id { get; set; }
    public string Name { get; set; } = "";
    public string Extension { get; set; } = "";
    public long Size { get; set; }
    public string StoragePath { get; set; } = "";

    public int? FolderId { get; set; }
    public Folder? Folder { get; set; }

    public int OwnerId { get; set; }
    public User Owner { get; set; }

    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
}
