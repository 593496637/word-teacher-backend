import { CloudflareDeployer } from '@mastra/deployer-cloudflare';

export const deployer = new CloudflareDeployer({
  // 项目名称（将成为 Workers 的名称）
  projectName: 'word-teacher-backend',
  
  // 环境变量配置
  env: {
    // OpenAI API Key 从 Cloudflare Workers 环境变量中获取
    OPENAI_API_KEY: process.env.OPENAI_API_KEY,
  },
  
  // 自定义域名配置 - lkkblog7.top
  routes: [
    // 配置 API 路由到自定义域名
    { 
      pattern: 'lkkblog7.top/api/*', 
      zone_name: 'lkkblog7.top',
      custom_domain: true 
    }
  ]
});
