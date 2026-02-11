# Tech Stack Documentation (outro projeto – arquivado)

Este documento descreve um **outro produto** (Real Estate Insight Agent), não o ELITE. Mantido em arquivo para referência.

---

## Project Overview
This project is a Real Estate Insight Agent that aggregates marketing data and presents it in a dashboard and daily email.

## Core Technologies

### Frontend
- **Framework**: [Next.js 14+](https://nextjs.org/) (App Router)
- **Language**: TypeScript
- **Styling**: TailwindCSS
- **Components**: Shadcn/UI (Radix UI + Tailwind)
- **Deployment**: Vercel

### Backend
- **Runtime**: Python 3.9+ (Serverless Functions on Vercel)
- **Framework**: [FastAPI](https://fastapi.tiangolo.com/)
- **Entry Point**: `/api/index.py` handling all `/api/*` routes.

### Database
- **Primary**: PostgreSQL (Supabase or Vercel Postgres recommended for production)
- **ORM**: SQLAlchemy

### Scraping & External APIs
- **Reddit**: `praw` (Python Reddit API Wrapper)
- **News**: `requests` + NewsAPI (or generic scraping with `beautifulsoup4`)
- **Search**: `googlesearch-python`
- **Facebook Ads**: Mock/Stub initially (due to scraping limits on Serverless)

### Background Jobs
- **Scheduler**: Vercel Cron Jobs
- **Email**: Resend or SMTP

## Architecture
- The frontend resides in `app/` and is served as static/ISR/SSR content.
- The backend resides in `api/` and is deployed as Python Serverless Functions.
- Client-side calls to `/api/...` are routed to the Python FastAPI instance.

## Environment Variables
- `NEXT_PUBLIC_APP_URL`: URL of the app
- `REDDIT_CLIENT_ID`: Reddit App Credential
- `REDDIT_CLIENT_SECRET`: Reddit App Credential
- `NEWS_API_KEY`: Key for news source
- `DATABASE_URL`: Postgres connection string
