"""Email summary endpoints.

- GET /api/email/summaries returns unread messages together with their
  cached summaries.
- POST /api/email/refresh forces an immediate refresh, which is useful
  when the user wants the latest mail without waiting for the scheduler.
"""
