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

然后编辑 `.env` 文件，添加你的 API Keys：

```env
OPENAI_API_KEY=your_openai_api_key_here
```

### 4. 启动开发服务器

```bash
npm run dev
```

服务器将启动在 `http://localhost:4111`

## 📋 功能特性

- ✅ **每日单词教学 Agent** - 基于 OpenAI GPT-4 的智能单词老师
- ✅ **外部词典数据源** - 集成 Free Dictionary API 获取权威单词数据
- ✅ **多种教学风格** - 支持幽默、严肃、生动等不同教学风格
- ✅ **RESTful API** - 完整的 HTTP API 接口，支持前端调用
- ✅ **类型安全** - 完整的 TypeScript 类型定义
- ✅ **可扩展架构** - 支持后续添加更多 MCP 服务

## 🏗️ 技术架构

```
前端请求 → Mastra HTTP API → Word Teacher Agent → 外部词典API → OpenAI润色 → 返回教学内容
```

### 技术栈

- **框架**: Mastra (TypeScript AI Framework)
- **AI模型**: OpenAI GPT-4
- **词典数据**: Free Dictionary API (免费)
- **类型系统**: TypeScript + Zod
- **部署**: 支持 Cloudflare Workers

## 📡 API 接口

### POST /api/agents/wordTeacher/generate

生成单词教学内容

**请求体:**
```json
{
  "word": "serendipity",
  "style": "humorous"
}
```

**响应:**
```json
{
  "text": "生成的教学内容...",
  "wordData": {
    "word": "serendipity",
    "phonetic": "/ˌserənˈdɪpɪti/",
    "meanings": [...]
  }
}
```

### 支持的教学风格

- `humorous` - 幽默风趣
- `serious` - 严肃认真  
- `vivid` - 生动形象
- `simple` - 简单易懂
- `detailed` - 详细深入

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

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

## 📄 许可证

MIT License
