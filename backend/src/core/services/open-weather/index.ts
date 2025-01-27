import env from "../../../env"
import { UnexpectedServiceError } from "../errors"
import type { ForecastResponse } from "./types"

const BASE_URL = "https://api.openweathermap.org/data/2.5"

export const getForecast = async (
  lat: string,
  lon: string
): Promise<ForecastResponse> => {
  const url = new URL(`${BASE_URL}/forecast`)
  url.searchParams.append("lat", lat)
  url.searchParams.append("lon", lon)
  url.searchParams.append("appid", env.OPENWEATHER_API_KEY)
  const response = await fetch(url)
  if (!response.ok) {
    throw new UnexpectedServiceError("Failed to fetch forecast")
  }
  const obj = await response.json()
  return obj
}
