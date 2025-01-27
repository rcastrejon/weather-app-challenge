import { Header } from "@/components/layout/header"
import { Section } from "@/components/layout/section"
import { WeatherCard } from "@/components/weather-card"
import { getCitiesOptions, searchCitiesOptions } from "@/lib/api"
import { useSuspenseQuery } from "@tanstack/react-query"
import { createFileRoute } from "@tanstack/react-router"
import { zodValidator } from "@tanstack/zod-adapter"
import { z } from "zod"
import { Suspense } from "react"

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
        <main>
          {!search ? (
            <Suspense fallback={<CitiesSkeleton count={6} />}>
              <MostPopularDestinations />
            </Suspense>
          ) : (
            <Suspense fallback={<CitiesSkeleton count={3} />}>
              <SearchResults />
            </Suspense>
          )}
        </main>
      </div>
    </>
  )
}

function MostPopularDestinations() {
  const { data: cities } = useSuspenseQuery(getCitiesOptions())
  return (
    <Section title="Destinos populares">
      {cities.map((city) => (
        <WeatherCard key={city.slug} city={city} />
      ))}
    </Section>
  )
}

function SearchResults() {
  const { search } = Route.useSearch({
    select: ({ search }) => ({ search: search! }),
  })
  const { data: cities } = useSuspenseQuery(searchCitiesOptions(search))
  return (
    <Section title="Resultados de búsqueda...">
      {cities?.map((city) => <WeatherCard key={city.slug} city={city} />)}
    </Section>
  )
}

function CitiesSkeleton({ count }: { count: number }) {
  return (
    <>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between sm:gap-0">
        <div className="h-7 w-48 animate-pulse rounded-md bg-gray-200 dark:bg-gray-800" />
      </div>
      <dl className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: count }).map((_, index) => (
          <div
            key={index}
            className="h-[180px] animate-pulse rounded-lg bg-gray-200 dark:bg-gray-800"
          />
        ))}
      </dl>
    </>
  )
}
