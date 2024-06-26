namespace GrocListApi.Core.ApiModels
{
    public class AuthModel
    {
        public string? Token { get; set; }
        // needed for deserialization
        public AuthModel() { }

        public AuthModel(string token)
        {
            Token = token;
        }


    }
}