export * as CommandPlugin from "./command"

import { define } from "./internal"
import { Effect } from "effect"
import { Location } from "../location"
import PROMPT_ANALYSIS from "./command/analysis.txt"
import PROMPT_INITIALIZE from "./command/initialize.txt"
import PROMPT_REVIEW from "./command/review.txt"
import PROMPT_ROUTER from "./command/router.txt"

export const Plugin = define({
  id: "command",
  effect: Effect.fn(function* (ctx) {
    const location = yield* Location.Service
    yield* ctx.command.transform((draft) => {
      draft.update("init", (command) => {
        command.template = PROMPT_INITIALIZE.replace("${path}", location.project.directory)
        command.description = "guided AGENTS.md setup"
      })
      draft.update("review", (command) => {
        command.template = PROMPT_REVIEW.replace("${path}", location.project.directory)
        command.description = "review changes [commit|branch|pr], defaults to uncommitted"
        command.subtask = true
      })
      draft.update("analysis", (command) => {
        command.template = PROMPT_ANALYSIS.replace("${path}", location.project.directory)
        command.description = "token usage analysis and billing statistics"
      })
      draft.update("router", (command) => {
        command.template = PROMPT_ROUTER.replace("${path}", location.project.directory)
        command.description = "TeleCode routing configuration management"
      })
    })
  }),
})
