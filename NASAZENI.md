# Klima Expert – nasazení a provoz

## Aktuální stav (30. 10. 2026)
- Cloudflare účet completeczcz, projekt **Workers & Pages → klima-expert** napojený na GitHub `completeczcz/klima-expert.cz` (větev `main`, každý push = nové nasazení).
- Adresa projektu: https://klima-expert.pages.dev, vlastní domény `klima-expert.cz` a `www.klima-expert.cz` (www → bez www přesměrováno 301).
- D1 databáze `klima-expert-db` (tabulky leads, partners), vazba `DB` je ve `wrangler.toml`.
- Tajné proměnné v projektu: `NOTIFY_TO`, `IP_SALT`, `TURNSTILE_SECRET`, `ADMIN_TOKEN`, `ADMIN_EMAILS`.
- Turnstile widget „klima-expert.cz“ (veřejný klíč v `src/data/site.ts`).
- Doména u Forpsi: DNSSEC vypnut, nameservery přepnuty na `aldo.ns.cloudflare.com` a `meera.ns.cloudflare.com` (NSSET KLIMA-EXPERT-CF).
- Email Routing: pravidlo `info@klima-expert.cz` → `ps@completecz.cz` (zapne se po aktivaci zóny).
- Zbývá: e-maily o nových poptávkách (Resend: `RESEND_API_KEY`, `NOTIFY_FROM` + DNS záznamy), Google Analytics/Ads ID, Search Console.

Web je statický (Astro) a běží na **Cloudflare Pages**. Formuláře zpracovávají **Pages Functions** (`functions/api/…`) a poptávky se ukládají do databáze **Cloudflare D1**. Žádný server ke správě.

## 1. Propojení s GitHubem (jednorázově, ~5 min)

1. Cloudflare → **Workers & Pages** → **Create** → záložka **Pages** → **Connect to Git**.
2. Vyberte repozitář `completeczcz/klima-expert.cz`, větev `main`.
3. Nastavení buildu:
   - Framework preset: **Astro**
   - Build command: `npm run build`
   - Build output directory: `dist`
   - Environment variable: `NODE_VERSION` = `22`
4. **Save and Deploy.** Web poběží na `klima-expert.pages.dev`. Každý push do `main` se nasadí sám.

## 2. Databáze poptávek (D1)

1. Workers & Pages → **D1** → **Create database** → název `klima-expert-db`.
2. V databázi otevřete **Console** a vložte celý obsah souboru `db/schema.sql` → Execute.
3. Pages projekt → **Settings → Bindings** → **Add → D1 database**: Variable name `DB`, databáze `klima-expert-db`.
4. ID databáze doplňte do `wrangler.toml` (`database_id`), aby šlo testovat lokálně.

## 3. Proměnné prostředí (Settings → Variables and Secrets)

