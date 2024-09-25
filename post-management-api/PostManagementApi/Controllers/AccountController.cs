using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using PostManagementApi.Interfaces;
using PostManagementApi.Models;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

[ApiController]
[Route("api/[controller]")]
public class AccountController : ControllerBase
{
    private readonly IAccountRepository _accountRepository;
    public AccountController(IAccountRepository accountRepository)
    {
        _accountRepository = accountRepository;
    }

    [HttpPost("register")]
    public async Task<IActionResult> Register([FromBody] RegisterModel model)
    {
        try
        {
            var result = await _accountRepository.Register(model);
            if (result.Succeeded)
            {
                return Ok(new ResultModel<string>
                {
                    Code = 0,
                    Message = "Register - Success"
                });
            }
            return BadRequest(result.Errors);
        }
        catch (Exception ex) 
        {
            return BadRequest(new ResultModel<string>
            {
                Code = -1,
                Message = ex.Message
            });
        }


        
    }

    [HttpPost("login")]
    public async Task<IActionResult> Login([FromBody] LoginModel login)
    {
        try
        {
            var result = await _accountRepository.Login(login);

            if (string.IsNullOrEmpty(result))
            {
                return BadRequest(new ResultModel<string>
                {
                    Code = 2,
                    Message = "Token is empty!"
                });
            }

            return Ok(new ResultModel<string>
            {
                Code = 0,
                Message = "Login - Success",
                Data = result
            });
        }
        catch (Exception ex) 
        {
            return BadRequest(new ResultModel<string>
            {
                Code = -1,
                Message = ex.Message
            });
        }
    }

    
}
