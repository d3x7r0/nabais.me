#!/bin/bash

set -a; source .env; set +a

VERSION=$(node_modules/.bin/sentry-cli releases propose-version)

node_modules/.bin/sentry-cli info || exit -1

echo "Building"
npm run build || exit -1

echo "Creating new release [$VERSION]"
node_modules/.bin/sentry-cli releases new -p "$SENTRY_PROJECT" "$VERSION" || exit -1

echo "Setting release commits [$VERSION]"
node_modules/.bin/sentry-cli releases set-commits --auto "$VERSION" || exit -1

echo "Tagging release as deployed [$VERSION]"
node_modules/.bin/sentry-cli releases deploys "$VERSION" new -e production || exit -1
