#!/bin/bash

# Hi-Fi Audio App - One-Click Build Script
# Optimized for macOS Monterey (Intel/Apple Silicon)

set -e

echo "=== [1/4] Limpiando builds anteriores ==="
if [ -d "build" ]; then
    rm -rf build
    echo "Directorio build eliminado."
fi
if [ -d "dist" ]; then
    rm -rf dist
    echo "Directorio dist eliminado."
fi

echo "=== [2/4] Preparando entorno y dependencias ==="
# Instalación de dependencias (Node/Web)
npm install
npm run build

echo "=== [3/4] Generando APK para Android (Capacitor) ==="
npx cap sync android
cd android && ./gradlew assembleRelease && cd ..

echo "=== [4/4] Finalizando Proceso ==="
# El APK resultante estará en android/app/build/outputs/apk/release/
echo "===================================================="
echo "¡BUILD COMPLETADO EXITOSAMENTE!"
echo "Android APK: android/app/build/outputs/apk/release/app-release-unsigned.apk"
echo "===================================================="