| Proměnná | K čemu | Povinné |
|---|---|---|
| `NOTIFY_TO` | kam chodí e-mail o nové poptávce, např. `info@klima-expert.cz` | doporučené |
| `RESEND_API_KEY` | klíč z [resend.com](https://resend.com) pro odesílání e-mailů (zdarma do 3 000/měs.) | doporučené |
| `NOTIFY_FROM` | odesílatel, např. `Klima Expert <poptavky@klima-expert.cz>` (doména ověřená v Resend) | doporučené |
| `TURNSTILE_SECRET` | ochrana proti spamu (Cloudflare Turnstile) | doporučené |
| `IP_SALT` | libovolný náhodný text pro anonymizaci IP | ano |
| `ADMIN_EMAILS` | e-maily s přístupem do `/admin/` přes Cloudflare Access | pro administraci |
| `ADMIN_TOKEN` | alternativa k Access: náhodný řetězec min. 24 znaků | volitelné |

Klíče typu „secret“ zadávejte jako **Encrypt**. Do repozitáře nikdy nepatří.

Bez `RESEND_API_KEY` se poptávky jen uloží do databáze (vidíte je v `/admin/` a v D1 konzoli).

## 4. Doména klima-expert.cz

1. Přidejte doménu do Cloudflare (Add a site) a u registrátora přepněte nameservery na Cloudflare.
2. Pages projekt → **Custom domains** → přidejte `klima-expert.cz` i `www.klima-expert.cz`.
3. Přesměrování www → bez www: **Rules → Redirect Rules** (`www.klima-expert.cz/*` → `https://klima-expert.cz/${1}`, 301).
4. E-mail `info@klima-expert.cz`: **Email → Email Routing** → přeposílání na vaši schránku.

## 5. Ochrana proti spamu (Turnstile)

1. Cloudflare → **Turnstile** → Add site → doména `klima-expert.cz`, režim **Managed**.
2. Veřejný klíč (Site Key) vložte do `src/data/site.ts` → `turnstileSiteKey`.
3. Tajný klíč jako proměnnou `TURNSTILE_SECRET`.

## 6. Administrace poptávek `/admin/`

Doporučeno přes **Cloudflare Zero Trust → Access → Applications → Self-hosted**:
- Application domain: `klima-expert.cz`, cesty `/admin/*` a `/api/admin/*`
- Policy: Allow → Emails → váš e-mail (a e-mail manželky).
- Stejné e-maily dejte do proměnné `ADMIN_EMAILS`.

V administraci uvidíte poptávky, můžete měnit stav (nová → předaná → zaměřeno → realizováno), zapsat firmu, které jste poptávku předali, a jedním klikem zkopírovat text pro partnera.

## 7. Měření a Google Ads

V `src/data/site.ts` → `analytics` vyplňte:
- `gtmId` (Google Tag Manager, doporučeno) **nebo** `ga4Id` a `adsId`.
- Konverze: po odeslání formuláře se na stránce `/dekujeme/` odešle událost **`generate_lead`** (do dataLayer i gtag). V Google Ads ji importujte z GA4, nebo v GTM vytvořte konverzní značku Ads spouštěnou touto událostí.
- Cookie lišta používá **Consent Mode v2** (výchozí stav zamítnuto), což Google Ads v EU vyžaduje.
- Formulář ukládá `gclid` a UTM parametry, takže u každé poptávky víte, z jaké kampaně přišla.

### Vstupní stránky pro reklamy (noindex, bez menu, krátký formulář)
- `/nabidka/klimatizace/`
- `/nabidka/tepelne-cerpadlo/`
- `/nabidka/klimatizace-mitsubishi-heavy/`

Pro vyhledávací kampaně na obecná hesla používejte i běžné stránky (`/klimatizace/do-bytu/`, `/cena-klimatizace/`, krajské stránky), které mají lepší skóre kvality díky obsahu.

## 8. Google Search Console

1. Přidejte doménu `klima-expert.cz` (ověření DNS záznamem v Cloudflare).
2. Odešlete sitemapu `https://klima-expert.cz/sitemap-index.xml`.

## Úpravy obsahu

| Co | Kde |
|---|---|
| Telefon, e-mail, firma, záruky, měření | `src/data/site.ts` |
| Orientační ceny, montáž, příplatky | `src/data/pricing.ts` |
| Produktové řady | `scripts/normalize-products.py` → `src/data/products.json` |
| Články poradny | `src/content/blog/*.md` (Markdown) |
| Krajské texty | `src/data/regions-content.ts` |
| Městské stránky | `src/data/cities.ts` |

Lokální spuštění: `npm install`, pak `npm run dev` (web) nebo `npm run build && npx wrangler pages dev dist` (web + formuláře).

## Kontroly kvality

- `python3 scripts/check-links.py` – rozbité interní odkazy
- `python3 scripts/seo-audit.py` – délky titulků a popisů, H1, duplicity
- `python3 scripts/test-form.py` – end-to-end test formuláře (běžící `wrangler pages dev` na portu 8788)
