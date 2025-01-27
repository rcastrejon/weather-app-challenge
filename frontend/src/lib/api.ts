import { hc } from "hono/client"
import type { AppType } from "@acme/backend/app"

const client = hc<AppType>("/")
const api = client.api
