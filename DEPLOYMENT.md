# 🚀 手动部署指南 | Manual Deployment Guide

本文档详细说明如何手动部署 Word Teacher Backend 到 Cloudflare Workers。

## 📋 部署前准备

### 1. 获取必要的 API 凭证

#### Cloudflare 凭证：
1. **Account ID**: 
   - 登录 [Cloudflare Dashboard](https://dash.cloudflare.com)
   - 在右侧边栏复制 "Account ID"

2. **API Token**:
   - 访问 [API Tokens 页面](https://dash.cloudflare.com/profile/api-tokens)
   - 点击 "Create Token"
   - 选择 "Cloudflare Workers:Edit" 模板
   - 或创建自定义 token，权限：
     - Account:Cloudflare Workers:Edit ✅
     - Zone:Zone:Read ✅ (如果需要自定义域名)

#### OpenAI API Key：
- 访问 [OpenAI API Keys](https://platform.openai.com/api-keys)
- 创建新的 API Key

### 2. 配置 GitHub Secrets

在仓库中设置以下 secrets：

1. 进入: `https://github.com/593496637/word-teacher-backend/settings/secrets/actions`
2. 点击 "New repository secret" 分别添加：

```
CLOUDFLARE_API_TOKEN=你的_cloudflare_api_token
CLOUDFLARE_ACCOUNT_ID=你的_cloudflare_account_id  
OPENAI_API_KEY=你的_openai_api_key
```

## 🎯 方法一：GitHub Actions 手动触发部署

### 通过 GitHub Web 界面：

1. **进入 Actions 页面**:
   - 访问: `https://github.com/593496637/word-teacher-backend/actions`

2. **选择工作流**:
   - 点击 "🚀 Deploy Mastra Backend to Cloudflare Workers"

3. **手动运行**:
   - 点击 "Run workflow" 按钮
   - 选择部署环境 (production/staging)
   - 可选择 "Force deployment" 强制部署
   - 点击绿色的 "Run workflow" 按钮

4. **监控部署过程**:
   - 刷新页面查看新的 workflow run
   - 点击进入查看详细日志

### 通过 GitHub CLI：

```bash
# 安装 GitHub CLI (如果还没有)
# macOS: brew install gh
# Windows: winget install GitHub.cli
# Linux: 查看 https://cli.github.com/

# 登录
gh auth login

# 手动触发部署
gh workflow run "deploy.yml" --repo 593496637/word-teacher-backend

# 查看部署状态
gh run list --repo 593496637/word-teacher-backend
```

## 🛠️ 方法二：本地构建和部署

### 前置要求：
- Node.js 20.x
- npm 或 yarn
- Git

### 步骤：

1. **克隆仓库**:
```bash
git clone https://github.com/593496637/word-teacher-backend.git
cd word-teacher-backend
```

2. **安装依赖**:
```bash
npm install
```

3. **配置环境变量**:
```bash
# 复制环境变量模板
cp .env.example .env

# 编辑 .env 文件
nano .env  # 或使用你喜欢的编辑器
```

在 `.env` 中填入：
```env
OPENAI_API_KEY=你的_openai_api_key
```

4. **构建项目**:
```bash
npm run build
```

5. **使用 Mastra 部署**:
```bash
# 设置 Cloudflare 环境变量
export CLOUDFLARE_API_TOKEN="你的_cloudflare_api_token"
export CLOUDFLARE_ACCOUNT_ID="你的_cloudflare_account_id"

# 部署
npm run deploy
```

### 备用方案：使用 Wrangler 直接部署

如果 Mastra 部署失败，可以使用 Wrangler：

```bash
# 安装 Wrangler
npm install -g wrangler

# 登录 Cloudflare
wrangler login
# 或使用 API Token
export CLOUDFLARE_API_TOKEN="你的_cloudflare_api_token"

# 部署 (确保先运行了 npm run build)
wrangler deploy .mastra/output/index.mjs --name word-teacher-backend

# 设置环境变量
wrangler secret put OPENAI_API_KEY
```

## 🔧 部署后配置

### 设置 Worker 环境变量：

1. **通过 Cloudflare Dashboard**:
   - 登录 [Cloudflare Dashboard](https://dash.cloudflare.com)
   - 进入 "Workers & Pages"
   - 选择 "word-teacher-backend"
   - 进入 "Settings" → "Variables"
   - 添加环境变量: `OPENAI_API_KEY`

2. **通过 Wrangler CLI**:
```bash
wrangler secret put OPENAI_API_KEY --name word-teacher-backend
```

## ✅ 验证部署

### 测试 API 端点：

```bash
# 检查 Worker 状态
curl https://word-teacher-backend.你的账户名.workers.dev

# 测试 API 端点 (POST 请求)
curl -X POST https://word-teacher-backend.你的账户名.workers.dev/api/agents/wordTeacher \
  -H "Content-Type: application/json" \
  -d '{"message": "teach me the word hello"}'
```

### 查看日志：

```bash
# 实时查看 Worker 日志
wrangler tail --name word-teacher-backend

# 查看格式化日志
wrangler tail --name word-teacher-backend --format=pretty
```

## 🚨 故障排除

### 常见问题：

1. **"Invalid API token"**
   - 检查 API Token 权限
   - 确认 Token 未过期
   - 验证 Account ID 正确

2. **"Build failed"**
   - 检查 Node.js 版本 (推荐 20.x)
   - 清理依赖: `rm -rf node_modules package-lock.json && npm install`
   - 检查源代码语法错误

3. **"OpenAI API error"**
   - 验证 API Key 有效性
   - 检查 API 配额
   - 确认环境变量正确设置

4. **"Worker not found"**
   - 确认部署成功完成
   - 检查 Worker 名称拼写
   - 验证 Account ID 正确

### 获取帮助：

- 查看 [Cloudflare Workers 文档](https://developers.cloudflare.com/workers/)
- 查看 [Mastra 文档](https://mastra.ai/docs)
- 检查 GitHub Actions 日志
- 使用 `wrangler tail` 查看实时日志

## 📊 监控和管理

### Cloudflare Dashboard 功能：
- **Analytics**: 查看请求统计和性能指标
- **Real-time logs**: 实时监控 Worker 执行
- **Cron Triggers**: 设置定时任务
- **Custom Domains**: 配置自定义域名

### 更新部署：
```bash
# 推送代码自动触发部署
git add .
git commit -m "✨ Update backend logic"
git push origin main

# 或手动重新部署
npm run deploy
```

---

🎉 **部署完成！你的 Word Teacher Backend 现在运行在 Cloudflare Workers 上！**