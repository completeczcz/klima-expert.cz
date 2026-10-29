# klima-expert.cz

Poptávkový web pro montáž klimatizací a tepelných čerpadel Mitsubishi Heavy Industries a Hisense po celé ČR. Provozuje Petrovka Development s.r.o.

- **Technika:** Astro (statický web) + Cloudflare Pages Functions + D1
- **Nasazení a nastavení:** viz [NASAZENI.md](NASAZENI.md)

## Struktura

```
src/pages/            stránky (úvod, služby, produkty, kalkulačka, kraje, města, poradna, právní)
src/pages/nabidka/    vstupní stránky pro Google Ads (noindex)
src/pages/admin/      správa poptávek (chránit přes Cloudflare Access)
src/content/blog/     30 článků poradny (Markdown)
src/data/             údaje webu, ceny, produkty, kraje, města
functions/api/        příjem poptávek, zájem partnerů, admin API
db/schema.sql         schéma databáze D1
scripts/              kontroly odkazů, SEO audit, test formuláře, generování dat
```

## Příkazy

```
npm install
npm run dev        # vývoj na http://localhost:4321
npm run build      # produkční build do dist/
```
