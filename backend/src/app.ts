import { Hono } from "hono"
import { logger } from "hono/logger"

import healthRouter from "./routes/health"
import citiesRouter from "./routes/cities"

const app = new Hono()
app.use(logger())

const routes = app
  .basePath("/api")
  .route("/", healthRouter)
  .route("/", citiesRouter)

export type AppType = typeof routes
export default app
