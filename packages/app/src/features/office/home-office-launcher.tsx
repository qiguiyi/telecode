import { ButtonV2 } from "@telecode-ai/ui/v2/button-v2"
import { ProviderIcon } from "@telecode-ai/ui/provider-icon"
import { createMemo, For, Show } from "solid-js"
import { createStore } from "solid-js/store"
import type { LocalProject } from "@/context/layout"
import { ServerConnection } from "@/context/server"
import type { ServerSync } from "@/context/server-sync"
import { useGlobal } from "@/context/global"
import { useTabs } from "@/context/tabs"
import { showToast } from "@/utils/toast"
import {
  AI_ROUTER_DEFAULT_BASE_URL,
  AI_ROUTER_PROVIDER_NAME,
  buildAIRouterConfigPatch,
  isAIRouterConfigured,
} from "./ai-router"
import { buildOfficeWorkflowPrompt, officeWorkflows, type OfficeWorkflow } from "./workflows"

type Props = {
  server?: ServerConnection.Any
  sync?: ServerSync
  project?: LocalProject
}

export function HomeOfficeLauncher(props: Props) {
  const global = useGlobal()
  const tabs = useTabs()
  const [state, setState] = createStore({
    baseURL: AI_ROUTER_DEFAULT_BASE_URL,
    connecting: false,
  })

  const configured = createMemo(() => isAIRouterConfigured(props.sync?.data.config))
  const projectName = createMemo(() => props.project?.worktree ?? "请选择项目")

  const connectAIRouter = async () => {
    const sync = props.sync
    if (!sync || state.connecting) return

    setState("connecting", true)
    try {
      await sync.updateConfig(
        buildAIRouterConfigPatch({
          baseURL: state.baseURL,
          disabledProviders: sync.data.config.disabled_providers ?? [],
        }),
      )
      showToast({
        variant: "success",
        icon: "circle-check",
        title: "AI-Router 已接入",
        description: `${AI_ROUTER_PROVIDER_NAME} 已写入 TeleCode provider 配置。`,
      })
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err)
      showToast({ variant: "error", title: "AI-Router 接入失败", description: message })
    } finally {
      setState("connecting", false)
    }
  }

  const launchWorkflow = (workflow: OfficeWorkflow) => {
    const server = props.server
    const project = props.project
    if (!server || !project) {
      showToast({ title: "请选择项目", description: "需要先选择一个工作区，才能创建办公流程会话。" })
      return
    }

    const serverKey = ServerConnection.key(server)
    const ctx = global.ensureServerCtx(server)
    ctx.projects.open(project.worktree)
    ctx.projects.touch(project.worktree)

    tabs.newDraft(
      { server: serverKey, directory: project.worktree },
      buildOfficeWorkflowPrompt({
        workflowID: workflow.id,
        extraContext:
          "当前项目底座为 TeleCode + AI-Router：AI-Router 负责把集团内网 APP-KEY/APP-SIGN 大模型接口适配为 OpenAI/Anthropic 协议，TeleCode 负责会话、文件上下文、智能体和办公流程编排。",
      }),
    )
  }

  return (
    <section class="mb-4 border-y border-v2-border-border-muted bg-v2-background-bg-layer-01/70 px-3 py-3">
      <div class="flex min-w-0 flex-col gap-3">
        <div class="flex min-w-0 flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
          <div class="min-w-0">
            <div class="text-[13px] leading-4 text-v2-text-text-base [font-weight:630]">智申报工作台</div>
            <div class="mt-1 min-w-0 truncate text-[12px] leading-4 text-v2-text-text-muted [font-weight:440]">
              {projectName()}
            </div>
          </div>
          <div class="flex shrink-0 items-center gap-2">
            <ProviderIcon id="synthetic" class="size-4 shrink-0 icon-strong-base" />
            <span class="text-[12px] leading-4 text-v2-text-text-muted [font-weight:440]">
              {configured() ? "AI-Router 已接入" : "AI-Router 未接入"}
            </span>
          </div>
        </div>

        <div class="flex min-w-0 flex-col gap-2 lg:flex-row lg:items-center">
          <label class="min-w-0 flex-1">
            <span class="sr-only">AI-Router 地址</span>
            <input
              class="h-8 w-full rounded-[6px] border border-v2-border-border-muted bg-v2-background-bg-base px-2 text-[12px] leading-4 text-v2-text-text-base outline-none transition-[border-color,box-shadow] focus:border-v2-border-border-base focus:[box-shadow:inset_0_0_0_0.5px_var(--v2-border-border-base)]"
              value={state.baseURL}
              onInput={(event) => setState("baseURL", event.currentTarget.value)}
            />
          </label>
          <ButtonV2
            data-action="office-connect-ai-router"
            size="normal"
            variant={configured() ? "ghost-muted" : "neutral"}
            icon="plus"
            disabled={state.connecting}
            onClick={() => void connectAIRouter()}
          >
            {configured() ? "同步配置" : "接入 AI-Router"}
          </ButtonV2>
        </div>

        <div class="grid min-w-0 gap-2 md:grid-cols-3">
          <For each={officeWorkflows}>
            {(workflow) => (
              <button
                type="button"
                class="group min-h-[72px] rounded-[6px] border border-v2-border-border-muted bg-v2-background-bg-base px-3 py-2 text-left transition-[background-color,border-color,box-shadow] hover:border-v2-border-border-base hover:bg-v2-background-bg-layer-02 focus-visible:border-v2-border-border-base focus-visible:outline-none focus-visible:[box-shadow:inset_0_0_0_0.5px_var(--v2-border-border-base)] disabled:cursor-not-allowed disabled:opacity-55"
                disabled={!props.project}
                onClick={() => launchWorkflow(workflow)}
              >
                <div class="flex min-w-0 items-center justify-between gap-2">
                  <span class="min-w-0 truncate text-[13px] leading-4 text-v2-text-text-base [font-weight:590]">
                    {workflow.title}
                  </span>
                  <span class="shrink-0 text-[12px] leading-4 text-v2-text-text-muted [font-weight:530]">
                    {workflow.action}
                  </span>
                </div>
                <div class="mt-1 max-h-8 overflow-hidden text-[12px] leading-4 text-v2-text-text-muted [font-weight:440]">
                  {workflow.description}
                </div>
              </button>
            )}
          </For>
        </div>

        <Show when={!props.project}>
          <div class="text-[12px] leading-4 text-v2-text-text-muted [font-weight:440]">
            打开或选择项目后，可创建申报、合规、材料生成会话。
          </div>
        </Show>
      </div>
    </section>
  )
}
