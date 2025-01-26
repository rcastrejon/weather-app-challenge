import { Hono } from "hono"
import * as Cities from "@/core/cities"
import { HTTPException } from "hono/http-exception"

const router = new Hono()
  .get("/cities/search", async (c) => {
    const query = c.req.query("q")
    const matches = await Cities.search(query ?? "")
    return c.json(matches)
  })
  .get("/cities/popular", async (c) => {
    const popular = await Cities.getPopular()
    return c.json(popular)
  })
  .get("/cities/:slug/forecast", async (c) => {
    const slug = c.req.param("slug")
    const city = await Cities.getBySlug(slug)
    if (!city) {
      throw new HTTPException(404, { message: "City not found" })
    }
    return c.json(city)
  })

export default router
