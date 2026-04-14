import mysql from "mysql2/promise";

export const connection = mysql.createConnection({
  host: "localhost",
  user: process.env.DATABASE_USER || "root",
  password: process.env.DATABASE_PASSWORD || "",
  database: process.env.DATABASE_NAME || "growth_moments",
});

export async function GET() {
  const conn = await connection;
  const [data] = await conn.query("SELECT * FROM articles");
  return new Response(JSON.stringify(data), {
    headers: {
      "Content-Type": "application/json",
    },
  });
}
