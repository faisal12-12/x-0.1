"""Database entities (ORM models).

Tables:
- users and oauth_tokens: accounts and their encrypted credentials.
- tasks and agent_runs: user requests and their execution history.
- email_summaries: cached summaries keyed by message ID.
- audit_events: a record of every agent action.
"""
