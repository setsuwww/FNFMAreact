namespace Backend.Models;

public class FileItem
{
    public int Id { get; set; }
    public string Name { get; set; } = "";
    public string Extension { get; set; } = "";
    public long Size { get; set; } // bytes
    public string StoragePath { get; set; } = ""; // path ke storage, bisa local atau S3

    public int? FolderId { get; set; } // null kalau langsung di root
    public Folder? Folder { get; set; }

    public int OwnerId { get; set; }
    public User Owner { get; set; }

    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
}
