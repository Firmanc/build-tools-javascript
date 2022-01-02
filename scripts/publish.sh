#!/bin/bash

set -eu

echo "Publishing release to NPM..."

echo //registry.npmjs.org/:_authToken=$NPM_TOKEN > ~/.npmrc
npm run lerna:publish