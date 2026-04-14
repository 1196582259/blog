import { connection } from "@/app/query/route";
export type TaskCountData = {
  date: string;
  count: number;
};

export type Comment = {
  id: number;
  email: string;
  content: string;
  created_at: Date;
};

export type Article = {
  id: number;
  title: string;
  date: Date;
  summary: string;
  content: string;
};

export async function getArticles() {
  const conn = await connection;
  const [data] = await conn.query(
    "SELECT id, title, date, summary FROM articles ORDER BY date DESC",
  );
  return data;
}

export async function getTaskCountGroupByDate() {
  const conn = await connection;
  //  查前七天的任务数量，没有则置为0
  const [data] = await conn.query(
    `WITH RECURSIVE date_series AS (
    -- 生成最近7天的日期序列
    SELECT CURDATE() - INTERVAL 6 DAY AS stat_date
    UNION ALL
    SELECT stat_date + INTERVAL 1 DAY
    FROM date_series
    WHERE stat_date < CURDATE()
)
SELECT 
    DATE_FORMAT(ds.stat_date, '%Y-%m-%d') AS date,
    COALESCE(COUNT(t.id), 0) AS count
FROM date_series ds
LEFT JOIN tasks t ON ds.stat_date = DATE_FORMAT(t.created_at, '%Y-%m-%d')
GROUP BY ds.stat_date`,
  );
  return data as TaskCountData[];
}

export async function getComments(articleId: number | undefined) {
  const conn = await connection;
  let sql =
    "SELECT id, email, content, created_at FROM comments WHERE article_id = ?";
  if (articleId === undefined) {
    sql =
      "SELECT id, email, content, created_at FROM comments WHERE article_id IS NULL ORDER BY id DESC";
  }
  const [data] = await conn.query(sql, [articleId]);
  return data as Comment[];
}

export async function submitComment(data: {
  article_id: number | undefined;
  email: string;
  content: string;
}) {
  const conn = await connection;
  const sql =
    "INSERT INTO comments (article_id, email, content) VALUES (?, ?, ?)";
  await conn.query(sql, [data.article_id, data.email, data.content]);
}

export async function getArticle(id: number) {
  const conn = await connection;
  const [data] = await conn.query(
    "SELECT id, title, date, summary, content FROM articles WHERE id = ?",
    [id],
  );
  return data as Article[];
}

export async function submitArticle(data: {
  title: string;
  summary?: string;
  content: string;
}) {
  const conn = await connection;
  const sql =
    "INSERT INTO articles (title, summary, content, date) VALUES (?, ?, ?, ?)";
  await conn.query(sql, [
    data.title,
    data.summary || "",
    data.content,
    new Date(),
  ]);
}
export type DailyQuote = {
  id: number;
  content: string;
  author: string;
  date: Date;
};
export async function getDailyQuote() {
  const conn = await connection;
  const [data] = await conn.query(
    "SELECT id, content, author, date FROM daily_quotes ORDER BY id DESC LIMIT 1",
  );
  return data as DailyQuote[];
}
export async function submitDailyQuote(data: { content: string }) {
  const conn = await connection;
  const sql = "INSERT INTO daily_quotes (content) VALUES (?)";
  const [result] = await conn.query(sql, [data.content]);
  return result;
}
export async function getDailyQuoteHistory() {
  const conn = await connection;
  const [data] = await conn.query(
    "SELECT id, content, author, date FROM daily_quotes ORDER BY date DESC",
  );
  return data as DailyQuote[];
}

export async function getArticleCountGroupByDate() {
  const conn = await connection;
  // 查前七天的文章数量，没有则置为0
  const [data] = await conn.query(
    `WITH RECURSIVE date_series AS (
    -- 生成最近7天的日期序列
    SELECT CURDATE() - INTERVAL 6 DAY AS stat_date
    UNION ALL
    SELECT stat_date + INTERVAL 1 DAY
    FROM date_series
    WHERE stat_date < CURDATE()
)
SELECT 
    DATE_FORMAT(ds.stat_date, '%Y-%m-%d') AS date,
    COALESCE(COUNT(a.id), 0) AS count
FROM date_series ds
LEFT JOIN articles a ON ds.stat_date = DATE_FORMAT(a.date, '%Y-%m-%d')
GROUP BY ds.stat_date`,
  );
  return data as TaskCountData[];
}
