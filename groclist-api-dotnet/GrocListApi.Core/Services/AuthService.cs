﻿using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using GrocListApi.Core.ApiModels;
using GrocListApi.Core.Interfaces;
using GrocListApi.Core.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;

namespace GrocListApi.Core.Services
{
    public class AuthService : IAuthService
    {
        private readonly UserManager<User> _userManager;
        private readonly IConfiguration _configuration;
        
        public AuthService(UserManager<User> userManager, IConfiguration configuration)
        {
            _userManager = userManager;
            _configuration = configuration;
        }
        
        public async Task<IdentityResult> Register(RegistrationModel model)
        {
            return await _userManager.CreateAsync(model.ToDomainModel(), model.Password);
        }

        public async Task<AuthModel> Login(LoginModel model)
        {
            var user = await AuthenticateUserAsync(model.Username, model.Password);

            if (user == null)
                return null;

            var token = GenerateJsonWebToken(user);

            return string.IsNullOrEmpty(token) ? null : new AuthModel(token);
        }

        private async Task<User> AuthenticateUserAsync(string userName, string password)
        {
            var user = await _userManager.FindByNameAsync(userName);
            var validPassword = await _userManager.CheckPasswordAsync(user, password);

            if (user != null && validPassword)
                return user;

            return null;
        }

        private string GenerateJsonWebToken(User user)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(_configuration["Jwt:Key"]);
            var credentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature);
            var claims = new[]
            {
                new Claim(JwtRegisteredClaimNames.Sub, user.UserName),
                new Claim(JwtRegisteredClaimNames.NameId, user.Id)
            };
            var token = new JwtSecurityToken(
                claims: claims,
                expires: DateTime.UtcNow.AddDays(1),
                signingCredentials: credentials);
            return tokenHandler.WriteToken(token);
            
        }

        public async Task<bool> ChangePassword(ChangePasswordModel model)
        {
            var user = await _userManager.FindByNameAsync(model.Username);

            if (user == null)
                return false;

            var result = await _userManager.ChangePasswordAsync(user, model.Password, model.ConfirmPassword);

            return result.Succeeded;
        }

        public JwtSecurityToken Decode(AuthModel model)
        {
            var handler = new JwtSecurityTokenHandler();

            var token = handler.ReadJwtToken(model.Token);

            return token;
        }

        public bool Validate(AuthModel model)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(_configuration["Jwt:Key"]);
            var validationParameters = new TokenValidationParameters
            {
                ValidateIssuerSigningKey = true,
                ValidateLifetime = true,
                IssuerSigningKey = new SymmetricSecurityKey(key)
            };

            var validated = tokenHandler.ValidateToken(model.Token, validationParameters, out var tokenSecure);

            return validated != null && tokenSecure is JwtSecurityToken;
        }
    }
}