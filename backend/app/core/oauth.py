"""Google OAuth helpers.

Handles the full token lifecycle:
- Build consent URLs that request only the scopes currently needed.
- Exchange authorization codes for access and refresh tokens.
- Refresh expired access tokens using the stored refresh token.
- Revoke tokens when the user disconnects or logs out.
"""
