"""Audit trail for agent activity.

Every task, permission decision, and tool call is recorded along with
the original request, the action that was taken, and the result. The
audit trail gives users transparency and provides the data needed for an
undo feature later.
"""
