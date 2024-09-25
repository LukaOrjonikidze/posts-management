namespace PostManagementApi.Models
{
    public class ResultModel<T>
    {
        public int Code { get; set; }
        public string? Message { get; set; }
        public T? Data { get; set; }
    }
}
