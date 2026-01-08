import { Handler } from '@netlify/functions';

const TWILIO_ACCOUNT_SID = process.env.TWILIO_ACCOUNT_SID;
const TWILIO_AUTH_TOKEN = process.env.TWILIO_AUTH_TOKEN;
const TWILIO_PHONE = process.env.TWILIO_PHONE_NUMBER;
const RESEND_API_KEY = process.env.RESEND_API_KEY;
const DATABASE_URL = process.env.DATABASE_URL;

// In-memory store for verification codes (use Redis in production)
const verificationCodes = new Map<string, { code: string; expires: number; data: any }>();

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
    const { action, name, email, phone, role, sport, code } = body;

    if (action === 'send_code') {
      // Generate 6-digit code
      const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();
      
      // Store code with 10-minute expiration
      verificationCodes.set(phone, {
        code: verificationCode,
        expires: Date.now() + 10 * 60 * 1000,
        data: { name, email, phone, role, sport }
      });

      // Send SMS via Twilio
      const twilioUrl = `https://api.twilio.com/2010-04-01/Accounts/${TWILIO_ACCOUNT_SID}/Messages.json`;
      const twilioAuth = Buffer.from(`${TWILIO_ACCOUNT_SID}:${TWILIO_AUTH_TOKEN}`).toString('base64');
      
      await fetch(twilioUrl, {
        method: 'POST',
        headers: {
          'Authorization': `Basic ${twilioAuth}`,
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          To: phone,
          From: TWILIO_PHONE!,
          Body: `Your ATHLYNX verification code is: ${verificationCode}`
        })
      });

      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({ success: true, message: 'Code sent!' })
      };
    }

    if (action === 'verify_code') {
      const stored = verificationCodes.get(phone);
      
      if (!stored) {
        return {
          statusCode: 400,
          headers,
          body: JSON.stringify({ success: false, message: 'No code found. Please request a new code.' })
        };
      }

      if (Date.now() > stored.expires) {
        verificationCodes.delete(phone);
        return {
          statusCode: 400,
          headers,
          body: JSON.stringify({ success: false, message: 'Code expired. Please request a new code.' })
        };
      }

      if (stored.code !== code) {
        return {
          statusCode: 400,
          headers,
          body: JSON.stringify({ success: false, message: 'Invalid code. Please try again.' })
        };
      }

      // Code is valid! Create account
      const vipCode = `VIP-${Math.random().toString(36).substring(2, 10).toUpperCase()}`;
      
      // TODO: Save to Neon database
      
      // Send welcome email via Resend
      try {
        await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${RESEND_API_KEY}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            from: 'ATHLYNX <welcome@athlynx.ai>',
            to: [email],
            subject: 'Welcome to ATHLYNX! Your VIP Code',
            html: `
              <h1>Welcome to ATHLYNX, ${name}!</h1>
              <p>Your VIP Code: <strong>${vipCode}</strong></p>
              <p>Visit <a href="https://athlynx.ai/portal">https://athlynx.ai/portal</a> to access your account.</p>
            `
          })
        });
      } catch (e) {
        console.error('Email error:', e);
      }

      // Clear verification code
      verificationCodes.delete(phone);

      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({ 
          success: true, 
          message: 'Account created!',
          vipCode,
          redirectUrl: '/portal'
        })
      };
    }

    return {
      statusCode: 400,
      headers,
      body: JSON.stringify({ error: 'Invalid action' })
    };

  } catch (error: any) {
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: error.message })
    };
  }
};
