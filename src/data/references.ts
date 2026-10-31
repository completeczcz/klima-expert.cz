// Skutečné realizace (fotky a popisy dodal provozovatel). Nové přidávejte na začátek seznamu.
export interface Reference { img: string; img2?: string; tag: string; t: string; zarizeni: string; rozsah: string; featured?: boolean }
export const references: Reference[] = [
  { img: 'ref-zt-uvnitr', img2: 'ref-zt-venku', tag: 'Rodinný dům', t: 'Rodinný dům – celé v černé', zarizeni: 'Mitsubishi Heavy Industries Premium ZT, černá vnitřní i venkovní jednotka', rozsah: 'Montáž single split, venkovní jednotka na podstavcích u domu', featured: true },
  { img: 'ref-dum-praha-zapad', tag: 'Rodinný dům', t: 'Rodinný dům – Praha-západ', zarizeni: 'Hisense multisplit', rozsah: 'Multisplit 8,1 kW se 4 vnitřními jednotkami' },
  { img: 'ref-kancelar-podebrady', tag: 'Kancelář', t: 'Kancelářský prostor – Poděbrady', zarizeni: 'Mitsubishi Heavy Industries, podstropní jednotky', rozsah: '2× single split, celkem 25 kW' },
  { img: 'ref-kavarna-praha10', tag: 'Komerční objekt', t: 'Kavárna – Praha 10', zarizeni: 'Mitsubishi Heavy Industries FDTC (kazetová)', rozsah: 'Montáž 1× split, průchod fasádou, elektroinstalace' },
  { img: 'ref-vrf-cb', tag: 'Komerční objekt', t: 'Komerční objekt – České Budějovice', zarizeni: 'Mitsubishi Heavy Industries VRF', rozsah: 'VRF systém pro celou budovu' },
];
