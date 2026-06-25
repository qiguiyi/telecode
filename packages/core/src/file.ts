export * as File from "./file"

import { Revert } from "@telecode-ai/schema/revert"

export const Diff = Revert.FileDiff
export type Diff = typeof Diff.Type
