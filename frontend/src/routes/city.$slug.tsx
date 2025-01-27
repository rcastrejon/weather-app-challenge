import { Button } from "@/components/ui/button"
import { Divider } from "@/components/ui/divider"
import { ForecastCard } from "@/components/forecast-card"
import { getCityDetailsOptions } from "@/lib/api"
import { RiArrowLeftLine } from "@remixicon/react"
import { useSuspenseQuery } from "@tanstack/react-query"
import {
  createFileRoute,
  useCanGoBack,
  useRouter,
  Link,
} from "@tanstack/react-router"
import { useMemo } from "react"

export const Route = createFileRoute("/city/$slug")({
  loader: ({ context: { queryClient }, params: { slug } }) => {
    queryClient.ensureQueryData(getCityDetailsOptions(slug))
  },
  component: RouteComponent,
})

function RouteComponent() {
  const { slug } = Route.useParams()
  const { data: details } = useSuspenseQuery(getCityDetailsOptions(slug))
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
          <div className="grid gap-6 md:grid-cols-3">
            {forecast.map((forecast, key) => (
              <ForecastCard key={key} forecast={forecast} />
            ))}
          </div>
        </main>
      </div>
    </div>
  )
}

function BackButton() {
  const router = useRouter()
  const canGoBack = useCanGoBack()
  if (canGoBack) {
    return (
      <Button
        className="gap-1.5"
        variant="secondary"
        onClick={() => router.history.back()}
      >
        <RiArrowLeftLine className="-ml-1 size-5 shrink-0" aria-hidden={true} />
        Atrás
      </Button>
    )
  }
  return (
    <Button className="gap-1.5" variant="secondary" asChild>
      <Link to="/">
        <RiArrowLeftLine className="-ml-1 size-5 shrink-0" aria-hidden={true} />
        Atrás
      </Link>
    </Button>
  )
}
