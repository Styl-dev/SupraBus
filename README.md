# SupraBus - Fleet Management System

A modern, full-featured bus fleet management web application built with Next.js, TypeScript, and SQLite.

![Version](https://img.shields.io/badge/version-0.1.0-blue.svg)
![Next.js](https://img.shields.io/badge/Next.js-15.1.2-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.7.2-blue)
![License](https://img.shields.io/badge/license-MIT-green.svg)

## Features

### Dashboard
- **Real-time Metrics**: Track total fleet, active buses, available drivers, and active routes
- **Visual Analytics**:
  - Fleet status pie chart (active/maintenance/retired)
  - Driver availability bar chart
  - Route performance analysis
  - Total coverage calculations

### Bus Management
- Complete CRUD operations for bus fleet
- Track: plate number, model, capacity, year, status, mileage
- Maintenance scheduling and tracking
- Status management (active, maintenance, retired)

### Driver Management
- Full driver lifecycle management
- Monitor: license info, contact details, status, trip count
- Rating system (1-5 stars)
- Status tracking (available, on duty, off duty, on leave)

### Route Management
- Route planning and management
- Track: origin, destination, distance, duration
- Frequency and fare management
- Revenue estimation per route

## Tech Stack

### Frontend
- **Framework**: Next.js 15.1.2 (App Router)
- **Language**: TypeScript 5.7.2
- **Styling**: Tailwind CSS 3.4.16
- **UI Components**: shadcn/ui (custom components)
- **Charts**: Recharts 2.15.0
- **Icons**: Lucide React 0.462.0

### Backend
- **API**: Next.js Server Actions
- **Database**: SQLite (better-sqlite3)
- **ORM**: Drizzle ORM 0.36.4

### Developer Experience
- **Form Handling**: React Hook Form 7.54.2
- **Validation**: Zod 3.24.1
- **Notifications**: Sonner 1.7.1
- **Build Tool**: Next.js with Turbopack

## Project Structure

```
SupraBus/
├── src/
│   ├── app/                          # Next.js App Router pages
│   │   ├── layout.tsx                # Root layout with sidebar
│   │   ├── page.tsx                  # Dashboard page
│   │   ├── buses/                    # Bus management pages
│   │   │   ├── page.tsx              # List all buses
│   │   │   ├── new/page.tsx          # Create bus
│   │   │   └── [id]/                 # Dynamic routes
│   │   │       ├── page.tsx          # View bus details
│   │   │       └── edit/page.tsx     # Edit bus
│   │   ├── drivers/                  # Driver management pages
│   │   └── routes/                   # Route management pages
│   ├── components/
│   │   ├── ui/                       # shadcn/ui components
│   │   ├── layout/                   # Layout components
│   │   │   ├── sidebar.tsx           # Navigation sidebar
│   │   │   └── header.tsx            # Page header
│   │   ├── dashboard/                # Dashboard charts & stats
│   │   └── forms/                    # Form components
│   ├── db/
│   │   ├── schema.ts                 # Drizzle ORM schema
│   │   ├── index.ts                  # Database connection
│   │   └── seed.ts                   # Sample data seeder
│   ├── lib/
│   │   ├── actions/                  # Server actions
│   │   │   ├── buses.ts
│   │   │   ├── drivers.ts
│   │   │   └── routes.ts
│   │   └── utils.ts                  # Utility functions
│   └── types/
│       └── index.ts                  # TypeScript types
├── drizzle.config.ts                 # Drizzle configuration
├── tailwind.config.ts                # Tailwind configuration
├── next.config.ts                    # Next.js configuration
└── package.json
```

## Getting Started

### Prerequisites

- Node.js 18.x or higher
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd SupraBus
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Initialize the database**
   ```bash
   # Create database tables
   npm run db:push

   # Seed with sample data
   npm run db:seed
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000) in your browser.

## Available Scripts

```bash
# Development
npm run dev              # Start development server
npm run build            # Build for production
npm start                # Start production server
npm run lint             # Run ESLint

# Database
npm run db:push          # Push schema changes to database
npm run db:studio        # Open Drizzle Studio (database GUI)
npm run db:seed          # Seed database with sample data
```

## Database Schema

### Buses Table
| Column | Type | Description |
|--------|------|-------------|
| id | INTEGER | Primary key (auto-increment) |
| plate_number | TEXT | Unique license plate |
| model | TEXT | Bus model/make |
| capacity | INTEGER | Passenger capacity |
| year | INTEGER | Manufacturing year |
| status | TEXT | active, maintenance, retired |
| mileage | INTEGER | Current odometer reading |
| last_maintenance_date | TEXT | ISO date string |
| created_at | TEXT | ISO timestamp |
| updated_at | TEXT | ISO timestamp |

### Drivers Table
| Column | Type | Description |
|--------|------|-------------|
| id | INTEGER | Primary key (auto-increment) |
| name | TEXT | Full name |
| license_number | TEXT | Unique driver's license |
| phone | TEXT | Contact number |
| email | TEXT | Email address (optional) |
| status | TEXT | available, on_duty, off_duty, on_leave |
| hire_date | TEXT | ISO date string |
| total_trips | INTEGER | Completed trips count |
| rating | REAL | Average rating (1-5) |
| created_at | TEXT | ISO timestamp |
| updated_at | TEXT | ISO timestamp |

### Routes Table
| Column | Type | Description |
|--------|------|-------------|
| id | INTEGER | Primary key (auto-increment) |
| name | TEXT | Route name/number |
| origin | TEXT | Starting point |
| destination | TEXT | End point |
| distance_km | REAL | Total distance |
| estimated_duration_mins | INTEGER | Expected travel time |
| status | TEXT | active, suspended, discontinued |
| frequency_per_day | INTEGER | Daily trips on this route |
| fare | REAL | Ticket price |
| created_at | TEXT | ISO timestamp |
| updated_at | TEXT | ISO timestamp |

## Deployment

### Vercel (Recommended)

1. **Install Vercel CLI**
   ```bash
   npm install -g vercel
   ```

2. **Deploy**
   ```bash
   vercel
   ```

   Follow the prompts to complete deployment.

**Note**: SQLite database will be reset on each deployment. For production, consider migrating to PostgreSQL or another persistent database.

### Docker

1. **Build Docker image**
   ```bash
   docker build -t suprabus .
   ```

2. **Run container**
   ```bash
   docker run -p 3000:3000 suprabus
   ```

### Manual Deployment

1. **Build the application**
   ```bash
   npm run build
   ```

2. **Start production server**
   ```bash
   npm start
   ```

## Environment Variables

Create a `.env.local` file for local development:

```env
# Optional: Node environment
NODE_ENV=development

# Database (SQLite is used by default)
# For production, consider PostgreSQL
# DATABASE_URL=postgresql://...
```

## Production Considerations

### Database Migration

For production use, consider migrating from SQLite to a more robust database:

1. **PostgreSQL** (Recommended)
   - Update `drizzle.config.ts`
   - Install `pg` and `drizzle-orm/pg-core`
   - Update database connection in `src/db/index.ts`

2. **MySQL**
   - Install `mysql2` and `drizzle-orm/mysql-core`
   - Update configuration accordingly

### Performance Optimization

- Enable Next.js caching strategies
- Implement database connection pooling
- Add Redis for session management
- Configure CDN for static assets

### Security

- Implement authentication (NextAuth.js recommended)
- Add role-based access control
- Sanitize user inputs
- Enable CORS protection
- Use environment variables for sensitive data

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License.

## Support

For issues and questions:
- Create an issue in the repository
- Contact the development team

## Acknowledgments

- Built with [Next.js](https://nextjs.org/)
- UI components from [shadcn/ui](https://ui.shadcn.com/)
- Icons by [Lucide](https://lucide.dev/)
- Charts powered by [Recharts](https://recharts.org/)
