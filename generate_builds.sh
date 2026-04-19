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

echo "=== [3/4] Generando APK para Android (arm64-v8a) ==="
# Configuración de NDK y compilación C++ interna con -O3 automatizada por Gradle
# Se asume que el Keystore está en la ruta configurada en build.gradle
./gradlew clean assembleRelease \
    -Pandroid.buildTypes.release.ndk.debugSymbolLevel=FULL \
    -Ptarget-abi=arm64-v8a

echo "=== [4/4] Generando App Bundle Universal para macOS Monterey ==="
# Compilación Universal (x86_64 + arm64) con optimizaciones nativas
flutter build macos --release \
    --no-codesign \
    --obfuscate --split-debug-info=./debug-symbols/macos \
    --dart-define=OPTIMIZE_CPP=true

echo "===================================================="
echo "¡BUILD COMPLETADO EXITOSAMENTE!"
echo "Android APK: build/app/outputs/flutter-apk/app-release.apk"
echo "macOS App: build/macos/Build/Products/Release/HiFiPlayer.app"
echo "Debug Symbols (Sentry/Crashlytics): ./debug-symbols/"
echo "===================================================="
