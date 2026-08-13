import { index, integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const privateEventLeads = sqliteTable(
  "private_event_leads",
  {
    id: text("id").primaryKey(),
    createdAt: integer("created_at", { mode: "timestamp_ms" }).notNull(),
    occasion: text("occasion").notNull(),
    eventDate: text("event_date").notNull(),
    participants: integer("participants").notNull(),
    experience: text("experience").notNull(),
    treatmentsJson: text("treatments_json").notNull(),
    optionsJson: text("options_json").notNull(),
    firstName: text("first_name").notNull(),
    email: text("email").notNull(),
    phone: text("phone").notNull(),
    message: text("message").notNull().default(""),
    consent: integer("consent", { mode: "boolean" }).notNull(),
    status: text("status").notNull().default("new"),
    utmSource: text("utm_source").notNull().default(""),
    utmMedium: text("utm_medium").notNull().default(""),
    utmCampaign: text("utm_campaign").notNull().default(""),
    utmContent: text("utm_content").notNull().default(""),
    referrer: text("referrer").notNull().default(""),
    landingUrl: text("landing_url").notNull().default(""),
  },
  (table) => [
    index("private_event_leads_created_at_idx").on(table.createdAt),
    index("private_event_leads_status_idx").on(table.status),
    index("private_event_leads_email_idx").on(table.email),
  ],
);
