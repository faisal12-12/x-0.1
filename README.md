# Advanced To-Do

Advanced To-Do is a daily dashboard that keeps everyday information visible without asking, and gives the user one place to send tasks to an AI agent.

- **Ambient information, always visible:** date and time, weather, upcoming calendar events, and unread-email summaries.
- **One manual input:** the user creates a task, adds details, sets a date/time and priority, chooses an agent, and sends it.
- **Agent execution:** the agent (ChatGPT for now) performs the task, asks for permission first when it needs access, and reports its status and result back on the dashboard.

## Current state

- **Frontend:** complete static dashboard in `frontend/`. It runs on demo data and includes the live clock, date, category filters, sorting, keyboard navigation, and command bar.
- **Backend:** skeleton only in `backend/`. Each module contains a docstring describing what it will do and which endpoints it will serve. No dependencies are installed yet.

## Project structure

```
.
├── frontend/                 Static dashboard UI
│   ├── index.html
│   ├── style.css
│   └── script.js
├── backend/                  FastAPI backend skeleton
│   ├── app/                  API, integrations, services, workers
│   ├── data/                 SQLite database and caches
│   ├── tests/                Backend tests
│   ├── requirements.txt      Dependency list (not installed)
│   ├── .env.example          Required environment variables
│   └── README.md             Backend architecture and planned API
├── docs/
│   └── advanced-todo-design.md
├── .gitignore
└── README.md
```

## Preview the frontend

```sh
open frontend/index.html
# or serve it over HTTP
python3 -m http.server 8000 --directory frontend
```

## Backend

The backend is planned as a FastAPI service using SQLite in development, the Google Calendar and Gmail APIs for ambient data, and the OpenAI API for email summaries and agent tasks. See [backend/README.md](backend/README.md) for the architecture, module map, and planned endpoints.

To set it up later:

1. Install the dependencies: `pip install -r backend/requirements.txt`
2. Copy `backend/.env.example` to `backend/.env` and fill in the credentials.
3. Run the API from the `backend/` folder once `app/main.py` is implemented.

## Documentation

- [Design summary](docs/advanced-todo-design.md) — product concept, screen layout, flows, integrations, and open questions.
# x-0.1
