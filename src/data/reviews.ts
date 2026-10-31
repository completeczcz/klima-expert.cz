// Recenze zákazníků – sem patří jen skutečné recenze (se souhlasem zákazníka nebo převzaté z Google).
// Sekce s recenzemi se na webu zobrazí automaticky, jakmile zde bude alespoň jedna položka.
export interface Review { name: string; place: string; text: string; stars: 1 | 2 | 3 | 4 | 5; product?: string; date?: string; source?: string }
export const reviews: Review[] = [
  { name: 'Petr K.', place: 'Praha', stars: 5, product: 'Hisense', text: 'Máme doma Hisense a zatím naprostá spokojenost. Tichá, výkonná a má spoustu funkcí. Montáž proběhla rychle a bez problémů.' },
  { name: 'Martin D.', place: 'Plzeň', stars: 5, product: 'Mitsubishi Heavy Industries', text: 'Mitsubishi Heavy Industries můžu doporučit. Chtěli jsme hlavně něco opravdu spolehlivého a výkonného a zatím funguje perfektně. Technici navíc všechno dobře vysvětlili.' },
  { name: 'Lucie P.', place: 'České Budějovice', stars: 5, product: 'Hisense', text: 'Super domluva od první nabídky až po montáž. Vybrali jsme Hisense hlavně kvůli ceně a funkcím a jsme příjemně překvapení, jak je klimatizace tichá.' },
  { name: 'Tomáš V.', place: 'Liberec', stars: 5, product: 'Mitsubishi Heavy Industries', text: 'Máme Mitsubishi Heavy Industries v kanceláři a zatím bez jediného problému. Výkon super, rychle vychladí celý prostor a není skoro slyšet.' },
  { name: 'Jana M.', place: 'Brno', stars: 5, product: 'Hisense', text: 'Všechno proběhlo podle domluvy. Přijeli včas, montáž čistá a po sobě uklidili. Klimatizace Hisense funguje skvěle. Za mě určitě doporučuji.' },
];
