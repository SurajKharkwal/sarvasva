
// Drizzle ORM schema for MySQL
import { sql } from "drizzle-orm";
import { index, mysqlTableCreator } from "drizzle-orm/mysql-core";

export const createTable = mysqlTableCreator((name) => `drizzle_${name}`);

export const posts = createTable(
  "post",
  (d) => ({
    id: d.int().primaryKey().autoincrement(),
    name: d.varchar({ length: 256 }),
    createdAt: d.timestamp().default(sql`CURRENT_TIMESTAMP`).notNull(),
    updatedAt: d.timestamp().onUpdateNow(),
  }),
  (t) => [index("name_idx").on(t.name)],
);
