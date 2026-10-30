// Krajsky specifický obsah pro stránky /montaz-klimatizace/[kraj]/ – aby nebyly jen šablonou.
export const regionContent: Record<string, { intro: string; housing: string; climate: string; tip: string }> = {
  praha: {
    intro: 'V Praze řešíme nejčastěji klimatizace do bytů v cihlových činžovních domech, panelových sídlištích i nových developerských projektech, a k tomu rodinné domy na okraji města.',
    housing: 'Většina pražských bytů je v domech se SVJ nebo družstvem, takže venkovní jednotka na fasádě potřebuje souhlas. U domů v památkové rezervaci a památkových zónách se k umístění venkovní jednotky vyjadřují i památkáři, proto se často volí dvůr, střecha nebo lodžie.',
    climate: 'Hustá zástavba se v létě přehřívá víc než okolí a v nejteplejších dnech zůstávají byty teplé i v noci. Klimatizace v ložnici tu výrazně zlepší spánek.',
    tip: 'Praha má vlastní dotační program na tepelná čerpadla pro domácnosti. Aktuální podmínky ověřte na webu hlavního města, případně se zeptejte při poptávce.',
  },
  'stredocesky-kraj': {
    intro: 'Ve Středočeském kraji montujeme hlavně do rodinných domů a novostaveb v okolí Prahy, ale i do bytů v Kladně, Mladé Boleslavi nebo Příbrami.',
    housing: 'Nové rodinné domy v satelitech kolem Prahy mají často obytné podkroví, které se v létě přehřívá. Pro tyto domy se hodí multisplit nebo samostatné jednotky v patře, u novostaveb s podlahovým topením pak tepelné čerpadlo vzduch-voda.',
    climate: 'Kraj je rozlehlý, od teplého Polabí po chladnější Brdy a Podblanicko. Výkon tepelného čerpadla proto vždy navrhujeme podle konkrétní lokality domu.',
    tip: 'Pokud stavíte, myslete na klimatizaci už při hrubé stavbě. Předpřipravené potrubí ve zdi ušetří lišty i peníze.',
  },
  'jihocesky-kraj': {
    intro: 'V Jihočeském kraji montujeme do rodinných domů, chalup i bytů v Českých Budějovicích, Táboře, Písku a dalších městech.',
    housing: 'Převažují rodinné domy a rekreační objekty. Na chalupách se osvědčují klimatizace s temperováním místnosti na +8 °C, které v zimě drží objekt v suchu a mimo mráz za zlomek nákladů na přímotopy.',
    climate: 'Kotliny jsou v létě teplé, Šumava a Novohradské hory naopak patří k nejchladnějším místům v zemi. Pro horské oblasti doporučujeme řady, které spolehlivě topí do −20 °C a níž.',
    tip: 'U chalup oceníte Wi-Fi ovládání: dům vytopíte nebo vychladíte na dálku ještě před příjezdem.',
  },
  'plzensky-kraj': {
    intro: 'V Plzeňském kraji montujeme klimatizace do bytů v Plzni i do rodinných domů v Klatovech, Rokycanech, Domažlicích, Tachově a okolí.',
    housing: 'V Plzni je hodně panelových a cihlových bytových domů, kde se řeší souhlas SVJ a umístění venkovní jednotky na lodžii. Na venkově převažují rodinné domy, kde je montáž obvykle jednodušší.',
    climate: 'Jih kraje zasahuje na Šumavu s dlouhými a studenými zimami. Pokud chcete klimatizací i topit, vybírejte jednotky s ověřeným výkonem v mrazech.',
    tip: 'V panelovém domě se vyplatí multisplit: jedna venkovní jednotka na lodžii obslouží dva až tři pokoje.',
  },
  'karlovarsky-kraj': {
    intro: 'V Karlovarském kraji montujeme do bytů i rodinných domů v Karlových Varech, Chebu, Sokolově, Mariánských Lázních a okolí.',
    housing: 'Lázeňská centra jsou z velké části památkově chráněná, a umístění venkovní jednotky na uliční fasádě proto podléhá vyjádření památkové péče. Často je řešením dvorní strana domu nebo střecha.',
    climate: 'Kraj leží mezi Krušnými horami a Slavkovským lesem, zimy bývají chladné. Klimatizace s dobrým topným výkonem pomůže hlavně v přechodném období.',
    tip: 'U historických domů počítejte s delší přípravou: technik vám poradí, kde jednotka nebude rušit.',
  },
  'ustecky-kraj': {
    intro: 'V Ústeckém kraji montujeme do bytů v Ústí nad Labem, Teplicích, Děčíně, Mostě, Chomutově i do rodinných domů v Polabí a Podkrušnohoří.',
    housing: 'Velká část obyvatel bydlí v panelových domech, kde je potřeba souhlas SVJ nebo družstva. V rodinných domech se často řeší náhrada starého kotle tepelným čerpadlem.',
    climate: 'Polabí kolem Litoměřic patří k teplejším oblastem Čech, zatímco Krušné hory jsou chladné a větrné. Výběr jednotky proto přizpůsobíme nadmořské výšce.',
    tip: 'Klimatizace s kvalitní filtrací pomůže i v místech se zhoršenou kvalitou ovzduší, protože vzduch v místnosti průběžně čistí.',
  },
  'liberecky-kraj': {
    intro: 'V Libereckém kraji montujeme do bytů a domů v Liberci, Jablonci nad Nisou, České Lípě, Turnově a na horách.',
    housing: 'Kromě bytů ve městech je tu hodně rodinných domů a horských chalup. Pro chalupy se hodí jednotky s temperováním a Wi-Fi ovládáním.',
    climate: 'Jizerské hory a Krkonoše patří k nejchladnějším a nejvlhčím oblastem republiky. U tepelných čerpadel je tu zvlášť důležité správné dimenzování na nízké venkovní teploty.',
    tip: 'Na horách myslete na umístění venkovní jednotky mimo padající sníh ze střechy a s dostatečnou výškou nad terénem.',
  },
  'kralovehradecky-kraj': {
    intro: 'V Královéhradeckém kraji montujeme do bytů v Hradci Králové, Trutnově, Náchodě, Jičíně i do rodinných domů a krkonošských chalup.',
    housing: 'Hradec Králové má mnoho bytových domů se SVJ, venkov a podhůří rodinné domy a rekreační objekty, kde se často řeší přitápění klimatizací.',
    climate: 'Polabská nížina je v létě teplá, Krkonoše a Orlické hory naopak chladné. Jedno řešení pro celý kraj nepasuje, proto vždy navrhujeme podle místa.',
    tip: 'Na chalupě v horách oceníte jednotku, která udrží temperování +8 °C a ovládá se z mobilu.',
  },
  'pardubicky-kraj': {
    intro: 'V Pardubickém kraji montujeme do bytů v Pardubicích a Chrudimi i do rodinných domů na Svitavsku a Orlickoústecku.',
    housing: 'V Pardubicích převažují bytové domy, v okresech Svitavy a Ústí nad Orlicí rodinné domy, kde se kromě klimatizace často poptává i tepelné čerpadlo.',
    climate: 'Rovinaté Polabí má teplá léta, východ kraje s Orlickými horami je chladnější. Klimatizace tu slouží v létě ke chlazení a v přechodném období k levnému přitápění.',
    tip: 'U rodinného domu zvažte kombinaci: tepelné čerpadlo vzduch-voda na vytápění a klimatizaci do podkroví na letní horka.',
  },
  'kraj-vysocina': {
    intro: 'Na Vysočině montujeme do rodinných domů a bytů v Jihlavě, Třebíči, Havlíčkově Brodě, Žďáru nad Sázavou, Pelhřimově a v obcích po celém kraji.',
    housing: 'Převažují rodinné domy, často starší, kde se řeší výměna kotle na tuhá paliva. U takových domů je před návrhem tepelného čerpadla důležité posoudit zateplení a otopnou soustavu.',
    climate: 'Vysočina leží výš než většina republiky a zimy jsou tu delší a chladnější. Tepelné čerpadlo i klimatizace na topení proto musí mít dostatečný výkon v mrazech.',
    tip: 'Pro vytápění klimatizací vybírejte řady s provozem do −20 °C a níž, například Mitsubishi Heavy Industries Diamond nebo Hisense Air Master.',
  },
  'jihomoravsky-kraj': {
    intro: 'V Jihomoravském kraji montujeme do bytů v Brně i do rodinných domů na Znojemsku, Břeclavsku, Hodonínsku, Vyškovsku a Blanensku.',
    housing: 'Brno má velké množství bytových domů se SVJ a památkově chráněné centrum. Na jihu kraje převažují rodinné domy, kde se klimatizuje často celý dům.',
    climate: 'Jižní Morava patří k nejteplejším oblastem Česka a tropických dnů tu v létě přibývá. Klimatizace se tu stává standardní výbavou bytů i domů.',
    tip: 'V teplých oblastech se vyplatí jednotka s vysokou účinností v chlazení (SEER), protože v létě poběží hodně hodin.',
  },
  'olomoucky-kraj': {
    intro: 'V Olomouckém kraji montujeme do bytů v Olomouci, Prostějově a Přerově i do rodinných domů na Šumpersku a Jesenicku.',
    housing: 'Ve městech na Hané převažují bytové domy, na severu kraje rodinné domy a chalupy v Jeseníkách, kde se poptávají hlavně jednotky na přitápění.',
    climate: 'Haná je teplá a rovinatá, Jeseníky naopak patří k nejchladnějším oblastem. Výkon a typ jednotky přizpůsobíme nadmořské výšce.',
    tip: 'Na chalupě v Jeseníkách zvažte parapetní jednotku, která výborně topí a fouká teplý vzduch u podlahy.',
  },
  'zlinsky-kraj': {
    intro: 'Ve Zlínském kraji montujeme do bytů ve Zlíně, Uherském Hradišti, Kroměříži a Vsetíně i do rodinných domů na Valašsku a Slovácku.',
    housing: 'Kromě bytových domů ve městech je tu mnoho rodinných domů, kde se klimatizace často kombinuje s fotovoltaikou na střeše.',
    climate: 'Slovácko a okolí Kroměříže mají teplá léta, Valašsko a Beskydy jsou chladnější a vlhčí. Pro horské obce doporučujeme jednotky se silným topným výkonem.',
    tip: 'Máte fotovoltaiku? Klimatizace v létě spotřebuje elektřinu právě tehdy, když panely nejvíc vyrábějí.',
  },
  'moravskoslezsky-kraj': {
    intro: 'V Moravskoslezském kraji montujeme do bytů v Ostravě, Havířově, Karviné, Opavě a Frýdku-Místku i do rodinných domů v podhůří Beskyd a Jeseníků.',
    housing: 'Velká část obyvatel bydlí v panelových domech, kde se řeší souhlas SVJ a umístění na lodžii. V rodinných domech se často nahrazuje starý kotel tepelným čerpadlem.',
    climate: 'Kraj má chladnější zimy a v zimě se tu řeší kvalita ovzduší. Klimatizace s kvalitní filtrací vzduch v místnosti průběžně čistí a tepelné čerpadlo nahradí kotel bez kouře z komína.',
    tip: 'Při náhradě kotle na tuhá paliva se informujte o programu Nová zelená úsporám, který výměnu podporuje.',
  },
};
