namespace QuickNotes.API.Models
{
    public class Note
    {
        public int Id {  get; set; }
        public string Content { get; set; } = "";

        public string Title { get; set; } = "";

        public DateTime CreatedAt { get; set; } = DateTime.Now;
    }
}
