namespace GrocListApi.Core.ApiModels
{
    public class AuthModel
    {
        public AuthModel(string token)
        {
            Token = token;
        }
        
        public string Token { get; set; }
    }
}