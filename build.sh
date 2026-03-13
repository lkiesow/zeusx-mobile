#!/bin/sh

set -eux

TEMPFILE="$(mktemp --suffix=.zeus.zip)"
VERSION="$(jq -r .version <manifest.json)"

zip -r - * \
  --exclude '*.git*' \
  --exclude '*.zip*' \
  --exclude '*.sh*' \
  --exclude '*.xcf' \
  >"${TEMPFILE}"
mv "${TEMPFILE}" "zeusx-mobile-${VERSION}.zip"
