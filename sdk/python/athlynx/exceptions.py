"""
ATHLYNX SDK Exceptions
"""


class AthlynxError(Exception):
    """Base exception for ATHLYNX SDK errors."""
    pass


class AuthenticationError(AthlynxError):
    """Raised when API authentication fails."""
    pass


class RateLimitError(AthlynxError):
    """Raised when API rate limit is exceeded."""
    pass


class ValidationError(AthlynxError):
    """Raised when request validation fails."""
    pass


class NotFoundError(AthlynxError):
    """Raised when a resource is not found."""
    pass
