#!/usr/bin/env python3
import re, base64, os

with open('index.html', 'r', encoding='utf-8') as f:
    html = f.read()

# Inline CSS
def inline_css(html):
    pattern = re.compile(r'<link[^>]+rel="stylesheet"[^>]+href="([^"]+)"[^>]*/?>|<link[^>]+href="([^"]+)"[^>]+rel="stylesheet"[^>]*/?>') 
    def replace_link(m):
        href = m.group(1) or m.group(2)
        try:
            with open(href, 'r', encoding='utf-8') as f:
                css = f.read()
            return f'<style>\n{css}\n</style>'
        except:
            return m.group(0)
    return pattern.sub(replace_link, html)

# Inline JS
def inline_js(html):
    pattern = re.compile(r'<script[^>]+src="([^"]+)"[^>]*></script>')
    def replace_script(m):
        src = m.group(1)
        try:
            with open(src, 'r', encoding='utf-8') as f:
                js = f.read()
            return f'<script>\n{js}\n</script>'
        except:
            return m.group(0)
    return pattern.sub(replace_script, html)

# Inline favicon
def inline_favicon(html):
    pattern = re.compile(r'(<link[^>]+rel="icon"[^>]+href=")([^"]+)("[^>]*/?>)')
    def replace_favicon(m):
        href = m.group(2)
        try:
            with open(href, 'r', encoding='utf-8') as f:
                svg = f.read()
            b64 = base64.b64encode(svg.encode('utf-8')).decode('utf-8')
            return m.group(1) + f'data:image/svg+xml;base64,{b64}' + m.group(3)
        except:
            return m.group(0)
    return pattern.sub(replace_favicon, html)

html = inline_css(html)
html = inline_js(html)
html = inline_favicon(html)

with open('dist_single.html', 'w', encoding='utf-8') as f:
    f.write(html)

size = os.path.getsize('dist_single.html')
print(f'单文件生成完毕: dist_single.html ({size/1024:.1f} KB)')

css_ext = re.findall(r'<link[^>]+stylesheet[^>]+href="(?!data:|http)', html)
js_ext = re.findall(r'<script[^>]+src="(?!data:|http)', html)
print(f'外部CSS引用: {len(css_ext)}, 外部JS引用: {len(js_ext)}')
print('单文件验证 OK' if not css_ext and not js_ext else '有残留外部引用: CSS=' + str(css_ext) + ' JS=' + str(js_ext))
