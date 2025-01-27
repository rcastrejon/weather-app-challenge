import { Link } from "@tanstack/react-router"
import { Card } from "./ui/card"

interface WeatherCardProps {
  city: {
    slug: string
    display_name: string
    weather: {
      weather_icon: string
      weather_description: string
      temp: number
      temp_max: number
      temp_min: number
    }
  }
}

export function WeatherCard({ city }: WeatherCardProps) {
  const iconSrc = `/weather-conditions/${city.weather.weather_icon}.png`
  // Agregar mayusculas a la primera letra del descripcion del clima
  const conditionDisplay =
    city.weather.weather_description.charAt(0).toUpperCase() +
    city.weather.weather_description.slice(1)
  return (
    <Card className="relative border-none overflow-hidden bg-gradient-to-br from-blue-400 to-blue-600 dark:from-blue-600 dark:to-blue-800 text-white p-4 rounded-3xl shadow-lg">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-2xl font-semibold mb-1">
            <Link to="/city/$slug" params={{ slug: city.slug }}>
              <span className="absolute inset-0" aria-hidden={true} />
              {city.display_name}
            </Link>
          </h3>
          <p className="text-5xl font-bold">{Math.round(city.weather.temp)}°</p>
        </div>
        <img
          src={iconSrc}
          alt={conditionDisplay}
          width={64}
          height={64}
          className="rounded-full bg-white/30 p-2"
        />
      </div>
      <div className="mt-4 flex justify-between items-center text-sm">
        <span>{conditionDisplay}</span>
        <span>
          Máx:{Math.round(city.weather.temp_max)}° Mín:
          {Math.round(city.weather.temp_min)}°
        </span>
      </div>
    </Card>
  )
}
