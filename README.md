# Spoura
![Thumbnail Image](https://mtlh.vercel.app/assets/spoura_portfolio.e11818e6_Z1HFFFD.webp)

## About
Fully featured ecommerce application, favourite and add shoes to your cart. Sort products using price, brand, type and search for your preferred fit.

## Demo
This project is deployed directly onto Vercel. 
[spoura.mtlh.dev](https://spoura.mtlh.dev/)

## Technologies
- TailwindCSS
- Typescript
- Preact
- Turso (libSQL)
- Go
- Vercel (hosting)

## How to deploy locally
Follow the steps below:
1. Download code from this repository.
2. Install every frontend dependency.
```typescript
npm install
```

4. Get all required backend keys setup in a .env file.
```typescript
TURSO_DATABASE_URL='libsql://yourenv.turso.io?authToken='
TURSO_AUTH_TOKEN='yourtoken'
SESSION_KEY='randomkey'
```

5. Run locally
```typescript
 npm run dev
```

6. Enjoy!
