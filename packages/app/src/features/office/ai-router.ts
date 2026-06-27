import type { Config } from "@telecode-ai/sdk/v2/client"

const OPENAI_COMPATIBLE = "@ai-sdk/openai-compatible"

export const AI_ROUTER_PROVIDER_ID = "ai-router"
export const AI_ROUTER_PROVIDER_NAME = "AI-Router 内网大模型"
export const AI_ROUTER_DEFAULT_BASE_URL = "http://127.0.0.1:4399/v1"

export type AIRouterModel = {
  id: string
  name: string
}

export const AI_ROUTER_DEFAULT_MODELS: AIRouterModel[] = [
  { id: "Qwen3.5-397B", name: "Qwen3.5-397B" },
  { id: "GLM-5.1-754B", name: "GLM-5.1-754B" },
  { id: "DeepSeek-V4-Flash-284B", name: "DeepSeek-V4-Flash-284B" },
]

export function normalizeAIRouterBaseURL(value: string) {
  const next = value.trim()
  if (!next) return AI_ROUTER_DEFAULT_BASE_URL
  return next.replace(/\/+$/, "")
}

export function buildAIRouterProviderConfig(input?: {
  baseURL?: string
  name?: string
  models?: AIRouterModel[]
}) {
  const models = input?.models ?? AI_ROUTER_DEFAULT_MODELS
  const name = input?.name?.trim() || AI_ROUTER_PROVIDER_NAME

  return {
    npm: OPENAI_COMPATIBLE,
    name,
    options: {
      baseURL: normalizeAIRouterBaseURL(input?.baseURL ?? AI_ROUTER_DEFAULT_BASE_URL),
    },
    models: Object.fromEntries(models.map((model) => [model.id, { name: model.name }])),
  }
}

export function buildAIRouterConfigPatch(input?: {
  baseURL?: string
  disabledProviders?: readonly string[]
  name?: string
  models?: AIRouterModel[]
}): Config {
  return {
    provider: {
      [AI_ROUTER_PROVIDER_ID]: buildAIRouterProviderConfig(input),
    },
    disabled_providers: (input?.disabledProviders ?? []).filter((id) => id !== AI_ROUTER_PROVIDER_ID),
  }
}

export function isAIRouterConfigured(config: Pick<Config, "provider"> | undefined) {
  const provider = config?.provider?.[AI_ROUTER_PROVIDER_ID]
  return provider?.npm === OPENAI_COMPATIBLE && !!provider.models && Object.keys(provider.models).length > 0
}
