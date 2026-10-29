"""Kontrola interních odkazů v dist/ – vypíše odkazy na neexistující stránky a kotvy."""
import os, re, sys, html
from urllib.parse import urlparse, unquote
root = 'dist'
pages = {}
for dp, _, fs in os.walk(root):
    for f in fs:
        if f.endswith('.html'):
            p = os.path.join(dp, f)
            url = '/' + os.path.relpath(p, root).replace('index.html', '').replace('\\', '/')
            pages[url] = open(p, encoding='utf-8').read()
files = set()
for dp, _, fs in os.walk(root):
    for f in fs: files.add('/' + os.path.relpath(os.path.join(dp, f), root))
bad = {}
for url, src in pages.items():
    for m in re.finditer(r'href="([^"]+)"', src):
        h = html.unescape(m.group(1))
        if h.startswith(('http', 'mailto:', 'tel:', '#', 'data:')): continue
        u = urlparse(h); path = unquote(u.path)
        if path.startswith('/api/'): continue
        ok = path in pages or path in files or (path + '/') in pages
        if ok and u.fragment and path in pages:
            if f'id="{u.fragment}"' not in pages[path]: ok = False
        if not ok: bad.setdefault(h, set()).add(url)
for h, srcs in sorted(bad.items()): print(f'{h}  <- {sorted(srcs)[:3]}{" …" if len(srcs)>3 else ""}')
print(f'{len(pages)} stránek, {len(bad)} rozbitých odkazů')
