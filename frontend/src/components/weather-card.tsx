import { Link } from "@tanstack/react-router"
import { Card } from "./ui/card"
import { type CitySchema } from "@acme/backend/core/cities"

export function WeatherCard({ city }: { city: CitySchema }) {
  const iconSrc = `/weather-conditions/${city.weather.weather_icon}.png`
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
          alt={city.weather.weather_description}
          width={64}
          height={64}
          className="rounded-full bg-white/30 p-2"
        />
      </div>
      <div className="mt-4 flex justify-between items-center text-sm">
        <span>{city.weather.weather_description}</span>
        <span>
          Máx:{Math.round(city.weather.temp_max)}° Mín:
          {Math.round(city.weather.temp_min)}°
        </span>
      </div>
    </Card>
  )
}
