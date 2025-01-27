import { Button } from "@/components/ui/button"
import { RiArrowLeftLine } from "@remixicon/react"
import { useCanGoBack, useRouter, Link } from "@tanstack/react-router"

export function BackButton() {
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
