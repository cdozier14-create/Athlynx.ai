"""
ATHLYNX Python SDK
==================

Official Python SDK for the ATHLYNX AI Platform.

Author: ATHLYNX AI Corporation
Website: https://athlynx.ai
Documentation: https://docs.athlynx.ai

Example:
    from athlynx import AthlynxClient
    
    client = AthlynxClient(api_key="your-api-key")
    
    # Get athlete profile
    athlete = client.athletes.get("athlete-id")
    
    # Search NIL deals
    deals = client.nil.search(sport="football", min_value=1000)
    
    # AI Wizard
    advice = client.ai.ask("What should I consider for this NIL deal?")
"""

__version__ = "1.0.0"
__author__ = "ATHLYNX AI Corporation"
__email__ = "support@athlynx.ai"

from .client import AthlynxClient
from .models import Athlete, NILDeal, School, Brand
from .exceptions import AthlynxError, AuthenticationError, RateLimitError

__all__ = [
    "AthlynxClient",
    "Athlete",
    "NILDeal", 
    "School",
    "Brand",
    "AthlynxError",
    "AuthenticationError",
    "RateLimitError",
]
