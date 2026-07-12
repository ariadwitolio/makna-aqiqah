# Feature Development Guideline

## Current Project Structure

### app/
- Route definitions, layouts, route handlers, and SEO metadata.
- Keep pages thin and composed from sections and features.
- Global providers, root layout, and structured data belong here.

### components/
- components/ui for reusable design-system components.
- components/sections for page-level sections composed from smaller reusable blocks.
- components/shared for cross-cutting UI helpers such as headings and wrappers.

### features/
- Each feature contains components, services, hooks, and types.ts.
- The current home feature contains the homepage content types and the service layer.

### lib/
- Shared utilities, CMS helpers, SEO helpers, and integrations.

### cms/
- Payload CMS configuration and collections.
- All publicly editable website content should be routed through collections and fetched by service layers.

## Feature Development Workflow

Requirement
↓
Architecture Planning
↓
Design CMS model if content is editable
↓
Create TypeScript types
↓
Create service layer
↓
Create reusable UI components
↓
Compose page sections
↓
Implement SEO metadata
↓
Test build and content flow

## Component Rules
- Follow the single responsibility principle.
- Keep UI components declarative and props-driven.
- Keep business logic in services or hooks, not inside UI components.
- Reuse shared sections rather than duplicating markup.
- Use small, focused components over large monolithic ones.

## CMS Rules
- Create a collection for content that must be editable by non-developers.
- Use camelCase for field names and kebab-case for file names.
- Validate required fields and keep content models lean.
- Use relationships instead of copying the same data across collections where possible.
- Apply access restrictions through Payload admin configuration.
- Prefer service-layer fetching so the frontend stays decoupled from CMS internals.

## Naming Conventions
- Files: kebab-case
- Components: PascalCase
- Functions: camelCase
- Types: PascalCase or interface names in PascalCase

## Deployment Checklist
- Validate TypeScript build output.
- Run linting and fix warnings.
- Verify responsive layouts across mobile and desktop.
- Confirm metadata, sitemap, and structured data are present.
- Test the CMS content flow and fallback behavior.
- Configure environment variables for PostgreSQL and Payload secret.
- Deploy to a VPS or host with Node.js support.
