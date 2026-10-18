"""Email summarization.

Sends unread message content to ChatGPT and asks for a sender, a
one-line summary, and any action items. Results are cached by message ID
so each message is summarized once instead of on every refresh.
"""
