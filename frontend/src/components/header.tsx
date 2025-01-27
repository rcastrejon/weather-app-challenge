import { useNavigate, useSearch } from "@tanstack/react-router"
import { Input } from "./ui/input"

export function Header() {
  const { search } = useSearch({ from: "/" })
  const navigate = useNavigate()
  return (
    <div className="border-b border-gray-200 bg-gray-50 p-4 dark:border-gray-800 dark:bg-gray-950 sm:p-6 lg:p-8">
      <header>
        <h1 className="text-lg font-semibold text-gray-900 dark:text-gray-50">
          WeatherApp
        </h1>
        <p className="text-sm text-gray-500 dark:text-gray-500">
          Revisa el clima de tu próximo destino
        </p>
        <form
          className="w-full md:flex md:max-w-3xl md:items-stretch md:space-x-4"
          onSubmit={(e) => {
            e.preventDefault()
            navigate({
              to: "/",
              search: { search: e.currentTarget.search.value },
            })
          }}
        >
          <Input
            defaultValue={search ?? ""}
            name="search"
            type="search"
            className="mt-2 !h-9 w-full sm:mt-4 sm:max-w-sm"
            placeholder="Buscar..."
          />
        </form>
      </header>
    </div>
  )
}
