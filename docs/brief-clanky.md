# Zadání pro články blogu klima-expert.cz

## O webu
Klima Expert (klima-expert.cz) je český poptávkový web provozovaný společností Petrovka Development s.r.o. Pomáhá koncovým zákazníkům (byty, rodinné domy, kanceláře) vybrat klimatizaci nebo tepelné čerpadlo značek **Mitsubishi Heavy Industries (MHI)** a **Hisense** a předá jejich poptávku ověřené partnerské montážní firmě v jejich kraji. Působí po celé ČR. Technickým zázemím je COMPLETE CZ, výhradní distributor MHI pro ČR a SR od roku 2007 a distributor Hisense. Záruka: MHI 5 let, Hisense 3 roky.

Cíl článků: dostat web vysoko ve vyhledávání Google na dané klíčové slovo a převést čtenáře na odeslání nezávazné poptávky.

## Formát souboru
Každý článek = jeden soubor `/home/claude/klima-expert/src/content/blog/<slug>.md`. Frontmatter (YAML) přesně podle schématu:

```yaml
---
title: "SEO titulek, max 60 znaků, klíčové slovo na začátku"
description: "Meta popis 140–155 znaků, obsahuje klíčové slovo a důvod kliknout"
h1: "Nadpis článku (může být delší a přirozenější než title)"
category: klimatizace   # klimatizace | tepelna-cerpadla | znacky | provoz-a-servis
keywords: ["hlavní klíčové slovo", "vedlejší 1", "vedlejší 2", "..."]
published: 2026-10-30
perex: "1–2 věty pod nadpisem, rovnou odpověď na hlavní otázku."
faq:
  - q: "Otázka, jak ji lidé píšou do Googlu?"
    a: "Stručná odpověď 1–3 věty."
sources:
  - title: "Název zdroje"
    url: "https://..."
related: ["slug-jineho-clanku", "slug-dalsiho"]
---
```

- `title` max 70 znaků (cíl ≤ 60), `description` max 160 znaků. Hlídej to, jinak build spadne.
- `faq`: 3–5 otázek (použijí se pro strukturovaná data FAQPage).
- `sources`: 1–5 skutečných zdrojů, které jsi ověřil (oficiální weby, zákony, výrobci, SFŽP, MŽP, ERÚ…). Žádné vymyšlené URL.
- `related`: 2–3 slugy z níže uvedeného seznamu článků.

## Tělo článku
- Česky, srozumitelně pro laika, věcně, bez reklamních superlativů. Tykat ne – **vykat**.
- Délka 1 100–1 700 slov. Nadpisy `##` a `###` (žádné `#` – H1 dělá šablona).
- Hlavní klíčové slovo v prvním odstavci, v jednom H2 a přirozeně v textu; vedlejší varianty a otázky jako H2/H3. Žádný keyword stuffing.
- Začni rovnou odpovědí (featured snippet): krátký odstavec, případně tabulka nebo odrážky.
- Kde to dává smysl, jedna markdownová tabulka (srovnání, ceny, výkony).
- Konkrétní a praktické: čísla, příklady („byt 3+kk, 75 m², 3 místnosti…“), na co si dát pozor.
- Ceny vždy jako **orientační rozpětí s DPH, k roku 2026**, ověřené vyhledáním aktuálních cen na českém trhu. Neuváděj ceny konkrétních modelů.
- Fakta (dotace, zákony, F-plyny, hlukové limity, ceny energií) **ověř přes WebSearch/WebFetch** a uveď do `sources`. Když si nejsi jistý, napiš to opatrněji nebo vynech.
- Nepiš recenze ani citace vymyšlených zákazníků, žádné vymyšlené statistiky ani „podle našich zkušeností s 1000 instalacemi“.
- Nekopíruj texty z jiných webů, piš vlastními slovy.
- Interní odkazy: 3–6 v textu, markdownem, relativní URL z tohoto seznamu:
  - `/poptavka/` – nezávazná poptávka (hlavní cíl, odkaz aspoň 2×, jednou v závěru)
  - `/cena-klimatizace/` – kalkulačka a orientační ceny klimatizace
  - `/cena-tepelneho-cerpadla/` – orientační ceny tepelného čerpadla
  - `/klimatizace/` , `/klimatizace/do-bytu/` , `/klimatizace/do-domu/` , `/klimatizace/do-kancelare/` , `/klimatizace/multisplit/`
  - `/tepelna-cerpadla/`
  - `/znacky/mitsubishi-heavy-industries/` , `/znacky/hisense/`
  - `/produkty/` – přehled všech řad
  - `/servis-klimatizace/`
  - `/jak-to-funguje/`
  - `/blog/<slug>/` – ostatní články ze seznamu níže
