/// <reference path="../markdown.d.ts" />

export * as SkillPlugin from "./skill"

import { define } from "./internal"
import { Effect } from "effect"
import { AbsolutePath } from "../schema"
import { SkillV2 } from "../skill"
import customizeTeleCodeContent from "./skill/customize-telecode.md" with { type: "text" }

export const CustomizeTeleCodeContent = customizeTeleCodeContent

export const Plugin = define({
  id: "skill",
  effect: Effect.fn(function* (ctx) {
    yield* ctx.skill.transform((draft) => {
      draft.source(
        SkillV2.EmbeddedSource.make({
          type: "embedded",
          skill: SkillV2.Info.make({
            name: "customize-telecode",
            description:
              "Use ONLY when the user is editing or creating telecode's own configuration: telecode.json, telecode.jsonc, files under .telecode/, or files under ~/.config/telecode/. Also use when creating or fixing telecode agents, subagents, commands, skills, plugins, MCP servers, or permission rules. Do not use for the user's own application code, or for any project that is not configuring telecode itself.",
            location: AbsolutePath.make("/builtin/customize-telecode.md"),
            content: CustomizeTeleCodeContent,
          }),
        }),
      )
    })
  }),
})
