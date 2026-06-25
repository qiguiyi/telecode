import { describe, expect } from "bun:test"
import { Effect, Layer } from "effect"
import { AgentV2 } from "@telecode-ai/core/agent"
import { FSUtil } from "@telecode-ai/core/fs-util"
import { SkillPlugin } from "@telecode-ai/core/plugin/skill"
import { SkillV2 } from "@telecode-ai/core/skill"
import { SkillDiscovery } from "@telecode-ai/core/skill/discovery"
import { testEffect } from "../lib/effect"
import { host } from "./host"

const it = testEffect(
  SkillV2.layer.pipe(
    Layer.provide(FSUtil.defaultLayer),
    Layer.provide(SkillDiscovery.defaultLayer),
    Layer.provideMerge(AgentV2.locationLayer),
  ),
)

describe("SkillPlugin.Plugin", () => {
  it.effect("registers the built-in customize-telecode skill", () =>
    Effect.gen(function* () {
      const skill = yield* SkillV2.Service
      yield* SkillPlugin.Plugin.effect(host({ skill: { ...skill, reload: skill.reload } }))

      expect(yield* skill.list()).toContainEqual(
        expect.objectContaining({
          name: "customize-telecode",
          description: expect.stringContaining("telecode's own configuration"),
        }),
      )
    }),
  )
})
