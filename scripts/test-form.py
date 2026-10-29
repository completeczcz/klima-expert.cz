"""E2E test poptávkového formuláře proti `wrangler pages dev` na :8788."""
from playwright.sync_api import sync_playwright
with sync_playwright() as p:
    b = p.chromium.launch(executable_path='/opt/pw-browsers/chromium-1243/chrome-linux64/chrome')
    pg = b.new_page(viewport={'width': 390, 'height': 844})
    errs = []
    pg.on('pageerror', lambda e: errs.append(str(e)))
    pg.goto('http://127.0.0.1:8788/?utm_source=google&utm_campaign=test&gclid=abc123')
    pg.click('#cc [data-cc="none"]')
    pg.click('.qs__opt:has(input[value="tepelne-cerpadlo"])')
    pg.fill('.qs input[name=psc]', '602 00')
    pg.click('.qs__btn')
    pg.wait_for_url('**/poptavka/**')
    assert pg.is_visible('[data-for="tepelne-cerpadlo"]'), 'krok 2 TČ není vidět'
    pg.fill('input[name=plocha_tc]', '140')
    pg.select_option('select[name=zdroj]', 'Plynový kotel')
    pg.click('#pf-next')
    assert pg.input_value('select[name=kraj]') == 'jihomoravsky-kraj', 'kraj z PSČ: ' + pg.input_value('select[name=kraj]')
    pg.click('#pf-next')  # bez obce → chyba
    assert pg.is_visible('[data-err="obec"]'), 'chybí validace obce'
    pg.fill('input[name=obec]', 'Brno')
    pg.click('#pf-next')
    pg.fill('input[name=jmeno]', 'Jan Test')
    pg.fill('input[name=telefon]', '+420 777 123 456')
    pg.fill('input[name=email]', 'jan@example.com')
    pg.click('#pf-send')
    assert pg.is_visible('[data-err="souhlas"]'), 'chybí validace souhlasu'
    pg.check('input[name=souhlas]')
    pg.click('#pf-send')
    pg.wait_for_url('**/dekujeme/', timeout=10000)
    print('OK formulář → /dekujeme/', 'chyby JS:', errs)
    # kalkulačka
    pg.goto('http://127.0.0.1:8788/cena-klimatizace/')
    pg.click('#add'); pg.click('#add')
    print('kalkulačka:', pg.inner_text('#need'), '|', pg.inner_text('#results')[:200].replace('\n', ' '))
    print('CTA:', pg.get_attribute('#cta', 'href')[:120])
    b.close()
