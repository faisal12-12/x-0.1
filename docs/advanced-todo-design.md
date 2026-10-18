# Advanced To-Do List — Design Summary

## Concept

An AI-powered daily assistant that works like a live home screen rather than a traditional to-do list.

The user never has to ask for everyday information. The time, weather, calendar, and email are displayed automatically and stay visible at all times. The only manual action is **creating a task or event and sending it to an AI agent of the user's choice**.

> Ambient information is automatic. Creating and sending a task is the only manual input.

## Main screen — always live

### 1. Greeting, time, and weather (automatic)

- Greets the user based on the time of day (for example, "Good morning, Faisal").
- Shows the current time and weather (for example, "08:24 · 24°C, sunny").
- Requires no input and refreshes on its own.

### 2. Calendar (automatic, source selectable)

- Shows upcoming events, for example:
  - 12:00 — Team meeting
  - 15:30 — Gym session
  - 18:00 — Dinner with Sara
- The user chooses which calendar is displayed. For now the primary source is **Google Calendar**, connected through the Google Calendar API. Apple Calendar and Outlook support will come later.
- The selected source is visible in the card (for example, a "Google Calendar" selector).

### 3. Email summary (automatic)

- Shows only new or unread mail, summarized.
- Example: "1 new email — Justin, Re: Project update", followed by a one-line summary and any action items.
- Example summary line: "Deck attached, needs your OK before the 12:00 meeting."
- Includes the sender and the time the message arrived. No input is required.

### 4. Add a task or event (the only manual input)

A single form on the same screen with these fields:

- **Title** — for example, "Book dentist appointment".
- **Details / notes** — the context the agent needs.
- **Date · Time**.
- **Priority**.
- **Send to** — the AI agent the user chooses. Currently this is **ChatGPT**, through the ChatGPT API.
- **Send to Agent** button.

This is the only section where the user types anything.

### 5. "Sent to Agent" section

- Appears after the user sends a task.
- Shows which agent received the task and its status (Working… / Done).
- Displays the result and a confirmation when the work finishes (for example, "Added to calendar" or "Email drafted").

## What happens after "Send to Agent"

1. **The user sends the task** — the task, its details, and the chosen agent.
2. **Permission check (only if needed)** — if the task requires access (calendar, email, or a device), the agent explains why it needs that access. The user then allows or denies it.
3. **ChatGPT performs the task** — the ChatGPT API executes it using the calendar access the user granted.
4. **The result appears on the dashboard** — the confirmation and task status appear in the "Sent to Agent" section, and the calendar and lists update live with no further action from the user.

## Integrations — Phase 1

### Google Calendar API (primary calendar)

- Connect with OAuth 2.0 and request only the scopes that are needed:
  - read calendar events for the dashboard;
  - create and update events when the agent performs a scheduling task.
- The dashboard always shows upcoming events from the connected Google Calendar.
- Calendar writes only happen as part of an approved agent task.
- The calendar source selector stays in the UI for future providers, but Google is the only active source for now.

### ChatGPT API (primary agent)

- Every task sent from the "Send to Agent" section goes to **ChatGPT through the OpenAI ChatGPT API**.
- The model receives the task title, details, date/time, and priority, and can call calendar tools (list, create, and update events).
- Its response powers the "Sent to Agent" status and the result confirmation.
- The permission and explanation step still applies before any write or sensitive action.
- Support for other AI agents can be added behind the same "Send to Agent" interface later.

### Email summary (provider to be decided)

- The email summary card remains part of the design, but its data source is not decided yet. A mail API such as Gmail is the likely first choice.

### Security notes

- API keys and OAuth tokens are stored server-side and securely, never in the client.
- No calendar data is accessed until the user grants OAuth consent.

## Design principles

- **Zero input for ambient data:** time, weather, calendar, and email are always visible and update themselves.
- **One input surface:** the user only creates a task or event; nothing else needs to be entered.
- **User control:** the user picks the calendar source and the AI agent.
- **Transparency:** agents must explain why they need a permission before they act.
- **Live feedback:** every agent action resolves back into a visible status and result on the screen.

## Feature checklist

| # | Feature | Input needed? |
|---|---------|---------------|
| 1 | Morning/evening greeting | No |
| 2 | Weather and time | No |
| 3 | Calendar view (source selectable: Google or another provider) | No |
| 4 | New-email summary with senders | No |
| 5 | Task/event creation with details | Yes — the only input |
| 6 | Send the task to a chosen AI agent (ChatGPT for now) | Yes (part of task creation) |
| 7 | The agent performs the task (ChatGPT API) | No |
| 8 | Result and confirmation shown on the dashboard | No |

## Screens and diagrams

- `advanced-todo-ai-flow.svg` — the first flow version: inputs → router ("which") → admin vs. chosen agent → permission gate → display.
- `advanced-todo-redesign.svg` — the current design: an always-live dashboard mockup plus the post-send flow (send → permission if needed → ChatGPT performs the task → the result updates the screen), wired for the Google Calendar API and the ChatGPT API.

## Assumptions and open questions

- How often weather, calendar, and email should refresh (for example, every few minutes or whenever the screen opens).
- Which mail provider or API will power the email summary (Gmail is the likely first choice).
- How denied permissions should be handled (cancel the task, or retry with limited access).
- When to add other AI agents beyond ChatGPT, and whether users should be able to compare them or have one selected automatically.
- Where task history should live (only in the "Sent to Agent" section, or in a separate list).
