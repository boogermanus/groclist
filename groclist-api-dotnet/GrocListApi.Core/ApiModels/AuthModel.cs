namespace GrocListApi.Core.ApiModels
{
    public class AuthModel
    {
        // needed for deserialization
        public AuthModel() {}
        
        public AuthModel(string token)
        {
            Token = token;
        }
        
        public string Token { get; set; }
    }
}