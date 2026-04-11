#!/usr/bin/env python3
"""
快手AI生产力战役 - 周报 MixCard 发送脚本 v2.0.0
技能: sl-ai-productivity v2.1.0

变更说明:
  v2.0.0 (2026-04-11) - 卡片完全重构：
    - 标题含周期，无冗余"权威口径"行
    - 绿灯状态统一收敛到"📊 整体态势"
    - AI普惠改无序列表
    - OnePage入口改为卡片底部按钮
    - 解读章节改为"本周战役解读"

用法:
  python3 send_weekly_card.py            # 默认: 私发 shenlang 预览
  python3 send_weekly_card.py --preview  # 私发 shenlang 预览
  python3 send_weekly_card.py --send     # 推送到2个目标群
  python3 send_weekly_card.py --dry-run  # 只打印卡片内容，不发送
"""
import asyncio
import json
import sys
import os
from datetime import datetime, timezone, timedelta
from pathlib import Path

import httpx

# ============================================================
# MyFlicker 凭证（群机器人已接入目标群）
# ============================================================
MF_APP_KEY    = "d6024d1f-e99c-44d7-906f-0c63b558a573"
MF_SECRET_KEY = "openApp0f2131b2400470b75077b8819"
GATEWAY_URL   = "https://is-gateway.corp.kuaishou.com"

PREVIEW_USERNAME = "shenlang"

TARGET_GROUPS = [
    {"groupId": "6783643915686960", "groupName": "【AI生产力】项目大群"},   # 111人
    {"groupId": "6723053031035975", "groupName": "【AI生产力】指挥部"},     # 3人
]

# 日志路径（相对于本脚本位置的仓库根目录）
LOG_FILE = Path(__file__).resolve().parent.parent / "logs" / "preview_send_log.jsonl"

# OnePage 链接（权威案例入口）
ONEPAGE_URL = "https://docs.corp.kuaishou.com/k/home/VIk71GqLpA8M/fcABzhPO1WwkNAClTVc5DIhEO"

# ============================================================
# Token 获取
# ============================================================
async def get_mf_token() -> str:
    async with httpx.AsyncClient(timeout=30.0) as client:
        resp = await client.post(
            f"{GATEWAY_URL}/token/get",
            headers={"Content-Type": "application/json"},
            json={"appKey": MF_APP_KEY, "secretKey": MF_SECRET_KEY, "grantType": "client_credentials"}
        )
        result = resp.json()
        if result.get("code") == 0:
            return result["result"]["accessToken"]
        raise Exception(f"Token获取失败: {result}")


