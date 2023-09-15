#!/bin/bash

set -a; source .env; set +a
set -a; source .env.local; set +a

VERSION=$(node_modules/.bin/sentry-cli releases propose-version)

export PUBLIC_COMMIT_HASH="${CF_PAGES_COMMIT_SHA}"

TARGET="${SENTRY_ENV:-local}"

node_modules/.bin/sentry-cli info || exit -1

echo "Settings:"
echo "Version: ${VERSION}"
echo "Target: ${TARGET}"
echo ""

echo "Building"
NODE_ENV=production npm run build || exit -1

echo "Creating new release [$VERSION]"
node_modules/.bin/sentry-cli releases new -p "${SENTRY_PROJECT}" "${VERSION}" || exit -1

echo "Setting release commits [${VERSION}]"
node_modules/.bin/sentry-cli releases set-commits --auto "${VERSION}" || exit -1

echo "Tagging release as deployed [${VERSION}@${TARGET}]"
node_modules/.bin/sentry-cli releases deploys "$VERSION" new -e "${TARGET}" || exit -1
