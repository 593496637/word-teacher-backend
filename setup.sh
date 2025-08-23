#!/bin/bash

# 🚀 Word Teacher Backend 快速部署设置脚本
# Quick Setup Script for Word Teacher Backend Deployment

set -e  # 遇到错误立即退出

echo "🚀 欢迎使用 Word Teacher Backend 快速部署设置！"
echo "📋 这个脚本将帮你完成 Cloudflare Workers 部署的准备工作"
echo ""

# 检查必要的工具
echo "🔧 检查必要工具..."

# 检查 Node.js
if ! command -v node &> /dev/null; then
    echo "❌ Node.js 未安装. 请先安装 Node.js 20.x"
    echo "📥 下载地址: https://nodejs.org/"
    exit 1
fi

NODE_VERSION=$(node --version)
echo "✅ Node.js 版本: $NODE_VERSION"

# 检查 npm
if ! command -v npm &> /dev/null; then
    echo "❌ npm 未安装"
    exit 1
fi

NPM_VERSION=$(npm --version)
echo "✅ npm 版本: $NPM_VERSION"

# 检查 git
if ! command -v git &> /dev/null; then
    echo "❌ Git 未安装"
    exit 1
fi

echo "✅ Git 已安装"
echo ""

# 安装依赖
echo "📦 安装项目依赖..."
npm install

echo ""
echo "⚙️  环境配置向导"
echo "=================="

# 检查 .env 文件
if [ ! -f ".env" ]; then
    echo "📝 创建环境变量文件..."
    cp .env.example .env
    echo "✅ 已创建 .env 文件"
else
    echo "📄 .env 文件已存在"
fi

echo ""
echo "🔑 API Key 配置指南："
echo ""
echo "1. OpenAI API Key (必需):"
echo "   - 访问: https://platform.openai.com/api-keys"
echo "   - 创建新的 API Key"
echo "   - 复制并粘贴到 .env 文件中的 OPENAI_API_KEY="
echo ""

echo "2. Cloudflare 凭证 (用于部署):"
echo "   a) Account ID:"
echo "      - 登录: https://dash.cloudflare.com"
echo "      - 在右侧边栏找到并复制 Account ID"
echo ""
echo "   b) API Token:"
echo "      - 访问: https://dash.cloudflare.com/profile/api-tokens"
echo "      - 点击 'Create Token'"
echo "      - 选择 'Cloudflare Workers:Edit' 模板"
echo "      - 或创建自定义 token，权限包括:"
echo "        * Account:Cloudflare Workers:Edit"
echo "        * Zone:Zone:Read (如果需要自定义域名)"
echo ""

echo "3. GitHub Secrets 配置:"
echo "   - 访问: https://github.com/593496637/word-teacher-backend/settings/secrets/actions"
echo "   - 添加以下 secrets:"
echo "     * CLOUDFLARE_API_TOKEN=你的_api_token"
echo "     * CLOUDFLARE_ACCOUNT_ID=你的_account_id"
echo "     * OPENAI_API_KEY=你的_openai_key"
echo ""

# 交互式配置
read -p "🤔 是否要现在配置 OpenAI API Key? (y/n): " configure_openai

if [[ $configure_openai =~ ^[Yy]$ ]]; then
    read -p "🔑 请输入你的 OpenAI API Key: " openai_key
    if [ ! -z "$openai_key" ]; then
        # 更新 .env 文件
        if grep -q "OPENAI_API_KEY=" .env; then
            sed -i.bak "s/OPENAI_API_KEY=.*/OPENAI_API_KEY=$openai_key/" .env
        else
            echo "OPENAI_API_KEY=$openai_key" >> .env
        fi
        echo "✅ OpenAI API Key 已配置"
    fi
fi

echo ""
echo "🧪 测试配置..."

# 检查 TypeScript 编译
echo "🔧 TypeScript 类型检查..."
if npm run build > /dev/null 2>&1; then
    echo "✅ 构建成功！"
else
    echo "❌ 构建失败，请检查代码"
    echo "💡 运行 'npm run build' 查看详细错误信息"
fi

echo ""
echo "🎯 下一步操作："
echo "================"
echo ""
echo "1. 本地开发:"
echo "   npm run dev"
echo ""
echo "2. 手动部署 (如果已配置 Cloudflare 凭证):"
echo "   npm run deploy"
echo ""
echo "3. GitHub Actions 自动部署:"
echo "   - 配置 GitHub Secrets (见上面的指南)"
echo "   - 推送代码: git push origin main"
echo "   - 或手动触发: https://github.com/593496637/word-teacher-backend/actions"
echo ""
echo "4. 查看部署状态:"
echo "   - GitHub Actions: https://github.com/593496637/word-teacher-backend/actions"
echo "   - Cloudflare Dashboard: https://dash.cloudflare.com"
echo ""

echo "📚 更多帮助:"
echo "============"
echo "- 完整文档: README.md"
echo "- 部署指南: DEPLOYMENT.md"
echo "- 如遇问题，查看 GitHub Issues"
echo ""

echo "🎉 设置完成！祝你部署顺利！"