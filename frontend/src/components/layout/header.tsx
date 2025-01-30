import { useNavigate, useSearch } from "@tanstack/react-router"
import { Input } from "../ui/input"
import { useState } from "react"
import { RiCloseLine } from "@remixicon/react"
import { Button } from "../ui/button"

export function Header() {
  const { search, from } = useSearch({ from: "/" })
  const navigate = useNavigate()
  const [qInput, setQInput] = useState(search ?? "")
  const [fromInput, setFromInput] = useState(from ?? "")

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
              search: { from: fromInput, search: qInput },
            })
          }}
        >
          <div className="relative w-full sm:max-w-sm flex gap-2">
            <Input
              value={fromInput}
              onChange={(e) => setFromInput(e.currentTarget.value)}
              type="search"
              className="mt-2 !h-9 w-full sm:mt-4"
              placeholder="Origen..."
              autoComplete="off"
            />
            <Input
              value={qInput}
              onChange={(e) => setQInput(e.currentTarget.value)}
              type="search"
              className="mt-2 !h-9 w-full sm:mt-4"
              placeholder="Buscar..."
              autoComplete="off"
            />
            <Button type="submit" className="h-9 mt-2 sm:mt-4">
              Buscar
            </Button>
            {(qInput || fromInput) && (
              <button
                type="button"
                onClick={() => {
                  setQInput("")
                  setFromInput("")
                  navigate({
                    to: "/",
                    search: undefined,
                    from: undefined,
                  })
                }}
                className="mt-2 sm:mt-4 h-9 rounded-full p-1 text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-400"
              >
                <RiCloseLine className="h-5 w-5" />
              </button>
            )}
          </div>
        </form>
      </header>
    </div>
  )
}
