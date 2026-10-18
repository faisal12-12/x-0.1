"""ChatGPT agent integration.

Defines the tools the agent may call (list, create, and update calendar
events; drafting email comes later) and runs the chat-completion loop
that executes them. Write actions never run immediately: they wait for
the permission gate. Results are returned in a structured form that the
frontend can display in the "Sent to Agent" section.
"""
