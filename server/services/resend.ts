/**
 * Resend Email Service
 * ATHLYNX AI Corporation
 * 
 * @author ATHLYNX AI Corporation
 * @date January 7, 2026
 */

import { Resend } from 'resend';

// Resend Configuration
const RESEND_API_KEY = process.env.RESEND_API_KEY || 're_ZQpN7oSa_e956Bzd312Bk881wDNJ1CB91';
const FROM_EMAIL = process.env.FROM_EMAIL || 'noreply@athlynx.ai';
const FROM_NAME = process.env.FROM_NAME || 'ATHLYNX';

// Initialize Resend client
const resend = new Resend(RESEND_API_KEY);

/**
 * Send email
 */
export async function sendEmail(options: {
  to: string | string[];
  subject: string;
  html: string;
  text?: string;
  replyTo?: string;
}): Promise<{
  success: boolean;
  emailId?: string;
  error?: string;
}> {
  try {
    const { data, error } = await resend.emails.send({
      from: `${FROM_NAME} <${FROM_EMAIL}>`,
      to: Array.isArray(options.to) ? options.to : [options.to],
      subject: options.subject,
      html: options.html,
      text: options.text,
      replyTo: options.replyTo,
    });

    if (error) {
      return { success: false, error: error.message };
    }

    return { success: true, emailId: data?.id };
  } catch (error) {
    console.error('[Resend Error]', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to send email',
    };
  }
}

/**
 * Send welcome email to new user
 */
export async function sendWelcomeEmail(to: string, name: string): Promise<{
  success: boolean;
  emailId?: string;
  error?: string;
}> {
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <div style="background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%); padding: 30px; text-align: center;">
        <h1 style="color: #f5a623; margin: 0;">ATHLYNX</h1>
        <p style="color: #ffffff; margin: 10px 0 0 0;">THE ATHLETE'S PLAYBOOK</p>
      </div>
      <div style="padding: 30px; background: #ffffff;">
        <h2 style="color: #1a1a2e;">Welcome to ATHLYNX, ${name}! 🏈</h2>
        <p>Your athlete success journey starts now.</p>
        <p>With ATHLYNX, you have access to:</p>
        <ul>
          <li>NIL Deal Management</li>
          <li>AI-Powered Recruiting</li>
          <li>Transfer Portal Intelligence</li>
          <li>Personal Brand Building</li>
          <li>Financial Planning Tools</li>
        </ul>
        <a href="https://athlynx.ai" style="display: inline-block; background: #f5a623; color: #1a1a2e; padding: 12px 24px; text-decoration: none; border-radius: 5px; font-weight: bold;">Get Started</a>
      </div>
      <div style="padding: 20px; background: #f5f5f5; text-align: center; font-size: 12px; color: #666;">
        <p>ATHLYNX AI Corporation | Parent Company: Dozier Holdings Group</p>
        <p>19039 Cloyanna Lane, Humble, TX 77346</p>
      </div>
    </div>
  `;

  return sendEmail({
    to,
    subject: '🏈 Welcome to ATHLYNX - Your Athlete Success Journey Starts Now!',
    html,
  });
}

/**
 * Send NIL deal notification email
 */
export async function sendNILDealEmail(to: string, deal: {
  athleteName: string;
  brandName: string;
  amount: number;
  deadline?: string;
  details?: string;
}): Promise<{
  success: boolean;
  emailId?: string;
  error?: string;
}> {
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <div style="background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%); padding: 30px; text-align: center;">
        <h1 style="color: #f5a623; margin: 0;">ATHLYNX</h1>
        <p style="color: #ffffff; margin: 10px 0 0 0;">NIL DEAL ALERT</p>
      </div>
      <div style="padding: 30px; background: #ffffff;">
        <h2 style="color: #1a1a2e;">🔥 New NIL Opportunity!</h2>
        <p>Hey ${deal.athleteName},</p>
        <p><strong>${deal.brandName}</strong> wants to work with you!</p>
        <div style="background: #f5f5f5; padding: 20px; border-radius: 10px; margin: 20px 0;">
          <p style="margin: 0;"><strong>Deal Value:</strong> $${deal.amount.toLocaleString()}</p>
          ${deal.deadline ? `<p style="margin: 10px 0 0 0;"><strong>Respond By:</strong> ${deal.deadline}</p>` : ''}
          ${deal.details ? `<p style="margin: 10px 0 0 0;"><strong>Details:</strong> ${deal.details}</p>` : ''}
        </div>
        <a href="https://athlynx.ai/nil-vault" style="display: inline-block; background: #f5a623; color: #1a1a2e; padding: 12px 24px; text-decoration: none; border-radius: 5px; font-weight: bold;">View Deal</a>
      </div>
    </div>
  `;

  return sendEmail({
    to,
    subject: `🔥 New NIL Deal from ${deal.brandName} - $${deal.amount.toLocaleString()}`,
    html,
  });
}

