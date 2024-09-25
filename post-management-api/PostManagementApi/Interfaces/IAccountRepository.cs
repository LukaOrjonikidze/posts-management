using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using PostManagementApi.Models;

namespace PostManagementApi.Interfaces
{
    public interface IAccountRepository
    {
        Task<IdentityResult> Register(RegisterModel model);
        Task<string> Login(LoginModel login);

    }
}
