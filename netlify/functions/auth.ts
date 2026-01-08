import type { Handler } from '@netlify/functions';

const RESEND_API_KEY = process.env.RESEND_API_KEY || 're_ZQpN7oSa_e956Bzd312Bk881wDNJ1CB91';

// Simple in-memory store (use Redis/Neon in production)
const verificationStore = new Map<string, any>();

export const handler: Handler = async (event) => {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Content-Type': 'application/json',
  };

  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers, body: '' };
  }

  try {
    const body = JSON.parse(event.body || '{}');
    const { action, email, name, phone, role, sport } = body;

    if (action === 'signup') {
      // Generate VIP code
      const vipCode = `VIP-${Math.random().toString(36).substring(2, 10).toUpperCase()}`;
      
      // Store user data
      verificationStore.set(email, { name, email, phone, role, sport, vipCode, verified: true });

      // Send welcome email
      const emailResponse = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${RESEND_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: 'ATHLYNX <welcome@athlynx.ai>',
          to: [email],
          subject: '🏆 Welcome to ATHLYNX! Your VIP Access',
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
              <h1 style="color: #2563eb;">Welcome to ATHLYNX, ${name}!</h1>
              <p style="font-size: 18px;">You're officially part of The Athlete's Playbook!</p>
              
              <div style="background: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
                <h2 style="margin: 0;">Your VIP Code:</h2>
                <p style="font-size: 32px; font-weight: bold; color: #2563eb; margin: 10px 0;">${vipCode}</p>
              </div>
              
              <p><strong>What's Next:</strong></p>
              <ul>
                <li>Access your portal at <a href="https://athlynx.ai/portal">athlynx.ai/portal</a></li>
                <li>Use your VIP code to unlock exclusive features</li>
                <li>Start building your NIL empire</li>
              </ul>
              
              <p style="margin-top: 30px;">
                <a href="https://athlynx.ai/portal" style="background: #2563eb; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block;">Access Portal Now</a>
              </p>
              
              <p style="color: #6b7280; font-size: 14px; margin-top: 40px;">
                DREAMS DO COME TRUE 2026 🏆
              </p>
            </div>
          `
        })
      });

      if (!emailResponse.ok) {
        console.error('Email send failed:', await emailResponse.text());
      }

      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({ 
          success: true, 
          message: 'Welcome to ATHLYNX! Check your email for your VIP code.',
          vipCode 
        })
      };
    }

    return {
      statusCode: 400,
      headers,
      body: JSON.stringify({ error: 'Invalid action' })
    };

  } catch (error: any) {
    console.error('Function error:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: error.message || 'Internal server error' })
    };
  }
};
