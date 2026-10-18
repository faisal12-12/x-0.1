"""Database setup.

Creates the SQLAlchemy engine and session factory (SQLite during
development, Postgres in production) and defines the declarative base
used by the entities in `app.models`.
"""
