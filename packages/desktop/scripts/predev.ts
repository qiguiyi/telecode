import { $ } from "bun"

await $`bun ./scripts/copy-icons.ts ${process.env.TELECODE_CHANNEL ?? "dev"}`

await $`cd ../telecode && bun script/build-node.ts`
