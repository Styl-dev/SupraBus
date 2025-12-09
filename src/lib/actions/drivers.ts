"use server";

import { db } from "@/db";
import { drivers, type Driver, type NewDriver } from "@/db/schema";
import { eq, sql } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export async function getDrivers(): Promise<Driver[]> {
  return await db.select().from(drivers).orderBy(drivers.id);
}

export async function getDriver(id: number): Promise<Driver | undefined> {
  const result = await db.select().from(drivers).where(eq(drivers.id, id));
  return result[0];
}

export async function createDriver(data: NewDriver): Promise<Driver> {
  const now = new Date().toISOString();
  const result = await db
    .insert(drivers)
    .values({
      ...data,
      createdAt: now,
      updatedAt: now,
    })
    .returning();

  revalidatePath("/drivers");
  revalidatePath("/");
  return result[0];
}

export async function updateDriver(
  id: number,
  data: Partial<NewDriver>
): Promise<Driver> {
  const now = new Date().toISOString();
  const result = await db
    .update(drivers)
    .set({
      ...data,
      updatedAt: now,
    })
    .where(eq(drivers.id, id))
    .returning();

  revalidatePath("/drivers");
  revalidatePath(`/drivers/${id}`);
  revalidatePath("/");
  return result[0];
}

export async function deleteDriver(id: number): Promise<void> {
  await db.delete(drivers).where(eq(drivers.id, id));
  revalidatePath("/drivers");
  revalidatePath("/");
}

export async function getDriverStats() {
  const totalDrivers = await db
    .select({ count: sql<number>`count(*)` })
    .from(drivers);

  const availableDrivers = await db
    .select({ count: sql<number>`count(*)` })
    .from(drivers)
    .where(eq(drivers.status, "available"));

  const driverStatus = await db
    .select({
      status: drivers.status,
      count: sql<number>`count(*)`,
    })
    .from(drivers)
    .groupBy(drivers.status);

  return {
    total: Number(totalDrivers[0].count),
    available: Number(availableDrivers[0].count),
    driverStatus: driverStatus.map((item) => ({
      status: item.status,
      count: Number(item.count),
    })),
  };
}
