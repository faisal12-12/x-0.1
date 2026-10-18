"""Google OAuth routes.

Endpoints:
- GET /auth/google/login: redirects the user to Google's consent screen
  with only the scopes the dashboard needs.
- GET /auth/google/callback: receives the authorization code, exchanges
  it for tokens, stores the tokens encrypted, and returns the user to
  the frontend.
- POST /auth/logout: clears the session and revokes the stored tokens.
"""
