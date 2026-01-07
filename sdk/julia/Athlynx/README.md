# Athlynx.jl

Official Julia SDK for the ATHLYNX AI Platform - The Athlete's Playbook.

## Installation

```julia
using Pkg
Pkg.add(url="https://github.com/cdozier14-create/AthlynxAI", subdir="sdk/julia/Athlynx")
```

## Quick Start

```julia
using Athlynx

# Initialize the client
client = AthlynxClient("your-api-key")

# Get athlete profiles
athletes = list_athletes(client, sport="football")

# Search NIL deals
deals = search_nil_deals(client, min_value=5000, sport="basketball")

# Ask the AI Wizard
response = ask_ai(client, "What factors should I consider for this NIL deal?")

# Send a message
send_message(client, "+1234567890", "Your deal is ready!")
```

## Features

### Athletes
```julia
# List all athletes
athletes = list_athletes(client)

# Filter by sport
football_players = list_athletes(client, sport="football")

# Get specific athlete
athlete = get_athlete(client, "athlete-id")

# Create athlete profile
new_athlete = create_athlete(client, Dict(
    "name" => "John Doe",
    "sport" => "basketball",
    "school" => "Texas A&M",
    "position" => "Guard"
))
```

### NIL Deals
```julia
# Search deals
deals = search_nil_deals(client, 
    sport="football",
    min_value=1000,
    max_value=50000
)

# Get deal details
deal = get_nil_deal(client, "deal-id")

# AI analysis of a deal
analysis = analyze_nil_deal(client, "deal-id")
```

### AI Wizard
```julia
# Ask questions
response = ask_ai(client, "How do I maximize my NIL value?")

# Analyze a potential deal
analysis = analyze_deal(client, Dict(
    "brand" => "Nike",
    "value" => 25000,
    "deliverables" => ["social posts", "appearances"]
))

# Generate content
content = generate_content(client, 
    "Create an Instagram caption for my new sponsorship",
    content_type="social"
)
```

### Messenger
```julia
# Send SMS
send_message(client, "+1234567890", "Your NIL deal has been approved!", channel="sms")

# Get conversations
conversations = get_conversations(client)
```

### Training (Diamond Grind)
```julia
# Log a workout
log_workout(client, "athlete-id", Dict(
    "type" => "strength",
    "duration" => 60,
    "exercises" => ["squats", "deadlifts", "bench press"]
))

# Get training stats
stats = get_training_stats(client, "athlete-id")
```

## Error Handling

```julia
using Athlynx

client = AthlynxClient("your-api-key")

try
    athletes = list_athletes(client)
catch e
    if occursin("Authentication", string(e))
        println("Invalid API key")
    elseif occursin("Rate limit", string(e))
        println("Too many requests, please slow down")
    else
        println("API error: $e")
    end
end
```

## Support

- Documentation: https://docs.athlynx.ai
- Email: support@athlynx.ai
- GitHub: https://github.com/cdozier14-create/AthlynxAI

## License

MIT License - ATHLYNX AI Corporation
