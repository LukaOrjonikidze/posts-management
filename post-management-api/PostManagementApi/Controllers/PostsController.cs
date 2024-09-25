using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Hosting;
using PostManagementApi.Interfaces;
using PostManagementApi.Models;

[Authorize]
[ApiController]
[Route("api/[controller]")]
public class PostsController : ControllerBase
{
    private readonly IPostsRepository _postRepository;

    public PostsController(IPostsRepository postRepository)
    {
        _postRepository = postRepository;
    }

    [AllowAnonymous]
    [HttpGet]
    public async Task<IActionResult> GetPosts([FromQuery] string? title = null)
    {
        try
        {
            return Ok(new ResultModel<List<Post>>
            {
                Code = 0,
                Message = "GetPosts - Success",
                Data = await _postRepository.GetPosts(title)
            });
        }
        catch (Exception ex)
        {
            return BadRequest(new ResultModel<List<Post>>
            {
                Code = 1,
                Message = ex.Message
            });
        }
    }

    [AllowAnonymous]
    [HttpGet("{id}")]
    public async Task<IActionResult> GetPost(int id)
    {
        try
        {
            return Ok(new ResultModel<Post>
            {
                Code = 0,
                Message = "GetPost - Success",
                Data = await _postRepository.GetPost(id)
            });
        }
        catch (Exception ex)
        {
            return BadRequest(new ResultModel<Post>
            {
                Code = 1,
                Message = ex.Message
            });
        }
    }

    [HttpPost]
    public async Task<IActionResult> AddPost([FromBody] AddPostDto post)
    {
        try
        {
            return Ok(new ResultModel<Post>
            {
                Code = 0,
                Message = "AddPost - Success",
                Data = await _postRepository.AddPost(post)
            });
        }
        catch (Exception ex)
        {
            return BadRequest(new ResultModel<Post>
            {
                Code = 1,
                Message = ex.Message
            });
        }
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> EditPost(int id, [FromBody] Post updatedPost)
    {
        try
        {
            if (id != updatedPost.Id)
            {
                return BadRequest(new ResultModel<Post>
                {
                    Code = -1,
                    Message = "Invalid post ID"
                });
            }

            return Ok(new ResultModel<Post>
            {
                Code = 0,
                Message = "EditPost - Success",
                Data = await _postRepository.EditPost(updatedPost)
            });
        }
        catch (Exception ex)
        {
            return BadRequest(new ResultModel<Post>
            {
                Code = 1,
                Message = ex.Message
            });
        }
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeletePost(int id)
    {
        try
        {
            return Ok(new ResultModel<Post>
            {
                Code = 0,
                Message = "DeletePost - Success",
                Data = await _postRepository.DeletePost(id)
            });
        }
        catch (Exception ex)
        {
            return BadRequest(new ResultModel<Post>
            {
                Code = 1,
                Message = ex.Message
            });
        }
    }
}
