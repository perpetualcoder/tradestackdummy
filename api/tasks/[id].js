import { getPool } from "../_db.js";

export default async function handler(req, res) {
  const pool = getPool();
  const { id } = req.query;

  if (!id) {
    res.status(400).json({ error: "Task id is required." });
    return;
  }

  if (req.method === "PATCH") {
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

      res.status(200).json(result.rows[0]);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to update task." });
    }
    return;
  }

  if (req.method === "DELETE") {
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
    return;
  }

  res.status(405).json({ error: "Method not allowed." });
}
