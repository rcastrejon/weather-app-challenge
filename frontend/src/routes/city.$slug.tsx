import { getCityDetailsOptions } from "@/lib/api"
import { useSuspenseQuery } from "@tanstack/react-query"
import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/city/$slug")({
  loader: ({ context: { queryClient }, params: { slug } }) => {
    queryClient.ensureQueryData(getCityDetailsOptions(slug))
  },
  component: RouteComponent,
})

function RouteComponent() {
  const { slug } = Route.useParams()
  const { data: details } = useSuspenseQuery(getCityDetailsOptions(slug))
  return <div>Hello "/city/$slug"!</div>
}
