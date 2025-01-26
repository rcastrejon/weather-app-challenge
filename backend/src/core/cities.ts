import * as ReservamosService from "@/core/services/reservamos"
import { z } from "zod"
import { forecastSchema, getForecast } from "./forecast"
import type { PlacesResponse } from "@/core/services/reservamos/types"

export const citySchema = z.object({
  display_name: z.string(),
  slug: z.string(),
  lat: z.string(),
  long: z.string(),
  // Se usa 'weather' en lugar de 'forecast' porque solo se necesita el pronóstico actual
  weather: forecastSchema,
})

export const cityDetailsSchema = z.object({
  display_name: z.string(),
  slug: z.string(),
  lat: z.string(),
  long: z.string(),
  forecast: z.array(forecastSchema),
})

/**
 * Obtiene las ciudades populares.
 */
export async function getPopular() {
  const places = await getFilteredPlaces()
  return await parsePlacesResponse(places)
}

/**
 * Busca ciudades por nombre.
 */
export async function search(query: string) {
  const places = await getFilteredPlaces(query)
  return await parsePlacesResponse(places)
}

/**
 * Obtiene todos los detalles de una ciudad por su slug.
 */
export async function getBySlug(slug: string) {
  const places = await getFilteredPlaces(slug)
  const city = places.find((place) => place.slug === slug)
  if (!city) {
    return null
  }
  const forecast = await getForecast(city.lat, city.long)
  return cityDetailsSchema.parse({
    display_name: city.display,
    slug: city.slug,
    lat: city.lat,
    long: city.long,
    forecast,
  })
}

// Helpers

async function getFilteredPlaces(query?: string) {
  // El servicio puede regresar lugares que no son ciudades, por lo tanto, se debe filtrar
  const places = await ReservamosService.getPlaces(query)
  return places.filter((place) => place.result_type === "city")
}

async function parsePlacesResponse(placesResponse: PlacesResponse) {
  // Se obtiene el pronóstico del clima para cada lugar.
  // Solo nos interesa el primer día, es decir, el pronóstico actual
  const forecastPromises = placesResponse.map((place) =>
    getForecast(place.lat, place.long).then((forecast) => forecast[0]!)
  )
  const forecasts = await Promise.all(forecastPromises)
  return placesResponse.map((place, index) => {
    const weather = forecasts[index] // Pronóstico correspondiente al lugar
    return citySchema.parse({
      display_name: place.display,
      slug: place.slug,
      lat: place.lat,
      long: place.long,
      weather,
    })
  })
}
