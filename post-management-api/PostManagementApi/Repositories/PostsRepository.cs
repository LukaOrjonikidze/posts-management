using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Hosting;
using PostManagementApi.Data;
using PostManagementApi.Interfaces;
using PostManagementApi.Models;

namespace PostManagementApi.Repositories
{
    public class PostsRepository : IPostsRepository
    {
        private readonly DataContext _context;

        public PostsRepository(DataContext context)
        {
            _context = context;
        }


        public async Task<List<Post>> GetPosts(string? title)
        {
            var query = _context.Posts.AsQueryable();

            if (!string.IsNullOrEmpty(title))
            {
                query = query.Where(p => p.Title.StartsWith(title));
            }

            return await query.ToListAsync();
        }

        public async Task<Post> GetPost(int id)
        {
            return await _context.Posts.Where(p => p.Id == id).FirstAsync();
        }


        public async Task<Post> AddPost(AddPostDto post)
        {
            Post addedPost = new Post
            {
                Title = post.Title,
                Description = post.Description,
                Image = post.Image,
                Phone = post.Phone
            };
            await _context.Posts.AddAsync(addedPost);
            await _context.SaveChangesAsync();
            return addedPost;
        }

        public async Task<Post> EditPost(Post updatedPost)
        {
            var post = await _context.Posts.FindAsync(updatedPost.Id);

            if (post == null)
                throw new KeyNotFoundException("Post not found.");

            post.Title = updatedPost.Title;
            post.Description = updatedPost.Description;
            post.Image = updatedPost.Image;
            post.Phone = updatedPost.Phone;

            await _context.SaveChangesAsync();
            return post;
        }

        public async Task<Post> DeletePost(int id)
        {
            var postToDelete = await _context.Posts.FindAsync(id);

            if (postToDelete == null)
                throw new KeyNotFoundException("Post not found.");

            _context.Posts.Remove(postToDelete);
            await _context.SaveChangesAsync();

            return postToDelete;
        }

    }
}
