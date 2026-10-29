# Google Ads – startovací struktura pro klima-expert.cz

Podklad pro nastavení kampaní. Objemy a ceny za klik je potřeba ověřit v Plánovači klíčových slov, odhady konkurence vycházejí z rešerše výsledků vyhledávání (říjen 2026).

## Měření (nejdřív)
1. GA4 + Google Ads propojit, v `src/data/site.ts` vyplnit `gtmId` nebo `ga4Id` a `adsId`.
2. Konverze: událost **`generate_lead`** (odeslaná poptávka, stránka `/dekujeme/`). Hodnota pro začátek 1 000 Kč, později podle reálné marže z předané poptávky.
3. Sekundární konverze (jen pozorovat): `phone_click`, `calculator_view`, `form_step`.
4. Consent Mode v2 je na webu hotový.
5. U každé poptávky se ukládá `gclid`, později lze nahrávat offline konverze (poptávka → realizace).

## Kampaň 1: Vyhledávání – Klimatizace (hlavní)
Cíl: poptávky, strategie nejdřív Maximalizace konverzí s denním rozpočtem, po ~30 konverzích Cílová CPA.

| Sestava | Klíčová slova (frázová / přesná shoda) | Vstupní stránka |
|---|---|---|
| Klimatizace s montáží | "klimatizace s montáží", "montáž klimatizace", [klimatizace s montáží cena] | /nabidka/klimatizace/ |
| Klimatizace do bytu | "klimatizace do bytu", "klimatizace do bytu s montáží", "klimatizace do bytu cena" | /klimatizace/do-bytu/ |
| Klimatizace do domu | "klimatizace do rodinného domu", "klimatizace do domu cena", "klimatizace do podkroví" | /klimatizace/do-domu/ |
| Multisplit | "multisplit klimatizace", "klimatizace do více místností", "multisplit cena" | /klimatizace/multisplit/ |
| Cena | "kolik stojí klimatizace", "cena klimatizace s montáží", "montáž klimatizace cena" | /cena-klimatizace/ |
| Topení klimatizací | "klimatizace na topení", "tepelné čerpadlo vzduch vzduch" | /blog/tepelne-cerpadlo-vzduch-vzduch/ |
| Kancelář | "klimatizace do kanceláře", "kazetová klimatizace" | /klimatizace/do-kancelare/ |

## Kampaň 2: Vyhledávání – Značky (levnější kliky, vysoká kvalita)
| Sestava | Klíčová slova | Vstupní stránka |
|---|---|---|
| Mitsubishi Heavy | "mitsubishi heavy klimatizace", "klimatizace mitsubishi heavy industries", "mhi klimatizace", "mitsubishi heavy diamond" | /nabidka/klimatizace-mitsubishi-heavy/ |
| Hisense | "klimatizace hisense", "hisense klimatizace s montáží", "hisense uni pure", "hisense energy pro" | /znacky/hisense/ |

Pozor na pravidla ochranných známek: názvy značek v textu reklamy jsou v pořádku, protože jde o skutečně nabízené výrobky. Ověřte si případná pravidla distributora.

## Kampaň 3: Vyhledávání – Tepelná čerpadla
| Sestava | Klíčová slova | Vstupní stránka |
|---|---|---|
| TČ obecně | "tepelné čerpadlo vzduch voda", "tepelné čerpadlo s montáží", "tepelné čerpadlo na klíč" | /nabidka/tepelne-cerpadlo/ |
| TČ cena | "tepelné čerpadlo cena", "tepelné čerpadlo vzduch voda cena" | /cena-tepelneho-cerpadla/ |
| Dotace | "dotace tepelné čerpadlo", "nová zelená úsporám tepelné čerpadlo" | /blog/dotace-na-tepelne-cerpadlo/ |

Kliky na tepelná čerpadla bývají drahé. Doporučujeme začít menším rozpočtem a sledovat cenu za poptávku.

## Lokální cílení
- Cílení: Česko, „Přítomnost: lidé, kteří se nacházejí v cílových lokalitách“.
- Pokud partneři v některém kraji nestíhají, snižte tam nabídky úpravou podle lokality, místo vypínání celé kampaně.
- Pro velká města (Praha, Brno, Ostrava, Plzeň) lze přidat sestavy „klimatizace Praha“ apod. s cílením na město a vstupní stránkou `/montaz-klimatizace/…/`.

## Vylučující klíčová slova (začátek)
mobilní, přenosná, bez venkovní jednotky, do auta, autoklimatizace, plnění, plnění klimatizace auto, návod, manuál, chybový kód, error, pdf, bazar, použitá, levná mobilní, ventilátor, práce, brigáda, kurz, rekvalifikace, certifikace, f-plyny zkouška, výkup, recenze mobilních, lidl, kaufland, hornbach, obi, bauhaus, alza, datart, okay, mall

## Reklamy (příklady nadpisů, max 30 znaků)
- Klimatizace s montáží
- Nabídka zdarma do 1 dne
- Mitsubishi Heavy a Hisense
- Montáž po celé ČR
- Záruka až 5 let
- Tichá klimatizace do ložnice
- Spočítejte si cenu online
- Topí i v mrazech do −20 °C

Popisky (max 90 znaků):
- Poradíme s výběrem a poptávku předáme ověřené montážní firmě z vašeho kraje. Zdarma.
- Orientační cenu spočítáte hned online. Zaměření a závazná nabídka zdarma.

Rozšíření: volání (608 543 471, jen v pracovní době), odkazy na podstránky (Ceny, Do bytu, Multisplit, Tepelná čerpadla), popisky (Montáž po celé ČR, Záruka až 5 let, Nabídka zdarma).

## Sezónnost
Poptávka po klimatizacích roste od dubna, vrcholí v červnu a červenci. Montážní firmy mají v létě dlouhé termíny, proto se vyplatí kampaně spouštět už v březnu a lákat na „montáž ještě před sezónou“. Tepelná čerpadla mají sezónu od září do února.
