import { run as runTui, type TuiInput } from "@telecode-ai/tui"
import { Global } from "@telecode-ai/core/global"
import { Effect } from "effect"

export function run(input: TuiInput) {
  return runTui(input).pipe(Effect.provide(Global.defaultLayer))
}
