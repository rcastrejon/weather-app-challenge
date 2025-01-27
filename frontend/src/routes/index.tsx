import { Header } from "@/components/header"
import { WeatherCard } from "@/components/weather-card"
import { getCitiesOptions, searchCitiesOptions } from "@/lib/api"
import { useQuery, useSuspenseQuery } from "@tanstack/react-query"
import { createFileRoute } from "@tanstack/react-router"
import { zodValidator } from "@tanstack/zod-adapter"
import { z } from "zod"

const searchParams = z.object({
  search: z.string().optional(),
})

export const Route = createFileRoute("/")({
  validateSearch: zodValidator(searchParams),
  component: HomeComponent,
})

function HomeComponent() {
  const { search } = Route.useSearch()
  return (
    <>
      <Header />
      <div className="p-4 sm:p-6 lg:p-8">
        <main>{!search ? <MostPopularDestinations /> : <SearchResults />}</main>
      </div>
    </>
  )
}

function MostPopularDestinations() {
  const { data: cities } = useSuspenseQuery(getCitiesOptions())
  return (
    <>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between sm:gap-0">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-50">
          Destinos populares
        </h3>
      </div>
      <dl className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {cities.map((city) => (
          <WeatherCard city={city} />
        ))}
      </dl>
    </>
  )
}

function SearchResults() {
  const { search } = Route.useSearch({
    select: ({ search }) => ({ search: search! }),
  })
  const { data: cities, isPending } = useQuery(searchCitiesOptions(search))
  if (isPending) return <p>Cargando...</p>
  return (
    <>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between sm:gap-0">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-50">
          Resultados de búsqueda...
        </h3>
      </div>
      <dl className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {cities?.map((city) => <WeatherCard city={city} />)}
      </dl>
    </>
  )
}
