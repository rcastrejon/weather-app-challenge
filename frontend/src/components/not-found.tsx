import { Button } from "@/components/ui/button"
import { Link } from "@tanstack/react-router"

export default function NotFound() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">
          404 - Página no encontrada
        </h1>
        <Link to="/">
          <Button className="bg-blue-500 hover:bg-blue-600 text-white">
            Volver al inicio
          </Button>
        </Link>
      </div>
    </div>
  )
}
