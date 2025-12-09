import { db } from "./index";
import { buses, drivers, routes } from "./schema";

async function seed() {
  console.log("🌱 Seeding database...");

  // Clear existing data
  await db.delete(buses);
  await db.delete(drivers);
  await db.delete(routes);

  // Seed buses
  await db.insert(buses).values([
    {
      plateNumber: "BUS-001",
      model: "Mercedes-Benz Citaro",
      capacity: 50,
      year: 2020,
      status: "active",
      mileage: 45000,
      lastMaintenanceDate: "2025-11-15",
    },
    {
      plateNumber: "BUS-002",
      model: "Volvo 7900",
      capacity: 45,
      year: 2021,
      status: "active",
      mileage: 32000,
      lastMaintenanceDate: "2025-11-20",
    },
    {
      plateNumber: "BUS-003",
      model: "MAN Lion's City",
      capacity: 55,
      year: 2019,
      status: "maintenance",
      mileage: 67000,
      lastMaintenanceDate: "2025-12-01",
    },
    {
      plateNumber: "BUS-004",
      model: "Scania Citywide",
      capacity: 48,
      year: 2022,
      status: "active",
      mileage: 15000,
      lastMaintenanceDate: "2025-11-25",
    },
    {
      plateNumber: "BUS-005",
      model: "Iveco Urbanway",
      capacity: 52,
      year: 2018,
      status: "retired",
      mileage: 125000,
      lastMaintenanceDate: "2025-10-05",
    },
  ]);

  // Seed drivers
  await db.insert(drivers).values([
    {
      name: "John Smith",
      licenseNumber: "DL-2018-001",
      phone: "+1-555-0101",
      email: "john.smith@suprabus.com",
      status: "on_duty",
      hireDate: "2020-03-15",
      totalTrips: 1250,
      rating: 4.8,
    },
    {
      name: "Maria Garcia",
      licenseNumber: "DL-2019-045",
      phone: "+1-555-0102",
      email: "maria.garcia@suprabus.com",
      status: "available",
      hireDate: "2019-06-20",
      totalTrips: 1580,
      rating: 4.9,
    },
    {
      name: "David Chen",
      licenseNumber: "DL-2020-112",
      phone: "+1-555-0103",
      email: "david.chen@suprabus.com",
      status: "on_duty",
      hireDate: "2021-01-10",
      totalTrips: 890,
      rating: 4.7,
    },
    {
      name: "Sarah Johnson",
      licenseNumber: "DL-2021-089",
      phone: "+1-555-0104",
      email: "sarah.johnson@suprabus.com",
      status: "off_duty",
      hireDate: "2022-04-05",
      totalTrips: 450,
      rating: 4.9,
    },
    {
      name: "Ahmed Hassan",
      licenseNumber: "DL-2017-234",
      phone: "+1-555-0105",
      email: "ahmed.hassan@suprabus.com",
      status: "on_leave",
      hireDate: "2018-09-12",
      totalTrips: 2100,
      rating: 5.0,
    },
  ]);

  // Seed routes
  await db.insert(routes).values([
    {
      name: "Route 101",
      origin: "Downtown Terminal",
      destination: "Airport",
      distanceKm: 25.5,
      estimatedDurationMins: 45,
      status: "active",
      frequencyPerDay: 12,
      fare: 5.5,
    },
    {
      name: "Route 202",
      origin: "Central Station",
      destination: "University Campus",
      distanceKm: 15.2,
      estimatedDurationMins: 30,
      status: "active",
      frequencyPerDay: 20,
      fare: 3.0,
    },
    {
      name: "Route 303",
      origin: "Shopping Mall",
      destination: "Beach Resort",
      distanceKm: 32.8,
      estimatedDurationMins: 55,
      status: "active",
      frequencyPerDay: 8,
      fare: 7.5,
    },
    {
      name: "Route 404",
      origin: "Hospital",
      destination: "Old Town",
      distanceKm: 12.0,
      estimatedDurationMins: 25,
      status: "suspended",
      frequencyPerDay: 6,
      fare: 2.5,
    },
    {
      name: "Route 505",
      origin: "Business District",
      destination: "Residential Area",
      distanceKm: 18.5,
      estimatedDurationMins: 35,
      status: "active",
      frequencyPerDay: 15,
      fare: 4.0,
    },
  ]);

  console.log("✅ Database seeded successfully!");
}

seed()
  .catch((error) => {
    console.error("❌ Error seeding database:", error);
    process.exit(1);
  })
  .finally(() => {
    process.exit(0);
  });
