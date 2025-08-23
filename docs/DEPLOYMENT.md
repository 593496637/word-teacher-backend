# 🚀 官方 Mastra Cloudflare Workers 部署指南

本文档介绍如何使用**官方 Mastra CLI** 将每日单词老师后端部署到 Cloudflare Workers。

## 📋 部署方法

我们使用 **Mastra 官方推荐的部署方法**：
- **`@mastra/deployer-cloudflare`** - 官方 Cloudflare Workers 部署器
- **`mastra deploy`** - 官方 Mastra CLI 部署命令

## ✅ 已完成的配置

- [x] 添加了官方 `@mastra/deployer-cloudflare` 依赖
- [x] 在 Mastra 实例中配置了 `CloudflareDeployer`
- [x] 创建了使用 `mastra deploy` 的 GitHub Actions 工作流
- [x] 配置了 CORS 和服务器设置

---

## 🔑 第一步：获取 OpenAI API Key

如果你还没有 OpenAI API Key：

1. 前往 [OpenAI API Keys](https://platform.openai.com/api-keys)
2. 点击 **"Create new secret key"**
3. 给 Key 起个名字（如：`word-teacher-backend`）
4. **复制并保存这个 API Key**（只显示一次）

---

## 🔧 第二步：配置 GitHub Secrets

前往 GitHub 后端仓库设置添加以下 Secrets：

### 2.1 前往仓库设置
1. 在 GitHub 后端仓库页面点击 **"Settings"**
2. 左侧边栏点击 **"Secrets and variables"** → **"Actions"**
3. 点击 **"New repository secret"**

### 2.2 添加必要的 Secrets

**OPENAI_API_KEY**
```
sk-your-openai-api-key-here
```

**CLOUDFLARE_API_TOKEN**
```
你在前端部署时获取的 API Token（可以复用）
```

**CLOUDFLARE_ACCOUNT_ID**
```
你在前端部署时获取的 Account ID（可以复用）
```

---

## 🚀 第三步：触发部署

### 3.1 自动部署

推送代码到 main 分支会自动触发部署：

```bash
git push origin main
```

### 3.2 手动触发

在 GitHub Actions 页面手动触发工作流。

---

## 📊 第四步：验证部署

### 4.1 检查部署状态

1. 在 GitHub **Actions** 页面查看部署日志
2. 查看构建过程：
   ```
   📦 Install dependencies
   🔧 Type check  
   🏗️ Build Mastra project (npx mastra build)
   🚀 Deploy using Mastra CLI (npx mastra deploy)
   ```

### 4.2 获取 Worker URL

部署成功后，在 GitHub Actions 日志中找到你的 Worker URL：

```
https://word-teacher-backend.your-subdomain.workers.dev
```

### 4.3 测试 API 端点

测试主要的 API 端点：

```bash
curl https://word-teacher-backend.your-subdomain.workers.dev/api/agents/wordTeacher/generate \
  -X POST \
  -H "Content-Type: application/json" \
  -d '{
    "messages": [
      {
        "role": "user", 
        "content": "请用幽默的方式教我单词 serendipity"
      }
    ]
  }'
```

---

## 🌐 第五步：配置自定义域名（可选）

### 5.1 在 Mastra 配置中添加自定义域名

更新 `src/mastra/index.ts` 中的 routes 配置：

```typescript
routes: [
  {
    pattern: "api.your-domain.com/*",
    zone_name: "your-domain.com",
    custom_domain: true
  }
]
```

### 5.2 重新部署

```bash
git add .
git commit -m "🌐 添加自定义域名配置"
git push origin main
```

---

## 🔧 常见问题排查

### 构建失败

**问题**: `mastra build` 失败
**解决**: 确保项目结构正确，`src/mastra/index.ts` 存在且导出了 `mastra` 实例

**问题**: TypeScript 编译错误
**解决**: 运行 `npx tsc --noEmit` 本地检查类型错误

### 部署失败

**问题**: `mastra deploy` 失败
**解决**: 确保环境变量 `CLOUDFLARE_API_TOKEN` 和 `CLOUDFLARE_ACCOUNT_ID` 设置正确

**问题**: 权限错误
**解决**: 确保 Cloudflare API Token 有足够的权限操作 Workers

### 运行时错误

**问题**: CORS 错误
**解决**: 检查 `src/mastra/index.ts` 中的 CORS 配置，确保包含你的前端域名

**问题**: OpenAI API 调用失败
**解决**: 验证 `OPENAI_API_KEY` 环境变量设置正确

---

## 📈 Mastra CLI 优势

使用官方 Mastra CLI 部署的优势：

✅ **官方支持** - 由 Mastra 团队维护的标准部署方法
✅ **自动配置** - 自动生成 Cloudflare Workers 配置
✅ **集成优化** - 针对 Mastra 应用优化的部署流程
✅ **版本兼容** - 与 Mastra 框架版本保持同步
✅ **简化配置** - 无需手动配置 wrangler.toml

---

## 🎯 下一步

部署成功后，记录你的后端域名：

**Worker URL**:
```
https://word-teacher-backend.your-subdomain.workers.dev
```

**API 端点**:
```
https://word-teacher-backend.your-subdomain.workers.dev/api/agents/wordTeacher/generate
```

我们将在下一步中使用这个地址来更新前端的 API 配置。

---

## 📞 获取帮助

如果遇到问题：

1. 查看 GitHub Actions 构建日志
2. 检查 [Mastra 官方文档](https://mastra.ai/en/docs/deployment/serverless-platforms/cloudflare-deployer)
3. 确认所有环境变量都已正确设置
4. 参考 [Mastra CLI 文档](https://mastra.ai/en/reference/cli/deploy)

---

*使用官方 Mastra CLI 部署方法 - 最后更新: 2025-08-16*
