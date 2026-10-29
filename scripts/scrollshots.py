"""Snímky viewportu při různých pozicích posunu: python3 scripts/scrollshots.py /cesta/ šířka výška krok počet"""
import sys, os, subprocess, time
from playwright.sync_api import sync_playwright
OUT = '/tmp/claude-0/-home-claude/8c509892-8987-587e-bc00-e5ea6c44bdba/scratchpad/scroll'
os.makedirs(OUT, exist_ok=True)
path, w, h, step, n = sys.argv[1], int(sys.argv[2]), int(sys.argv[3]), int(sys.argv[4]), int(sys.argv[5])
srv = subprocess.Popen(['python3', '-m', 'http.server', '4399', '-d', '/home/claude/klima-expert/dist'], stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
time.sleep(1)
try:
    with sync_playwright() as p:
        b = p.chromium.launch(executable_path='/opt/pw-browsers/chromium-1243/chrome-linux64/chrome')
        pg = b.new_page(viewport={'width': w, 'height': h})
        errs = []; pg.on('pageerror', lambda e: errs.append(str(e)))
        pg.goto(f'http://localhost:4399{path}', wait_until='networkidle')
        pg.add_style_tag(content='#cc{display:none!important}')
        for i in range(n):
            pg.evaluate(f'window.scrollTo(0, {i * step})'); pg.wait_for_timeout(450)
            pg.screenshot(path=f'{OUT}/s{w}_{i:02d}.png')
        print('JS chyby:', errs, 'výška stránky:', pg.evaluate('document.body.scrollHeight'))
        b.close()
finally:
    srv.terminate()
