namespace PostManagementApi.Models
{
    public class Post
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string? Description { get; set; }
        public byte[]? Image { get; set; }
        public string? Phone { get; set; }
    }
}
