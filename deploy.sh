#!/bin/bash
set -e
echo "🔨 Building SciQuest..."
npm run build

echo "🚀 Deploying to Firebase..."
GOOGLE_APPLICATION_CREDENTIALS=/data/.openclaw/workspace/.firebase-sa-sciquest.json \
  firebase deploy --only hosting --project sciquest-fun

echo "✅ Done! https://sciquest-fun.web.app"
