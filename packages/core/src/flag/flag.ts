import { Config } from "effect"

export function truthy(key: string) {
  const value = process.env[key]?.toLowerCase()
  return value === "true" || value === "1"
}

const copy = process.env["TELECODE_EXPERIMENTAL_DISABLE_COPY_ON_SELECT"]
const fff = process.env["TELECODE_DISABLE_FFF"]

function enabledByExperimental(key: string) {
  return process.env[key] === undefined ? truthy("TELECODE_EXPERIMENTAL") : truthy(key)
}

export const Flag = {
  OTEL_EXPORTER_OTLP_ENDPOINT: process.env["OTEL_EXPORTER_OTLP_ENDPOINT"],
  OTEL_EXPORTER_OTLP_HEADERS: process.env["OTEL_EXPORTER_OTLP_HEADERS"],

  TELECODE_AUTO_HEAP_SNAPSHOT: truthy("TELECODE_AUTO_HEAP_SNAPSHOT"),
  TELECODE_GIT_BASH_PATH: process.env["TELECODE_GIT_BASH_PATH"],
  TELECODE_CONFIG: process.env["TELECODE_CONFIG"],
  TELECODE_CONFIG_CONTENT: process.env["TELECODE_CONFIG_CONTENT"],
  TELECODE_DISABLE_AUTOUPDATE: truthy("TELECODE_DISABLE_AUTOUPDATE"),
  TELECODE_ALWAYS_NOTIFY_UPDATE: truthy("TELECODE_ALWAYS_NOTIFY_UPDATE"),
  TELECODE_DISABLE_PRUNE: truthy("TELECODE_DISABLE_PRUNE"),
  TELECODE_DISABLE_TERMINAL_TITLE: truthy("TELECODE_DISABLE_TERMINAL_TITLE"),
  TELECODE_SHOW_TTFD: truthy("TELECODE_SHOW_TTFD"),
  TELECODE_DISABLE_AUTOCOMPACT: truthy("TELECODE_DISABLE_AUTOCOMPACT"),
  TELECODE_DISABLE_MODELS_FETCH: truthy("TELECODE_DISABLE_MODELS_FETCH"),
  TELECODE_DISABLE_MOUSE: truthy("TELECODE_DISABLE_MOUSE"),
  TELECODE_FAKE_VCS: process.env["TELECODE_FAKE_VCS"],
  TELECODE_SERVER_PASSWORD: process.env["TELECODE_SERVER_PASSWORD"],
  TELECODE_SERVER_USERNAME: process.env["TELECODE_SERVER_USERNAME"],
  TELECODE_DISABLE_FFF: fff === undefined ? process.platform === "win32" : truthy("TELECODE_DISABLE_FFF"),

  // Experimental
  TELECODE_EXPERIMENTAL_FILEWATCHER: Config.boolean("TELECODE_EXPERIMENTAL_FILEWATCHER").pipe(
    Config.withDefault(false),
  ),
  TELECODE_EXPERIMENTAL_DISABLE_FILEWATCHER: Config.boolean("TELECODE_EXPERIMENTAL_DISABLE_FILEWATCHER").pipe(
    Config.withDefault(false),
  ),
  TELECODE_EXPERIMENTAL_DISABLE_COPY_ON_SELECT:
    copy === undefined ? process.platform === "win32" : truthy("TELECODE_EXPERIMENTAL_DISABLE_COPY_ON_SELECT"),
  TELECODE_MODELS_URL: process.env["TELECODE_MODELS_URL"],
  TELECODE_MODELS_PATH: process.env["TELECODE_MODELS_PATH"],
  TELECODE_DB: process.env["TELECODE_DB"],

  TELECODE_WORKSPACE_ID: process.env["TELECODE_WORKSPACE_ID"],
  TELECODE_EXPERIMENTAL_WORKSPACES: enabledByExperimental("TELECODE_EXPERIMENTAL_WORKSPACES"),

  // Evaluated at access time (not module load) because tests, the CLI, and
  // external tooling set these env vars at runtime.
  get TELECODE_DISABLE_PROJECT_CONFIG() {
    return truthy("TELECODE_DISABLE_PROJECT_CONFIG")
  },
  get TELECODE_EXPERIMENTAL_REFERENCES() {
    return enabledByExperimental("TELECODE_EXPERIMENTAL_REFERENCES")
  },
  get TELECODE_TUI_CONFIG() {
    return process.env["TELECODE_TUI_CONFIG"]
  },
  get TELECODE_CONFIG_DIR() {
    return process.env["TELECODE_CONFIG_DIR"]
  },
  get TELECODE_PURE() {
    return truthy("TELECODE_PURE")
  },
  get TELECODE_PERMISSION() {
    return process.env["TELECODE_PERMISSION"]
  },
  get TELECODE_PLUGIN_META_FILE() {
    return process.env["TELECODE_PLUGIN_META_FILE"]
  },
  get TELECODE_CLIENT() {
    return process.env["TELECODE_CLIENT"] ?? "cli"
  },
}
