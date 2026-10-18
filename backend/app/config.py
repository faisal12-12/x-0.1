"""Application configuration.

All settings are read from environment variables so secrets never live
in the codebase. The settings cover:
- Google OAuth client ID, client secret, and redirect URI.
- OpenAI API key and model name.
- Database URL.
- Session secret and the key used to encrypt OAuth tokens at rest.
- Refresh intervals for calendar, email, and weather data.
"""
