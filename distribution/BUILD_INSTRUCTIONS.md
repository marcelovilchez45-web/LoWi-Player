# Guía de Distribución y Compilación (Release Management)

Este documento detalla los pasos y configuraciones necesarios para generar los instalables de producción para Android y macOS.

## 1. Android (APK / AAB)

### Firma de la Aplicación (Keystore)
Ejecuta el siguiente comando en la terminal para generar tu llave de firma:
```bash
keytool -genkey -v -keystore release-key.jks -keyalg RSA -keysize 2048 -validity 10000 -alias my-key-alias
```

### Compilación
Usa el wrapper de Gradle desde la raíz del proyecto Android:
```bash
./gradlew assembleRelease
```
*El APK resultante se encontrará en `app/build/outputs/apk/release/`.*

---

## 2. macOS (App Bundle)

### Compilación Universal
Para soportar tanto Intel (x86_64) como Apple Silicon (arm64):
```bash
flutter build macos --release --no-codesign
# O si usas Xcode directamente:
xcodebuild -workspace Runner.xcworkspace -scheme Runner -configuration Release -arch x86_64 -arch arm64
```

### Entitlements
Se han habilitado los permisos de `com.apple.security.network.client` y `server` para permitir el PC Link (Network Bridge).

## 3. Optimización JNI (ProGuard)
Se han incluido reglas específicas para que el optimizador de código no elimine las funciones de C++ (Oboe) que son llamadas desde Java/Kotlin mediante JNI.

---

## 4. Auto-EQ & Calibration
El sistema soporta la importación de archivos de texto AutoEq. Para integrarlos:
1. Copia tus archivos `.txt` a la carpeta `/assets/presets/`.
2. El motor C++ los parseará automáticamente usando el `AutoEqParser` durante la inicialización.

---

## 5. Firma de macOS (Gatekeeper Bypass)
Si no tienes un certificado de desarrollador de Apple, los usuarios verán un error. Genera el bundle sin firma y proporciona las instrucciones de "Clic Derecho > Abrir" incluidas en el `README.md`.
