# Knowledge Wave India - Learning Platform

## Overview

Knowledge Wave India is a comprehensive online learning platform built with a modern full-stack architecture. The application provides courses, learning packages, instructor profiles, and educational content management. It features a React-based frontend with TypeScript, Express.js backend, and PostgreSQL database integration using Drizzle ORM. The platform supports course browsing, package enrollment, newsletter subscriptions, and contact management with a focus on educational content delivery.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript for type safety and modern development practices
- **Routing**: Wouter for lightweight client-side routing instead of React Router
- **State Management**: TanStack Query (React Query) for server state management and caching
- **UI Framework**: Radix UI components with shadcn/ui design system for consistent, accessible components
- **Styling**: Tailwind CSS with CSS variables for theming and responsive design
- **Build Tool**: Vite for fast development and optimized production builds
- **Animations**: Framer Motion for smooth page transitions and interactive elements

### Backend Architecture
- **Runtime**: Node.js with Express.js framework for RESTful API development
- **Language**: TypeScript for type safety across the entire stack
- **API Design**: RESTful endpoints for courses, packages, instructors, enrollments, and newsletter subscriptions
- **Error Handling**: Centralized error middleware with structured error responses
- **Development**: Hot reload with Vite integration for seamless development experience

### Data Storage Architecture
- **Database**: PostgreSQL as the primary relational database
- **ORM**: Drizzle ORM for type-safe database operations and schema management
- **Schema**: Shared TypeScript schema definitions between frontend and backend
- **Migrations**: Drizzle Kit for database schema migrations and version control
- **Connection**: Neon Database serverless PostgreSQL for cloud-native scaling

### Database Schema Design
- **Users**: Authentication and profile management with unique constraints
- **Courses**: Educational content with categorization, ratings, and instructor relationships
- **Packages**: Bundled course offerings with pricing and feature lists
- **Instructors**: Teacher profiles with expertise areas and ratings
- **Enrollments**: Student-course registration tracking
- **Newsletter**: Email subscription management for marketing communications

### Authentication & Authorization
- Currently implemented with placeholder user management
- Session-based architecture prepared for future authentication integration
- User ID tracking for enrollment and personalization features

### Component Architecture
- **Design System**: Consistent component library using Radix UI primitives
- **Accessibility**: WCAG-compliant components with keyboard navigation and screen reader support
- **Responsiveness**: Mobile-first design with adaptive layouts
- **Reusability**: Modular component structure for maintainability

## External Dependencies

### Database Services
- **Neon Database**: Serverless PostgreSQL hosting for scalable data storage
- **Drizzle ORM**: Type-safe database toolkit for schema management and queries

### UI/UX Libraries
- **Radix UI**: Headless component primitives for accessible interface elements
- **Tailwind CSS**: Utility-first CSS framework for rapid styling
- **Framer Motion**: Production-ready motion library for React animations
- **Lucide React**: Feather-inspired icon library for consistent iconography

### Development Tools
- **Vite**: Next-generation frontend build tool for development and production
- **TypeScript**: Static type checking for improved code quality
- **TanStack Query**: Powerful data synchronization for server state management

### Form & Validation
- **React Hook Form**: Performant forms library with minimal re-renders
- **Zod**: TypeScript-first schema validation for data integrity
- **Drizzle Zod**: Integration between Drizzle ORM and Zod for schema validation

### Image & Asset Management
- **Unsplash**: External image service for course thumbnails and marketing content
- **Static Assets**: Local asset management through Vite's asset pipeline