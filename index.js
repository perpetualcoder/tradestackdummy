import path from "node:path";
import { fileURLToPath } from "node:url";
import express from "express";
import pg from "pg";

const { Pool } = pg;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const port = process.env.PORT ? Number(process.env.PORT) : 3000;
const databaseUrl =
  process.env.DATABASE_URL ??
  "postgresql://neondb_owner:npg_UPB5tzvIWx3c@ep-lucky-mouse-aip2n7am-pooler.c-4.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require";

const pool = new Pool({
  connectionString: databaseUrl,
});

const app = express();

app.use(express.json());
app.use(express.static(__dirname));

app.get("/api/tasks", async (_req, res) => {
  try {
    const result = await pool.query(
      "SELECT id, title, status, owner, due, created_at, updated_at FROM tasks ORDER BY created_at DESC"
    );
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to load tasks." });
  }
});

app.post("/api/tasks", async (req, res) => {
  const { title, status, owner, due } = req.body ?? {};
  if (!title || !status) {
    res.status(400).json({ error: "title and status are required." });
    return;
  }

  try {
    const result = await pool.query(
      `INSERT INTO tasks (title, status, owner, due)
       VALUES ($1, $2, $3, $4)
       RETURNING id, title, status, owner, due, created_at, updated_at`,
      [title, status, owner ?? "You", due ?? "Soon"]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to create task." });
  }
});

app.patch("/api/tasks/:id", async (req, res) => {
  const { id } = req.params;
  const { title, status, owner, due } = req.body ?? {};

  try {
    const result = await pool.query(
      `UPDATE tasks
       SET title = COALESCE($2, title),
           status = COALESCE($3, status),
           owner = COALESCE($4, owner),
           due = COALESCE($5, due),
           updated_at = NOW()
       WHERE id = $1
       RETURNING id, title, status, owner, due, created_at, updated_at`,
      [id, title, status, owner, due]
    );

    if (result.rowCount === 0) {
      res.status(404).json({ error: "Task not found." });
      return;
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to update task." });
  }
});

app.delete("/api/tasks/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query("DELETE FROM tasks WHERE id = $1", [id]);
    if (result.rowCount === 0) {
      res.status(404).json({ error: "Task not found." });
      return;
    }
    res.status(204).send();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to delete task." });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
