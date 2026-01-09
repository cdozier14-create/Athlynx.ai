# 🚀 DEPLOY ATHLYNX TO NETLIFY WITH AWS VERIFICATION

**Date:** January 8, 2026  
**Goal:** Get athlynx.ai live with AWS SNS (SMS) + AWS SES (Email) verification  
**Time:** 15 minutes

---

## ✅ STEP 1: Install AWS SDK Packages

```bash
cd /path/to/athlynx-perfect-storm
pnpm install
```

This will install:
- `@aws-sdk/client-sns` (for SMS)
- `@aws-sdk/client-ses` (for Email)

---

## ✅ STEP 2: Verify AWS SES Email Address

**CRITICAL:** AWS SES requires you to verify the "from" email address before sending.

1. Go to: https://console.aws.amazon.com/ses/home?region=us-east-1#/verified-identities
2. Click **"Create identity"**
3. Select **"Email address"**
4. Enter: `noreply@athlynx.ai`
5. Click **"Create identity"**
6. Check your email (cdozier14@athlynx.ai or wherever athlynx.ai emails go)
7. Click the verification link in the email from AWS

**NOTE:** Without this step, emails will NOT send!

---

## ✅ STEP 3: Set Netlify Environment Variables

1. Go to: https://app.netlify.com
2. Select your **athlynx** site
3. Go to **Site settings** → **Environment variables**
4. Add these variables:

```
AWS_REGION=us-east-1
AWS_ACCESS_KEY_ID=AKIAWLLNO5ITXIAJKYVP
AWS_SECRET_ACCESS_KEY=7+PJnQM4x4BZJ3nHOT2pVjLO7YKo6KKcqZ77j8We
AWS_SES_FROM_EMAIL=noreply@athlynx.ai
```

Keep existing variables (DATABASE_URL, STRIPE_SECRET_KEY, etc.)

---

## ✅ STEP 4: Deploy to Netlify

### Option A: Deploy via Netlify UI (RECOMMENDED)

1. Go to https://app.netlify.com
2. Select your athlynx site
3. Go to **Deploys** tab
4. Click **"Trigger deploy"** → **"Deploy site"**
5. Wait 2-3 minutes for build to complete

### Option B: Deploy via Git Push

```bash
cd /path/to/athlynx-perfect-storm
git add .
git commit -m "Add AWS SNS/SES verification"
git push origin main
```

Netlify will auto-deploy from Git.

---

## ✅ STEP 5: Test Verification System

1. Go to: https://athlynx.ai
2. Click **"Sign Up"** or **"Get Early Access"**
3. Enter:
   - **Name:** Chad A. Dozier
   - **Email:** cdozier14@dozierholdingsgroup.com.mx
   - **Phone:** +1-601-498-5282
   - **Role:** Athlete/Brand (your choice)
4. Click **"Send Verification Code"**
5. Check your:
   - **Email** (should receive code via AWS SES)
   - **Phone** (should receive SMS via AWS SNS)
6. Enter the 6-digit code
7. Complete signup

**🦁 YOU ARE NOW USER #1!**

---

## 🔧 TROUBLESHOOTING

### SMS Not Sending?

**AWS SNS is in SANDBOX mode by default.**

To send SMS to any phone number:
1. Go to: https://console.aws.amazon.com/sns/home?region=us-east-1
2. Click **"Text messaging (SMS)"** in left sidebar
3. Click **"Request production access"**
4. Fill out form (takes 24 hours for approval)

**WORKAROUND:** For now, SMS will work for your verified phone number only.

### Email Not Sending?

1. Verify `noreply@athlynx.ai` in AWS SES (see Step 2)
2. Check AWS SES is in **us-east-1** region
3. Check Netlify environment variables are set correctly

### Still Not Working?

**Fallback to Twilio + Resend:**

The code automatically falls back to Twilio (SMS) and Resend (Email) if AWS fails.

Make sure these environment variables are set on Netlify:
```
TWILIO_ACCOUNT_SID=AC42c81cc5bed40c06bba310faa55c9ea4
TWILIO_AUTH_TOKEN=your-twilio-auth-token
TWILIO_PHONE_NUMBER=+18774618601
RESEND_API_KEY=re_ZQpN7oSa_e956Bzd312Bk881wDNJ1CB91
```

---

## 📊 VERIFY DEPLOYMENT

After deployment, check:

1. **Site is live:** https://athlynx.ai
2. **API health:** https://athlynx.ai/api/health
3. **Signup form loads:** https://athlynx.ai (scroll to signup section)

---

## 🎯 NEXT STEPS

After you become User #1:

1. **Test all 10 apps** (Portal, Messenger, Diamond Grind, etc.)
2. **Invite partners** (Glenn, Jimmy, Andrew, Lee, David)
3. **Launch social media campaign**
4. **Monitor CRM dashboard:** https://athlynx.ai/crm

---

## 💰 AWS COSTS

**Current usage (first month):**
- SNS (SMS): ~100 messages = $0.65
- SES (Email): First 3,000 emails = FREE
- **Total: Less than $1/month**

**At scale (10,000 users):**
- SNS: ~10,000 SMS = $65/month
- SES: ~10,000 emails = $1/month
- **Total: ~$66/month**

**Way cheaper than Twilio ($200+/month) and more reliable!**

---

## 🦁 DREAMS DO COME TRUE 2026

**Signed off by:**  
ATHLYNX AI Corporation  
A Dozier Holdings Group Company

**Contact:**
- Email: cdozier14@athlynx.ai
- Phone: +1-601-498-5282
- WhatsApp: https://wa.me/16014985282
- WeChat: wxid_uv8r2ll71shb12

---

**END OF DEPLOYMENT GUIDE**
