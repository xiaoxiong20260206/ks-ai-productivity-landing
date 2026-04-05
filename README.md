# 快手 AI 生产力 Landing Page

快手 AI 生产力战役官方品牌门户 Demo，作为给王一寒的产品输入。

## 包含内容

- **战役介绍**：背景、目标、五阶段演进、11个子项目周进展、先锋队成果、里程碑时间轴
- **快手AI员工**：MyFlicker 产品介绍、效率数据、核心能力、版本路线
- **AI Skill 市场**：完整 4层×6通道 矩阵地图（复用公司 Skill 全景图设计）、角色筛选器
- **AI 知识库**：Coming Soon 预留页

## 本地预览

```bash
cd landing
python3 -m http.server 8099
# 访问 http://localhost:8099
```

## 文件结构

```
landing/
├── index.html      # 主 HTML 骨架
├── styles.css      # 完整 CSS（变量体系+所有组件）
├── app.js          # Tab 切换 + 倒计时 + Modal
├── skill-data.js   # Skill 市场完整数据
├── skill-content.js # Skill Tab 动态渲染
└── favicon.svg     # 图标
```

## 在线访问

https://shenlang.github.io/ks-ai-productivity-landing/landing/
