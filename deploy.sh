#!/bin/bash
set -e

echo "🚀 ATHLYNX Deployment Script"
echo "============================"

# Set environment variables
export DATABASE_URL='mysql://3JQAxavJTLtVSbS.e2dc57e3bd27:kX7rJ9pK2K28pFRxid7D@gateway03.us-east-1.prod.aws.tidbcloud.com:4000/LT9iKec3A4q6ndTCS5486G?ssl={"rejectUnauthorized":true}'
export AWS_REGION=us-east-1
export AWS_ACCESS_KEY_ID=AKIAWLLNO5ITXIAJKYVP
export AWS_SECRET_ACCESS_KEY=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
export AWS_SES_FROM_EMAIL=noreply@athlynx.ai

echo "✅ Environment variables set"

# Build the project
echo "📦 Building project..."
pnpm build

echo "✅ Build complete!"
echo "📁 Files ready in dist/"
ls -lh dist/

echo ""
echo "🎯 Next: Deploy dist/ folder to Netlify"
echo "Site: athylxaicorprationnewlaunch2026"