/**
 * Send verification code email
 */
export async function sendVerificationEmail(to: string, code: string): Promise<{
  success: boolean;
  emailId?: string;
  error?: string;
}> {
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <div style="background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%); padding: 30px; text-align: center;">
        <h1 style="color: #f5a623; margin: 0;">ATHLYNX</h1>
      </div>
      <div style="padding: 30px; background: #ffffff; text-align: center;">
        <h2 style="color: #1a1a2e;">Verify Your Email</h2>
        <p>Your verification code is:</p>
        <div style="background: #f5f5f5; padding: 20px; border-radius: 10px; margin: 20px 0;">
          <h1 style="color: #f5a623; letter-spacing: 10px; margin: 0;">${code}</h1>
        </div>
        <p style="color: #666; font-size: 14px;">This code expires in 10 minutes.</p>
      </div>
    </div>
  `;

  return sendEmail({
    to,
    subject: 'ATHLYNX - Your Verification Code',
    html,
  });
}

/**
 * Send payment receipt email
 */
export async function sendPaymentReceiptEmail(to: string, payment: {
  name: string;
  amount: number;
  description: string;
  transactionId: string;
  date: string;
}): Promise<{
  success: boolean;
  emailId?: string;
  error?: string;
}> {
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <div style="background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%); padding: 30px; text-align: center;">
        <h1 style="color: #f5a623; margin: 0;">ATHLYNX</h1>
        <p style="color: #ffffff; margin: 10px 0 0 0;">PAYMENT RECEIPT</p>
      </div>
      <div style="padding: 30px; background: #ffffff;">
        <h2 style="color: #1a1a2e;">✅ Payment Confirmed</h2>
        <p>Thank you, ${payment.name}!</p>
        <div style="background: #f5f5f5; padding: 20px; border-radius: 10px; margin: 20px 0;">
          <p style="margin: 0;"><strong>Amount:</strong> $${payment.amount.toLocaleString()}</p>
          <p style="margin: 10px 0 0 0;"><strong>Description:</strong> ${payment.description}</p>
          <p style="margin: 10px 0 0 0;"><strong>Transaction ID:</strong> ${payment.transactionId}</p>
          <p style="margin: 10px 0 0 0;"><strong>Date:</strong> ${payment.date}</p>
        </div>
      </div>
      <div style="padding: 20px; background: #f5f5f5; text-align: center; font-size: 12px; color: #666;">
        <p>ATHLYNX AI Corporation | Parent Company: Dozier Holdings Group</p>
      </div>
    </div>
  `;

  return sendEmail({
    to,
    subject: `ATHLYNX Payment Receipt - $${payment.amount.toLocaleString()}`,
    html,
  });
}

/**
 * Check if Resend is configured
 */
export function isResendConfigured(): boolean {
  return !!RESEND_API_KEY && RESEND_API_KEY.length > 0;
}

export default {
  sendEmail,
  sendWelcomeEmail,
  sendNILDealEmail,
  sendVerificationEmail,
  sendPaymentReceiptEmail,
  isResendConfigured,
};
