using System;
using System.IO;
using System.Web;
using System.Web.Caching;
using System.Web.Hosting;

public static class Fingerprint
{
    public static string Tag(string rootRelativePath, string cdnPath = "")
    {
        if (!string.IsNullOrEmpty(cdnPath) && !HttpContext.Current.IsDebuggingEnabled)
        {
            return cdnPath;
        }

        if (HttpRuntime.Cache[rootRelativePath] == null)
        {
            string relative = VirtualPathUtility.ToAbsolute("~" + rootRelativePath);
            string absolute = HostingEnvironment.MapPath(relative);

            if (!File.Exists(absolute))
            {
                throw new FileNotFoundException("File not found", absolute);
            }

            DateTime date = File.GetLastWriteTime(absolute);
            int index = relative.LastIndexOf('/');

            string result = relative.Insert(index, "/v-" + date.Ticks);

            HttpRuntime.Cache.Insert(rootRelativePath, result, new CacheDependency(absolute));
        }

        return HttpRuntime.Cache[rootRelativePath] as string;
    }
}