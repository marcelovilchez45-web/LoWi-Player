# Preservar clases JNI y métodos nativos
-keepclasseswithmembernames class * {
    native <methods>;
}

# Mantener la librería Oboe y sus wrappers
-keep class com.google.oboe.** { *; }

# Isar Database: Evitar que ProGuard elimine las cabeceras de los esquemas
-keep class io.isar.** { *; }
-keep @io.isar.annotations.Collection class * { *; }

# Mantener nombres de modelos de datos (Serialización)
-keepclassmembers class com.hifiaudio.models.** { *; }

# Optimización: No ofuscar nombres de métodos nativos
-keepclassmembers class * {
    @android.webkit.JavascriptInterface <methods>;
}
