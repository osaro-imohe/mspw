# Make Something People Want

A full-stack TypeScript application built with the T3 Stack.

## Tech Stack

- **Framework**: [Next.js 15](https://nextjs.org/) with App Router
- **API**: [tRPC](https://trpc.io/) for type-safe APIs
- **Database**: [Prisma](https://prisma.io/) with PostgreSQL
- **Authentication**: [NextAuth.js](https://next-auth.js.org/) with Google OAuth
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/)
- **Testing**: [Vitest](https://vitest.dev/) + [Playwright](https://playwright.dev/)

## Prerequisites

- Node.js 20+ (use `nvm use` to automatically switch)
- PostgreSQL database
- pnpm package manager

## Getting Started

### 1. Clone the repository

```bash
git clone <repository-url>
cd make_something_people_want
```

### 2. Install dependencies

```bash
pnpm install
```

### 3. Set up environment variables

```bash
cp .env.example .env
```

Edit `.env` with your values:

- `DATABASE_URL` - PostgreSQL connection string
- `AUTH_SECRET` - Generate with `openssl rand -base64 32`
- `AUTH_GOOGLE_ID` - Google OAuth client ID
- `AUTH_GOOGLE_SECRET` - Google OAuth client secret

### 4. Set up the database

```bash
# Create database tables
pnpm db:push

# Or run migrations (for production)
pnpm db:migrate
```

### 5. Start the development server

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Scripts

| Command | Description |
|---------|-------------|
| `pnpm dev` | Start development server with Turbopack |
| `pnpm build` | Build for production |
| `pnpm start` | Start production server |
| `pnpm typecheck` | Run TypeScript type checking |
| `pnpm test` | Run unit tests in watch mode |
| `pnpm test:run` | Run unit tests once |
| `pnpm test:coverage` | Run tests with coverage report |
| `pnpm test:e2e` | Run end-to-end tests |
| `pnpm test:e2e:ui` | Run E2E tests with interactive UI |
| `pnpm db:push` | Push schema changes to database |
| `pnpm db:studio` | Open Prisma Studio |

## Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── api/               # API routes
│   │   ├── auth/          # NextAuth.js endpoints
│   │   └── trpc/          # tRPC handler
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
├── server/
│   ├── api/               # tRPC routers
│   │   ├── root.ts        # Root router
│   │   └── trpc.ts        # tRPC configuration
│   ├── auth/              # NextAuth.js configuration
│   └── db.ts              # Prisma client
├── trpc/                  # tRPC client configuration
├── styles/                # Global styles
└── test/                  # Test utilities
e2e/                       # Playwright E2E tests
prisma/
└── schema.prisma          # Database schema
```

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `DATABASE_URL` | PostgreSQL connection string | Yes |
| `AUTH_SECRET` | NextAuth.js secret | Yes (production) |
| `AUTH_GOOGLE_ID` | Google OAuth client ID | No |
| `AUTH_GOOGLE_SECRET` | Google OAuth client secret | No |
| `NODE_ENV` | Environment (development/production) | No |

## Testing

### Unit & Integration Tests

```bash
# Run in watch mode
pnpm test

# Run once with coverage
pnpm test:coverage
```

### End-to-End Tests

```bash
# Run headless
pnpm test:e2e

# Run with UI
pnpm test:e2e:ui
```

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Run tests (`pnpm test:run && pnpm test:e2e`)
5. Commit your changes (`git commit -m 'Add amazing feature'`)
6. Push to the branch (`git push origin feature/amazing-feature`)
7. Open a Pull Request

## License

MIT
