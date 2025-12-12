import 'dotenv/config'
import { getPayload } from 'payload'
import config from '@payload-config'

const seed = async () => {
  const payload = await getPayload({ config })

  console.log('Seeding database...')

  // Clear existing data
  console.log('Clearing existing data...')
  await payload.delete({ collection: 'buses', where: {} })
  await payload.delete({ collection: 'drivers', where: {} })
  await payload.delete({ collection: 'routes', where: {} })

  // Create Drivers
  console.log('Creating drivers...')
  const drivers = await Promise.all([
    payload.create({
      collection: 'drivers',
      data: {
        firstName: 'John',
        lastName: 'Smith',
        email: 'john.smith@fleetmanager.com',
        phone: '+1 555-0101',
        dateOfBirth: '1985-03-15',
        address: '123 Main Street, Springfield, IL 62701',
        licenseNumber: 'DL-2024-001',
        licenseType: 'class-a',
        licenseExpiry: '2026-03-15',
        status: 'on-duty',
        hireDate: '2020-01-15',
        emergencyContact: {
          name: 'Jane Smith',
          phone: '+1 555-0102',
          relationship: 'Spouse',
        },
      },
    }),
    payload.create({
      collection: 'drivers',
      data: {
        firstName: 'Maria',
        lastName: 'Garcia',
        email: 'maria.garcia@fleetmanager.com',
        phone: '+1 555-0103',
        dateOfBirth: '1990-07-22',
        address: '456 Oak Avenue, Springfield, IL 62702',
        licenseNumber: 'DL-2024-002',
        licenseType: 'class-a',
        licenseExpiry: '2025-07-22',
        status: 'available',
        hireDate: '2021-06-01',
        emergencyContact: {
          name: 'Carlos Garcia',
          phone: '+1 555-0104',
          relationship: 'Brother',
        },
      },
    }),
    payload.create({
      collection: 'drivers',
      data: {
        firstName: 'Robert',
        lastName: 'Johnson',
        email: 'robert.johnson@fleetmanager.com',
        phone: '+1 555-0105',
        dateOfBirth: '1982-11-08',
        address: '789 Pine Road, Springfield, IL 62703',
        licenseNumber: 'DL-2024-003',
        licenseType: 'class-b',
        licenseExpiry: '2025-11-08',
        status: 'on-duty',
        hireDate: '2019-03-20',
        emergencyContact: {
          name: 'Linda Johnson',
          phone: '+1 555-0106',
          relationship: 'Wife',
        },
      },
    }),
    payload.create({
      collection: 'drivers',
      data: {
        firstName: 'Emily',
        lastName: 'Davis',
        email: 'emily.davis@fleetmanager.com',
        phone: '+1 555-0107',
        dateOfBirth: '1995-02-28',
        address: '321 Elm Street, Springfield, IL 62704',
        licenseNumber: 'DL-2024-004',
        licenseType: 'class-a',
        licenseExpiry: '2026-02-28',
        status: 'off-duty',
        hireDate: '2022-09-10',
        emergencyContact: {
          name: 'Michael Davis',
          phone: '+1 555-0108',
          relationship: 'Father',
        },
      },
    }),
    payload.create({
      collection: 'drivers',
      data: {
        firstName: 'James',
        lastName: 'Wilson',
        email: 'james.wilson@fleetmanager.com',
        phone: '+1 555-0109',
        dateOfBirth: '1988-06-14',
        address: '654 Maple Drive, Springfield, IL 62705',
        licenseNumber: 'DL-2024-005',
        licenseType: 'class-a',
        licenseExpiry: '2025-06-14',
        status: 'on-leave',
        hireDate: '2018-11-05',
        emergencyContact: {
          name: 'Sarah Wilson',
          phone: '+1 555-0110',
          relationship: 'Wife',
        },
      },
    }),
    payload.create({
      collection: 'drivers',
      data: {
        firstName: 'Sarah',
        lastName: 'Martinez',
        email: 'sarah.martinez@fleetmanager.com',
        phone: '+1 555-0111',
        dateOfBirth: '1992-09-03',
        address: '987 Cedar Lane, Springfield, IL 62706',
        licenseNumber: 'DL-2024-006',
        licenseType: 'class-b',
        licenseExpiry: '2026-09-03',
        status: 'available',
        hireDate: '2023-01-15',
        emergencyContact: {
          name: 'Ana Martinez',
          phone: '+1 555-0112',
          relationship: 'Mother',
        },
      },
    }),
    payload.create({
      collection: 'drivers',
      data: {
        firstName: 'David',
        lastName: 'Brown',
        email: 'david.brown@fleetmanager.com',
        phone: '+1 555-0113',
        dateOfBirth: '1980-12-25',
        address: '147 Birch Court, Springfield, IL 62707',
        licenseNumber: 'DL-2024-007',
        licenseType: 'class-a',
        licenseExpiry: '2025-12-25',
        status: 'inactive',
        hireDate: '2017-05-20',
        emergencyContact: {
          name: 'Patricia Brown',
          phone: '+1 555-0114',
          relationship: 'Wife',
        },
      },
    }),
    payload.create({
      collection: 'drivers',
      data: {
        firstName: 'Jennifer',
        lastName: 'Taylor',
        email: 'jennifer.taylor@fleetmanager.com',
        phone: '+1 555-0115',
        dateOfBirth: '1993-04-17',
        address: '258 Walnut Street, Springfield, IL 62708',
        licenseNumber: 'DL-2024-008',
        licenseType: 'class-a',
        licenseExpiry: '2026-04-17',
        status: 'on-duty',
        hireDate: '2021-08-01',
        emergencyContact: {
          name: 'Mark Taylor',
          phone: '+1 555-0116',
          relationship: 'Husband',
        },
      },
    }),
  ])

  console.log(`Created ${drivers.length} drivers`)

  // Create Buses
  console.log('Creating buses...')
  const buses = await Promise.all([
    payload.create({
      collection: 'buses',
      data: {
        plateNumber: 'BUS-001',
        model: 'Citaro G',
        manufacturer: 'Mercedes-Benz',
        year: 2022,
        capacity: 45,
        status: 'active',
        currentDriver: drivers[0].id,
        mileage: 45230,
        lastMaintenanceDate: '2024-10-15',
        nextMaintenanceDate: '2025-01-15',
        notes: 'Flagship articulated bus, excellent condition',
      },
    }),
    payload.create({
      collection: 'buses',
      data: {
        plateNumber: 'BUS-002',
        model: 'Lion\'s City',
        manufacturer: 'MAN',
        year: 2021,
        capacity: 38,
        status: 'active',
        currentDriver: drivers[2].id,
        mileage: 67890,
        lastMaintenanceDate: '2024-09-20',
        nextMaintenanceDate: '2024-12-20',
        notes: 'Regular city bus, good fuel efficiency',
      },
    }),
    payload.create({
      collection: 'buses',
      data: {
        plateNumber: 'BUS-003',
        model: 'Urbino 12',
        manufacturer: 'Solaris',
        year: 2023,
        capacity: 42,
        status: 'active',
        currentDriver: drivers[7].id,
        mileage: 12450,
        lastMaintenanceDate: '2024-11-01',
        nextMaintenanceDate: '2025-02-01',
        notes: 'New addition to fleet, hybrid electric',
      },
    }),
    payload.create({
      collection: 'buses',
      data: {
        plateNumber: 'BUS-004',
        model: '7900 Electric',
        manufacturer: 'Volvo',
        year: 2022,
        capacity: 40,
        status: 'maintenance',
        mileage: 52100,
        lastMaintenanceDate: '2024-11-10',
        nextMaintenanceDate: '2025-02-10',
        notes: 'In maintenance for battery system check',
      },
    }),
    payload.create({
      collection: 'buses',
      data: {
        plateNumber: 'BUS-005',
        model: 'Citaro',
        manufacturer: 'Mercedes-Benz',
        year: 2020,
        capacity: 36,
        status: 'active',
        mileage: 89200,
        lastMaintenanceDate: '2024-08-25',
        nextMaintenanceDate: '2024-11-25',
        notes: 'Reliable workhorse, scheduled for tire replacement',
      },
    }),
    payload.create({
      collection: 'buses',
      data: {
        plateNumber: 'BUS-006',
        model: 'e-Citaro',
        manufacturer: 'Mercedes-Benz',
        year: 2024,
        capacity: 44,
        status: 'active',
        mileage: 3200,
        lastMaintenanceDate: '2024-10-01',
        nextMaintenanceDate: '2025-04-01',
        notes: 'Brand new fully electric bus',
      },
    }),
    payload.create({
      collection: 'buses',
      data: {
        plateNumber: 'BUS-007',
        model: 'Enviro400',
        manufacturer: 'Alexander Dennis',
        year: 2019,
        capacity: 75,
        status: 'out-of-service',
        mileage: 125600,
        lastMaintenanceDate: '2024-06-15',
        notes: 'Double-decker, engine issues being assessed',
      },
    }),
    payload.create({
      collection: 'buses',
      data: {
        plateNumber: 'BUS-008',
        model: 'Streetdeck',
        manufacturer: 'Wright',
        year: 2021,
        capacity: 72,
        status: 'active',
        mileage: 58900,
        lastMaintenanceDate: '2024-09-10',
        nextMaintenanceDate: '2024-12-10',
        notes: 'Double-decker for high-capacity routes',
      },
    }),
    payload.create({
      collection: 'buses',
      data: {
        plateNumber: 'BUS-009',
        model: 'Lion\'s City E',
        manufacturer: 'MAN',
        year: 2023,
        capacity: 38,
        status: 'active',
        mileage: 18700,
        lastMaintenanceDate: '2024-10-20',
        nextMaintenanceDate: '2025-01-20',
        notes: 'Electric version, excellent performance',
      },
    }),
    payload.create({
      collection: 'buses',
      data: {
        plateNumber: 'BUS-010',
        model: 'Citaro K',
        manufacturer: 'Mercedes-Benz',
        year: 2018,
        capacity: 30,
        status: 'retired',
        mileage: 178500,
        lastMaintenanceDate: '2024-03-01',
        notes: 'Retired from active service, pending disposal',
      },
    }),
    payload.create({
      collection: 'buses',
      data: {
        plateNumber: 'BUS-011',
        model: 'Urbino 18',
        manufacturer: 'Solaris',
        year: 2022,
        capacity: 56,
        status: 'maintenance',
        mileage: 42300,
        lastMaintenanceDate: '2024-11-05',
        nextMaintenanceDate: '2025-02-05',
        notes: 'Articulated bus, AC system repair',
      },
    }),
    payload.create({
      collection: 'buses',
      data: {
        plateNumber: 'BUS-012',
        model: '8900',
        manufacturer: 'Volvo',
        year: 2020,
        capacity: 50,
        status: 'active',
        mileage: 72400,
        lastMaintenanceDate: '2024-09-30',
        nextMaintenanceDate: '2024-12-30',
        notes: 'Intercity coach, comfortable seating',
      },
    }),
  ])

  console.log(`Created ${buses.length} buses`)

  // Create Routes
  console.log('Creating routes...')
  const routes = await Promise.all([
    payload.create({
      collection: 'routes',
      data: {
        routeNumber: 'R101',
        name: 'Downtown Express',
        description: 'Express route connecting suburbs to downtown business district',
        status: 'active',
        stops: [
          { stopName: 'Suburban Terminal', stopOrder: 1, estimatedArrival: '0' },
          { stopName: 'Oak Park Station', stopOrder: 2, estimatedArrival: '8' },
          { stopName: 'Central Station', stopOrder: 3, estimatedArrival: '15' },
          { stopName: 'Financial District', stopOrder: 4, estimatedArrival: '22' },
          { stopName: 'Downtown Terminal', stopOrder: 5, estimatedArrival: '30' },
        ],
        schedule: {
          operatingDays: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday'],
          firstDeparture: '06:00',
          lastDeparture: '22:00',
          frequencyMinutes: 15,
        },
        estimatedDuration: 30,
        distanceKm: 18.5,
        assignedBuses: [buses[0].id, buses[2].id],
      },
    }),
    payload.create({
      collection: 'routes',
      data: {
        routeNumber: 'R102',
        name: 'University Loop',
        description: 'Circular route serving the university campus and student housing',
        status: 'active',
        stops: [
          { stopName: 'University Main Gate', stopOrder: 1, estimatedArrival: '0' },
          { stopName: 'Science Building', stopOrder: 2, estimatedArrival: '5' },
          { stopName: 'Library', stopOrder: 3, estimatedArrival: '10' },
          { stopName: 'Student Housing East', stopOrder: 4, estimatedArrival: '15' },
          { stopName: 'Sports Complex', stopOrder: 5, estimatedArrival: '20' },
          { stopName: 'Student Housing West', stopOrder: 6, estimatedArrival: '25' },
          { stopName: 'University Main Gate', stopOrder: 7, estimatedArrival: '30' },
        ],
        schedule: {
          operatingDays: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'],
          firstDeparture: '07:00',
          lastDeparture: '23:00',
          frequencyMinutes: 10,
        },
        estimatedDuration: 30,
        distanceKm: 8.2,
        assignedBuses: [buses[1].id, buses[8].id],
      },
    }),
    payload.create({
      collection: 'routes',
      data: {
        routeNumber: 'R103',
        name: 'Airport Shuttle',
        description: 'Direct service between city center and international airport',
        status: 'active',
        stops: [
          { stopName: 'Central Bus Station', stopOrder: 1, estimatedArrival: '0' },
          { stopName: 'Hotel District', stopOrder: 2, estimatedArrival: '10' },
          { stopName: 'Convention Center', stopOrder: 3, estimatedArrival: '18' },
          { stopName: 'Airport Terminal 1', stopOrder: 4, estimatedArrival: '35' },
          { stopName: 'Airport Terminal 2', stopOrder: 5, estimatedArrival: '40' },
        ],
        schedule: {
          operatingDays: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'],
          firstDeparture: '04:30',
          lastDeparture: '23:30',
          frequencyMinutes: 20,
        },
        estimatedDuration: 40,
        distanceKm: 28.5,
        assignedBuses: [buses[11].id, buses[5].id],
      },
    }),
    payload.create({
      collection: 'routes',
      data: {
        routeNumber: 'R104',
        name: 'Shopping District',
        description: 'Route connecting residential areas to major shopping centers',
        status: 'active',
        stops: [
          { stopName: 'North Residential', stopOrder: 1, estimatedArrival: '0' },
          { stopName: 'Community Center', stopOrder: 2, estimatedArrival: '7' },
          { stopName: 'Metro Mall', stopOrder: 3, estimatedArrival: '15' },
          { stopName: 'Retail Park', stopOrder: 4, estimatedArrival: '22' },
          { stopName: 'South Shopping Center', stopOrder: 5, estimatedArrival: '30' },
        ],
        schedule: {
          operatingDays: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'],
          firstDeparture: '08:00',
          lastDeparture: '21:00',
          frequencyMinutes: 12,
        },
        estimatedDuration: 30,
        distanceKm: 14.3,
        assignedBuses: [buses[4].id, buses[7].id],
      },
    }),
    payload.create({
      collection: 'routes',
      data: {
        routeNumber: 'R105',
        name: 'Industrial Zone',
        description: 'Service to industrial parks and manufacturing facilities',
        status: 'active',
        stops: [
          { stopName: 'Central Station', stopOrder: 1, estimatedArrival: '0' },
          { stopName: 'Industrial Park A', stopOrder: 2, estimatedArrival: '12' },
          { stopName: 'Manufacturing Hub', stopOrder: 3, estimatedArrival: '20' },
          { stopName: 'Industrial Park B', stopOrder: 4, estimatedArrival: '28' },
          { stopName: 'Logistics Center', stopOrder: 5, estimatedArrival: '35' },
        ],
        schedule: {
          operatingDays: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday'],
          firstDeparture: '05:30',
          lastDeparture: '20:00',
          frequencyMinutes: 25,
        },
        estimatedDuration: 35,
        distanceKm: 22.1,
        assignedBuses: [buses[1].id],
      },
    }),
    payload.create({
      collection: 'routes',
      data: {
        routeNumber: 'R106',
        name: 'Hospital Circuit',
        description: 'Route connecting major hospitals and medical facilities',
        status: 'active',
        stops: [
          { stopName: 'Central Hospital', stopOrder: 1, estimatedArrival: '0' },
          { stopName: 'Medical Center East', stopOrder: 2, estimatedArrival: '10' },
          { stopName: 'Children\'s Hospital', stopOrder: 3, estimatedArrival: '18' },
          { stopName: 'Rehabilitation Center', stopOrder: 4, estimatedArrival: '25' },
          { stopName: 'Medical Center West', stopOrder: 5, estimatedArrival: '35' },
          { stopName: 'Central Hospital', stopOrder: 6, estimatedArrival: '45' },
        ],
        schedule: {
          operatingDays: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'],
          firstDeparture: '06:00',
          lastDeparture: '22:00',
          frequencyMinutes: 15,
        },
        estimatedDuration: 45,
        distanceKm: 16.8,
        assignedBuses: [buses[2].id, buses[8].id],
      },
    }),
    payload.create({
      collection: 'routes',
      data: {
        routeNumber: 'R107',
        name: 'Night Owl',
        description: 'Late night service for entertainment district',
        status: 'suspended',
        stops: [
          { stopName: 'Entertainment District', stopOrder: 1, estimatedArrival: '0' },
          { stopName: 'Theater Row', stopOrder: 2, estimatedArrival: '8' },
          { stopName: 'Central Station', stopOrder: 3, estimatedArrival: '15' },
          { stopName: 'East Residential', stopOrder: 4, estimatedArrival: '25' },
          { stopName: 'West Residential', stopOrder: 5, estimatedArrival: '35' },
        ],
        schedule: {
          operatingDays: ['friday', 'saturday'],
          firstDeparture: '22:00',
          lastDeparture: '04:00',
          frequencyMinutes: 30,
        },
        estimatedDuration: 35,
        distanceKm: 19.5,
      },
    }),
    payload.create({
      collection: 'routes',
      data: {
        routeNumber: 'R108',
        name: 'Old Town Heritage',
        description: 'Former route through historical district - discontinued',
        status: 'discontinued',
        stops: [
          { stopName: 'Old Town Square', stopOrder: 1, estimatedArrival: '0' },
          { stopName: 'Heritage Museum', stopOrder: 2, estimatedArrival: '5' },
          { stopName: 'Historical Church', stopOrder: 3, estimatedArrival: '10' },
          { stopName: 'Antique Market', stopOrder: 4, estimatedArrival: '15' },
        ],
        estimatedDuration: 15,
        distanceKm: 4.2,
      },
    }),
  ])

  console.log(`Created ${routes.length} routes`)

  console.log('\nDatabase seeded successfully!')
  console.log('\nSummary:')
  console.log(`- Drivers: ${drivers.length} (3 on-duty, 2 available, 1 off-duty, 1 on-leave, 1 inactive)`)
  console.log(`- Buses: ${buses.length} (8 active, 2 maintenance, 1 out-of-service, 1 retired)`)
  console.log(`- Routes: ${routes.length} (6 active, 1 suspended, 1 discontinued)`)

  process.exit(0)
}

seed().catch((error) => {
  console.error('Error seeding database:', error)
  process.exit(1)
})
