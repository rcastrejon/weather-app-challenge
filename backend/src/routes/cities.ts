import { Hono } from "hono"
import { HTTPException } from "hono/http-exception"
import * as Cities from "../core/cities"

const router = new Hono()
  .get("/cities/search", async (c) => {
    const from = c.req.query("from")
    const query = c.req.query("q")
    const matches = await Cities.search(from ?? "", query ?? "")
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
