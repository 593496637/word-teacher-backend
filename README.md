# 每日单词老师 Mastra 后端服务

> Daily Word Teacher Mastra Backend Service

基于 Mastra + OpenAI + 外部词典 API 构建的每日单词教学 Agent 服务。

## 🚀 快速开始

### 1. 克隆项目

```bash
git clone https://github.com/593496637/word-teacher-backend.git
cd word-teacher-backend
```

### 2. 安装依赖

```bash
npm install
# 或者
pnpm install
# 或者
yarn install
```

### 3. 配置环境变量

```bash
cp .env.example .env
```

然后编辑 `.env` 文件，添加你的 OpenAI API Key：

```env
# OpenAI API Key - 必需（你的key已经准备好了）
OPENAI_API_KEY=你的openai_api_key_在这里

# 词典 API（可选 - 默认使用免费 API，无需注册）
# DICTIONARY_API_KEY=不需要注册

# 服务器配置
PORT=4111
HOST=localhost
NODE_ENV=development
```

### 4. 启动开发服务器

```bash
npm run dev
```

服务器将启动在 `http://localhost:4111`

## 📋 功能特性

- ✅ **每日单词教学 Agent** - 基于 OpenAI GPT-4o 的智能单词老师
- ✅ **外部词典数据源** - 集成 Free Dictionary API 获取权威单词数据（**完全免费，无需注册**）
- ✅ **多种教学风格** - 支持幽默、严肃、生动、简单、详细五种风格
- ✅ **RESTful API** - 完整的 HTTP API 接口，支持前端调用
- ✅ **类型安全** - 完整的 TypeScript 类型定义
- ✅ **可扩展架构** - 支持后续添加更多 MCP 服务

## 🏗️ 技术架构

```
前端请求 → Mastra HTTP API → Word Teacher Agent → Free Dictionary API → OpenAI润色 → 返回教学内容
```

### 技术栈

- **框架**: Mastra (TypeScript AI Framework)
- **AI模型**: OpenAI GPT-4o
- **词典数据**: Free Dictionary API (完全免费，无需注册)
- **类型系统**: TypeScript + Zod
- **部署**: 支持 Cloudflare Workers

## 📡 API 接口说明

### 基础信息

- **服务地址**: `http://localhost:4111`
- **API 文档**: `http://localhost:4111/api` (Mastra 自动生成)
- **健康检查**: `GET http://localhost:4111/health`

### 主要接口

#### 生成单词教学内容

```http
POST http://localhost:4111/api/agents/wordTeacher/generate
Content-Type: application/json

{
  "messages": [
    {
      "role": "user", 
      "content": "请用幽默的方式教我单词 serendipity"
    }
  ]
}
```

**响应示例:**
```json
{
  "text": "生成的教学内容...",
  "usage": {
    "totalTokens": 150,
    "promptTokens": 50,
    "completionTokens": 100
  }
}
```

### 支持的教学风格

- `humorous` - 幽默风趣
- `serious` - 严肃认真  
- `vivid` - 生动形象
- `simple` - 简单易懂
- `detailed` - 详细深入

## 🔧 关于词典 API 说明

### ✅ 无需注册！使用免费 Free Dictionary API

本项目使用的是 **Free Dictionary API**，具有以下优势：

- **✅ 完全免费** - 无需注册账号
- **✅ 无需 API Key** - 直接调用即可
- **✅ 无请求限制** - 适合开发和学习
- **✅ 数据权威** - 基于开源词典数据
- **✅ 支持丰富** - 包含定义、音标、例句、同义词等

**API 地址**: `https://api.dictionaryapi.dev/api/v2/entries/en/{word}`

**示例调用**:
```bash
curl https://api.dictionaryapi.dev/api/v2/entries/en/serendipity
```

### 📚 其他词典 API 选项（可选升级）

如果你想使用更高级的词典 API，可以考虑：

#### 1. Merriam-Webster API（推荐）
- **注册地址**: https://dictionaryapi.com/
- **免费额度**: 1000次/天
- **注册流程**:
  1. 访问 https://dictionaryapi.com/
  2. 点击 "Register for API Key"
  3. 填写基本信息（姓名、邮箱、用途等）
  4. 选择 "Collegiate Dictionary" 
  5. 获取 API Key 后添加到 `.env` 文件

#### 2. Oxford Dictionary API
- **注册地址**: https://developer.oxforddictionaries.com/
- **免费额度**: 3000次/月
- **数据质量**: 最权威的英语词典

#### 3. Collins Dictionary API
- **注册地址**: https://www.collinsdictionary.com/api
- **免费额度**: 有限制
- **特色**: 支持多种语言

**但是！** 对于我们的项目，**Free Dictionary API 完全够用**，数据质量很好，无需额外注册。

## 🔧 开发指南

### 项目结构

```
src/
├── mastra/
│   ├── agents/
│   │   └── word-teacher-agent.ts    # 单词老师 Agent
│   ├── tools/
│   │   └── dictionary-tool.ts       # 词典查询工具
│   └── index.ts                     # Mastra 入口
└── types/
    └── dictionary.ts                # 类型定义
```

### 添加新的教学风格

在 `src/mastra/agents/word-teacher-agent.ts` 中修改 `TEACHING_STYLES` 对象。

### 添加新的词典数据源

在 `src/mastra/tools/` 目录下创建新的工具文件。

## 🚀 部署

### 本地开发

```bash
npm run dev  # 启动开发服务器
```

### Cloudflare Workers

```bash
npm run build
# 部署到 Cloudflare Workers
```

### Docker

```bash
docker build -t word-teacher-backend .
docker run -p 4111:4111 word-teacher-backend
```

## 🔗 与前端集成

这个后端服务可以完美配合你的前端项目：
- **前端仓库**: https://github.com/593496637/word-teacher-frontend.git
- **后端仓库**: https://github.com/593496637/word-teacher-backend.git

### 前端调用示例

```javascript
const response = await fetch('http://localhost:4111/api/agents/wordTeacher/generate', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    messages: [{
      role: 'user',
      content: '请用生动的方式教我单词 serendipity'
    }]
  })
});

const result = await response.json();
console.log(result.text); // 教学内容
```

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

## 📄 许可证

MIT License
