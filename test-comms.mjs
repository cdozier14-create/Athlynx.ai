// Test Communications Script - ATHLYNX
// Sends test email via Resend and test SMS via Twilio

import twilio from 'twilio';
import { Resend } from 'resend';

// Twilio credentials
const TWILIO_ACCOUNT_SID = 'AC42c81cc5bed40c06bba310faa55c9ea4';
const TWILIO_AUTH_TOKEN = '4702a5ccba87b942171829075eb8dc8d';
const TWILIO_PHONE = '+18774618601';

// Resend credentials
const RESEND_API_KEY = 're_ZQpN7oSa_e956Bzd312Bk881wDNJ1CB91';

// Chad's contact info
const CHAD_PHONE = '+16014985282';
const CHAD_EMAIL = 'cdozier14@athlynx.ai';

async function sendTestSMS() {
  console.log('📱 Sending test SMS via Twilio...');
  
  const client = twilio(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN);
  
  try {
    const message = await client.messages.create({
      body: '🏈 ATHLYNX TEST: Your SMS integration is WORKING! - Sent from ATHLYNX AI Platform',
      from: TWILIO_PHONE,
      to: CHAD_PHONE
    });
    
    console.log('✅ SMS sent successfully!');
    console.log('   Message SID:', message.sid);
    console.log('   Status:', message.status);
    return true;
  } catch (error) {
    console.error('❌ SMS failed:', error.message);
    return false;
  }
}

async function sendTestEmail() {
  console.log('📧 Sending test email via Resend...');
  
  const resend = new Resend(RESEND_API_KEY);
  
  try {
    const { data, error } = await resend.emails.send({
      from: 'ATHLYNX <onboarding@resend.dev>',
      to: [CHAD_EMAIL],
      subject: '🏈 ATHLYNX Test Email - Integration Working!',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%); padding: 30px; text-align: center;">
            <h1 style="color: #f5a623; margin: 0;">ATHLYNX</h1>
            <p style="color: #ffffff; margin: 10px 0 0 0;">THE ATHLETE'S PLAYBOOK</p>
          </div>
          <div style="padding: 30px; background: #ffffff;">
            <h2 style="color: #1a1a2e;">✅ Email Integration Test Successful!</h2>
            <p>This is a test email from the ATHLYNX AI Platform.</p>
            <p><strong>Timestamp:</strong> ${new Date().toLocaleString()}</p>
            <p><strong>Status:</strong> All systems operational</p>
            <hr style="border: 1px solid #eee; margin: 20px 0;">
            <p style="color: #666; font-size: 12px;">
              ATHLYNX AI Corporation<br>
              Parent Company: Dozier Holdings Group<br>
              19039 Cloyanna Lane, Humble, TX 77346
            </p>
          </div>
        </div>
      `
    });
    
    if (error) {
      console.error('❌ Email failed:', error);
      return false;
    }
    
    console.log('✅ Email sent successfully!');
    console.log('   Email ID:', data.id);
    return true;
  } catch (error) {
    console.error('❌ Email failed:', error.message);
    return false;
  }
}

// Run tests
console.log('');
console.log('========================================');
console.log('   ATHLYNX COMMUNICATIONS TEST');
console.log('========================================');
console.log('');

const smsResult = await sendTestSMS();
console.log('');
const emailResult = await sendTestEmail();

console.log('');
console.log('========================================');
console.log('   RESULTS');
console.log('========================================');
console.log('   SMS:', smsResult ? '✅ SUCCESS' : '❌ FAILED');
console.log('   Email:', emailResult ? '✅ SUCCESS' : '❌ FAILED');
console.log('========================================');
console.log('');
