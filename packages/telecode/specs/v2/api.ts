// @ts-nocheck

import { TeleCode } from "@telecode-ai/core"
import { ReadTool } from "@telecode-ai/core/tools"

const telecode = TeleCode.make({})

telecode.tool.add(ReadTool)

telecode.tool.add({
  name: "bash",
  schema: {
    type: "object",
    properties: {
      command: {
        type: "string",
        description: "The command to run.",
      },
    },
    required: ["command"],
  },
  execute(input, ctx) {},
})

telecode.auth.add({
  provider: "openai",
  type: "api",
  value: process.env.OPENAI_API_KEY,
})

telecode.agent.add({
  name: "build",
  permissions: [],
  model: {
    id: "gpt-5-5",
    provider: "openai",
    variant: "xhigh",
  },
})

const sessionID = await telecode.session.create({
  agent: "build",
})

telecode.subscribe((event) => {
  console.log(event)
})

await telecode.session.prompt({
  sessionID,
  text: "hey what is up",
})

await telecode.session.prompt({
  sessionID,
  text: "what is up with this",
  files: [
    {
      mime: "image/png",
      uri: "data:image/png;base64,xxxx",
    },
  ],
})

await telecode.session.wait()

console.log(await telecode.session.messages(sessionID))
