# ATHLYNX Python SDK

Official Python SDK for the ATHLYNX AI Platform - The Athlete's Playbook.

## Installation

```bash
pip install athlynx
```

## Quick Start

```python
from athlynx import AthlynxClient

# Initialize the client
client = AthlynxClient(api_key="your-api-key")

# Get athlete profiles
athletes = client.athletes.list(sport="football")

# Search NIL deals
deals = client.nil.search(min_value=5000, sport="basketball")

# Ask the AI Wizard
response = client.ai.ask("What factors should I consider for this NIL deal?")

# Send a message
client.messenger.send(to="+1234567890", message="Your deal is ready!")
```

## Features

### Athletes
```python
# List all athletes
athletes = client.athletes.list()

# Filter by sport
football_players = client.athletes.list(sport="football")

# Get specific athlete
athlete = client.athletes.get("athlete-id")

# Create athlete profile
new_athlete = client.athletes.create({
    "name": "John Doe",
    "sport": "basketball",
    "school": "Texas A&M",
    "position": "Guard"
})
```

### NIL Deals
```python
# Search deals
deals = client.nil.search(
    sport="football",
    min_value=1000,
    max_value=50000
)

# Get deal details
deal = client.nil.get("deal-id")

# AI analysis of a deal
analysis = client.nil.analyze("deal-id")
```

### AI Wizard
```python
# Ask questions
response = client.ai.ask("How do I maximize my NIL value?")

# Analyze a potential deal
analysis = client.ai.analyze_deal({
    "brand": "Nike",
    "value": 25000,
    "deliverables": ["social posts", "appearances"]
})

# Generate content
content = client.ai.generate_content(
    prompt="Create an Instagram caption for my new sponsorship",
    content_type="social"
)
```

### Messenger
```python
# Send SMS
client.messenger.send(
    to="+1234567890",
    message="Your NIL deal has been approved!",
    channel="sms"
)

# Get conversations
conversations = client.messenger.get_conversations()
```

### Training (Diamond Grind)
```python
# Log a workout
client.training.log_workout("athlete-id", {
    "type": "strength",
    "duration": 60,
    "exercises": ["squats", "deadlifts", "bench press"]
})

# Get training stats
stats = client.training.get_stats("athlete-id")

# Get training plan
plan = client.training.get_plan("athlete-id")
```

## Error Handling

```python
from athlynx import AthlynxClient, AthlynxError, AuthenticationError, RateLimitError

client = AthlynxClient(api_key="your-api-key")

try:
    athletes = client.athletes.list()
except AuthenticationError:
    print("Invalid API key")
except RateLimitError:
    print("Too many requests, please slow down")
except AthlynxError as e:
    print(f"API error: {e}")
```

## Support

- Documentation: https://docs.athlynx.ai
- Email: support@athlynx.ai
- GitHub: https://github.com/cdozier14-create/AthlynxAI

## License

MIT License - ATHLYNX AI Corporation
