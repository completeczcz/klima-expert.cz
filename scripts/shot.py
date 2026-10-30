"""Screenshoty stránek: python3 scripts/shot.py /cesta/ [/dalsi/] – výstup do /tmp/claude-0/.../scratchpad/shots"""
import sys, os, subprocess, time
from playwright.sync_api import sync_playwright
OUT = '/tmp/claude-0/-home-claude/8c509892-8987-587e-bc00-e5ea6c44bdba/scratchpad/shots'
os.makedirs(OUT, exist_ok=True)
paths = sys.argv[1:] or ['/']
srv = subprocess.Popen(['python3', '-m', 'http.server', '4399', '-d', '/home/claude/klima-expert/dist'], stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
time.sleep(1)
try:
    with sync_playwright() as p:
        b = p.chromium.launch(executable_path='/opt/pw-browsers/chromium-1243/chrome-linux64/chrome')
        for w, h, tag in [(1366, 900, 'd'), (390, 844, 'm')]:
            pg = b.new_page(viewport={'width': w, 'height': h}, device_scale_factor=1)
            for path in paths:
                pg.goto(f'http://localhost:4399{path}', wait_until='networkidle')
                pg.add_style_tag(content='#cc{display:none!important}[data-reveal]{opacity:1!important;transform:none!important}')
                pg.evaluate("document.querySelectorAll('img[loading=lazy]').forEach(i=>i.loading='eager')")
                pg.wait_for_timeout(1500)
                name = (path.strip('/').replace('/', '_') or 'home') + f'-{tag}.png'
                pg.screenshot(path=f'{OUT}/{name}', full_page=True)
                print(f'{OUT}/{name}')
        b.close()
finally:
    srv.terminate()
