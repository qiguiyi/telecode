declare global {
  const TELECODE_VERSION: string
  const TELECODE_CHANNEL: string
}

export const InstallationVersion = typeof TELECODE_VERSION === "string" ? TELECODE_VERSION : "local"
export const InstallationChannel = typeof TELECODE_CHANNEL === "string" ? TELECODE_CHANNEL : "local"
export const InstallationLocal = InstallationChannel === "local"
