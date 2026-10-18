"""Calendar read endpoints.

GET /api/calendar/events returns upcoming events from the selected
calendar source. Google Calendar is the only supported source for now,
but the response includes the source name so the frontend selector can
support Apple Calendar and Outlook later.
"""
