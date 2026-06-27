export type OfficeWorkflowID = "innovation-contest" | "policy-compliance" | "material-drafting"

export type OfficeWorkflow = {
  id: OfficeWorkflowID
  title: string
  description: string
  action: string
}

export const officeWorkflows: OfficeWorkflow[] = [
  {
    id: "innovation-contest",
    title: "AI 内部应用创新竞赛申报",
    description: "评分拆解、材料草案、上线证明与答辩问答",
    action: "启动申报",
  },
  {
    id: "policy-compliance",
    title: "制度材料合规自查",
    description: "按制度条款核对材料，输出风险点与修改建议",
    action: "开始自查",
  },
  {
    id: "material-drafting",
    title: "管理支撑材料生成",
    description: "将零散背景整理成汇报、纪要、方案或说明材料",
    action: "生成材料",
  },
]

const workflowDetails: Record<
  OfficeWorkflowID,
  {
    role: string
    steps: string[]
    outputs: string[]
  }
> = {
  "innovation-contest": {
    role: "你是熟悉企业 AI 应用竞赛、管理支撑场景和安全合规要求的应用架构师。",
    steps: [
      "抽取竞赛文件中的赛道、提交材料、时间节点、评分规则和硬性约束。",
      "围绕创新性、先进性、可复制性、效益性四个评分维度评估当前项目卖点。",
      "把 TeleCode + AI-Router 定位为内网大模型适配与办公流程智能体底座，避免写成普通知识库。",
      "识别上线证明、应用成效、资源安全、分工说明中的缺失项。",
    ],
    outputs: [
      "项目定位一句话",
      "申报材料大纲",
      "亮点与差异化清单",
      "缺失项与下一步补证清单",
      "答辩可能问题与建议回答",
    ],
  },
  "policy-compliance": {
    role: "你是企业制度合规审查助手，擅长把制度条款转成可执行检查项。",
    steps: [
      "先列出可依据的制度条款或文件来源。",
      "逐条检查材料是否满足范围、流程、权限、数据安全、留痕和审批要求。",
      "把风险按高、中、低分级，并说明触发依据。",
      "给出可直接替换到材料中的修订建议。",
    ],
    outputs: ["制度依据表", "风险分级清单", "缺失项", "建议改写稿"],
  },
  "material-drafting": {
    role: "你是企业管理支撑材料写作助手，擅长把零散输入整理成正式材料。",
    steps: [
      "先识别材料类型、读者对象和提交目的。",
      "把事实、数据、结论和待补充内容分开处理。",
      "生成结构清晰、措辞稳健、可继续编辑的中文草稿。",
      "标注需要用户确认的数据、时间、责任人和附件。",
    ],
    outputs: ["材料标题建议", "正文草稿", "待确认信息", "可复用模板"],
  },
}

export function buildOfficeWorkflowPrompt(input: {
  workflowID: OfficeWorkflowID
  evidenceFiles?: readonly string[]
  extraContext?: string
}) {
  const workflow = officeWorkflows.find((item) => item.id === input.workflowID)
  if (!workflow) throw new Error(`Unknown office workflow: ${input.workflowID}`)

  const details = workflowDetails[workflow.id]
  const evidence = (input.evidenceFiles ?? [])
    .map((file) => file.trim())
    .filter(Boolean)
    .map((file) => `- ${file}`)
    .join("\n")

  const context = input.extraContext?.trim() || "无"

  return [
    details.role,
    `# 任务\n${workflow.title}`,
    `# 已选择材料\n${evidence || "当前未附加文件"}`,
    `# 补充背景\n${context}`,
    `# 执行步骤\n${details.steps.map((step, index) => `${index + 1}. ${step}`).join("\n")}`,
    `# 输出要求\n${details.outputs.map((item) => `- ${item}`).join("\n")}`,
    [
      "# 约束",
      "- 不得编造上线数据、用户规模、节省工时、成本收益或领导评价。",
      "- 对材料中没有依据的信息，统一放入“缺失项/待确认”。",
      "- 优先输出可复制到 Word、PPT 或申报系统中的中文内容。",
      "- 涉及内网接口、密钥、人员和数据时，只做脱敏描述。",
    ].join("\n"),
  ].join("\n\n")
}
