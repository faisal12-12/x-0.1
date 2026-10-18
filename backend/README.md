# Backend — Advanced To-Do

Python backend for the Advanced To-Do dashboard. It will serve data to the static frontend in `../frontend/` and can also serve the frontend files in production.

The backend is currently a **skeleton**: every module contains a docstring describing its responsibility, but there is no implementation and no installed dependencies yet.

## How it fits together

1. **Google connection.** The user completes Google OAuth once. The backend stores encrypted refresh tokens and never exposes them to the browser.
2. **Ambient data.** A background worker refreshes upcoming calendar events, unread-email summaries, and weather on a schedule. The frontend reads everything through one dashboard endpoint, so no extra input is needed.
3. **Task creation.** The user submits a task with a title, details, date/time, priority, and agent. The backend stores it and queues an agent job.
4. **Agent execution.** The ChatGPT agent receives the task and can call calendar tools. If an action needs access the user has not approved, the run pauses and asks for permission with a clear explanation. Approved actions run; the result is stored.
5. **Live feedback.** Every status change (`queued`, `working`, `needs_permission`, `done`, `failed`) is pushed to the frontend so the "Sent to Agent" section updates without a page refresh.

## Architecture

- **FastAPI** for the API and **SQLite** in development (Postgres later).
- Tokens and API keys stay server-side.
- Providers are isolated under `app/integrations/` so Gmail can later be swapped for Outlook, or Google Calendar for another provider.
- Business logic lives in `app/services/`; HTTP handlers stay thin.
- Scheduled and long-running work lives in `app/workers/`.

## Directory map

```
backend/
├── app/
│   ├── main.py                  FastAPI entry point, routers, CORS, lifecycle
│   ├── config.py                Environment-driven settings
│   ├── api/                     HTTP layer
│   │   ├── deps.py              Shared dependencies (DB session, current user, OAuth guard)
│   │   ├── auth.py              Google OAuth login, callback, logout
│   │   ├── dashboard.py         GET /api/dashboard (ambient data aggregate)
│   │   ├── calendar.py          Upcoming calendar events
│   │   ├── mail.py              Unread-email summaries
│   │   ├── tasks.py             POST /api/tasks (the single manual input)
│   │   └── agent.py             Agent status, SSE stream, permission decisions
│   ├── core/                    Cross-cutting concerns
│   │   ├── oauth.py             OAuth URLs, code exchange, token refresh and revocation
│   │   ├── crypto.py            Encryption for tokens stored at rest
│   │   └── audit.py             Audit trail for every agent action
│   ├── db/
│   │   ├── database.py          Engine, session factory, declarative base
│   │   └── repositories.py      Queries for users, tasks, runs, caches, audit events
│   ├── integrations/
│   │   ├── google_calendar.py   List, create, and update calendar events
│   │   ├── gmail.py             Fetch unread mail in a provider-agnostic shape
│   │   └── openai_agent.py      ChatGPT tool definitions and execution loop
│   ├── models/
│   │   ├── schemas.py           Pydantic request/response models
│   │   └── entities.py          Database tables
│   ├── services/
│   │   ├── dashboard.py         Merges ambient data into one response
│   │   ├── summarizer.py        Email summaries with per-message caching
│   │   ├── permissions.py       Permission gate and explanations
│   │   └── scheduler.py         Periodic refresh jobs
│   └── workers/
│       ├── task_worker.py       Runs agent jobs; pauses and resumes on permission
│       └── refresh_worker.py    Refreshes calendar, email, and weather in the background
├── data/                        SQLite database and caches (gitignored)
├── tests/
├── requirements.txt             Dependencies (not installed)
└── .env.example                 Required environment variables
```

## Planned API

| Method | Path | Purpose |
|--------|------|---------|
| GET | `/auth/google/login` | Start Google OAuth consent |
| GET | `/auth/google/callback` | Exchange the code and store encrypted tokens |
| POST | `/auth/logout` | Clear the session and revoke tokens |
| GET | `/api/dashboard` | Date/time, weather, calendar, email summaries, and active agent tasks |
| GET | `/api/calendar/events` | Upcoming events with the selected source |
| GET | `/api/email/summaries` | Unread mail with cached summaries |
| POST | `/api/email/refresh` | Force an email refresh |
| POST | `/api/tasks` | Create a task and queue an agent job |
| GET | `/api/tasks/{id}` | Stored task details |
| GET | `/api/agent/{task_id}` | Current agent run status and result |
| GET | `/api/agent/{task_id}/stream` | SSE stream of status changes |
| POST | `/api/agent/{task_id}/permission` | Approve or deny a permission request |

## Task lifecycle

```
queued → working → needs_permission (optional) → done | failed
```

Every transition is stored in the database and pushed to the frontend.

## Security model

- OAuth tokens are encrypted at rest and never sent to the browser.
- Google scopes are minimal: calendar read and mail read at first; calendar write is requested only when an approved task needs it.
- The browser only holds a session cookie; API keys live in the server environment.
- Every agent action is audited so the user can see what was requested, what ran, and what changed.

## Next steps

1. Implement the modules in the order: config → database → OAuth → dashboard → email summaries → task worker.
2. Install the dependencies: `pip install -r requirements.txt`
3. Copy `.env.example` to `.env` and add the real credentials.
