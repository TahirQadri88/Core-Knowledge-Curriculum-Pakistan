-- Ilm Track family sync: Cloudflare D1 (SQLite) tables.
-- Paste this whole file into the D1 console (Cloudflare dashboard > Storage & Databases > D1 > your database > Console)
-- once for "ilmtrack" and once for "ilmtrack-preview". It is safe to run again: nothing is dropped.

-- A parent signs in with Google (google_sub set). A child's phone joins with a one-time code (google_sub NULL).
CREATE TABLE IF NOT EXISTS users (
  id         TEXT PRIMARY KEY,
  google_sub TEXT UNIQUE,
  email      TEXT,
  name       TEXT NOT NULL,
  created    INTEGER NOT NULL
);

-- Only a hash of each session token is stored, so a copy of the database cannot be used to sign in.
CREATE TABLE IF NOT EXISTS sessions (
  token_hash TEXT PRIMARY KEY,
  user_id    TEXT NOT NULL,
  expires    INTEGER NOT NULL
);
CREATE INDEX IF NOT EXISTS sessions_user ON sessions(user_id);

CREATE TABLE IF NOT EXISTS families (
  id      TEXT PRIMARY KEY,
  name    TEXT NOT NULL,
  owner   TEXT NOT NULL,
  created INTEGER NOT NULL
);

CREATE TABLE IF NOT EXISTS members (
  family_id TEXT NOT NULL,
  user_id   TEXT NOT NULL,
  role      TEXT NOT NULL CHECK (role IN ('parent', 'child')),
  created   INTEGER NOT NULL,
  PRIMARY KEY (family_id, user_id)
);
CREATE INDEX IF NOT EXISTS members_user ON members(user_id);

-- One-time invite codes, stored as hashes. used_by is set when the code is used; a used code never works again.
CREATE TABLE IF NOT EXISTS invites (
  code_hash  TEXT PRIMARY KEY,
  family_id  TEXT NOT NULL,
  role       TEXT NOT NULL CHECK (role IN ('parent', 'child')),
  created_by TEXT NOT NULL,
  expires    INTEGER NOT NULL,
  used_by    TEXT
);
CREATE INDEX IF NOT EXISTS invites_family ON invites(family_id);

-- Each child's details (name, class, books, routine list, reading stage) as one JSON document.
CREATE TABLE IF NOT EXISTS children (
  family_id TEXT NOT NULL,
  id        TEXT NOT NULL,
  doc       TEXT NOT NULL,
  deleted   INTEGER NOT NULL DEFAULT 0,
  updated   INTEGER NOT NULL,
  by_user   TEXT NOT NULL,
  PRIMARY KEY (family_id, id)
);
CREATE INDEX IF NOT EXISTS children_updated ON children(family_id, updated);

-- One row per tick, note, character level, surah or routine tick. v is JSON; NULL means removed.
-- Keys: s:<item id> status, n:<item id> note, cv:<quality id> character level, q:<surah> hifz, r:<YYYY-MM-DD>:<routine item id>.
CREATE TABLE IF NOT EXISTS marks (
  family_id TEXT NOT NULL,
  child_id  TEXT NOT NULL,
  k         TEXT NOT NULL,
  v         TEXT,
  updated   INTEGER NOT NULL,
  by_user   TEXT NOT NULL,
  PRIMARY KEY (family_id, child_id, k)
);
CREATE INDEX IF NOT EXISTS marks_updated ON marks(family_id, updated);

-- Failed invite-code attempts per network address per hour, to slow down guessing.
CREATE TABLE IF NOT EXISTS attempts (
  ip    TEXT NOT NULL,
  hour  INTEGER NOT NULL,
  n     INTEGER NOT NULL,
  PRIMARY KEY (ip, hour)
);
