import { Mastra } from '@mastra/core/mastra';
import { PinoLogger } from '@mastra/loggers';
import { LibSQLStore } from '@mastra/libsql';
import { wordTeacherAgent } from "./agents/word-teacher-agent.js";

/**
 * 环境感知的服务器配置
 * 开发环境: localhost:4111
 * 生产环境: 0.0.0.0:8787
 */
const isDevelopment = process.env.NODE_ENV === "development" || process.env.NODE_ENV === undefined;

const serverConfig = {
  // 环境感知的主机和端口配置
  host: process.env.HOST || (isDevelopment ? "localhost" : "0.0.0.0"),
  port: parseInt(process.env.PORT || (isDevelopment ? "4111" : "8787")),
  
  // 更精确的 CORS 配置
  cors: {
    origin: [
      "http://localhost:5173", // Vite 开发服务器
      "http://localhost:5174", // Vite 开发服务器备用端口
      "http://localhost:4173", // Vite 预览服务器
      "https://lkkblog7.top", // 前端生产域名
      "https://word-teacher-frontend.pages.dev", // Cloudflare Pages 默认域名
    ],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  },
};

/**
 * Mastra 实例配置 - 基于官方标准结构
 * 每日单词老师服务的核心配置
 */
export const mastra = new Mastra({
  agents: {
    wordTeacher: wordTeacherAgent,
  },
  
  // 环境感知的服务器配置
  server: serverConfig,
  
  // 标准存储配置 - 使用内存存储用于开发，生产环境可改为文件存储
  storage: new LibSQLStore({
    url: ":memory:",
  }),
  
  // 标准日志配置
  logger: new PinoLogger({
    name: 'WordTeacher',
    level: 'info',
  }),
});

