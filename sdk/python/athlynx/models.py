"""
ATHLYNX Data Models
"""

from dataclasses import dataclass
from typing import Optional, List
from datetime import datetime


@dataclass
class Athlete:
    """Athlete profile model."""
    id: str
    name: str
    sport: str
    position: Optional[str] = None
    school: Optional[str] = None
    year: Optional[str] = None
    gpa: Optional[float] = None
    social_following: Optional[int] = None
    nil_value: Optional[float] = None
    created_at: Optional[datetime] = None
    updated_at: Optional[datetime] = None
    
    @classmethod
    def from_dict(cls, data: dict) -> "Athlete":
        return cls(
            id=data.get("id"),
            name=data.get("name"),
            sport=data.get("sport"),
            position=data.get("position"),
            school=data.get("school"),
            year=data.get("year"),
            gpa=data.get("gpa"),
            social_following=data.get("social_following"),
            nil_value=data.get("nil_value"),
            created_at=data.get("created_at"),
            updated_at=data.get("updated_at"),
        )


@dataclass
class NILDeal:
    """NIL Deal model."""
    id: str
    athlete_id: str
    brand_id: str
    value: float
    status: str
    deal_type: str
    start_date: Optional[datetime] = None
    end_date: Optional[datetime] = None
    terms: Optional[str] = None
    deliverables: Optional[List[str]] = None
    created_at: Optional[datetime] = None
    
    @classmethod
    def from_dict(cls, data: dict) -> "NILDeal":
        return cls(
            id=data.get("id"),
            athlete_id=data.get("athlete_id"),
            brand_id=data.get("brand_id"),
            value=data.get("value"),
            status=data.get("status"),
            deal_type=data.get("deal_type"),
            start_date=data.get("start_date"),
            end_date=data.get("end_date"),
            terms=data.get("terms"),
            deliverables=data.get("deliverables"),
            created_at=data.get("created_at"),
        )


@dataclass
class School:
    """School/University model."""
    id: str
    name: str
    conference: str
    division: str
    location: Optional[str] = None
    sports: Optional[List[str]] = None
    nil_policy: Optional[str] = None
    
    @classmethod
    def from_dict(cls, data: dict) -> "School":
        return cls(
            id=data.get("id"),
            name=data.get("name"),
            conference=data.get("conference"),
            division=data.get("division"),
            location=data.get("location"),
            sports=data.get("sports"),
            nil_policy=data.get("nil_policy"),
        )


@dataclass
class Brand:
    """Brand model."""
    id: str
    name: str
    category: str
    website: Optional[str] = None
    contact_email: Optional[str] = None
    budget_range: Optional[str] = None
    preferred_sports: Optional[List[str]] = None
    active_deals: Optional[int] = None
    
    @classmethod
    def from_dict(cls, data: dict) -> "Brand":
        return cls(
            id=data.get("id"),
            name=data.get("name"),
            category=data.get("category"),
            website=data.get("website"),
            contact_email=data.get("contact_email"),
            budget_range=data.get("budget_range"),
            preferred_sports=data.get("preferred_sports"),
            active_deals=data.get("active_deals"),
        )
