# 周报卡片执行说明

## 隔离策略（Step 1 执行记录）

本次提交（2026-04-11）只包含周报卡片相关新增文件：
- `scripts/send_weekly_card.py`
- `templates/weekly_card_template.json`
- `logs/preview_send_log.jsonl`
- `docs/weekly-card-execution-notes.md`

工作区中存在以下 untracked 文件，属于其他线程产物，本次**不纳入提交**：
- `landing/star-009m-life.css`
- `landing/star-009m-life.html`
- `landing/star-009m-life.js`
- `myflicker-images/`
- `myflicker-partner-doc.md`

## todos.yml 适用性说明（Step 7 执行记录）

仓库根目录**不存在** `todos.yml` 文件。该文件是自动校验系统的期望产物，不属于本仓库
（ks-ai-productivity-landing）的实际约定。此问题**不适用于仓库文件修复**，无需创建对应文件。

任务进度跟踪通过 CodeFlicker 的 `write_todo` 工具在会话层面管理，与仓库文件无关。

## 发送指南

### 预览发送（发给 shenlang 私人确认）

```bash
cd /Users/shenlang/Documents/Codeflicker/AI-Productivity
python3 scripts/send_weekly_card.py --preview
# 或直接运行（默认即 preview）
python3 scripts/send_weekly_card.py
```

### 群发（确认后推送两个群）

```bash
python3 scripts/send_weekly_card.py --send
```

目标群：
- 【AI生产力】项目大群（groupId: 6783643915686960）
- 【AI生产力】指挥部（groupId: 6723053031035975）

### Dry Run（只打印卡片，不发送）

```bash
python3 scripts/send_weekly_card.py --dry-run
```

## 日志格式

日志文件：`logs/preview_send_log.jsonl`（每行一条 JSON）

字段说明：

| 字段 | 说明 |
|---|---|
| `timestamp` | Asia/Shanghai (UTC+8) ISO 时间 |
| `mode` | `preview` 或 `send` |
| `target` | 发送目标（username 或 groupName） |
| `code` | KIM API 返回码，0 = 成功 |
| `messageKey` | KIM 消息唯一标识 |
| `status` | `success` 或 `failed` |
| `raw` | API 完整返回体 |

## 卡片版本变更记录

| 版本 | 日期 | 变更内容 |
|---|---|---|
| v1.0.0 | 2026-03-30 | 初始版本 |
| v2.0.0 | 2026-04-11 | 完全重构：删除冗余"权威口径"行；整体状态收敛到「📊 整体态势」；标题含时间范围；AI普惠改无序列表；OnePage改底部按钮；解读章节改为「本周战役解读」；里程碑更新为 4.12 内测 / 4.20 正式发布 |