- Poslední sekce `## Shrnutí` (3–5 odrážek) a pod ní odstavec s výzvou: nezávazná poptávka přes [formulář](/poptavka/), partnerská firma z vašeho kraje se ozve, zaměří a připraví nabídku zdarma.

## Seznam článků (slug – hlavní klíčové slovo)
1. kolik-stoji-klimatizace-do-bytu – kolik stojí klimatizace do bytu
2. jaky-vykon-klimatizace-na-m2 – výkon klimatizace na m2
3. klimatizace-v-panelaku – klimatizace do panelového domu / panelák
4. ticha-klimatizace-do-loznice – tichá klimatizace do ložnice
5. klimatizace-do-podkrovi – klimatizace do podkroví
6. single-split-nebo-multisplit – single split nebo multisplit
7. mobilni-klimatizace-nebo-split – mobilní klimatizace vs split
8. topeni-klimatizaci – topení klimatizací v zimě
9. spotreba-klimatizace – spotřeba klimatizace a náklady na provoz
10. jak-probiha-montaz-klimatizace – montáž klimatizace postup
11. povoleni-klimatizace-svj – povolení klimatizace SVJ a stavební úřad
12. hluk-venkovni-jednotky – hluk venkovní jednotky klimatizace, limity, sousedé
13. cisteni-a-servis-klimatizace – čištění a servis klimatizace, jak často
14. klimatizace-a-zdravi – klimatizace a zdraví, alergie, filtry
15. klimatizace-do-kancelare – klimatizace do kanceláře
16. invertorova-klimatizace – invertorová klimatizace
17. chladivo-r32-f-plyny – chladivo R32, F-plyny, konec R410A
18. kdy-koupit-klimatizaci – kdy koupit a namontovat klimatizaci
19. klimatizace-a-fotovoltaika – klimatizace a fotovoltaika
20. chytre-ovladani-klimatizace-wifi – ovládání klimatizace přes Wi-Fi a mobil
21. klimatizace-mitsubishi-heavy-industries – klimatizace Mitsubishi Heavy Industries
22. mitsubishi-heavy-vs-mitsubishi-electric – Mitsubishi Heavy vs Mitsubishi Electric rozdíl
23. klimatizace-hisense – klimatizace Hisense zkušenosti
24. japonska-nebo-cinska-klimatizace – jakou značku klimatizace vybrat
25. tepelne-cerpadlo-vzduch-voda-cena – tepelné čerpadlo vzduch-voda cena
26. dotace-na-tepelne-cerpadlo – dotace na tepelné čerpadlo 2026
27. tepelne-cerpadlo-do-starsiho-domu – tepelné čerpadlo do starého domu s radiátory
28. vykon-tepelneho-cerpadla – jak dimenzovat výkon tepelného čerpadla
29. tepelne-cerpadlo-vs-plynovy-kotel – tepelné čerpadlo nebo plynový kotel
30. tepelne-cerpadlo-vzduch-vzduch – tepelné čerpadlo vzduch-vzduch (klimatizace jako tepelné čerpadlo)

Kategorie: 1–20 `klimatizace` (13, 9, 20 mohou být `provoz-a-servis`), 21–24 `znacky`, 25–30 `tepelna-cerpadla`.
