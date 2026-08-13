import {
  pgTable,
  serial,
  text,
  timestamp,
  uniqueIndex,
} from "drizzle-orm/pg-core"

export const urls = pgTable(
  "urls",
  {
    id: serial("id").primaryKey(),

    originalUrl: text("original_url").notNull(),

    shortCode: text("short_code").notNull(),

    createdAt: timestamp("created_at", {
      withTimezone: true,
    })
      .defaultNow()
      .notNull(),
  },
  (table) => ({
    shortCodeIndex: uniqueIndex("urls_short_code_idx").on(table.shortCode),
  }),
)