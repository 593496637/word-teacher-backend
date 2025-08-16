import { Mastra } from "@mastra/core/mastra";
import { wordTeacherAgent } from "./agents/word-teacher-agent";

/**
 * Mastra 实例配置
 * 每日单词老师服务的核心配置
 * 支持 Cloudflare Workers 部署
 */
export const mastra = new Mastra({
  agents: {
    wordTeacher: wordTeacherAgent,
  },
  // 暂时移除 tools 配置，避免 schema 问题
  // tools: {
  //   dictionaryTool,
  // },
  server: {
    // Cloudflare Workers 环境适配
    host: globalThis.process?.env?.HOST || "0.0.0.0",
    port: parseInt(globalThis.process?.env?.PORT || "8787"),
    // CORS 配置，允许前端域名访问
    cors: {
      origin: [
        "http://localhost:5173", // 本地开发
        "https://word-teacher-frontend.pages.dev", // Cloudflare Pages 默认域名
        "https://your-frontend-domain.com", // 你的自定义前端域名
      ],
      credentials: true,
      methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
      allowedHeaders: ["Content-Type", "Authorization"],
    },
  },
});

// 导出类型
export type MastraInstance = typeof mastra;
