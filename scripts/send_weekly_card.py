#!/usr/bin/env python3
"""
快手AI生产力战役 - 周报 MixCard 发送脚本 v2.1.0
技能: sl-ai-productivity v2.1.0

变更说明:
  v2.1.0 (2026-04-11) - 安全 & 架构修复：
    - P0: 凭证移出硬编码，改为从环境变量读取（或 .env 文件）
    - P1: build_weekly_card() 改为从 templates/weekly_card_template.json 加载，
          模板文件是唯一事实来源，直接编辑 JSON 即可更新卡片内容
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

环境变量（必须设置，或在仓库根目录放 .env 文件）:
  MF_APP_KEY    - MyFlicker 应用 Key
  MF_SECRET_KEY - MyFlicker 应用 Secret
"""
import asyncio
import json
import sys
import os
from datetime import datetime, timezone, timedelta
from pathlib import Path

import httpx

# ============================================================
# 凭证与环境变量处理
# ============================================================
def _load_dotenv():
    env_file = Path(__file__).resolve().parent.parent / ".env"
    if env_file.exists():
        with open(env_file, encoding="utf-8") as f:
            for line in f:
                line = line.strip()
                if line and not line.startswith("#") and "=" in line:
                    key, _, val = line.partition("=")
                    parsed = val.strip().strip('"').strip("'")
                    os.environ.setdefault(key.strip(), parsed)


def get_runtime_config(require_credentials: bool = True) -> tuple[str, str, str]:
    """
    加载 .env 并返回运行时配置。

    - require_credentials=True: 要求 MF_APP_KEY/MF_SECRET_KEY 必须存在
    - require_credentials=False: 允许无凭证（用于 --dry-run / import / 测试）
    """
    _load_dotenv()

    app_key = os.environ.get("MF_APP_KEY", "")
    secret_key = os.environ.get("MF_SECRET_KEY", "")
    gateway_url = os.environ.get("MF_GATEWAY_URL", "https://is-gateway.corp.kuaishou.com")

    if require_credentials and (not app_key or not secret_key):
        print("❌ 错误: MF_APP_KEY 和 MF_SECRET_KEY 环境变量未设置。")
        print("   请复制 .env.example 为 .env 并填入实际凭证，或通过系统环境变量注入。")
        sys.exit(1)

    return app_key, secret_key, gateway_url


# 运行时配置（在 main 中加载）
MF_APP_KEY = ""
MF_SECRET_KEY = ""
GATEWAY_URL = "https://is-gateway.corp.kuaishou.com"

PREVIEW_USERNAME = "shenlang"

TARGET_GROUPS = [
    {"groupId": "6783643915686960", "groupName": "【AI生产力】项目大群"},   # 111人
    {"groupId": "6723053031035975", "groupName": "【AI生产力】指挥部"},     # 3人
]

# 模板文件路径（single source of truth）
TEMPLATE_FILE = Path(__file__).resolve().parent.parent / "templates" / "weekly_card_template.json"

# 日志路径
LOG_FILE = Path(__file__).resolve().parent.parent / "logs" / "preview_send_log.jsonl"


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
# 卡片构建 — 从模板文件加载（templates/weekly_card_template.json 是唯一内容来源）
# ============================================================
def build_weekly_card() -> dict:
    """
    从 templates/weekly_card_template.json 加载卡片结构，
    并注入运行时所需的 appKey / updateMulti 字段。

    要修改卡片内容时，只需编辑 JSON 模板文件，无需改动本脚本。
    """
    if not TEMPLATE_FILE.exists():
        raise FileNotFoundError(f"卡片模板文件不存在: {TEMPLATE_FILE}")

    with open(TEMPLATE_FILE, encoding="utf-8") as f:
        tpl = json.load(f)

    # 从模板中提取 config + blocks（忽略 _meta 元数据）
    card = {
        "config": tpl["config"],
        "appKey": MF_APP_KEY,          # 注入运行时凭证（不存入模板）
        "updateMulti": 1,
        "blocks": tpl["blocks"],
    }
    return card


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


async def send_to_groups(token: str, card: dict) -> list:
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
    global MF_APP_KEY, MF_SECRET_KEY, GATEWAY_URL

    mode = sys.argv[1] if len(sys.argv) > 1 else "--preview"

    if mode == "--dry-run":
        MF_APP_KEY, MF_SECRET_KEY, GATEWAY_URL = get_runtime_config(require_credentials=False)
    else:
        MF_APP_KEY, MF_SECRET_KEY, GATEWAY_URL = get_runtime_config(require_credentials=True)

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
