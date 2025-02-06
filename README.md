# Monorepo Template

This is a monorepo built with Turborepo built for modern full-stack applications.

## What's inside?

This Turborepo includes the following packages and apps:

### Apps

- `web`: A [Next.js](https://nextjs.org/) application that serves as the frontend interface. Built with React 19, TypeScript, and Tailwind CSS for styling.
- `api`: A backend API server built with [Hono](https://hono.dev/), TypeScript, and SQLite (using LibSQL). Features OpenAPI documentation and Drizzle ORM for database operations.

### Packages

- `@repo/api-client`: A TypeScript client library for interacting with the API, providing type-safe API calls between the frontend and backend.
- `@repo/eslint-config`: Shared ESLint configurations used throughout the monorepo to maintain consistent code style.

### Utilities

This Turborepo has some additional tools already setup for you:

- [TypeScript](https://www.typescriptlang.org/) for static type checking
- [@antfu/eslint-config](https://github.com/antfu/eslint-config) for code linting and formatting
- [Tailwind CSS](https://tailwindcss.com/) for styling
- [Drizzle ORM](https://orm.drizzle.team/) for database operations
- [Hono](https://hono.dev/) for API development
- [Zod](https://zod.dev/) for runtime type validation

### Build

To build all apps and packages, run the following command:

```
pnpm build
```

### Develop

To develop all apps and packages, run the following command:

```
pnpm dev
```
