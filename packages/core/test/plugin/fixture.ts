import { Credential } from "@telecode-ai/core/credential"
import { EventV2 } from "@telecode-ai/core/event"
import { FileSystem } from "@telecode-ai/core/filesystem"
import { FSUtil } from "@telecode-ai/core/fs-util"
import { Global } from "@telecode-ai/core/global"
import { Npm } from "@telecode-ai/core/npm"
import { PluginV2 } from "@telecode-ai/core/plugin"
import { RepositoryCache } from "@telecode-ai/core/repository-cache"
import { Ripgrep } from "@telecode-ai/core/ripgrep"
import { SkillDiscovery } from "@telecode-ai/core/skill/discovery"
import { Effect, Layer } from "effect"
import { FetchHttpClient } from "effect/unstable/http"
import { tempLocationLayer } from "../fixture/location"

export const PluginTestLayer = Layer.mergeAll(FileSystem.locationLayer, PluginV2.locationLayer).pipe(
  Layer.provideMerge(
    Layer.mergeAll(
      Credential.defaultLayer,
      EventV2.defaultLayer,
      FetchHttpClient.layer,
      FSUtil.defaultLayer,
      Global.defaultLayer,
      Layer.succeed(
        Npm.Service,
        Npm.Service.of({
          add: () => Effect.succeed({ directory: "", entrypoint: undefined }),
          install: () => Effect.void,
          which: () => Effect.succeed(undefined),
        }),
      ),
      RepositoryCache.defaultLayer,
      SkillDiscovery.defaultLayer,
      Ripgrep.defaultLayer,
      tempLocationLayer,
    ),
  ),
)
