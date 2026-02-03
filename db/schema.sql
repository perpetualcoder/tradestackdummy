CREATE TABLE IF NOT EXISTS tasks (
  id BIGSERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  status TEXT NOT NULL CHECK (status IN ('todo', 'inprogress', 'review', 'done')),
  owner TEXT NOT NULL DEFAULT 'You',
  due TEXT NOT NULL DEFAULT 'Soon',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS tasks_status_idx ON tasks (status);
