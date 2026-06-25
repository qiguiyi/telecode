import type { WslTeleCodeCheck, WslServerRuntime } from "./types"

export const wslRuntimeRetryable = (runtime: WslServerRuntime) =>
  runtime.kind === "failed" || runtime.kind === "stopped"

export async function enterWslTeleCodeStep(
  distro: string,
  probe: (distro: string) => Promise<unknown>,
  select: (step: "telecode") => void,
) {
  await probe(distro)
  select("telecode")
}

export function wslTeleCodeAction(check?: WslTeleCodeCheck) {
  if (!check) return
  if (!check.resolvedPath) return "Install TeleCode"
  if (check.matchesDesktop === false) return "Update TeleCode"
}
