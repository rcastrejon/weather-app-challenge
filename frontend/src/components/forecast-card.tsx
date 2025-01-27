import { Card } from "./ui/card"
import { format } from "date-fns"
import { es } from "date-fns/locale"

interface ForecastCardProps {
  forecast: {
    timestamp: number
    weather_icon: string
    weather_description: string
    temp: number
  }
}

export function ForecastCard({ forecast }: ForecastCardProps) {
  // Agregar mayusculas a la primera letra del descripcion del clima
  const conditionDisplay =
    forecast.weather_description.charAt(0).toUpperCase() +
    forecast.weather_description.slice(1)
  return (
    <Card className="p-0 border-none rounded-3xl overflow-hidden bg-gradient-to-br from-blue-400 to-blue-600 dark:from-blue-600 dark:to-blue-800 text-white">
      <div className="border-b border-white/10 px-4 py-2 bg-black/20">
        <dt className="text-sm font-medium text-white">
          {format(forecast.timestamp * 1000, "EEE, d", {
            locale: es,
          })}
        </dt>
      </div>
      <div className="h-52 p-2 flex flex-col items-center justify-center gap-2">
        <img
          src={`/weather-conditions/${forecast.weather_icon}.png`}
          alt={conditionDisplay}
          width={64}
          height={64}
          className="rounded-full bg-white/30 p-2"
        />
        <span className="text-sm text-white/80 text-center">
          {conditionDisplay}
        </span>
        <span className="text-3xl font-bold text-white">
          {Math.round(forecast.temp)}°
        </span>
      </div>
    </Card>
  )
}
