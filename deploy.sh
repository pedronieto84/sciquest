#!/bin/bash
# SciQuest Deploy Script
# Usage: ./deploy.sh

set -e
echo "🔨 Building SciQuest..."
npm run build

echo "🚀 Deploying to Firebase..."
GOOGLE_APPLICATION_CREDENTIALS=/data/.openclaw/workspace/.firebase-sa.json \
  firebase deploy --only hosting:sciquest --project worktocloud-agent

echo "✅ Done! https://sciquest-app.web.app"
