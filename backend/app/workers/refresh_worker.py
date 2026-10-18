"""Background worker for ambient data.

Refreshes calendar events, email summaries, and weather outside the
request cycle. It prevents overlapping runs and respects provider rate
limits.
"""
