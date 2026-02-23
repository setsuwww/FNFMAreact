using Npgsql;

namespace Backend.Helpers
{
    public static class PostgresHelper
    {
        public static string ConvertPostgresUrl(string url)
        {
            var uri = new Uri(url);
            var userInfo = uri.UserInfo.Split(':');

            return new NpgsqlConnectionStringBuilder
            {
                Host = uri.Host,
                Port = uri.Port > 0 ? uri.Port : 5432,
                Database = uri.AbsolutePath.TrimStart('/'),
                Username = userInfo[0],
                Password = userInfo.Length > 1 ? userInfo[1] : "",
                SslMode = SslMode.Require
            }.ToString();
        }
    }
}
