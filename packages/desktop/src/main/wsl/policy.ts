import type { WslDistroProbe, WslTeleCodeCheck, WslServerItem } from "../../preload/types"

export function wslServerIdToRestart(servers: WslServerItem[], distro: string) {
  return servers.find((item) => item.config.distro === distro)?.config.id
}

export function clearWslDistroState(
  distroProbes: Record<string, WslDistroProbe>,
  telecodeChecks: Record<string, WslTeleCodeCheck>,
  distro: string,
) {
  const nextDistroProbes = { ...distroProbes }
  const nextTeleCodeChecks = { ...telecodeChecks }
  delete nextDistroProbes[distro]
  delete nextTeleCodeChecks[distro]
  return { distroProbes: nextDistroProbes, telecodeChecks: nextTeleCodeChecks }
}

export function wslTerminalArgs(distro?: string | null) {
  return ["/c", "start", "", "wsl", ...(distro ? ["-d", distro] : [])]
}

export function requireWslIpcString(name: string, value: unknown) {
  if (typeof value === "string" && value.length > 0) return value
  throw new Error(`Invalid ${name}`)
}
