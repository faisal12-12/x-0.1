"""Email integration, starting with Gmail.

Fetches unread messages and extracts the fields the dashboard needs:
sender, subject, snippet, and received time. The interface is
provider-agnostic so Outlook or IMAP support can be added later. The
message content is passed to `services.summarizer` for summarization.
"""
