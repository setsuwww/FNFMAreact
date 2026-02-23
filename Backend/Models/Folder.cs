namespace Backend.Models;

public class Folder
{
    public int Id { get; set; }
    public string Name { get; set; } = "";

    public int? ParentFolderId { get; set; } // null untuk root
    public Folder? ParentFolder { get; set; }

    public int OwnerId { get; set; }
    public User Owner { get; set; }

    public List<Folder> SubFolders { get; set; } = new();
    public List<FileItem> Files { get; set; } = new();

    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
}
