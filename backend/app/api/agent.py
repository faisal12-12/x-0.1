"""Agent execution and status endpoints.

- GET /api/agent/{task_id}: returns the current status and result of an
  agent run.
- GET /api/agent/{task_id}/stream: streams status changes with
  Server-Sent Events, so the "Sent to Agent" section updates live
  without polling.
- POST /api/agent/{task_id}/permission: records the user's allow or deny
  decision for a permission request and resumes or cancels the run.
"""