# ============================================================
# 卡片构建（v2.0.0 — 视觉重构版）
# ============================================================
def build_weekly_card() -> dict:
    """
    构建周报 MixCard v2.0.0。
    设计原则:
      - 标题行直接含时间范围，不再有独立"日期行"
      - 无冗余"权威口径/预览稿"行
      - 所有整体状态收敛到「📊 整体态势」区块
      - AI普惠与其他模块格式一致（无序列表）
      - OnePage 入口为卡片底部 action button
      - 解读章节名称: 本周战役解读
    """
    return {
        "config": {"forward": True, "forwardType": 2, "wideSelfAdaptive": True},
        "appKey": MF_APP_KEY,
        "updateMulti": 1,
        "blocks": [

            # ── 标题（含时间范围） ──────────────────────────────
            {
                "blockId": "title",
                "type": "content",
                "text": {"type": "kimMd", "content": "# 🚀 快手AI生产力战役 · 周报（4.6 - 4.10）"}
            },
            {"blockId": "d0", "type": "divider"},

            # ── 整体态势（整体状态集中在此） ───────────────────
            {
                "blockId": "overview",
                "type": "content",
                "text": {
                    "type": "kimMd",
                    "content": (
                        "**📊 整体态势**\n"
                        "本周战役整体保持绿灯推进，重心已从单点能力交付，"
                        "切换到「两类形态启动内测 → 版本合一正式发布 → AI普惠活动落地」的连续节奏。"
                    )
                }
            },
            {"blockId": "d1", "type": "divider"},

            # ── 业务推广 ──────────────────────────────────────
            {
                "blockId": "biz_title",
                "type": "content",
                "text": {"type": "kimMd", "content": "**🏢 业务推广**"}
            },
            {
                "blockId": "biz_content",
                "type": "content",
                "text": {
                    "type": "kimMd",
                    "content": (
                        "**AI转型**\n"
                        "- 技术通道完成4象限模型，Q2目标从30支先锋队扩展到50+，并沉淀Top5标杆实践\n"
                        "- 非技术通道启动产品讨论与AIBP方案设计\n"
                        "- 职能通道明确HR/行政/财务等Skill接入路径\n"
                        "- 涌现通道已招募100+布道师，5月启动Skill大赛\n\n"
                        "**AI普惠**\n"
                        "- 行政领域首期活动需求澄清完成，人员分工与排期已确认\n"
                        "- 4.20落地第一期全员体验活动：行政AI化"
                    )
                }
            },
            {"blockId": "d2", "type": "divider"},

            # ── 产品建设 ──────────────────────────────────────
            {
                "blockId": "prod_title",
                "type": "content",
                "text": {"type": "kimMd", "content": "**📱 产品建设（MyFlicker + AgentOS）**"}
            },
            {
                "blockId": "prod_content",
                "type": "content",
                "text": {
                    "type": "kimMd",
                    "content": (
                        "- 0403内测版正常交付，整体进度符合预期\n"
                        "- 0412节点：CodeFlicker V1.1 + MyFlicker V0.1 两个形态同步启动内测\n"
                        "- 0420节点：版本合一，正式发布 MyFlicker 1.0"
                        "（全形态：客户端/云/KIM；全场景：Code + Work）\n"
                        "- 4月内统一合并为服务全员的 MyFlicker 单一版本（端+云）"
                    )
                }
            },
            {"blockId": "d3", "type": "divider"},

            # ── 技术专项（双列） ─────────────────────────────
            {
                "blockId": "tech_title",
                "type": "content",
                "text": {"type": "kimMd", "content": "**⚙️ 技术专项**"}
            },
            {
                "blockId": "tech_fields1",
                "type": "section",
                "fields": [
                    {"text": {"type": "kimMd", "content": (
                        "**技能生态**\n"
                        "- 基础能力建设拉齐60%，可用性评测完成70%\n"
                        "- SSO标准基建完成，开发规范发布\n"
                        "- 0412预计20+精品Skill、40+通用Skill"
                    )}},
                    {"text": {"type": "kimMd", "content": (
                        "**模型服务**\n"
                        "- Auto分类器一版完成，整体开发进度60%\n"
                        "- Claude/Kimi Auto provider 在建"
                    )}}
                ]
            },
            {
                "blockId": "tech_fields2",
                "type": "section",
                "fields": [
                    {"text": {"type": "kimMd", "content": (
                        "**自进化**\n"
                        "- 10个核心Skill建设完成\n"
                        "- 记忆进化、定时复盘、知识库、引导Skill均已交付"
                    )}},
                    {"text": {"type": "kimMd", "content": (
                        "**高可用**\n"
                        "- 推进0412机器资源筹备\n"
                        "- KFS独立集群方案推进\n"
                        "- 用户目录规则统一完成"
                    )}}
                ]
            },
            {
                "blockId": "tech_fields3",
                "type": "section",
                "fields": [
                    {"text": {"type": "kimMd", "content": (
                        "**安全建设**\n"
                        "- 审计日志建设完成，泄露风险已加固\n"
                        "- AP认证方案0403上线\n"
                        "- 目录隔离/非root权限完成"
                    )}},
                    {"text": {"type": "kimMd", "content": (
                        "**项目经营**\n"
                        "- 已输出AI经营分析框架\n"
                        "- Token额度对标进展持续跟进中"
                    )}}
                ]
            },
            {"blockId": "d4", "type": "divider"},

            # ── 近期关键里程碑 ────────────────────────────────
            {
                "blockId": "milestone",
                "type": "content",
                "text": {
                    "type": "kimMd",
                    "content": (
                        "**🏁 近期关键里程碑**\n"
                        "- 📌 **4.12** — CodeFlicker V1.1 / MyFlicker V0.1，2个形态启动内测\n"
                        "- 📌 **4.20** — 版本合一，正式发布MyFlicker1.0"
                        "（全形态：客户端/云/KIM；全场景：Code + Work）；"
                        "AI普惠第一期全员体验（行政AI化）\n"
                        "- 📌 **4.30** — 模型服务三期交付 + 安全需求上线"
                    )
                }
            },
            {"blockId": "d5", "type": "divider"},

            # ── 本周战役解读 ──────────────────────────────────
            {
                "blockId": "insight",
                "type": "content",
                "text": {
                    "type": "kimMd",
                    "content": (
                        "**🧭 本周战役解读**\n\n"
                        "本周一个明显变化是：子项目划分更清晰了——AI转型、AI普惠、产品建设、"
                        "技能生态、技术专项、项目经营，6条线各司其职，责任更明确。"
                        "更多团队正在从「观察者」变成「建设者」，"
                        "在公司级AI基础设施中承担实质性工作。\n\n"
                        "力出一孔的效果开始显现：过去分散在各团队的AI探索，"
                        "正在逐步收敛到统一的平台和Skill体系上，"
                        "每个人的工作都在直接对齐4.20的最终交付。\n\n"
                        "整体进度加速推进中，4.12是技术验证的节点，4.20是面向全员的第一次真正亮相。"
                    )
                }
            },
            {"blockId": "d6", "type": "divider"},

            # ── OnePage 权威入口（底部按钮） ──────────────────
            {
                "blockId": "onepage_btn",
                "type": "action",
                "actions": [
                    {
                        "type": "button",
                        "text": {"type": "plainText", "content": "📖 了解快手AI生产力战役"},
                        "url": ONEPAGE_URL
                    }
                ]
            }
        ]
    }


