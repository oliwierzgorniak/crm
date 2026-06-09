import { integer, pgTable, varchar, timestamp } from "drizzle-orm/pg-core";

export const clientsTable = pgTable("clients", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  fullName: varchar({ length: 255 }).notNull(),
  telephone: varchar({ length: 255 }),
  email: varchar({ length: 255 }),
});

export const policiesTable = pgTable("policies", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  subject: varchar({ length: 255 }).notNull(),
  insuranceCompany: varchar({ length: 255 }).notNull(),
  deadline: timestamp().notNull(),
  payments: timestamp().array(),
  remarks: varchar({ length: 255 }),
  clientId: integer()
    .notNull()
    .references(() => clientsTable.id),
});
