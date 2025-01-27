import { BackButton } from "@/components/back-button"
import { Divider } from "@/components/ui/divider"
import { ForecastCard } from "@/components/forecast-card"
import { getCityDetailsOptions } from "@/lib/api"
import { createFileRoute, notFound } from "@tanstack/react-router"
import { useMemo } from "react"

export const Route = createFileRoute("/city/$slug")({
  loader: async ({ context: { queryClient }, params: { slug } }) => {
    const res = await queryClient.ensureQueryData(getCityDetailsOptions(slug))
    if (!res) {
      throw notFound()
    }
    return { details: res }
  },
  component: RouteComponent,
})

function RouteComponent() {
  const { details } = Route.useLoaderData()
  const forecast = useMemo(() => {
    return details.forecast.filter((_, index) => index % 8 === 0)
  }, [details])
  return (
    <div className="sm:mx-auto sm:max-w-2xl">
      <div className="p-4 sm:p-6 lg:p-8">
        <header>
          <div className="flex flex-row gap-4 items-center">
            <BackButton />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-50">
              {details.display_name}
            </h3>
          </div>
        </header>
        <Divider />
        <main>
          <div className="grid gap-6 sm:grid-cols-3">
            {forecast.map((forecast, key) => (
              <ForecastCard key={key} forecast={forecast} />
            ))}
          </div>
        </main>
      </div>
    </div>
  )
}
