#!/bin/sh

export SENTRY_ORG=nonsensebb
export SENTRY_PROJECT=nabais_me

VERSION=$(sentry-cli releases propose-version)

sentry-cli info

echo "Creating new release"
sentry-cli releases new -p "$SENTRY_PROJECT" "$VERSION"

echo "Setting release commits"
sentry-cli releases set-commits --auto "$VERSION"

echo "Tagging release as deployed"
sentry-cli releases deploys "$VERSION" new -e production
