"""Background worker for agent tasks.

Pulls queued tasks, runs the ChatGPT tool loop, and persists every status
change: queued, working, needs_permission, done, or failed. A run that
reaches the permission gate pauses until the decision arrives, then
resumes. Status changes are pushed to connected clients over SSE.
"""
