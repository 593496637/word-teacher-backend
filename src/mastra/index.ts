import { Mastra } from "@mastra/core/mastra";
import { wordTeacherAgent } from "./agents/word-teacher-agent";
import { dictionaryTool } from "./tools/dictionary-tool";

/**
 * Mastra 实例配置
 * 每日单词老师服务的核心配置
 */
export const mastra = new Mastra({
  agents: {
    wordTeacher: wordTeacherAgent,
  },
  tools: {
    dictionaryTool,
  },
  server: {
    host: process.env.HOST || "localhost",
    port: parseInt(process.env.PORT || "4111"),
  },
});

// 导出类型
export type MastraInstance = typeof mastra;
