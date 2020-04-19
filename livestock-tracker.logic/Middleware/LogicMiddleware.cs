using LivestockTracker.Abstractions;
using LivestockTracker.Abstractions.Models;
using LivestockTracker.Logic.Mappers;
using LivestockTracker.Logic.Services;
using LivestockTracker.Models;
using Microsoft.Extensions.DependencyInjection;

namespace LivestockTracker
{
    /// <summary>
    /// Provides extension methods for Livestock Tracker Logic Middleware.
    /// </summary>
    public static class LogicMiddleware
    {
        /// <summary>
        /// Adds the Livestock Tracker Logic to the provided service collection.
        /// </summary>
        /// <param name="services">The service collection for dependency injection.</param>
        /// <returns></returns>
        public static IServiceCollection AddLivestockTrackerLogic(this IServiceCollection services)
        {
            services.AddSingleton<IMapper<IAnimalSummary, AnimalSummary>, AnimalSummaryMapper>()
                    .AddScoped<IAnimalSearchService, AnimalSearchService>();

            return services;
        }
    }
}