"use server";

import { db } from "@/db";
import { routes, type Route, type NewRoute } from "@/db/schema";
import { eq, sql, desc } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export async function getRoutes(): Promise<Route[]> {
  return await db.select().from(routes).orderBy(routes.id);
}

export async function getRoute(id: number): Promise<Route | undefined> {
  const result = await db.select().from(routes).where(eq(routes.id, id));
  return result[0];
}

export async function createRoute(data: NewRoute): Promise<Route> {
  const now = new Date().toISOString();
  const result = await db
    .insert(routes)
    .values({
      ...data,
      createdAt: now,
      updatedAt: now,
    })
    .returning();

  revalidatePath("/routes");
  revalidatePath("/");
  return result[0];
}

export async function updateRoute(
  id: number,
  data: Partial<NewRoute>
): Promise<Route> {
  const now = new Date().toISOString();
  const result = await db
    .update(routes)
    .set({
      ...data,
      updatedAt: now,
    })
    .where(eq(routes.id, id))
    .returning();

  revalidatePath("/routes");
  revalidatePath(`/routes/${id}`);
  revalidatePath("/");
  return result[0];
}

export async function deleteRoute(id: number): Promise<void> {
  await db.delete(routes).where(eq(routes.id, id));
  revalidatePath("/routes");
  revalidatePath("/");
}

export async function getRouteStats() {
  const totalRoutes = await db
    .select({ count: sql<number>`count(*)` })
    .from(routes);

  const activeRoutes = await db
    .select({ count: sql<number>`count(*)` })
    .from(routes)
    .where(eq(routes.status, "active"));

  const totalCoverage = await db
    .select({
      coverage: sql<number>`sum(distance_km * frequency_per_day)`,
    })
    .from(routes)
    .where(eq(routes.status, "active"));

  const topRoutes = await db
    .select({
      name: routes.name,
      revenue: sql<number>`fare * frequency_per_day`,
    })
    .from(routes)
    .where(eq(routes.status, "active"))
    .orderBy(desc(sql`fare * frequency_per_day`))
    .limit(5);

  return {
    total: Number(totalRoutes[0].count),
    active: Number(activeRoutes[0].count),
    totalCoverage: Number(totalCoverage[0].coverage) || 0,
    topRoutes: topRoutes.map((route) => ({
      name: route.name,
      revenue: Number(route.revenue),
    })),
  };
}
