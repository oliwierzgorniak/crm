import { Hono } from "hono";
import { cors } from "hono/cors";
import "dotenv/config";
import { between } from "drizzle-orm";
import { drizzle } from "drizzle-orm/node-postgres";
import { policiesTable } from "./db/schema";
import dayjs from "dayjs";

const db = drizzle(process.env.DATABASE_URL!);

export const app = new Hono().use(cors()).get("/currentPolicies", async (c) => {
  const dateFrom = dayjs().startOf("month").toDate();
  const dateTo = dayjs().endOf("month").toDate();

  const policies = await db
    .select()
    .from(policiesTable)
    .where(between(policiesTable.deadline, dateFrom, dateTo));

  return c.json(policies);
});

export default app;
