import path from "path"

process.env.TELECODE_DB = ":memory:"
process.env.TELECODE_MODELS_PATH = path.join(import.meta.dir, "plugin", "fixtures", "models-dev.json")
process.env.TELECODE_DISABLE_MODELS_FETCH = "true"
