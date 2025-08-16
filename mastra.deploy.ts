import { createCloudflareDeployer } from '@mastra/deployer-cloudflare';

export const deployer = createCloudflareDeployer({
  // 项目名称（将成为 Workers 的名称）
  name: 'word-teacher-backend',
  
  // 环境变量配置
  env: {
    // OpenAI API Key 从 Cloudflare Workers 环境变量中获取
    OPENAI_API_KEY: process.env.OPENAI_API_KEY,
  },
  
  // Workers 配置
  workers: {
    // 兼容模式
    compatibility_date: '2024-01-01',
    
    // Node.js 兼容性
    node_compat: true,
    
    // 内存限制
    limits: {
      cpu_ms: 10000,
      memory_mb: 128
    }
  },
  
  // 自定义域名（可选）
  routes: [
    // 如果你有自定义域名，可以在这里配置
    // { pattern: 'api.your-domain.com/*', zone_name: 'your-domain.com' }
  ]
});
