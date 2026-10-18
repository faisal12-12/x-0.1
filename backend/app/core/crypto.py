"""Encryption for credentials stored at rest.

OAuth refresh tokens are encrypted before they are written to the
database and decrypted only when the backend calls Google. The
encryption key comes from the environment and is never sent to the
browser.
"""
