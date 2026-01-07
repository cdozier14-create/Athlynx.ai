/**
 * Twilio SMS Service
 * ATHLYNX AI Corporation
 * 
 * @author ATHLYNX AI Corporation
 * @date January 7, 2026
 */

import Twilio from 'twilio';

// Twilio Configuration
const TWILIO_ACCOUNT_SID = process.env.TWILIO_ACCOUNT_SID || 'AC42c81cc5bed40c06bba310faa55c9ea4';
const TWILIO_AUTH_TOKEN = process.env.TWILIO_AUTH_TOKEN || '4702a5ccba87b942171829075eb8dc8d';
const TWILIO_PHONE_NUMBER = process.env.TWILIO_PHONE_NUMBER || '+18774618601';

// Initialize Twilio client
const twilioClient = Twilio(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN);

/**
 * Send SMS message
 */
export async function sendSMS(to: string, body: string): Promise<{
  success: boolean;
  messageId?: string;
  status?: string;
  error?: string;
}> {
  try {
    // Format phone number
    const formattedTo = to.startsWith('+') ? to : `+1${to.replace(/\D/g, '')}`;
    
    const message = await twilioClient.messages.create({
      body,
      from: TWILIO_PHONE_NUMBER,
      to: formattedTo,
    });

    return {
      success: true,
      messageId: message.sid,
      status: message.status,
    };
  } catch (error) {
    console.error('[Twilio Error]', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to send SMS',
    };
  }
}

/**
 * Send verification code
 */
export async function sendVerificationCode(to: string, code: string): Promise<{
  success: boolean;
  messageId?: string;
  error?: string;
}> {
  const body = `Your ATHLYNX verification code is: ${code}. This code expires in 10 minutes.`;
  return sendSMS(to, body);
}

/**
 * Send welcome SMS to new user
 */
export async function sendWelcomeSMS(to: string, name: string): Promise<{
  success: boolean;
  messageId?: string;
  error?: string;
}> {
  const body = `Welcome to ATHLYNX, ${name}! 🏈 Your athlete success journey starts now. Login at athlynx.ai to get started.`;
  return sendSMS(to, body);
}

/**
 * Send NIL deal notification
 */
export async function sendNILNotification(to: string, dealInfo: {
  brandName: string;
  amount: number;
  deadline?: string;
}): Promise<{
  success: boolean;
  messageId?: string;
  error?: string;
}> {
  const body = `🔥 New NIL Opportunity! ${dealInfo.brandName} wants to work with you. Deal value: $${dealInfo.amount.toLocaleString()}${dealInfo.deadline ? `. Respond by ${dealInfo.deadline}` : ''}. Check your ATHLYNX dashboard.`;
  return sendSMS(to, body);
}

/**
 * Send recruiting alert
 */
export async function sendRecruitingAlert(to: string, info: {
  schoolName: string;
  coachName: string;
  sport: string;
}): Promise<{
  success: boolean;
  messageId?: string;
  error?: string;
}> {
  const body = `📣 Recruiting Alert! Coach ${info.coachName} from ${info.schoolName} is interested in you for ${info.sport}. Check your ATHLYNX Recruiter inbox!`;
  return sendSMS(to, body);
}

/**
 * Send payment confirmation
 */
export async function sendPaymentConfirmation(to: string, info: {
  amount: number;
  description: string;
}): Promise<{
  success: boolean;
  messageId?: string;
  error?: string;
}> {
  const body = `✅ Payment Received! $${info.amount.toLocaleString()} for ${info.description}. Thank you for using ATHLYNX!`;
  return sendSMS(to, body);
}

/**
 * Check if Twilio is configured
 */
export function isTwilioConfigured(): boolean {
  return !!(TWILIO_ACCOUNT_SID && TWILIO_AUTH_TOKEN && TWILIO_PHONE_NUMBER);
}

export default {
  sendSMS,
  sendVerificationCode,
  sendWelcomeSMS,
  sendNILNotification,
  sendRecruitingAlert,
  sendPaymentConfirmation,
  isTwilioConfigured,
};
