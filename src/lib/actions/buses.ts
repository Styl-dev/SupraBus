"use server";

import { db } from "@/db";
import { buses, type Bus, type NewBus } from "@/db/schema";
import { eq, sql } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export async function getBuses(): Promise<Bus[]> {
  return await db.select().from(buses).orderBy(buses.id);
}

export async function getBus(id: number): Promise<Bus | undefined> {
  const result = await db.select().from(buses).where(eq(buses.id, id));
  return result[0];
}

export async function createBus(data: NewBus): Promise<Bus> {
  const now = new Date().toISOString();
  const result = await db
    .insert(buses)
    .values({
      ...data,
      createdAt: now,
      updatedAt: now,
    })
    .returning();

  revalidatePath("/buses");
  revalidatePath("/");
  return result[0];
}

export async function updateBus(id: number, data: Partial<NewBus>): Promise<Bus> {
  const now = new Date().toISOString();
  const result = await db
    .update(buses)
    .set({
      ...data,
      updatedAt: now,
    })
    .where(eq(buses.id, id))
    .returning();

  revalidatePath("/buses");
  revalidatePath(`/buses/${id}`);
  revalidatePath("/");
  return result[0];
}

export async function deleteBus(id: number): Promise<void> {
  await db.delete(buses).where(eq(buses.id, id));
  revalidatePath("/buses");
  revalidatePath("/");
}

export async function getBusStats() {
  const totalBuses = await db
    .select({ count: sql<number>`count(*)` })
    .from(buses);

  const activeBuses = await db
    .select({ count: sql<number>`count(*)` })
    .from(buses)
    .where(eq(buses.status, "active"));

  const fleetStatus = await db
    .select({
      status: buses.status,
      count: sql<number>`count(*)`,
    })
    .from(buses)
    .groupBy(buses.status);

  return {
    total: Number(totalBuses[0].count),
    active: Number(activeBuses[0].count),
    fleetStatus: fleetStatus.map((item) => ({
      status: item.status,
      count: Number(item.count),
    })),
  };
}
