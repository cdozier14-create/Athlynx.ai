"""
ATHLYNX Julia SDK
=================

Official Julia SDK for the ATHLYNX AI Platform.

Author: ATHLYNX AI Corporation
Website: https://athlynx.ai

# Example
```julia
using Athlynx

client = AthlynxClient("your-api-key")

# Get athletes
athletes = list_athletes(client, sport="football")

# Search NIL deals
deals = search_nil_deals(client, min_value=5000)

# AI Wizard
response = ask_ai(client, "What should I consider for this NIL deal?")
```
"""
module Athlynx

using HTTP
using JSON3
using Dates

export AthlynxClient, 
       list_athletes, get_athlete, create_athlete,
       search_nil_deals, get_nil_deal, analyze_nil_deal,
       list_schools, get_school,
       list_brands, get_brand,
       ask_ai, analyze_deal, generate_content,
       send_message, get_conversations,
       log_workout, get_training_stats

const DEFAULT_BASE_URL = "https://api.athlynx.ai"

"""
    AthlynxClient(api_key; base_url=DEFAULT_BASE_URL, timeout=30)

Create an ATHLYNX API client.

# Arguments
- `api_key::String`: Your ATHLYNX API key
- `base_url::String`: API base URL (default: https://api.athlynx.ai)
- `timeout::Int`: Request timeout in seconds (default: 30)
"""
struct AthlynxClient
    api_key::String
    base_url::String
    timeout::Int
    
    function AthlynxClient(api_key::String; base_url::String=DEFAULT_BASE_URL, timeout::Int=30)
        new(api_key, base_url, timeout)
    end
end

# Internal request function
function _request(client::AthlynxClient, method::String, endpoint::String; 
                  params::Dict=Dict(), data::Union{Dict,Nothing}=nothing)
    url = "$(client.base_url)$(endpoint)"
    
    headers = [
        "Authorization" => "Bearer $(client.api_key)",
        "Content-Type" => "application/json",
        "User-Agent" => "athlynx-julia/1.0.0"
    ]
    
    try
        if method == "GET"
            response = HTTP.get(url, headers; query=params, readtimeout=client.timeout)
        elseif method == "POST"
            body = isnothing(data) ? "" : JSON3.write(data)
            response = HTTP.post(url, headers, body; readtimeout=client.timeout)
        elseif method == "PATCH"
            body = isnothing(data) ? "" : JSON3.write(data)
            response = HTTP.patch(url, headers, body; readtimeout=client.timeout)
        else
            error("Unsupported method: $method")
        end
        
        return JSON3.read(String(response.body))
    catch e
        if e isa HTTP.StatusError
            if e.status == 401
                error("Authentication failed: Invalid API key")
            elseif e.status == 429
                error("Rate limit exceeded")
            else
                error("API error ($(e.status)): $(String(e.response.body))")
            end
        end
        rethrow(e)
    end
end

# ============= Athletes API =============

"""
    list_athletes(client; sport=nothing, school=nothing)

List athletes with optional filters.
"""
function list_athletes(client::AthlynxClient; sport::Union{String,Nothing}=nothing, 
                       school::Union{String,Nothing}=nothing)
    params = Dict{String,String}()
    !isnothing(sport) && (params["sport"] = sport)
    !isnothing(school) && (params["school"] = school)
    _request(client, "GET", "/v1/athletes"; params=params)
end

"""
    get_athlete(client, athlete_id)

Get a specific athlete by ID.
"""
function get_athlete(client::AthlynxClient, athlete_id::String)
    _request(client, "GET", "/v1/athletes/$athlete_id")
end

"""
    create_athlete(client, data)

Create a new athlete profile.
"""
function create_athlete(client::AthlynxClient, data::Dict)
    _request(client, "POST", "/v1/athletes"; data=data)
end

# ============= NIL Deals API =============

