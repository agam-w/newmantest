# Newman Test

Newmantest is an Web App that allows users to view their membership profile, earn points and badges by connecting their wallet, and completing quests, and displaying NFTs,

https://newmantest.fly.dev

## Getting Started

Follow the steps bellow to run the project locally

Setup environment variables. Copy the .env.example file to .env. Set `DATABASE_URL` to your PostgreSQL database connection string.

```bash
cp .env.example .env
```

Install dependencies

```bash
npm install
```

Run the development server

```bash
npm run dev
```

Open http://localhost:5173 with your browser to start developing.

Testing

```bash
npm run test
```

## Deployment

Deploy the project to Fly.io

```bash
flyctl deploy
```
