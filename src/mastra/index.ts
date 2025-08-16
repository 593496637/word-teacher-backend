import { Mastra } from "@mastra/core";
import { CloudflareDeployer } from "@mastra/deployer-cloudflare";
import { wordTeacherAgent } from "./agents/word-teacher-agent";

/**
 * Mastra 实例配置 - 官方 Cloudflare Workers 部署方法
 * 每日单词老师服务的核心配置
 */
export const mastra = new Mastra({
  agents: {
    wordTeacher: wordTeacherAgent,
  },
  
  // 官方 Cloudflare Workers 部署器配置（使用正确的 API）
  deployer: new CloudflareDeployer({
    // 使用 scope 参数（这是正确的）
    scope: process.env.CLOUDFLARE_ACCOUNT_ID!,
    projectName: "word-teacher-backend",
    // 认证配置
    auth: {
      apiToken: process.env.CLOUDFLARE_API_TOKEN!,
      apiEmail: process.env.CLOUDFLARE_API_EMAIL || "your-email@example.com",
    },
    // 可选：自定义域名路由
    routes: [
      // 如果需要自定义域名，取消注释并配置
      // {
      //   pattern: "api.your-domain.com/*",
      //   zone_name: "your-domain.com",
      //   custom_domain: true
      // }
    ],
  }),
  
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
      // 使用正确的 CORS 参数
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
