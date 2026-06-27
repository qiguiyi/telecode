import { describe, expect, test } from "bun:test"
import { buildOfficeWorkflowPrompt, officeWorkflows } from "./workflows"

describe("office workflow prompts", () => {
  test("builds an innovation contest prompt with scoring and evidence constraints", () => {
    const prompt = buildOfficeWorkflowPrompt({
      workflowID: "innovation-contest",
      evidenceFiles: ["AI内部应用创新竞赛预通知(3).docx", "AI-Router/readme.md"],
      extraContext: "目标是参加 2026 年 7 月内部应用创新竞赛。",
    })

    expect(prompt).toContain("AI 内部应用创新竞赛申报")
    expect(prompt).toContain("创新性、先进性、可复制性、效益性")
    expect(prompt).toContain("- AI内部应用创新竞赛预通知(3).docx")
    expect(prompt).toContain("不得编造上线数据")
    expect(prompt).toContain("目标是参加 2026 年 7 月内部应用创新竞赛。")
  })

  test("keeps every workflow launchable even when no evidence file is selected", () => {
    for (const workflow of officeWorkflows) {
      const prompt = buildOfficeWorkflowPrompt({ workflowID: workflow.id })

      expect(prompt).toContain(workflow.title)
      expect(prompt).toContain("当前未附加文件")
      expect(prompt).toContain("缺失项")
    }
  })
})
