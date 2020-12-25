#!/bin/sh

export SENTRY_ORG=nonsensebb
VERSION=$(sentry-cli releases propose-version)

sentry-cli releases new -p nabais_me "$VERSION"
sentry-cli releases set-commits --auto "$VERSION"
