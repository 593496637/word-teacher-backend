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

// 导出类型 - 移除有问题的类型导出，保持简洁
// MastraInstance 类型暂时移除以避免构建冲突
