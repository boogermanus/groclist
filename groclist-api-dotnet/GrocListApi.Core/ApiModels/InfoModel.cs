namespace GrocListApi.Core.ApiModels;

public class InfoModel
{
    public int ItemCount { get; set; }
    public int ListCount { get; set; }
    public string?[] PopularItems { get; set; } = Array.Empty<string>();
    public string?[] PopularLists { get; set; } = Array.Empty<string>();
}