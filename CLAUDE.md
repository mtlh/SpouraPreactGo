# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Spoura is a fully-featured ecommerce application for shoes with cart, favorites, authentication, and payment processing. The project consists of two main parts:

- **spoura-frontend**: Preact + TypeScript + TailwindCSS frontend
- **spoura-go-api**: Go backend deployed as Vercel Serverless Functions

## Development Commands

### Frontend (spoura-frontend)
```bash
cd spoura-frontend
npm install          # Install dependencies
npm run dev         # Start development server
npm run build       # Production build
npm run preview     # Preview production build
```

### Backend (spoura-go-api)
```bash
cd spoura-go-api
go test ./test/...  # Run all tests
go test -v ./test/featured_test.go  # Run specific test file
```

## Environment Variables

### Frontend (.env)
Uses Vite - API endpoints configured in code pointing to `/api/*`

### Backend (.env) - Required for local development
```
TURSO_DATABASE_URL='libsql://yourenv.turso.io?authToken='
TURSO_AUTH_TOKEN='yourtoken'
SESSION_KEY='randomkey'
```

## Architecture

### Frontend (Preact + TypeScript)
- **Routing**: `preact-iso` Router in `src/index.tsx`
- **Pages**: Located in `src/pages/` - Home, Shop, Product, Cart, Checkout, Payment, Profile, Collection, Brand, About, Contact
- **Components**: Located in `src/components/` - Header, Footer, Auth, CartAction, FavouriteToggle, Product, LoadingSpinner
- **Styling**: TailwindCSS + DaisyUI (see `tailwind.config.js`)
- **Build**: Vite with `@preact/preset-vite`

### Backend (Go + Vercel Serverless)
- **API Functions**: Each file in `api/` is a Vercel serverless function
- **Database**: Turso (libSQL) - connection in `db/connect.go`
- **API Routes**: Defined in `vercel.json` rewrites:
  - `/api/product/*` → `api/product.go`
  - `/api/brand/*` → `api/product.go`
  - `/api/collection/*` → `api/product.go`
  - `/api/type/*` → `api/type.go`
  - `/api/session/*` → `api/session.go`
  - `/api/favourite/*` → `api/favourite.go`
  - `/api/cart/*` → `api/cart.go`
  - `/api/shop/*` → `api/shop.go`
  - `/api/featured/*` → `api/featured.go`
  - `/api/user/*` → `api/user.go`
  - `/api/paymentintent/*` → `api/paymentintent.go`
  - `/api/clearcart/*` → `api/clearcart.go`

- **Types**: Go structs in `types/` - Product, User, CartItem, FavouriteItem, Order, Brand, Collection
- **Utilities**: Helper functions in `funcs/` - encrypt, cleanInput, brandHandler, paginate
- **Tests**: Integration tests in `test/` - uses Turso test database

### Database Schema
Tables: Product, User, CartItem, FavouriteItem, Order

## Deployment

Both frontend and backend deploy to Vercel:
- Frontend: `spoura-frontend/vercel.json`
- Backend: `spoura-go-api/vercel.json`

Demo: https://spoura-frontend.vercel.app/
