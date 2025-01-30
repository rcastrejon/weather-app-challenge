import { hc } from "hono/client"
import type { AppType } from "@acme/backend/app"
import { queryOptions } from "@tanstack/react-query"

const client = hc<AppType>("/")
const api = client.api

async function getPopularCities() {
  const response = await api.cities.popular.$get()
  const obj = await response.json()
  return obj
}

export const getCitiesOptions = () =>
  queryOptions({
    queryKey: ["get-popular-cities"],
    queryFn: getPopularCities,
  })

async function searchCities(from: string, query: string) {
  const response = await api.cities.search.$get({
    query: { from: from, q: query },
  })
  const obj = await response.json()
  return obj
}

export const searchCitiesOptions = (from: string, query: string) =>
  queryOptions({
    queryKey: ["search-cities", from, query],
    queryFn: () => searchCities(from, query),
  })

async function getCityDetails(slug: string) {
  const response = await api.cities[":slug"].forecast.$get({ param: { slug } })
  if (!response.ok && response.status === 404) {
    return null
  }
  const obj = await response.json()
  return obj
}

export const getCityDetailsOptions = (slug: string) =>
  queryOptions({
    queryKey: ["get-city-details", slug],
    queryFn: () => getCityDetails(slug),
  })
