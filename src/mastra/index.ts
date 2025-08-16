import { Mastra } from "@mastra/core";
import { wordTeacherAgent } from "./agents/word-teacher-agent";

/**
 * Mastra 实例配置 - 纯净版本
 * 每日单词老师服务的核心配置
 */
export const mastra = new Mastra({
  agents: {
    wordTeacher: wordTeacherAgent,
  },
  
  // 服务器配置
  server: {
    // Cloudflare Workers 环境适配
    host: "0.0.0.0",
    port: 8787,
    
    // 简化的 CORS 配置
    cors: {
      origin: "*", // 简化为允许所有来源
      credentials: false,
    },
  },
});

// 导出类型 - 使用兼容Mastra构建器的语法
export { mastra };
export interface MastraInstance {
  agents: typeof mastra.agents;
  server: typeof mastra.server;
}
