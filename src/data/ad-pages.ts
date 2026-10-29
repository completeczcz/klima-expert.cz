import { site } from './site';

export const pages = {
  klimatizace: {
    typ: 'klimatizace-byt',
    img: 'mhi-zt-black',
    title: 'Klimatizace s montáží – nabídka zdarma',
    h1: 'Klimatizace s montáží. Nezávazná nabídka zdarma.',
    lead: 'Tichá klimatizace Mitsubishi Heavy Industries nebo Hisense do bytu, domu i kanceláře. Montáž zajistí ověřená firma z vašeho kraje.',
    points: ['Chlazení v létě, levné topení v zimě', `Záruka až ${site.warranty.mhi} let`, 'Zaměření a nabídka zdarma'],
    faq: [
      { q: 'Kolik klimatizace stojí?', a: 'Záleží na výkonu, řadě a montáži u vás doma. Přesnou nabídku dostanete po zaměření, zdarma a nezávazně.' },
      { q: 'Jak rychle zvládnete montáž?', a: 'Ozveme se do 1 pracovního dne. Montáž jedné jednotky trvá 4 až 6 hodin, termín závisí na sezóně.' },
      { q: 'Kdo bude montovat?', a: 'Ověřená partnerská firma z vašeho kraje s osvědčením pro práci s chladivy.' },
    ],
  },
  'tepelne-cerpadlo': {
    typ: 'tepelne-cerpadlo',
    img: 'his-therma-set',
    title: 'Tepelné čerpadlo vzduch-voda – nabídka zdarma',
    h1: 'Tepelné čerpadlo pro váš dům. Návrh a nabídka zdarma.',
    lead: 'Tepelná čerpadla vzduch-voda Hisense Hi-Therma pro vytápění a ohřev vody. Navrhneme výkon podle domu a pomůžeme s programem Nová zelená úsporám.',
    points: ['Topí do −25 °C venkovní teploty', 'Pro novostavby i náhradu kotle', 'Pomoc s dotací a bezúročným úvěrem'],
    faq: [
      { q: 'Kolik tepelné čerpadlo stojí?', a: 'Záleží na velikosti a zateplení domu a na otopné soustavě. Návrh výkonu a nabídku připraví technik po prohlídce, zdarma.' },
      { q: 'Lze získat dotaci?', a: 'Domácnosti s nižšími příjmy mohou získat přímou dotaci v programu NZÚ Light, ostatní bezúročný úvěr z programu Nová zelená úsporám.' },
      { q: 'Hodí se do staršího domu?', a: 'Často ano. Rozhoduje zateplení a otopná soustava. Technik to posoudí při prohlídce zdarma.' },
    ],
  },
  'klimatizace-mitsubishi-heavy': {
    typ: 'klimatizace-byt',
    img: 'mhi-zsx-white',
    title: 'Klimatizace Mitsubishi Heavy Industries s montáží',
    h1: 'Klimatizace Mitsubishi Heavy Industries s montáží',
    lead: `Japonská klimatizace s tichým chodem od 19 dB(A) a zárukou ${site.warranty.mhi} let, z oficiální distribuce. Montáž zajistí proškolená firma z vašeho kraje.`,
    points: ['Řady Diamond, Premium a Standard', 'Topí i při −20 °C', `Záruka ${site.warranty.mhi} let`],
    faq: [
      { q: 'Proč Mitsubishi Heavy Industries?', a: 'Velmi tichý chod, vysoká účinnost až A+++ a spolehlivé topení v mrazech. Výhradním distributorem v ČR je od roku 2007 COMPLETE CZ.' },
      { q: 'Kolik stojí?', a: 'Cena závisí na řadě, barvě a montáži. Nabídku připraví proškolená firma z vašeho kraje po zaměření, zdarma.' },
      { q: 'Je to totéž co Mitsubishi Electric?', a: 'Ne, jde o dvě samostatné japonské firmy. Obě vyrábějí klimatizace.' },
    ],
  },
} as const;
