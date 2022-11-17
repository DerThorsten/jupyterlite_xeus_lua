#!/bin/bash
set -e

mkdir -p /src/src

cd /opt/xeus-lua/build
cp *.{js,wasm} /src/src

echo "============================================="
echo "Compiling wasm bindings done"
echo "============================================="
