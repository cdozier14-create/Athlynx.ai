"""
ATHLYNX API Client
"""

import requests
from typing import Optional, Dict, Any, List
from .exceptions import AthlynxError, AuthenticationError, RateLimitError


class AthlynxClient:
    """
    Main client for interacting with the ATHLYNX API.
    
    Args:
        api_key: Your ATHLYNX API key
        base_url: API base URL (default: https://api.athlynx.ai)
        timeout: Request timeout in seconds (default: 30)
    
    Example:
        client = AthlynxClient(api_key="your-api-key")
        athletes = client.athletes.list()
    """
    
    DEFAULT_BASE_URL = "https://api.athlynx.ai"
    
    def __init__(
        self,
        api_key: str,
        base_url: Optional[str] = None,
        timeout: int = 30
    ):
        self.api_key = api_key
        self.base_url = base_url or self.DEFAULT_BASE_URL
        self.timeout = timeout
        self._session = requests.Session()
        self._session.headers.update({
            "Authorization": f"Bearer {api_key}",
            "Content-Type": "application/json",
            "User-Agent": "athlynx-python/1.0.0"
        })
        
        # Initialize resource endpoints
        self.athletes = AthletesResource(self)
        self.nil = NILResource(self)
        self.schools = SchoolsResource(self)
        self.brands = BrandsResource(self)
        self.ai = AIResource(self)
        self.messenger = MessengerResource(self)
        self.training = TrainingResource(self)
    
    def _request(
        self,
        method: str,
        endpoint: str,
        params: Optional[Dict] = None,
        data: Optional[Dict] = None
    ) -> Dict[str, Any]:
        """Make an API request."""
        url = f"{self.base_url}{endpoint}"
        
        try:
            response = self._session.request(
                method=method,
                url=url,
                params=params,
                json=data,
                timeout=self.timeout
            )
            
            if response.status_code == 401:
                raise AuthenticationError("Invalid API key")
            elif response.status_code == 429:
                raise RateLimitError("Rate limit exceeded")
            elif response.status_code >= 400:
                raise AthlynxError(f"API error: {response.text}")
            
            return response.json()
            
        except requests.RequestException as e:
            raise AthlynxError(f"Request failed: {str(e)}")


class AthletesResource:
    """Athletes API resource."""
    
    def __init__(self, client: AthlynxClient):
        self._client = client
    
    def list(self, sport: Optional[str] = None, school: Optional[str] = None) -> List[Dict]:
        """List athletes with optional filters."""
        params = {}
        if sport:
            params["sport"] = sport
        if school:
            params["school"] = school
        return self._client._request("GET", "/v1/athletes", params=params)
    
    def get(self, athlete_id: str) -> Dict:
        """Get a specific athlete by ID."""
        return self._client._request("GET", f"/v1/athletes/{athlete_id}")
    
    def create(self, data: Dict) -> Dict:
        """Create a new athlete profile."""
        return self._client._request("POST", "/v1/athletes", data=data)
    
    def update(self, athlete_id: str, data: Dict) -> Dict:
        """Update an athlete profile."""
        return self._client._request("PATCH", f"/v1/athletes/{athlete_id}", data=data)


class NILResource:
    """NIL Deals API resource."""
    
    def __init__(self, client: AthlynxClient):
        self._client = client
    
    def search(
        self,
        sport: Optional[str] = None,
        min_value: Optional[float] = None,
        max_value: Optional[float] = None,
        brand: Optional[str] = None
    ) -> List[Dict]:
        """Search NIL deals."""
        params = {}
        if sport:
            params["sport"] = sport
        if min_value:
            params["min_value"] = min_value
        if max_value:
            params["max_value"] = max_value
        if brand:
            params["brand"] = brand
        return self._client._request("GET", "/v1/nil/deals", params=params)
    
    def get(self, deal_id: str) -> Dict:
        """Get a specific NIL deal."""
        return self._client._request("GET", f"/v1/nil/deals/{deal_id}")
    
    def create(self, data: Dict) -> Dict:
        """Create a new NIL deal."""
        return self._client._request("POST", "/v1/nil/deals", data=data)
    
    def analyze(self, deal_id: str) -> Dict:
        """Get AI analysis of a NIL deal."""
        return self._client._request("POST", f"/v1/nil/deals/{deal_id}/analyze")


class SchoolsResource:
    """Schools API resource."""
    
    def __init__(self, client: AthlynxClient):
        self._client = client
    
    def list(self, conference: Optional[str] = None) -> List[Dict]:
        """List schools."""
        params = {}
        if conference:
            params["conference"] = conference
        return self._client._request("GET", "/v1/schools", params=params)
    
    def get(self, school_id: str) -> Dict:
        """Get a specific school."""
        return self._client._request("GET", f"/v1/schools/{school_id}")


class BrandsResource:
    """Brands API resource."""
    
    def __init__(self, client: AthlynxClient):
        self._client = client
    
    def list(self, category: Optional[str] = None) -> List[Dict]:
        """List brands."""
        params = {}
        if category:
            params["category"] = category
        return self._client._request("GET", "/v1/brands", params=params)
    
    def get(self, brand_id: str) -> Dict:
        """Get a specific brand."""
        return self._client._request("GET", f"/v1/brands/{brand_id}")


class AIResource:
    """AI Wizard API resource."""
    
    def __init__(self, client: AthlynxClient):
        self._client = client
    
    def ask(self, question: str, context: Optional[Dict] = None) -> Dict:
        """Ask the AI Wizard a question."""
        data = {"question": question}
        if context:
            data["context"] = context
        return self._client._request("POST", "/v1/ai/ask", data=data)
    
    def analyze_deal(self, deal_data: Dict) -> Dict:
        """Get AI analysis of a potential deal."""
        return self._client._request("POST", "/v1/ai/analyze-deal", data=deal_data)
    
    def generate_content(self, prompt: str, content_type: str = "social") -> Dict:
        """Generate content using AI."""
        return self._client._request("POST", "/v1/ai/generate", data={
            "prompt": prompt,
            "type": content_type
        })


class MessengerResource:
    """Messenger API resource."""
    
    def __init__(self, client: AthlynxClient):
        self._client = client
    
    def send(self, to: str, message: str, channel: str = "sms") -> Dict:
        """Send a message."""
        return self._client._request("POST", "/v1/messenger/send", data={
            "to": to,
            "message": message,
            "channel": channel
        })
    
    def get_conversations(self) -> List[Dict]:
        """Get all conversations."""
        return self._client._request("GET", "/v1/messenger/conversations")


class TrainingResource:
    """Diamond Grind Training API resource."""
    
    def __init__(self, client: AthlynxClient):
        self._client = client
    
    def log_workout(self, athlete_id: str, workout_data: Dict) -> Dict:
        """Log a workout."""
        return self._client._request("POST", f"/v1/training/{athlete_id}/workouts", data=workout_data)
    
    def get_stats(self, athlete_id: str) -> Dict:
        """Get training statistics."""
        return self._client._request("GET", f"/v1/training/{athlete_id}/stats")
    
    def get_plan(self, athlete_id: str) -> Dict:
        """Get training plan."""
        return self._client._request("GET", f"/v1/training/{athlete_id}/plan")
