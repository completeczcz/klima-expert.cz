-- D1 schéma pro klima-expert.cz
CREATE TABLE IF NOT EXISTS leads (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  typ TEXT NOT NULL,
  detail TEXT,
  psc TEXT, obec TEXT, kraj TEXT, termin TEXT,
  jmeno TEXT, telefon TEXT, email TEXT, poznamka TEXT,
  zdroj_stranky TEXT, kampan TEXT, gclid TEXT,
  ip_hash TEXT, user_agent TEXT,
  stav TEXT NOT NULL DEFAULT 'nová',          -- nová / předaná / zaměřeno / realizováno / ztracená
  partner TEXT,                               -- komu byla poptávka předána
  predano_at TEXT,
  poznamka_interni TEXT
);
CREATE INDEX IF NOT EXISTS idx_leads_created ON leads(created_at);
CREATE INDEX IF NOT EXISTS idx_leads_kraj ON leads(kraj);
CREATE INDEX IF NOT EXISTS idx_leads_ip ON leads(ip_hash, created_at);

CREATE TABLE IF NOT EXISTS partners (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  firma TEXT, ico TEXT, jmeno TEXT, telefon TEXT, email TEXT, kraje TEXT, poznamka TEXT,
  stav TEXT NOT NULL DEFAULT 'nový'
);
