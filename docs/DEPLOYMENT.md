# 🚀 Cloudflare Workers 部署指南

本文档详细介绍如何将每日单词老师后端（Mastra）部署到 Cloudflare Workers。

## 📋 部署前准备

### ✅ 已完成的配置

- [x] 添加了 Cloudflare Workers 部署依赖
- [x] 创建了 GitHub Actions 工作流
- [x] 配置了 Wrangler 部署文件
- [x] 更新了 Mastra 配置支持 Workers 环境

### 🔧 需要手动配置的步骤

1. **获取 OpenAI API Key**
2. **配置 GitHub Secrets**
3. **配置 Cloudflare Workers 环境变量**
4. **触发部署**

---

## 🔑 第一步：获取 OpenAI API Key

1. 前往 [OpenAI API Keys](https://platform.openai.com/api-keys)
2. 点击 **"Create new secret key"**
3. 给 Key 起个名字（如：`word-teacher-backend`）
4. **复制并保存这个 API Key**（只显示一次）

---

## 🔧 第二步：配置 GitHub Secrets

前往 GitHub 仓库设置添加以下 Secrets：

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

## 🌐 第三步：配置 Cloudflare Workers 环境变量

### 3.1 通过 Wrangler CLI（推荐）

如果你本地有 Wrangler，可以直接设置：

```bash
# 安装 Wrangler（如果还没安装）
npm install -g wrangler

# 登录 Cloudflare
wrangler auth login

# 设置环境变量
wrangler secret put OPENAI_API_KEY --name word-teacher-backend
```

### 3.2 通过 Cloudflare Dashboard

1. 前往 [Cloudflare Workers Dashboard](https://dash.cloudflare.com/workers)
2. 等部署完成后，找到 `word-teacher-backend` Worker
3. 点击 **"Settings"** → **"Environment variables"**
4. 添加环境变量：
   - **Name**: `OPENAI_API_KEY`
   - **Value**: `你的OpenAI API Key`
   - **Type**: `Secret`

---

## 🚀 第四步：触发部署

### 4.1 自动部署

推送代码到 main 分支会自动触发部署：

```bash
git push origin main
```

### 4.2 手动触发

在 GitHub Actions 页面手动触发工作流。

---

## 📊 第五步：验证部署

### 5.1 检查部署状态

1. 在 GitHub **Actions** 页面查看部署日志
2. 在 Cloudflare Workers Dashboard 查看 Worker 状态

### 5.2 测试 API 端点

部署成功后，你的 API 将在以下地址可用：

```
https://word-teacher-backend.your-subdomain.workers.dev
```

测试健康检查：
```bash
curl https://word-teacher-backend.your-subdomain.workers.dev/api/agents/wordTeacher/generate \
  -X POST \
  -H "Content-Type: application/json" \
  -d '{
    "messages": [
      {
        "role": "user", 
        "content": "测试连接"
      }
    ]
  }'
```

---

## 🌐 第六步：配置自定义域名（可选）

### 6.1 在 Cloudflare Workers 中添加自定义域名

1. 在 Worker 设置中点击 **"Custom domains"**
2. 点击 **"Add custom domain"**
3. 输入域名（如：`api.your-domain.com`）
4. Cloudflare 会自动配置 DNS

### 6.2 更新 Wrangler 配置

如果使用自定义域名，更新 `wrangler.toml`：

```toml
[[routes]]
pattern = "api.your-domain.com/*"
zone_name = "your-domain.com"
```

---

## 🔧 常见问题排查

### 构建失败

**问题**: 依赖安装失败
**解决**: 确保 `package.json` 中包含所有必要依赖

**问题**: TypeScript 编译错误
**解决**: 运行 `npx tsc --noEmit` 本地检查类型错误

### 部署失败

**问题**: Cloudflare API Token 无效
**解决**: 重新生成 API Token 并更新 GitHub Secrets

**问题**: 环境变量未设置
**解决**: 确保在 Cloudflare Workers 中设置了 `OPENAI_API_KEY`

### 运行时错误

**问题**: CORS 错误
**解决**: 检查 Mastra 配置中的 CORS 设置

**问题**: OpenAI API 调用失败
**解决**: 验证 API Key 是否正确设置且有效

---

## 📈 性能监控

### Cloudflare Analytics

在 Cloudflare Workers Dashboard 中可以查看：
- 请求数量和响应时间
- 错误率统计
- CPU 使用情况
- 内存使用情况

### 日志查看

```bash
# 查看实时日志
wrangler tail word-teacher-backend

# 查看特定时间段的日志
wrangler tail word-teacher-backend --since 1h
```

---

## 🎯 下一步

部署成功后，记录你的后端域名：

```
https://word-teacher-backend.your-subdomain.workers.dev
```

或者自定义域名：

```
https://api.your-domain.com
```

我们将在下一步中使用这个地址来更新前端的 API 配置。

---

*最后更新: 2025-08-16*
