import { Hono } from "hono"

const router = new Hono()

router.get("/up", (c) => {
  return c.json({
    message: "up",
    uptime: process.uptime(),
  })
})

export default router
