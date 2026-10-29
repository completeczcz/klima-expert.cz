import { site } from './site';
import { priceGuide } from './pricing';

export const pages = {
  klimatizace: {
    typ: 'klimatizace-byt',
    title: 'Klimatizace s montáží – nabídka zdarma',
    h1: 'Klimatizace s montáží. Nezávazná nabídka zdarma.',
    lead: 'Tichá klimatizace Mitsubishi Heavy Industries nebo Hisense do bytu, domu i kanceláře. Montáž zajistí ověřená firma z vašeho kraje.',
    points: ['Chlazení v létě, levné topení v zimě', `Záruka až ${site.warranty.mhi} let`, 'Zaměření a nabídka zdarma'],
    prices: [priceGuide[0], priceGuide[1], priceGuide[2]],
    faq: [
      { q: 'Kolik klimatizace stojí?', a: 'Jedna místnost orientačně 30 000 až 60 000 Kč včetně montáže a 12% DPH. Přesnou cenu dostanete po zaměření.' },
      { q: 'Jak rychle zvládnete montáž?', a: 'Ozveme se do 1 pracovního dne. Montáž jedné jednotky trvá 4 až 6 hodin, termín závisí na sezóně.' },
      { q: 'Kdo bude montovat?', a: 'Ověřená partnerská firma z vašeho kraje s osvědčením pro práci s chladivy.' },
    ],
  },
  'tepelne-cerpadlo': {
    typ: 'tepelne-cerpadlo',
    title: 'Tepelné čerpadlo vzduch-voda – nabídka zdarma',
    h1: 'Tepelné čerpadlo pro váš dům. Návrh a nabídka zdarma.',
    lead: 'Tepelná čerpadla vzduch-voda Hisense Hi-Therma pro vytápění a ohřev vody. Navrhneme výkon podle domu a pomůžeme s programem Nová zelená úsporám.',
    points: ['Topí do −25 °C venkovní teploty', 'Pro novostavby i náhradu kotle', 'Pomoc s dotací a bezúročným úvěrem'],
    prices: [priceGuide[3]],
    faq: [
      { q: 'Kolik tepelné čerpadlo stojí?', a: 'Pro běžný rodinný dům orientačně 250 000 až 450 000 Kč včetně instalace a 12% DPH, podle výkonu a otopné soustavy.' },
      { q: 'Lze získat dotaci?', a: 'Domácnosti s nižšími příjmy mohou získat přímou dotaci v programu NZÚ Light, ostatní bezúročný úvěr z programu Nová zelená úsporám.' },
      { q: 'Hodí se do staršího domu?', a: 'Často ano. Rozhoduje zateplení a otopná soustava. Technik to posoudí při prohlídce zdarma.' },
    ],
  },
  'klimatizace-mitsubishi-heavy': {
    typ: 'klimatizace-byt',
    title: 'Klimatizace Mitsubishi Heavy Industries s montáží',
    h1: 'Klimatizace Mitsubishi Heavy Industries s montáží',
    lead: `Japonská klimatizace s tichým chodem od 19 dB(A) a zárukou ${site.warranty.mhi} let, z oficiální distribuce. Montáž zajistí proškolená firma z vašeho kraje.`,
    points: ['Řady Diamond, Premium a Standard', 'Topí i při −20 °C', `Záruka ${site.warranty.mhi} let`],
    prices: [priceGuide[0], priceGuide[1]],
    faq: [
      { q: 'Proč Mitsubishi Heavy Industries?', a: 'Velmi tichý chod, vysoká účinnost až A+++ a spolehlivé topení v mrazech. Výhradním distributorem v ČR je od roku 2007 COMPLETE CZ.' },
      { q: 'Kolik stojí?', a: 'Nástěnná klimatizace MHI s montáží začíná orientačně kolem 37 000 Kč včetně 12% DPH podle řady a výkonu.' },
      { q: 'Je to totéž co Mitsubishi Electric?', a: 'Ne, jde o dvě samostatné japonské firmy. Obě vyrábějí klimatizace.' },
    ],
  },
} as const;
