"""Background refresh scheduling.

Runs calendar, email, and weather refreshes on the intervals set in the
configuration. It also exposes a way for the frontend to request an
immediate refresh instead of waiting for the next scheduled run.
"""
