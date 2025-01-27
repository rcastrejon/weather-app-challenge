import { Button } from "@/components/ui/button"
import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/")({
  component: HomeComponent,
})

function HomeComponent() {
  return (
    <div className="p-2">
      <h3>Hello, world!</h3>
      <Button>Noop</Button>
    </div>
  )
}
