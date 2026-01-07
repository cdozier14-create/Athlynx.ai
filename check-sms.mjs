// Check Twilio SMS Status and Resend

import twilio from 'twilio';

const TWILIO_ACCOUNT_SID = 'AC42c81cc5bed40c06bba310faa55c9ea4';
const TWILIO_AUTH_TOKEN = '4702a5ccba87b942171829075eb8dc8d';
const TWILIO_PHONE = '+18774618601';
const CHAD_PHONE = '+16014985282';

const client = twilio(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN);

// Check previous message status
console.log('Checking previous message status...');
try {
  const message = await client.messages('SMf006b66ef67eb4f107aabfd771b9013d').fetch();
  console.log('Previous Message Status:', message.status);
  console.log('Error Code:', message.errorCode || 'None');
  console.log('Error Message:', message.errorMessage || 'None');
} catch (e) {
  console.log('Could not fetch previous message:', e.message);
}

// Try sending again
console.log('');
console.log('Sending new SMS...');
try {
  const newMessage = await client.messages.create({
    body: 'ATHLYNX TEST #2: If you receive this, SMS is working! Reply YES to confirm. - Chad Dozier / ATHLYNX AI',
    from: TWILIO_PHONE,
    to: CHAD_PHONE
  });
  
  console.log('✅ New SMS sent!');
  console.log('   SID:', newMessage.sid);
  console.log('   Status:', newMessage.status);
  console.log('   To:', newMessage.to);
  console.log('   From:', newMessage.from);
} catch (error) {
  console.log('❌ Failed:', error.message);
  console.log('   Code:', error.code);
  console.log('   More Info:', error.moreInfo);
}
