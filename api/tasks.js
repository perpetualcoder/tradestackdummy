import { getPool } from "./_db.js";

export default async function handler(req, res) {
  const pool = getPool();

  if (req.method === "GET") {
    try {
      const result = await pool.query(
        "SELECT id, title, status, owner, due, created_at, updated_at FROM tasks ORDER BY created_at DESC"
      );
      res.status(200).json(result.rows);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to load tasks." });
    }
    return;
  }

  if (req.method === "POST") {
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
    return;
  }

  res.status(405).json({ error: "Method not allowed." });
}
