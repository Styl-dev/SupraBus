# Next.js Payload Boilerplate

A modern fullstack boilerplate for rapid project development with Next.js 16, Payload CMS 3, and cutting-edge tooling.

## Tech Stack

- **Framework:** [Next.js 16](https://nextjs.org/)
- **CMS/Backend:** [Payload CMS 3](https://payloadcms.com/)
- **Database:** MongoDB
- **Styling:** [Tailwind CSS v4](https://tailwindcss.com/) + [shadcn/ui](https://ui.shadcn.com/)
- **Data Fetching:** [TanStack Query (React Query)](https://tanstack.com/query)
- **Email:** [Resend](https://resend.com/) (via Payload plugin)
- **Payments:** [Stripe](https://stripe.com/) (via Payload plugin)
- **Code Quality:** ESLint, Prettier, TypeScript
- **Git Hooks:** simple-git-hooks + lint-staged

## Getting Started

### Prerequisites

- Node.js 18+
- pnpm
- MongoDB instance (local or cloud)

### Installation

1. Clone the repository
2. Copy environment variables:
   ```bash
   cp .env.example .env
   ```
3. Update `.env` with your values
4. Install dependencies:
   ```bash
   pnpm install
   ```
5. Start the development server:
   ```bash
   pnpm dev
   ```

The app will be available at `http://localhost:3000`.
Payload Admin panel: `http://localhost:3000/admin`

## Scripts

| Script              | Description               |
| ------------------- | ------------------------- |
| `pnpm dev`          | Start development server  |
| `pnpm build`        | Build for production      |
| `pnpm start`        | Start production server   |
| `pnpm lint`         | Run ESLint                |
| `pnpm lint:fix`     | Fix ESLint errors         |
| `pnpm format`       | Format code with Prettier |
| `pnpm format:check` | Check code formatting     |
| `pnpm typecheck`    | Run TypeScript type check |

## Project Structure

```
src/
├── app/
│   ├── (payload)/        # Payload CMS routes (admin, API)
│   └── ...               # Your app routes
├── collections/          # Payload CMS collections
├── lib/                  # Utility functions
└── providers/            # React context providers
```

## Environment Variables

See `.env.example` for all required environment variables.

## MCP Servers (Claude Code)

This project is configured with the following MCP servers for enhanced AI development:

- **Context7** - Latest documentation for any library
- **Playwright** - Browser automation & screenshots
- **shadcn/ui** - Component access
- **React Bits** - Animated React components
- **Railway** - Deployment management
- **Next.js Docs** - Documentation lookup

## License

MIT
