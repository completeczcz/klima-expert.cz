"""Sjednotí data z ceníků MHI a Hisense (/home/claude/data/*.json) do src/data/products.json.
Spuštění: python3 scripts/normalize-products.py
Ceny v ceníku = doporučené ceny pro koncové zákazníky BEZ DPH, jen zařízení (bez montáže).
"""
import json, pathlib, re

SRC = pathlib.Path('/home/claude/data')
OUT = pathlib.Path(__file__).resolve().parent.parent / 'src/data/products.json'

# Redakční údaje: kategorie webu, třída, použití a úvodní text řady
EDIT = {
  'mhi-diamond-zsx': dict(cat='nastenna', tier='premium', uses=['byt', 'dum', 'loznice'], title='Mitsubishi Heavy Industries Diamond ZSX',
    intro='Vlajková nástěnná řada MHI s nejvyšší účinností v nabídce, tichým chodem od 19 dB(A) a pohybovým čidlem, které hlídá, jestli je v místnosti někdo přítomen. Topí i při −20 °C a vyrábí se v bílé, černobílé a titanové barvě.'),
  'mhi-diamond-zr': dict(cat='nastenna', tier='premium', uses=['dum', 'kancelar'], title='Mitsubishi Heavy Industries Diamond ZR',
    intro='Výkonná nástěnná klimatizace 6,3 až 10 kW pro velké obývací prostory, otevřené dispozice a kanceláře. Zvládne jedna jednotka i tam, kde by jiné řady potřebovaly dvě.'),
  'mhi-premium-zt': dict(cat='nastenna', tier='premium', uses=['byt', 'dum', 'loznice'], title='Mitsubishi Heavy Industries Premium ZT',
    intro='Novinka pro moderní interiéry: velmi tichá jednotka s třídou až A+++ v chlazení i topení, vestavěnou Wi-Fi a vnitřní jednotkou v bílé, černé nebo titanové barvě. Venkovní jednotku lze mít i černou.'),
  'mhi-premium-zs': dict(cat='nastenna', tier='stredni', uses=['byt', 'dum', 'loznice'], title='Mitsubishi Heavy Industries Premium ZS',
    intro='Elegantní a tichá řada do bytů i domů s filtrem proti alergenům a samočištěním. U Mitsubishi Heavy Industries nabízí nejlepší poměr výbavy a ceny.'),
  'mhi-standard-plus-ztl': dict(cat='nastenna', tier='stredni', uses=['byt', 'dum', 'loznice'], title='Mitsubishi Heavy Industries Standard Plus ZTL',
    intro='Kompaktní jednotka s italským designem a nejširší nabídkou výkonů od 1,5 do 7,1 kW. Wi-Fi je součástí dodávky, nejmenší model se hodí do dobře zateplených novostaveb.'),
  'mhi-standard-zsp': dict(cat='nastenna', tier='zakladni', uses=['byt', 'loznice'], title='Mitsubishi Heavy Industries Standard ZSP',
    intro='Nejdostupnější vstup ke klimatizaci Mitsubishi Heavy Industries. Hodí se do pokojů pro hosty, pracoven a menších bytů, kde jde hlavně o spolehlivé chlazení.'),
  'mhi-parapetni-srf': dict(cat='parapetni', tier='stredni', uses=['dum', 'podkrovi'], title='Mitsubishi Heavy Industries parapetní SRF',
    intro='Parapetní jednotka k podlaze nebo pod okno, kterou lze i zapustit do obložení. Automaticky volí horní nebo spodní výfuk, proto skvěle topí. Ideální do podkroví se šikminami.'),
  'mhi-kanalova-srr': dict(cat='kanalova', tier='premium', uses=['dum', 'kancelar'], title='Mitsubishi Heavy Industries kanálová SRR',
    intro='Klimatizace schovaná v podhledu, z níž jsou vidět jen mřížky. Je vysoká jen 200 mm a má vestavěné čerpadlo kondenzátu. Volba pro rekonstrukce a novostavby, kde nemá být jednotka vidět.'),
  'mhi-kazetova-fdtc': dict(cat='kazetova', tier='stredni', uses=['kancelar'], title='Mitsubishi Heavy Industries kazetová FDTC',
    intro='Čtyřcestná kazeta do rastru podhledu 600 × 600 mm pro kanceláře, ordinace a provozovny. Rozvádí vzduch rovnoměrně do čtyř stran, volitelně s pohybovým čidlem.'),
  'mhi-multisplit-scm': dict(cat='multisplit', tier='stredni', uses=['byt', 'dum'], title='Mitsubishi Heavy Industries Multi split SCM',
    intro='Jedna venkovní jednotka pro dvě až pět místností. Šetří místo na fasádě a vnitřní jednotky lze kombinovat podle potřeby: nástěnné, parapetní, kanálové i kazetové.'),
  'hisense-air-master': dict(cat='nastenna', tier='premium', uses=['byt', 'dum', 'loznice'], title='Hisense Air Master',
    intro='Vlajková loď Hisense s chytrým senzorem Smart Eye PRO, který sleduje polohu osob a podle ní řídí teplotu i proudění. Vzduch se šíří bez průvanu, provoz začíná na 18 dB(A).'),
  'hisense-energy-pro-x': dict(cat='nastenna', tier='premium', uses=['byt', 'dum', 'loznice'], title='Hisense Energy Pro X',
    intro='Prémiový design a chytrý komfort za nižší cenu než Air Master. Senzor Smart Eye, ionizace Hi-NANO a samočištění vnitřní i venkovní jednotky.'),
  'hisense-uni-pure': dict(cat='nastenna', tier='stredni', uses=['byt', 'dum', 'loznice'], title='Hisense Uni Pure',
    intro='Nejlepší poměr účinnosti a ceny u Hisense: třída A+++ v chlazení, tichý provoz, Wi-Fi a hlasové ovládání. Topí do −22 °C.'),
  'hisense-wings-comfort': dict(cat='nastenna', tier='stredni', uses=['byt', 'dum'], title='Hisense Wings Comfort',
    intro='Osvědčená a cenově dostupná klimatizace s Wi-Fi, filtrací 4 v 1 a samočištěním. Jako jediná nástěnná řada Hisense má i výkon 6,3 kW pro velké obývací pokoje.'),
  'hisense-hi-smart': dict(cat='nastenna', tier='zakladni', uses=['byt', 'loznice'], title='Hisense Hi-Smart',
    intro='Nejlevnější vstup ke kvalitní klimatizaci. Hodí se hlavně na chlazení ložnic a menších bytů. Wi-Fi je volitelná za příplatek.'),
  'hisense-multi-split': dict(cat='multisplit', tier='stredni', uses=['byt', 'dum'], title='Hisense Multi split',
    intro='Jedna venkovní jednotka pro dvě až pět místností. Kombinovat lze nástěnné řady Air Master, Energy Pro X, Uni Pure a Wings Comfort s kazetovými, kanálovými i konzolovými jednotkami.'),
  'hisense-lcac-kazetova': dict(cat='kazetova', tier='stredni', uses=['kancelar'], title='Hisense kazetová klimatizace',
    intro='Kazetová jednotka do podhledu pro kanceláře, obchody a ordinace. Kompaktní verze 620 × 620 mm zapadne do rastru, vzduch rozvádí do 360°.'),
  'hisense-lcac-kanalova': dict(cat='kanalova', tier='stredni', uses=['kancelar', 'dum'], title='Hisense kanálová klimatizace',
    intro='Neviditelná klimatizace v podhledu, ze které vede vzduch potrubím do jedné nebo více místností. Verze Slim je vysoká jen 190 mm.'),
  'hisense-lcac-parapetne-podstropni': dict(cat='podstropni', tier='stredni', uses=['kancelar'], title='Hisense parapetně-podstropní klimatizace',
    intro='Pro široké místnosti, obchody a restaurace bez podhledu. Vzduch dofoukne až 15 metrů, jednotku lze zavěsit pod strop nebo dát k podlaze.'),
  'hisense-lcac-konzolova': dict(cat='parapetni', tier='stredni', uses=['dum', 'podkrovi'], title='Hisense konzolová klimatizace',
    intro='Jednotka u podlahy, která výborně topí, protože teplý vzduch proudí spodním výdechem. Hodí se pod okna, do podkroví se šikminami a na chaty.'),
  'hisense-hi-therma-monoblok': dict(cat='tepelne-cerpadlo', tier='stredni', uses=['dum'], title='Hisense Hi-Therma Monoblok',
    intro='Tepelné čerpadlo vzduch-voda, které má vše ve venkovní jednotce. Do domu vede jen voda, instalace je proto jednodušší a levnější. Vhodné pro výměnu kotle i novostavby.'),
  'hisense-hi-therma-split': dict(cat='tepelne-cerpadlo', tier='stredni', uses=['dum'], title='Hisense Hi-Therma Split',
    intro='Tepelné čerpadlo vzduch-voda s kompaktním hydraulickým modulem uvnitř domu. Volba tam, kde chcete volně zvolit zásobník teplé vody a hydrauliku.'),
  'hisense-hi-therma-integra': dict(cat='tepelne-cerpadlo', tier='premium', uses=['dum'], title='Hisense Hi-Therma Integra',
    intro='Řešení vše v jednom: vnitřní jednotka s vestavěným nerezovým zásobníkem 230 l, oběhovým čerpadlem a dohřevem. Šetří místo v technické místnosti i čas při montáži.'),
  'hisense-hi-therma-smart-r290': dict(cat='tepelne-cerpadlo', tier='premium', uses=['dum'], title='Hisense Hi-Therma Smart R290',
    intro='Připravovaný monoblok s přírodním chladivem R290. Dodá vodu až 75 °C i v mrazu, proto se hodí do starších domů s radiátory.'),
}

