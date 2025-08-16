import { Mastra } from "@mastra/core";
import { wordTeacherAgent } from "./agents/word-teacher-agent";

// Cloudflare Workers crypto polyfill
if (typeof crypto === 'undefined') {
  // @ts-ignore
  globalThis.crypto = {
    randomUUID: () => {
      // Simple UUID v4 implementation for Cloudflare Workers
      return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        const r = Math.random() * 16 | 0;
        const v = c === 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
      });
    },
    getRandomValues: (array: Uint8Array) => {
      // Simple implementation using Math.random()
      for (let i = 0; i < array.length; i++) {
        array[i] = Math.floor(Math.random() * 256);
      }
      return array;
    }
  };
}

/**
 * Mastra 实例配置 - Cloudflare Workers 兼容版本
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
