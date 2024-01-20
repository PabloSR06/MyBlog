using Newtonsoft.Json;

namespace MyBlog.Models
{
    public class Post
    {
        [JsonProperty("title")]
        public string? Title { get; set; }
        [JsonProperty("fileName")]
        public string fileName { get; set; }
        [JsonProperty("date")]
        public string? Date { get; set; }
        [JsonProperty("tags")]
        public List<string>? tags { get; set; }
        [JsonProperty("description")]
        public string? description { get; set; }
        [JsonProperty("isExternal")]
        public bool isExternal { get; set; }
        [JsonProperty("url")]
        public Uri? url { get; set; }

    }
}
