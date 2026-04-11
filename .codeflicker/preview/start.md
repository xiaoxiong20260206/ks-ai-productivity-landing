# 快手 AI 生产力 OnePage 启动指南

## 项目概述
该仓库当前用于 AI 生产力战役 OnePage 展示，核心预览目标为 `landing` 静态站点。
本次任务是验证 AgentOS 图示优化效果，建议本地启动后直接在页面中检查对应模块视觉表现与文案。

## landing - OnePage 静态站点

### 快速启动

```bash
cd landing
python3 -m http.server 8099
```

**启动后访问**：http://localhost:8099

```yaml
subProjectPath: landing
command: python3 -m http.server 8099
cwd: landing
port: 8099
previewUrl: http://localhost:8099
description: AI 生产力战役 OnePage 静态预览站点（用于验证 AgentOS 图示优化效果）
```

## 验证建议
启动后进入页面中 AgentOS 相关展示区，重点核对：
- 图示结构层级是否清晰（底座能力与上层业务关系）
- MyFlicker / CodeFlicker 与 AgentOS 的关系表达是否符合预期
- 样式在当前视口下是否有错位、重叠或对比度不足
