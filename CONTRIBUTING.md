# Contributing to SupraBus

Thank you for your interest in contributing to SupraBus! This document provides guidelines and instructions for contributing to the project.

## Table of Contents
- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Workflow](#development-workflow)
- [Coding Standards](#coding-standards)
- [Commit Guidelines](#commit-guidelines)
- [Pull Request Process](#pull-request-process)
- [Testing](#testing)

---

## Code of Conduct

This project and everyone participating in it is governed by our Code of Conduct. By participating, you are expected to uphold this code.

### Our Standards

- Be respectful and inclusive
- Welcome newcomers and help them learn
- Focus on what is best for the community
- Show empathy towards other community members

---

## Getting Started

### Prerequisites

- Node.js 18.x or higher
- npm or yarn
- Git
- A code editor (VS Code recommended)

### Setup Development Environment

1. **Fork the repository**
   ```bash
   # On GitHub, click "Fork" button
   ```

2. **Clone your fork**
   ```bash
   git clone https://github.com/YOUR_USERNAME/SupraBus.git
   cd SupraBus
   ```

3. **Add upstream remote**
   ```bash
   git remote add upstream https://github.com/ORIGINAL_OWNER/SupraBus.git
   ```

4. **Install dependencies**
   ```bash
   npm install
   ```

5. **Initialize database**
   ```bash
   npm run db:push
   npm run db:seed
   ```

6. **Start development server**
   ```bash
   npm run dev
   ```

Visit http://localhost:3000

---

## Development Workflow

### 1. Create a Branch

Always create a new branch for your work:

```bash
# Update your local main branch
git checkout main
git pull upstream main

# Create a new branch
git checkout -b feature/your-feature-name
# or
git checkout -b fix/bug-description
```

Branch naming conventions:
- `feature/` - New features
- `fix/` - Bug fixes
- `docs/` - Documentation updates
- `refactor/` - Code refactoring
- `test/` - Adding tests
- `chore/` - Maintenance tasks

### 2. Make Changes

- Write clean, readable code
- Follow existing code style
- Add comments where necessary
- Update documentation if needed

### 3. Test Your Changes

```bash
# Run linter
npm run lint

# Build the project
npm run build

# Test in development
npm run dev
```

### 4. Commit Your Changes

Follow our [commit guidelines](#commit-guidelines)

```bash
git add .
git commit -m "feat: add new feature"
```

### 5. Push to Your Fork

```bash
git push origin feature/your-feature-name
```

### 6. Create Pull Request

Go to GitHub and create a Pull Request from your branch to the main repository.

---

## Coding Standards

### TypeScript

- Use TypeScript for all new code
- Define proper types, avoid `any`
- Use interfaces for object shapes
- Export types when shared across files

Example:
```typescript
// Good
interface BusData {
  plateNumber: string;
  model: string;
  capacity: number;
}

// Avoid
const data: any = {...};
```

### React Components

- Use functional components with hooks
- Use TypeScript for props
- Keep components focused and single-purpose
- Use proper naming (PascalCase for components)

Example:
```typescript
interface ButtonProps {
  label: string;
  onClick: () => void;
  disabled?: boolean;
}

export function Button({ label, onClick, disabled = false }: ButtonProps) {
  return (
    <button onClick={onClick} disabled={disabled}>
      {label}
    </button>
  );
}
```

### File Organization

```
src/
├── app/              # Pages (keep lean, delegate to components)
├── components/       # Reusable UI components
│   ├── ui/          # Base UI components
│   ├── forms/       # Form components
│   └── layout/      # Layout components
├── lib/
│   ├── actions/     # Server actions
│   └── utils.ts     # Utility functions
├── db/              # Database schemas and queries
└── types/           # Shared TypeScript types
```

### Styling

- Use Tailwind CSS utility classes
- Follow mobile-first approach
- Use consistent spacing (Tailwind scale)
- Keep custom CSS minimal

Example:
```tsx
// Good
<div className="flex items-center gap-4 p-4 rounded-lg bg-white shadow-md">

// Avoid inline styles
<div style={{ display: 'flex', padding: '16px' }}>
```

### Server Actions

- Use `"use server"` directive
- Handle errors appropriately
- Revalidate paths after mutations
- Use TypeScript for parameters

Example:
```typescript
"use server";

export async function createBus(data: NewBus): Promise<Bus> {
  try {
    const result = await db.insert(buses).values(data).returning();
    revalidatePath("/buses");
    return result[0];
  } catch (error) {
    throw new Error("Failed to create bus");
  }
}
```

---

## Commit Guidelines

We follow [Conventional Commits](https://www.conventionalcommits.org/) specification.

### Commit Message Format

```
<type>(<scope>): <subject>

<body>

<footer>
```

### Types

- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, etc.)
- `refactor`: Code refactoring
- `test`: Adding or updating tests
- `chore`: Maintenance tasks
- `perf`: Performance improvements

### Examples

```bash
# New feature
git commit -m "feat(buses): add maintenance scheduling"

# Bug fix
git commit -m "fix(drivers): correct rating calculation"

# Documentation
git commit -m "docs: update deployment guide"

# Refactoring
git commit -m "refactor(routes): optimize query performance"
```

### Detailed Commit

For complex changes:

```bash
git commit -m "feat(dashboard): add real-time metrics

- Add WebSocket connection for live updates
- Implement metric cards with auto-refresh
- Add loading states and error handling

Closes #123"
```

---

## Pull Request Process

### Before Submitting

- [ ] Code follows project style guidelines
- [ ] All tests pass
- [ ] Build succeeds (`npm run build`)
- [ ] No linting errors (`npm run lint`)
- [ ] Documentation updated if needed
- [ ] Commits follow conventional commits format

### PR Title

Use the same format as commit messages:
```
feat(buses): add export to CSV functionality
```

### PR Description Template

```markdown
## Description
Brief description of what this PR does.

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Changes Made
- Change 1
- Change 2
- Change 3

## Testing
How has this been tested?

## Screenshots (if applicable)
Add screenshots here

## Related Issues
Closes #123
```

### Review Process

1. At least one maintainer must review
2. All CI checks must pass
3. Address review comments
4. Maintainer will merge when approved

---

## Testing

### Manual Testing

Test your changes thoroughly:

1. **UI Testing**
   - Test all CRUD operations
   - Check responsive design
   - Verify form validation
   - Test error states

2. **Database Testing**
   - Verify data persistence
   - Check constraints
   - Test relationships

3. **Integration Testing**
   - Test complete workflows
   - Verify navigation
   - Check state management

### Future: Automated Testing

We plan to add:
- Unit tests (Jest, React Testing Library)
- Integration tests
- E2E tests (Playwright)

---

## Code Review Guidelines

### For Contributors

- Be open to feedback
- Respond to comments promptly
- Update your PR based on feedback
- Ask questions if unclear

### For Reviewers

- Be respectful and constructive
- Explain the "why" behind suggestions
- Approve when requirements are met
- Help contributors learn

---

## Database Changes

### Schema Modifications

1. Update `src/db/schema.ts`
2. Run `npm run db:push` to apply changes
3. Update seed data if needed
4. Document migration in PR

### Adding New Tables

```typescript
// src/db/schema.ts
export const newTable = sqliteTable("new_table", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name").notNull(),
  // ... other fields
});

// Export types
export type NewTable = typeof newTable.$inferSelect;
export type InsertNewTable = typeof newTable.$inferInsert;
```

---

## Adding Dependencies

Before adding a new dependency:

1. Check if existing dependencies can solve the problem
2. Verify the package is actively maintained
3. Check bundle size impact
4. Discuss in an issue if it's a major addition

```bash
# Add dependency
npm install package-name

# Add dev dependency
npm install -D package-name
```

---

## Documentation

### Code Documentation

- Add JSDoc comments for complex functions
- Document server actions
- Explain non-obvious logic

Example:
```typescript
/**
 * Calculates the estimated daily revenue for a route
 * @param fare - The ticket price
 * @param frequency - Number of trips per day
 * @returns The estimated daily revenue
 */
function calculateDailyRevenue(fare: number, frequency: number): number {
  return fare * frequency;
}
```

### README Updates

Update README.md when:
- Adding new features
- Changing setup process
- Adding new scripts
- Updating dependencies

---

## Questions?

- Open an issue for bugs or feature requests
- Start a discussion for general questions
- Reach out to maintainers

---

## Recognition

Contributors will be recognized in:
- README.md contributors section
- Release notes
- Project documentation

Thank you for contributing to SupraBus! 🚌
