import { redis } from "./redis"
import * as OpenWeatherService from "@/core/services/open-weather"
import type { ForecastResponse } from "@/core/services/open-weather/types"
import { z } from "zod"

export const forecastSchema = z.object({
  timestamp: z.number(),
  temp: z.number(),
  temp_min: z.number(),
  temp_max: z.number(),
  weather_id: z.number(),
  weather_main: z.string(),
  weather_description: z.string(),
  weather_icon: z.string(),
})

/**
 * Obtiene el pronóstico del tiempo para una ubicación geográfica. Si el pronóstico ya fue
 * consultado recientemente, se obtiene de la caché, evitando hacer una nueva consulta al
 * servicio de OpenWeather.
 */
export async function getForecast(lat: string, long: string) {
  const cacheKey = `forecast:${lat}:${long}`
  const cachedForecast = await redis.get(cacheKey)
  if (cachedForecast) {
    console.log("Cache hit ->", cacheKey)
    const obj = JSON.parse(cachedForecast) as ForecastResponse
    return parseForecastResponse(obj)
  }
  const forecast = await OpenWeatherService.getForecast(lat, long)
  // Se mantiene fresco por 1 hora
  await redis.set(cacheKey, JSON.stringify(forecast), "EX", 60 * 60)
  return parseForecastResponse(forecast)
}

// Helpers

function parseForecastResponse(response: ForecastResponse) {
  return response.list.map((item) => {
    // El servicio de OpenWeather nos garantiza que siempre habrá al menos un elemento en el array
    const weather = item.weather[0]!
    return forecastSchema.parse({
      timestamp: item.dt,
      temp: item.main.temp,
      temp_min: item.main.temp_min,
      temp_max: item.main.temp_max,
      weather_id: weather.id,
      weather_main: weather.main,
      weather_description: weather.description,
      weather_icon: weather.icon,
    })
  })
}
