using Newtonsoft.Json;

namespace MyBlog.Models
{
    public class Post
    {
        [JsonProperty("title")]
        public string? Title { get; set; }
        [JsonProperty("fileName")]
        public string? fileName { get; set; }
        [JsonProperty("date")]
        public string? Date { get; set; }

    }
}
