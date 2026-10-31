// Recenze zákazníků – sem patří jen skutečné recenze (se souhlasem zákazníka nebo převzaté z Google).
// Sekce s recenzemi se na webu zobrazí automaticky, jakmile zde bude alespoň jedna položka.
export interface Review { name: string; place: string; text: string; stars: 1 | 2 | 3 | 4 | 5; product?: string; date?: string; source?: string }
export const reviews: Review[] = [];
