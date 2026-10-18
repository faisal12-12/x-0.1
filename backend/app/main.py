"""Application entry point for the FastAPI backend.

Responsibilities:
- Create the FastAPI app and allow requests from the frontend.
- Register the routers defined in `app.api` (auth, dashboard, calendar,
  mail, tasks, and agent).
- Start the background scheduler and workers when the app starts, and
  shut them down cleanly when it stops.
- Optionally serve the static frontend files in production.
"""
