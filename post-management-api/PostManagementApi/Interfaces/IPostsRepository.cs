using PostManagementApi.Models;

namespace PostManagementApi.Interfaces
{
    public interface IPostsRepository
    {
        Task<List<Post>> GetPosts(string? title);
        Task<Post> GetPost(int id);
        Task<Post> AddPost(AddPostDto post);
        Task<Post> EditPost(Post updatedPost);
        Task<Post> DeletePost(int id);
    }
}