"""
    search_nil_deals(client; sport=nothing, min_value=nothing, max_value=nothing, brand=nothing)

Search NIL deals with filters.
"""
function search_nil_deals(client::AthlynxClient; 
                          sport::Union{String,Nothing}=nothing,
                          min_value::Union{Number,Nothing}=nothing,
                          max_value::Union{Number,Nothing}=nothing,
                          brand::Union{String,Nothing}=nothing)
    params = Dict{String,String}()
    !isnothing(sport) && (params["sport"] = sport)
    !isnothing(min_value) && (params["min_value"] = string(min_value))
    !isnothing(max_value) && (params["max_value"] = string(max_value))
    !isnothing(brand) && (params["brand"] = brand)
    _request(client, "GET", "/v1/nil/deals"; params=params)
end

"""
    get_nil_deal(client, deal_id)

Get a specific NIL deal.
"""
function get_nil_deal(client::AthlynxClient, deal_id::String)
    _request(client, "GET", "/v1/nil/deals/$deal_id")
end

"""
    analyze_nil_deal(client, deal_id)

Get AI analysis of a NIL deal.
"""
function analyze_nil_deal(client::AthlynxClient, deal_id::String)
    _request(client, "POST", "/v1/nil/deals/$deal_id/analyze")
end

# ============= Schools API =============

"""
    list_schools(client; conference=nothing)

List schools with optional conference filter.
"""
function list_schools(client::AthlynxClient; conference::Union{String,Nothing}=nothing)
    params = Dict{String,String}()
    !isnothing(conference) && (params["conference"] = conference)
    _request(client, "GET", "/v1/schools"; params=params)
end

"""
    get_school(client, school_id)

Get a specific school.
"""
function get_school(client::AthlynxClient, school_id::String)
    _request(client, "GET", "/v1/schools/$school_id")
end

# ============= Brands API =============

"""
    list_brands(client; category=nothing)

List brands with optional category filter.
"""
function list_brands(client::AthlynxClient; category::Union{String,Nothing}=nothing)
    params = Dict{String,String}()
    !isnothing(category) && (params["category"] = category)
    _request(client, "GET", "/v1/brands"; params=params)
end

"""
    get_brand(client, brand_id)

Get a specific brand.
"""
function get_brand(client::AthlynxClient, brand_id::String)
    _request(client, "GET", "/v1/brands/$brand_id")
end

# ============= AI Wizard API =============

"""
    ask_ai(client, question; context=nothing)

Ask the AI Wizard a question.
"""
function ask_ai(client::AthlynxClient, question::String; context::Union{Dict,Nothing}=nothing)
    data = Dict("question" => question)
    !isnothing(context) && (data["context"] = context)
    _request(client, "POST", "/v1/ai/ask"; data=data)
end

"""
    analyze_deal(client, deal_data)

Get AI analysis of a potential deal.
"""
function analyze_deal(client::AthlynxClient, deal_data::Dict)
    _request(client, "POST", "/v1/ai/analyze-deal"; data=deal_data)
end

"""
    generate_content(client, prompt; content_type="social")

Generate content using AI.
"""
function generate_content(client::AthlynxClient, prompt::String; content_type::String="social")
    _request(client, "POST", "/v1/ai/generate"; data=Dict("prompt" => prompt, "type" => content_type))
end

# ============= Messenger API =============

"""
    send_message(client, to, message; channel="sms")

Send a message via SMS or other channel.
"""
function send_message(client::AthlynxClient, to::String, message::String; channel::String="sms")
    _request(client, "POST", "/v1/messenger/send"; data=Dict(
        "to" => to,
        "message" => message,
        "channel" => channel
    ))
end

"""
    get_conversations(client)

Get all conversations.
"""
function get_conversations(client::AthlynxClient)
    _request(client, "GET", "/v1/messenger/conversations")
end

# ============= Training API =============

"""
    log_workout(client, athlete_id, workout_data)

Log a workout for an athlete.
"""
function log_workout(client::AthlynxClient, athlete_id::String, workout_data::Dict)
    _request(client, "POST", "/v1/training/$athlete_id/workouts"; data=workout_data)
end

"""
    get_training_stats(client, athlete_id)

Get training statistics for an athlete.
"""
function get_training_stats(client::AthlynxClient, athlete_id::String)
    _request(client, "GET", "/v1/training/$athlete_id/stats")
end

end # module
