export * from "./client.js"
export * from "./server.js"

import { createTeleCodeClient } from "./client.js"
import { createTeleCodeServer } from "./server.js"
import type { ServerOptions } from "./server.js"

export * as data from "./data.js"

export async function createTeleCode(options?: ServerOptions) {
  const server = await createTeleCodeServer({
    ...options,
  })

  const client = createTeleCodeClient({
    baseUrl: server.url,
  })

  return {
    client,
    server,
  }
}
