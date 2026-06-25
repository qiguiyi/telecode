interface ImportMetaEnv {
  readonly TELECODE_CHANNEL: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}

declare module "virtual:telecode-server" {
  export namespace Server {
    export const listen: typeof import("../../../telecode/dist/types/src/node").Server.listen
    export type Listener = import("../../../telecode/dist/types/src/node").Server.Listener
  }
  export namespace Config {
    export const get: typeof import("../../../telecode/dist/types/src/node").Config.get
    export type Info = import("../../../telecode/dist/types/src/node").Config.Info
  }
  export const bootstrap: typeof import("../../../telecode/dist/types/src/node").bootstrap
}
