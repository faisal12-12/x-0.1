"""Task creation endpoints.

POST /api/tasks is the only write path the user triggers directly. It
validates the task title, details, date/time, priority, and chosen agent,
stores the task, and queues it for the agent worker.

GET /api/tasks/{id} returns the stored task. The live execution status is
served by the endpoints in `agent.py`.
"""
