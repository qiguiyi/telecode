import { describe, expect, test } from "bun:test"
import { AI_ROUTER_PROVIDER_ID, buildAIRouterConfigPatch, normalizeAIRouterBaseURL } from "./ai-router"

describe("AI-Router provider preset", () => {
  test("builds an OpenAI-compatible config patch for the local gateway", () => {
    const patch = buildAIRouterConfigPatch({
      disabledProviders: ["ai-router", "legacy-provider"],
    })

    expect(patch).toEqual({
      provider: {
        [AI_ROUTER_PROVIDER_ID]: {
          npm: "@ai-sdk/openai-compatible",
          name: "AI-Router 内网大模型",
          options: {
            baseURL: "http://127.0.0.1:4399/v1",
          },
          models: {
            "Qwen3.5-397B": { name: "Qwen3.5-397B" },
            "GLM-5.1-754B": { name: "GLM-5.1-754B" },
            "DeepSeek-V4-Flash-284B": { name: "DeepSeek-V4-Flash-284B" },
          },
        },
      },
      disabled_providers: ["legacy-provider"],
    })
  })

  test("normalizes the base url without changing the protocol or path", () => {
    expect(normalizeAIRouterBaseURL(" http://localhost:4399/v1/ ")).toBe("http://localhost:4399/v1")
  })
})
