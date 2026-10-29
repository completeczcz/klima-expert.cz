"""Rychlý SEO audit dist/: délky title/description, duplicity, H1, canonical, noindex."""
import os, re, html, collections
rows = []
for dp, _, fs in os.walk('dist'):
    for f in fs:
        if not f.endswith('.html'): continue
        p = os.path.join(dp, f); s = open(p, encoding='utf-8').read()
        url = '/' + os.path.relpath(p, 'dist').replace('index.html', '')
        t = html.unescape((re.search(r'<title>(.*?)</title>', s) or [None, ''])[1])
        d = html.unescape((re.search(r'<meta name="description" content="(.*?)"', s) or [None, ''])[1])
        h1 = re.findall(r'<h1[^>]*>(.*?)</h1>', s, re.S)
        noindex = 'noindex' in s
        rows.append((url, t, d, h1, noindex))
issues = 0
for key, idx in [('title', 1), ('description', 2)]:
    c = collections.Counter(r[idx] for r in rows if not r[4])
    for v, n in c.items():
        if n > 1: print(f'DUPLICITNÍ {key} ({n}×): {v[:80]}'); issues += 1
for url, t, d, h1, ni in sorted(rows):
    probs = []
    if len(t) > 65: probs.append(f'title {len(t)} zn.')
    if not (70 <= len(d) <= 160): probs.append(f'description {len(d)} zn.')
    if len(h1) != 1: probs.append(f'{len(h1)}× H1')
    if probs and not ni: print(url, '→', ', '.join(probs)); issues += 1
print(len(rows), 'stránek,', issues, 'problémů')
