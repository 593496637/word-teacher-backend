import { Mastra } from "@mastra/core";
import { wordTeacherAgent } from "./agents/word-teacher-agent";

/**
 * Mastra 实例配置 - 简化版本（不使用 CloudflareDeployer）
 * 每日单词老师服务的核心配置
 */
export const mastra = new Mastra({
  agents: {
    wordTeacher: wordTeacherAgent,
  },
  
  // 服务器配置
  server: {
    // Cloudflare Workers 环境适配
    host: globalThis.process?.env?.HOST || "0.0.0.0",
    port: parseInt(globalThis.process?.env?.PORT || "8787"),
    
    // CORS 配置，允许前端域名访问
    cors: {
      origin: [
        "http://localhost:5173", // 本地开发
        "https://word-teacher-frontend.pages.dev", // Cloudflare Pages 默认域名
        // 替换为你的实际前端域名
        "https://your-frontend-domain.com",
      ],
      credentials: true,
      allowHeaders: ["Content-Type", "Authorization"],
    },
    
    // 构建配置
    build: {
      // 在生产环境也启用 API 文档（可选）
      openAPIDocs: true,
    },
  },
});

// 导出类型
export type MastraInstance = typeof mastra;
