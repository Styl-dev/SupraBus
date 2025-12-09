import { sql } from "drizzle-orm";
import { integer, real, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const buses = sqliteTable("buses", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  plateNumber: text("plate_number").notNull().unique(),
  model: text("model").notNull(),
  capacity: integer("capacity").notNull(),
  year: integer("year").notNull(),
  status: text("status", { enum: ["active", "maintenance", "retired"] })
    .notNull()
    .default("active"),
  mileage: integer("mileage").notNull().default(0),
  lastMaintenanceDate: text("last_maintenance_date"),
  createdAt: text("created_at").default(sql`CURRENT_TIMESTAMP`),
  updatedAt: text("updated_at").default(sql`CURRENT_TIMESTAMP`),
});

export const drivers = sqliteTable("drivers", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name").notNull(),
  licenseNumber: text("license_number").notNull().unique(),
  phone: text("phone").notNull(),
  email: text("email"),
  status: text("status", {
    enum: ["available", "on_duty", "off_duty", "on_leave"],
  })
    .notNull()
    .default("available"),
  hireDate: text("hire_date").notNull(),
  totalTrips: integer("total_trips").notNull().default(0),
  rating: real("rating").notNull().default(5.0),
  createdAt: text("created_at").default(sql`CURRENT_TIMESTAMP`),
  updatedAt: text("updated_at").default(sql`CURRENT_TIMESTAMP`),
});

export const routes = sqliteTable("routes", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name").notNull(),
  origin: text("origin").notNull(),
  destination: text("destination").notNull(),
  distanceKm: real("distance_km").notNull(),
  estimatedDurationMins: integer("estimated_duration_mins").notNull(),
  status: text("status", { enum: ["active", "suspended", "discontinued"] })
    .notNull()
    .default("active"),
  frequencyPerDay: integer("frequency_per_day").notNull().default(1),
  fare: real("fare").notNull(),
  createdAt: text("created_at").default(sql`CURRENT_TIMESTAMP`),
  updatedAt: text("updated_at").default(sql`CURRENT_TIMESTAMP`),
});

// TypeScript types
export type Bus = typeof buses.$inferSelect;
export type NewBus = typeof buses.$inferInsert;

export type Driver = typeof drivers.$inferSelect;
export type NewDriver = typeof drivers.$inferInsert;

export type Route = typeof routes.$inferSelect;
export type NewRoute = typeof routes.$inferInsert;
