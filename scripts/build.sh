#!/bin/bash

set -a; source .env; set +a

PATH="${PATH};node_modules/.bin/"

VERSION=$(sentry-cli releases propose-version)

sentry-cli info

echo "Building"
npm run build

echo "Creating new release [$VERSION]"
#sentry-cli releases new -p "$SENTRY_PROJECT" "$VERSION"

echo "Setting release commits [$VERSION]"
#sentry-cli releases set-commits --auto "$VERSION"

echo "Tagging release as deployed [$VERSION]"
#sentry-cli releases deploys "$VERSION" new -e production
