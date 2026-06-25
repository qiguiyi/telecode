# @telecode-ai/sdk-next

Effect-native scoped TeleCode host for in-process applications. This transitional package will replace the existing generated `@telecode-ai/sdk` after its consumers migrate.

The SDK executes Server's assembled HTTP router in memory. It opens no listener and performs no network I/O, while preserving the same routing, middleware, handlers, codecs, and errors as the network client.

```ts
import { TeleCode } from "@telecode-ai/sdk-next"

const telecode = yield * TeleCode.create()
const session = yield * telecode.sessions.get({ sessionID })
```

It also exposes local-only `tools.register(...)`. Closing the owning Effect Scope releases router resources, location services, fibers, and scoped tool registrations.

The same constructor is available as a service Layer:

```ts
const program = Effect.gen(function* () {
  const telecode = yield* TeleCode.Service
  return yield* telecode.sessions.get({ sessionID })
})

yield * program.pipe(Effect.provide(TeleCode.layer))
```

`TeleCode.layer` adapts `TeleCode.create()` for dependency injection; it does not define another host implementation.
