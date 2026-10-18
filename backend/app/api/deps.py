"""Reusable FastAPI dependencies.

Provides:
- A database session for each request.
- The current user, resolved from the session cookie.
- A guard that verifies Google OAuth is connected before endpoints that
  need calendar or email data are allowed to run.
"""
