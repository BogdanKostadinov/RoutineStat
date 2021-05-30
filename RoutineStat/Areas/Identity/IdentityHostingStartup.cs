using System;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.UI;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using RoutineStat.Areas.Identity.Data;
using RoutineStat.Data;

[assembly: HostingStartup(typeof(RoutineStat.Areas.Identity.IdentityHostingStartup))]
namespace RoutineStat.Areas.Identity
{
    public class IdentityHostingStartup : IHostingStartup
    {
        public void Configure(IWebHostBuilder builder)
        {
            builder.ConfigureServices((context, services) => {
                services.AddDbContext<RoutineStatContext>(options =>
                    options.UseSqlServer(
                        context.Configuration.GetConnectionString("RoutineStatContextConnection")));

                services.AddDefaultIdentity<User>(options => 
                {
                    options.SignIn.RequireConfirmedAccount = false;
                    options.Password.RequireUppercase = false;
                    options.Password.RequireLowercase = false;
                })
                    .AddEntityFrameworkStores<RoutineStatContext>();
            });
        }
    }
}