"""Dashboard data endpoint.

GET /api/dashboard returns one payload for the always-live screen:
the current date and time, weather, upcoming calendar events, unread
email summaries, and the status of active agent tasks. The frontend can
render its initial view from this single response.
"""
