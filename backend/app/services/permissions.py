"""Permission gate for agent actions.

Decides which actions need explicit user approval (for example, writing
to the calendar), writes a clear explanation of why access is needed,
and records the allow or deny decision before any sensitive action runs.
"""
