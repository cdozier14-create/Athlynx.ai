# Nebius Token Factory API Integration Guide

## Overview

Nebius Token Factory offers an **OpenAI-compatible API** for inference and fine-tuning. This means we can use the standard OpenAI SDK with Nebius endpoints.

## API Endpoints

- **Base URL**: `https://api.tokenfactory.nebius.com/v1/`
- **Alternative**: `https://api.studio.nebius.com/v1/`

## Authentication

Include your API key in the `Authorization` header:
```
Authorization: Bearer YOUR_NEBIUS_API_KEY
```

## Getting an API Key

1. Go to Nebius Token Factory → API keys section
2. Click **Create API key**
3. Enter the key name and click **Create**
4. Save the displayed API key (cannot be viewed later)

## Python Integration

```python
import os
from openai import OpenAI

client = OpenAI(
    base_url="https://api.tokenfactory.nebius.com/v1/",
    api_key=os.environ.get("NEBIUS_API_KEY"),
)

completion = client.chat.completions.create(
    model="meta-llama/Meta-Llama-3.1-70B-Instruct",
    messages=[
        {
            "role": "user",
            "content": "Hello!"
        }
    ],
    temperature=0.6
)

print(completion.to_json())
```

## JavaScript Integration

```javascript
import OpenAI from 'openai';

const client = new OpenAI({
    baseURL: "https://api.tokenfactory.nebius.com/v1/",
    apiKey: process.env.NEBIUS_API_KEY,
});

const completion = await client.chat.completions.create({
    model: "meta-llama/Meta-Llama-3.1-70B-Instruct",
    messages: [
        {
            role: "user",
            content: "Hello!"
        }
    ],
    temperature: 0.6
});

console.log(completion);
```

## cURL Example

```bash
curl https://api.tokenfactory.nebius.com/v1/chat/completions \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $NEBIUS_API_KEY" \
  -d '{
    "model": "meta-llama/Meta-Llama-3.1-70B-Instruct",
    "messages": [
      {"role": "user", "content": "Hello!"}
    ],
    "temperature": 0.6
  }'
```

## Available Models

- `meta-llama/Meta-Llama-3.1-70B-Instruct`
- `meta-llama/Meta-Llama-3.1-8B-Instruct`
- And more available in the Nebius AI Studio

## Response Format

```json
{
  "choices": [
    {
      "finish_reason": "stop",
      "index": 0,
      "message": {
        "content": "Hello! It's nice to meet you...",
        "role": "assistant"
      }
    }
  ],
  "created": 1717516032,
  "model": "meta-llama/Meta-Llama-3-70B-Instruct",
  "object": "chat.completion",
  "usage": {
    "completion_tokens": 26,
    "prompt_tokens": 13,
    "total_tokens": 39
  }
}
```

## ATHLYNX Integration Points

1. **AI Wizards** - Use Nebius for athlete advice, legal guidance, financial planning
2. **NIL Valuation** - AI-powered athlete valuation calculations
3. **Content Generation** - Social media posts, bios, marketing materials
4. **Transfer Portal Analysis** - AI analysis of player fit and potential
5. **Recruiting Automation** - AI-assisted recruiting outreach

## Environment Variables Needed

```
NEBIUS_API_KEY=your_api_key_here
```

## Cost Optimization

- Use smaller models (8B) for simple tasks
- Use larger models (70B) for complex analysis
- Implement caching for repeated queries
- Use batch inference for bulk operations

---

*Documentation created: January 7, 2026*
*ATHLYNX AI Corporation - Powered by Nebius Token Factory*