# ============================================================
# 发送逻辑
# ============================================================
async def send_preview(token: str, card: dict) -> dict:
    """私发给沈浪预览，返回 API 结果"""
    async with httpx.AsyncClient(timeout=30.0) as client:
        resp = await client.post(
            f"{GATEWAY_URL}/openapi/v2/message/send",
            headers={"Authorization": f"Bearer {token}", "Content-Type": "application/json"},
            json={"username": PREVIEW_USERNAME, "msgType": "mixCard", "mixCard": card}
        )
        return resp.json()


async def send_to_groups(token: str, card: dict) -> list[dict]:
    """推送到2个目标群，群间间隔2.5s，返回每个群的结果列表"""
    results = []
    for g in TARGET_GROUPS:
        gid, gname = g["groupId"], g["groupName"]
        print(f"📤 发送到：{gname}...")
        async with httpx.AsyncClient(timeout=30.0) as client:
            resp = await client.post(
                f"{GATEWAY_URL}/openapi/v2/message/send",
                headers={"Authorization": f"Bearer {token}", "Content-Type": "application/json"},
                json={"groupId": gid, "msgType": "mixCard", "mixCard": card}
            )
            result = resp.json()
            ok = result.get("code") == 0
            if ok:
                print("  ✅ 成功")
            else:
                code = result.get("code")
                msg = str(result.get("message", ""))[:80]
                print(f"  ❌ 失败 code={code} msg={msg}")
            results.append({"group": gname, "groupId": gid, "result": result, "ok": ok})
        await asyncio.sleep(2.5)
    return results


# ============================================================
# 日志记录
# ============================================================
def write_log(mode: str, target: str, result: dict) -> None:
    """将发送结果追加写入 JSONL 日志"""
    LOG_FILE.parent.mkdir(parents=True, exist_ok=True)
    tz8 = timezone(timedelta(hours=8))
    entry = {
        "timestamp": datetime.now(tz8).isoformat(),
        "mode": mode,
        "target": target,
        "code": result.get("code"),
        "messageKey": result.get("data", {}).get("messageKey"),
        "status": "success" if result.get("code") == 0 else "failed",
        "raw": result
    }
    with open(LOG_FILE, "a", encoding="utf-8") as f:
        f.write(json.dumps(entry, ensure_ascii=False) + "\n")


# ============================================================
# 主入口
# ============================================================
async def main():
    mode = sys.argv[1] if len(sys.argv) > 1 else "--preview"

    card = build_weekly_card()

    if mode == "--dry-run":
        print("🔍 [dry-run] 卡片内容如下：")
        print(json.dumps(card, ensure_ascii=False, indent=2))
        return

    print("🔑 获取 MyFlicker Token...")
    token = await get_mf_token()
    print("✅ Token 获取成功\n")

    if mode == "--send":
        results = await send_to_groups(token, card)
        success = sum(1 for r in results if r["ok"])
        print(f"\n📊 完成！成功: {success}/{len(results)} 个群")
        for r in results:
            write_log("send", r["group"], r["result"])
    else:
        # 默认 --preview
        result = await send_preview(token, card)
        ok = result.get("code") == 0
        print(f"{'✅ 预览已发送给 shenlang' if ok else f'❌ 发送失败: {result}'}")
        write_log("preview", PREVIEW_USERNAME, result)
        if ok:
            msg_key = result.get("data", {}).get("messageKey", "N/A")
            print(f"   messageKey: {msg_key}")
        print("\n💡 确认无误后，运行 `python3 send_weekly_card.py --send` 推送到群")


if __name__ == "__main__":
    asyncio.run(main())