def num(v):
    if isinstance(v, (int, float)): return v
    if isinstance(v, str):
        v = v.replace('\u2212', '-')
        m = re.search(r'-?\d+(?:[.,]\d+)?', v)
        return float(m.group().replace(',', '.')) if m else None
    return None

def min_price_mhi(m):
    ps = [p.get('czk') for p in (m.get('prices') or {}).values() if isinstance(p, dict) and p.get('czk')]
    return min(ps) if ps else None

def min_indoor(s):
    ps = []
    for u in s.get('indoor_units') or []:
        p = min_price_mhi(u)
        if p: ps.append(p)
    for u in s.get('compatible_indoor_units') or []:
        if isinstance(u.get('price_czk'), (int, float)): ps.append(u['price_czk'])
    return min(ps) if ps else None

out = []
for fname, brand_slug in [('mhi.json', 'mitsubishi-heavy-industries'), ('hisense.json', 'hisense')]:
    data = json.load(open(SRC / fname))
    for s in data['series']:
        e = EDIT.get(s['id'])
        if not e:
            print('SKIP (bez redakce):', s['id']); continue
        models = []
        if s.get('models'):
            for m in s['models']:
                price = m.get('price_set_czk') if 'price_set_czk' in m else min_price_mhi(m)
                models.append({
                    'code': m.get('model') or m.get('indoor') or m.get('indoor_unit'),
                    'outdoor': m.get('outdoor') or m.get('outdoor_unit'),
                    'coolKw': m.get('cooling_kw') or m.get('cooling_kw_A35W18'),
                    'heatKw': m.get('heating_kw') or m.get('heating_kw_A7W35'),
                    'energy': m.get('energy_class') or m.get('energy_class_cooling_heating'),
                    'seer': m.get('seer') if isinstance(m.get('seer'), (int, float)) else None,
                    'scop': m.get('scop') if isinstance(m.get('scop'), (int, float)) else (m.get('scop_35') if isinstance(m.get('scop_35'), (int, float)) else None),
                    'noise': m.get('indoor_noise_min_db'),
                    'flowTemp': m.get('max_flow_temp_c'),
                    'tank': m.get('dhw_tank_l'),
                    'line': m.get('inverter_line') or m.get('subtype') or m.get('colour'),
                    'priceBezDph': price,
                })
        outdoor_units = []
        for m in s.get('outdoor_units') or []:
            outdoor_units.append({
                'code': m.get('model'), 'maxIndoor': m.get('max_indoor_units'),
                'coolKw': m.get('cooling_kw'), 'heatKw': m.get('heating_kw'),
                'energy': m.get('energy_class') or m.get('energy_class_cooling_heating'),
                'priceBezDph': (m['price'].get('czk') if isinstance(m.get('price'), dict) else m.get('price')) or m.get('price_czk'),
            })
        prices = [m['priceBezDph'] for m in models if m['priceBezDph']] + [m['priceBezDph'] for m in outdoor_units if m['priceBezDph']]
        colours = s.get('colours') or [c.get('colour') for c in s.get('colour_variants') or [] if c.get('colour')]
        heat_min = s.get('heating_min_outdoor_temp_c')
        if heat_min is None and s.get('heating_range_c'):
            heat_min = num(s['heating_range_c'])
        energy = s.get('energy_class') or s.get('energy_classes')
        out.append({
            'id': s['id'],
            'brand': s['brand'],
            'brandSlug': brand_slug,
            'name': s['name'],
            'title': e['title'],
            'code': s.get('code'),
            'type': s.get('type'),
            'cat': e['cat'],
            'tier': e['tier'],
            'uses': e['uses'],
            'intro': e['intro'],
            'features': s.get('key_features') or [],
            'noiseMin': s.get('indoor_noise_min_db') if isinstance(s.get('indoor_noise_min_db'), (int, float)) else None,
            'indoorUnitsMin': min_indoor(s),
            'energy': energy if isinstance(energy, str) else None,
            'heatMin': heat_min if isinstance(heat_min, (int, float)) else None,
            'refrigerant': s.get('refrigerant'),
            'wifi': s.get('wifi'),
            'colours': [c for c in colours if c],
            'flowTemp': s.get('max_flow_temp_c'),
            'status': s.get('status'),
            'models': models,
            'outdoorUnits': outdoor_units,
            'priceFromBezDph': min(prices) if prices else None,
        })

OUT.write_text(json.dumps(out, ensure_ascii=False, indent=1))
print('OK', len(out), 'řad →', OUT)
for p in out:
    print(f"{p['id']:36} {p['cat']:16} od {p['priceFromBezDph']}  modelů {len(p['models'])} venk {len(p['outdoorUnits'])} heatMin {p['heatMin']} noise {p['noiseMin']}")
