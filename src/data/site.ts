// Centrální údaje webu – změny zde se propíšou do celého webu.
export const site = {
  name: 'Klima Expert',
  domain: 'klima-expert.cz',
  url: 'https://klima-expert.cz',
  tagline: 'Klimatizace a tepelná čerpadla s montáží po celé ČR',
  phone: '+420 608 543 471',
  phoneHref: 'tel:+420608543471',
  email: 'info@klima-expert.cz',
  hours: 'Po–Pá 8:00–17:00',
  responseTime: 'do 1 pracovního dne',
  company: {
    name: 'Petrovka Development s.r.o.',
    ico: '24590657',
    dic: 'CZ24590657',
    // TODO: doplnit sídlo a spisovou značku z obchodního rejstříku
    address: '[sídlo doplnit]',
    register: '[spisová značka doplnit]',
  },
  partner: {
    name: 'COMPLETE CZ, spol. s r.o.',
    note: 'výhradní distributor Mitsubishi Heavy Industries pro ČR a SR od roku 2007 a distributor Hisense',
  },
  warranty: { mhi: 5, hisense: 3 },
  // Měření – vyplnit ID; prázdné = skript se nenačte.
  analytics: {
    gtmId: '',
    ga4Id: '',
    adsId: '', // AW-XXXXXXXXX
    adsLeadLabel: '', // conversion label pro odeslanou poptávku
  },
  turnstileSiteKey: '0x4AAAAAAFsZNSh4hbxF6CB7', // Cloudflare Turnstile – veřejný klíč
};

export const regions = [
  { slug: 'praha', name: 'Praha', locative: 'v Praze', okresy: ['Praha 1–22'], cities: ['Praha'] },
  { slug: 'stredocesky-kraj', name: 'Středočeský kraj', locative: 've Středočeském kraji', okresy: ['Benešov', 'Beroun', 'Kladno', 'Kolín', 'Kutná Hora', 'Mělník', 'Mladá Boleslav', 'Nymburk', 'Praha-východ', 'Praha-západ', 'Příbram', 'Rakovník'], cities: ['Kladno', 'Mladá Boleslav', 'Příbram', 'Kolín', 'Benešov', 'Beroun', 'Říčany', 'Brandýs nad Labem'] },
  { slug: 'jihocesky-kraj', name: 'Jihočeský kraj', locative: 'v Jihočeském kraji', okresy: ['České Budějovice', 'Český Krumlov', 'Jindřichův Hradec', 'Písek', 'Prachatice', 'Strakonice', 'Tábor'], cities: ['České Budějovice', 'Tábor', 'Písek', 'Strakonice', 'Jindřichův Hradec', 'Český Krumlov'] },
  { slug: 'plzensky-kraj', name: 'Plzeňský kraj', locative: 'v Plzeňském kraji', okresy: ['Domažlice', 'Klatovy', 'Plzeň-jih', 'Plzeň-město', 'Plzeň-sever', 'Rokycany', 'Tachov'], cities: ['Plzeň', 'Klatovy', 'Rokycany', 'Domažlice', 'Tachov'] },
  { slug: 'karlovarsky-kraj', name: 'Karlovarský kraj', locative: 'v Karlovarském kraji', okresy: ['Cheb', 'Karlovy Vary', 'Sokolov'], cities: ['Karlovy Vary', 'Cheb', 'Sokolov', 'Mariánské Lázně', 'Ostrov'] },
  { slug: 'ustecky-kraj', name: 'Ústecký kraj', locative: 'v Ústeckém kraji', okresy: ['Děčín', 'Chomutov', 'Litoměřice', 'Louny', 'Most', 'Teplice', 'Ústí nad Labem'], cities: ['Ústí nad Labem', 'Teplice', 'Děčín', 'Most', 'Chomutov', 'Litoměřice'] },
  { slug: 'liberecky-kraj', name: 'Liberecký kraj', locative: 'v Libereckém kraji', okresy: ['Česká Lípa', 'Jablonec nad Nisou', 'Liberec', 'Semily'], cities: ['Liberec', 'Jablonec nad Nisou', 'Česká Lípa', 'Turnov', 'Semily'] },
  { slug: 'kralovehradecky-kraj', name: 'Královéhradecký kraj', locative: 'v Královéhradeckém kraji', okresy: ['Hradec Králové', 'Jičín', 'Náchod', 'Rychnov nad Kněžnou', 'Trutnov'], cities: ['Hradec Králové', 'Trutnov', 'Náchod', 'Jičín', 'Dvůr Králové nad Labem'] },
  { slug: 'pardubicky-kraj', name: 'Pardubický kraj', locative: 'v Pardubickém kraji', okresy: ['Chrudim', 'Pardubice', 'Svitavy', 'Ústí nad Orlicí'], cities: ['Pardubice', 'Chrudim', 'Svitavy', 'Ústí nad Orlicí', 'Litomyšl'] },
  { slug: 'kraj-vysocina', name: 'Kraj Vysočina', locative: 'na Vysočině', okresy: ['Havlíčkův Brod', 'Jihlava', 'Pelhřimov', 'Třebíč', 'Žďár nad Sázavou'], cities: ['Jihlava', 'Třebíč', 'Havlíčkův Brod', 'Žďár nad Sázavou', 'Pelhřimov'] },
  { slug: 'jihomoravsky-kraj', name: 'Jihomoravský kraj', locative: 'v Jihomoravském kraji', okresy: ['Blansko', 'Brno-město', 'Brno-venkov', 'Břeclav', 'Hodonín', 'Vyškov', 'Znojmo'], cities: ['Brno', 'Znojmo', 'Hodonín', 'Břeclav', 'Vyškov', 'Blansko'] },
  { slug: 'olomoucky-kraj', name: 'Olomoucký kraj', locative: 'v Olomouckém kraji', okresy: ['Jeseník', 'Olomouc', 'Prostějov', 'Přerov', 'Šumperk'], cities: ['Olomouc', 'Prostějov', 'Přerov', 'Šumperk', 'Jeseník'] },
  { slug: 'zlinsky-kraj', name: 'Zlínský kraj', locative: 've Zlínském kraji', okresy: ['Kroměříž', 'Uherské Hradiště', 'Vsetín', 'Zlín'], cities: ['Zlín', 'Uherské Hradiště', 'Kroměříž', 'Vsetín', 'Valašské Meziříčí'] },
  { slug: 'moravskoslezsky-kraj', name: 'Moravskoslezský kraj', locative: 'v Moravskoslezském kraji', okresy: ['Bruntál', 'Frýdek-Místek', 'Karviná', 'Nový Jičín', 'Opava', 'Ostrava-město'], cities: ['Ostrava', 'Opava', 'Frýdek-Místek', 'Havířov', 'Karviná', 'Nový Jičín'] },
] as const;

export const nav = [
  { href: '/klimatizace/', label: 'Klimatizace' },
  { href: '/tepelna-cerpadla/', label: 'Tepelná čerpadla' },
  { href: '/produkty/', label: 'Produkty' },
  { href: '/cena-klimatizace/', label: 'Ceny' },
  { href: '/servis-klimatizace/', label: 'Servis' },
  { href: '/blog/', label: 'Poradna' },
];
