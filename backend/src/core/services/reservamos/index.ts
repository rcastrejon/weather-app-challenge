import { UnexpectedServiceError } from "../errors"
import type { PlacesResponse } from "./types"

const BASE_URL = "https://search.reservamos.mx/api/v2"

export const getPlaces = async (q?: string): Promise<PlacesResponse> => {
  const url = new URL(`${BASE_URL}/places`)
  if (q) {
    url.searchParams.append("q", q)
  }
  const response = await fetch(url)
  if (!response.ok) {
    throw new UnexpectedServiceError("Failed to fetch places")
  }
  const obj = await response.json()
  return obj
}

export const getPlacesWithOrigin = async (
  from?: string,
  q?: string
): Promise<PlacesResponse> => {
  const url = new URL(`${BASE_URL}/places`)
  if (q && from) {
    url.searchParams.append("q", q)
    url.searchParams.append("from", from)
  }
  const response = await fetch(url)
  if (!response.ok) {
    throw new UnexpectedServiceError("Failed to fetch places")
  }
  const obj = await response.json()
  return obj
}
