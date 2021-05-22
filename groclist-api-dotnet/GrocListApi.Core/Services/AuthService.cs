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
        private readonly byte[] _key;
        
        public AuthService(UserManager<User> userManager, IConfiguration configuration)
        {
            _userManager = userManager;
            _configuration = configuration;
            _key = Encoding.ASCII.GetBytes(_configuration["Jwt:Key"]);
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
            var expires = int.Parse(_configuration["Jwt:Expires"]);
            var tokenHandler = new JwtSecurityTokenHandler();
            var credentials = new SigningCredentials(new SymmetricSecurityKey(_key), SecurityAlgorithms.HmacSha256Signature);
            var claims = new[]
            {
                // some dumb that NameId and 'sub' are the same thing
                new Claim(JwtRegisteredClaimNames.NameId, user.Id),
                new Claim(JwtRegisteredClaimNames.Email, user.UserName)
            };
            var token = new JwtSecurityToken(
                claims: claims,
                expires: DateTime.UtcNow.AddSeconds(expires),
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
            var validationParameters = new TokenValidationParameters
            {
                ValidateIssuer = false,
                ValidateAudience = false,
                ValidateLifetime = true,
                ValidateIssuerSigningKey = true,
                IssuerSigningKey = new SymmetricSecurityKey(_key)
            };

            var validated = tokenHandler.ValidateToken(model.Token, validationParameters, out var tokenSecure);

            return validated != null && tokenSecure is JwtSecurityToken;
        }
    }
}