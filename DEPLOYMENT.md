# SupraBus Deployment Guide

This guide covers various deployment options for the SupraBus Fleet Management System.

## Table of Contents
- [Local Development](#local-development)
- [Vercel Deployment](#vercel-deployment)
- [Docker Deployment](#docker-deployment)
- [Traditional Server Deployment](#traditional-server-deployment)
- [Database Considerations](#database-considerations)

---

## Local Development

### Quick Start

```bash
# 1. Clone and install
git clone <repository-url>
cd SupraBus
npm install

# 2. Initialize database
npm run db:push
npm run db:seed

# 3. Start development server
npm run dev
```

Visit http://localhost:3000

### Development Scripts

```bash
npm run dev          # Start dev server with hot reload
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run db:push      # Update database schema
npm run db:seed      # Seed sample data
npm run db:studio    # Open Drizzle Studio GUI
```

---

## Vercel Deployment

### Prerequisites
- Vercel account (free tier available)
- GitHub repository connected to Vercel

### Method 1: Vercel CLI

```bash
# Install Vercel CLI
npm install -g vercel

# Login to Vercel
vercel login

# Deploy
vercel

# Deploy to production
vercel --prod
```

### Method 2: GitHub Integration

1. Push code to GitHub
2. Visit [vercel.com](https://vercel.com)
3. Click "New Project"
4. Import your GitHub repository
5. Configure build settings:
   - **Framework Preset**: Next.js
   - **Build Command**: `npm run build`
   - **Output Directory**: `.next`
6. Click "Deploy"

### Important Notes for Vercel

**Database Limitation**: Vercel's serverless environment doesn't persist SQLite databases. For production:

1. **Option A**: Use Vercel Postgres
   ```bash
   # Install Vercel Postgres
   npm install @vercel/postgres
   ```

   Update `src/db/index.ts` to use Vercel Postgres

2. **Option B**: Use external database service
   - Supabase (PostgreSQL)
   - PlanetScale (MySQL)
   - Railway (PostgreSQL)

### Environment Variables on Vercel

Add in Vercel Dashboard → Settings → Environment Variables:
```
DATABASE_URL=your_database_connection_string
NODE_ENV=production
```

---

## Docker Deployment

### Build and Run

```bash
# Build Docker image
docker build -t suprabus:latest .

# Run container
docker run -p 3000:3000 suprabus:latest
```

Visit http://localhost:3000

### Docker Compose (with PostgreSQL)

Create `docker-compose.yml`:

```yaml
version: '3.8'

services:
  app:
    build: .
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
      - DATABASE_URL=postgresql://suprabus:password@db:5432/suprabus
    depends_on:
      - db
    volumes:
      - ./sqlite.db:/app/sqlite.db

  db:
    image: postgres:15-alpine
    environment:
      - POSTGRES_USER=suprabus
      - POSTGRES_PASSWORD=password
      - POSTGRES_DB=suprabus
    volumes:
      - postgres_data:/var/lib/postgresql/data
    ports:
      - "5432:5432"

volumes:
  postgres_data:
```

Run with:
```bash
docker-compose up -d
```

### Production Docker Deployment

```bash
# Build production image
docker build -t suprabus:v1.0.0 .

# Tag for registry
docker tag suprabus:v1.0.0 your-registry/suprabus:v1.0.0

# Push to registry
docker push your-registry/suprabus:v1.0.0

# Deploy on server
docker pull your-registry/suprabus:v1.0.0
docker run -d \
  --name suprabus \
  -p 3000:3000 \
  --restart unless-stopped \
  your-registry/suprabus:v1.0.0
```

---

## Traditional Server Deployment

### Ubuntu/Debian Server

#### 1. Prerequisites

```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Install Node.js 18
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt install -y nodejs

# Install PM2 (process manager)
sudo npm install -g pm2
```

#### 2. Deploy Application

```bash
# Clone repository
git clone <repository-url> /var/www/suprabus
cd /var/www/suprabus

# Install dependencies
npm install

# Build application
npm run build

# Initialize database
npm run db:push
npm run db:seed
```

#### 3. Start with PM2

```bash
# Start application
pm2 start npm --name "suprabus" -- start

# Save PM2 configuration
pm2 save

# Setup startup script
pm2 startup
```

#### 4. Configure Nginx Reverse Proxy

Create `/etc/nginx/sites-available/suprabus`:

```nginx
server {
    listen 80;
    server_name your-domain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

Enable site:
```bash
sudo ln -s /etc/nginx/sites-available/suprabus /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

#### 5. SSL with Let's Encrypt

```bash
# Install Certbot
sudo apt install certbot python3-certbot-nginx -y

# Get SSL certificate
sudo certbot --nginx -d your-domain.com

# Auto-renewal is configured automatically
```

### PM2 Management Commands

```bash
pm2 list                # List all applications
pm2 logs suprabus       # View logs
pm2 restart suprabus    # Restart application
pm2 stop suprabus       # Stop application
pm2 delete suprabus     # Remove from PM2
pm2 monit              # Monitor resources
```

---

## Database Considerations

### SQLite (Development Only)

**Pros**:
- Zero configuration
- File-based, easy backup
- Perfect for development

**Cons**:
- Not suitable for production with multiple instances
- No concurrent writes
- Limited scalability

### PostgreSQL (Recommended for Production)

#### Migration Steps

1. **Install PostgreSQL adapter**
   ```bash
   npm install pg
   npm install -D @types/pg
   ```

2. **Update `drizzle.config.ts`**
   ```typescript
   import { defineConfig } from "drizzle-kit";

   export default defineConfig({
     schema: "./src/db/schema.ts",
     out: "./drizzle",
     dialect: "postgresql",
     dbCredentials: {
       url: process.env.DATABASE_URL!,
     },
   });
   ```

3. **Update `src/db/index.ts`**
   ```typescript
   import { drizzle } from "drizzle-orm/node-postgres";
   import { Pool } from "pg";
   import * as schema from "./schema";

   const pool = new Pool({
     connectionString: process.env.DATABASE_URL,
   });

   export const db = drizzle(pool, { schema });
   ```

4. **Update schema** in `src/db/schema.ts`
   - Change `sqliteTable` to `pgTable`
   - Update data types as needed

5. **Run migrations**
   ```bash
   npm run db:push
   npm run db:seed
   ```

### Database Providers

#### Vercel Postgres
- Integrated with Vercel
- Free tier available
- Automatic scaling

#### Supabase
- PostgreSQL with additional features
- Free tier: 500MB database
- Real-time capabilities

#### PlanetScale
- MySQL-compatible
- Free tier: 5GB storage
- Branching workflows

#### Railway
- PostgreSQL, MySQL, Redis
- Free tier: $5 credit/month
- Simple deployment

---

## Environment Variables by Platform

### Vercel
Set in: Dashboard → Settings → Environment Variables

### Docker
Use `.env` file or pass with `-e` flag:
```bash
docker run -e DATABASE_URL=postgres://... suprabus
```

### PM2
Create `ecosystem.config.js`:
```javascript
module.exports = {
  apps: [{
    name: 'suprabus',
    script: 'npm',
    args: 'start',
    env: {
      NODE_ENV: 'production',
      PORT: 3000,
      DATABASE_URL: 'your_database_url'
    }
  }]
};
```

Run with: `pm2 start ecosystem.config.js`

---

## Performance Optimization

### 1. Enable Output Standalone
In `next.config.ts`:
```typescript
const nextConfig = {
  output: 'standalone',
};
```

### 2. Database Connection Pooling
For PostgreSQL in production:
```typescript
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  max: 20, // Maximum connections
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});
```

### 3. Caching Strategy
Add Redis for session and data caching:
```bash
npm install redis
```

### 4. CDN Configuration
- Use Vercel's CDN automatically
- For custom deployment, configure Cloudflare or AWS CloudFront

---

## Monitoring and Logging

### Application Monitoring
- **Vercel**: Built-in analytics
- **PM2**: `pm2 monit`
- **External**: New Relic, Datadog, Sentry

### Database Monitoring
- Drizzle Studio: `npm run db:studio`
- PgAdmin for PostgreSQL
- CloudWatch for AWS RDS

---

## Backup and Recovery

### SQLite Backup
```bash
# Backup
cp sqlite.db sqlite.backup.db

# Restore
cp sqlite.backup.db sqlite.db
```

### PostgreSQL Backup
```bash
# Backup
pg_dump $DATABASE_URL > backup.sql

# Restore
psql $DATABASE_URL < backup.sql
```

### Automated Backups
Set up cron job:
```bash
# Daily backup at 2 AM
0 2 * * * /path/to/backup-script.sh
```

---

## Troubleshooting

### Common Issues

**1. Database not found**
```bash
npm run db:push
npm run db:seed
```

**2. Port already in use**
```bash
# Change port
PORT=3001 npm run dev
```

**3. Build fails**
```bash
# Clear cache
rm -rf .next
npm run build
```

**4. Module not found**
```bash
# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install
```

---

## Security Checklist

- [ ] Use environment variables for sensitive data
- [ ] Enable HTTPS in production
- [ ] Implement authentication
- [ ] Set up CORS properly
- [ ] Use security headers
- [ ] Regular dependency updates
- [ ] Database backups configured
- [ ] Rate limiting enabled
- [ ] Input validation on all forms
- [ ] SQL injection protection (Drizzle ORM handles this)

---

## Support

For deployment issues:
1. Check application logs
2. Review this documentation
3. Open an issue on GitHub
4. Contact the development team
