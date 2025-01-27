import { BackButton } from "@/components/back-button"
import { Divider } from "@/components/ui/divider"
import { ForecastCard } from "@/components/forecast-card"
import { getCityDetailsOptions } from "@/lib/api"
import { useSuspenseQuery } from "@tanstack/react-query"
import { createFileRoute } from "@tanstack/react-router"
import { Suspense } from "react"
import { useMemo } from "react"

export const Route = createFileRoute("/city/$slug")({
  loader: ({ context: { queryClient }, params: { slug } }) => {
    queryClient.ensureQueryData(getCityDetailsOptions(slug))
  },
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div className="sm:mx-auto sm:max-w-2xl">
      <div className="p-4 sm:p-6 lg:p-8">
        <header>
          <div className="flex flex-row gap-4 items-center">
            <BackButton />
            <Suspense fallback={<CityNameSkeleton />}>
              <CityDetails />
            </Suspense>
          </div>
        </header>
        <Divider />
        <main>
          <Suspense fallback={<ForecastSkeleton />}>
            <ForecastList />
          </Suspense>
        </main>
      </div>
    </div>
  )
}

function CityDetails() {
  const { slug } = Route.useParams()
  const { data: details } = useSuspenseQuery(getCityDetailsOptions(slug))
  return (
    <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-50">
      {details.display_name}
    </h3>
  )
}

function ForecastList() {
  const { slug } = Route.useParams()
  const { data: details } = useSuspenseQuery(getCityDetailsOptions(slug))
  // La API regresa una lista con datos de pronóstico de cada 3 horas. Hay
  // que filtrar los datos para que solo nos queden los de cada 24 horas.
  const forecast = useMemo(() => {
    return details.forecast.filter((_, index) => index % 8 === 0)
  }, [details])

  return (
    <div className="grid gap-6 sm:grid-cols-3">
      {forecast.map((forecast, key) => (
        <ForecastCard key={key} forecast={forecast} />
      ))}
    </div>
  )
}

function CityNameSkeleton() {
  return (
    <div className="h-7 w-48 animate-pulse rounded-md bg-gray-200 dark:bg-gray-800" />
  )
}

function ForecastSkeleton() {
  return (
    <div className="grid gap-6 md:grid-cols-3">
      {Array.from({ length: 3 }).map((_, index) => (
        <div
          key={index}
          className="h-[200px] animate-pulse rounded-lg bg-gray-200 dark:bg-gray-800"
        />
      ))}
    </div>
  )
}
