#!/bin/bash

set -a; source .env; set +a

VERSION=$(node_modules/.bin/sentry-cli releases propose-version)

node_modules/.bin/sentry-cli info

echo "Building"
npm run build

echo "Creating new release [$VERSION]"
node_modules/.bin/sentry-cli releases new -p "$SENTRY_PROJECT" "$VERSION"

echo "Setting release commits [$VERSION]"
node_modules/.bin/sentry-cli releases set-commits --auto "$VERSION"

echo "Tagging release as deployed [$VERSION]"
node_modules/.bin/sentry-cli releases deploys "$VERSION" new -e production
