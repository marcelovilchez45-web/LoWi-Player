#include <signal.h>
#include <stdio.h>
#include <stdlib.h>
#include <android/log.h>

#define LOG_TAG "HiFiNativeSRE"
#define LOGE(...) __android_log_print(ANDROID_LOG_ERROR, LOG_TAG, __VA_ARGS__)

/**
 * Sistema de Captura de Crashes Nativos para el Motor de Audio
 * 
 * Este módulo captura señales críticas del sistema (Segfaults) que ocurren
 * comúnmente en el callback de audio de baja latencia.
 */

void native_signal_handler(int sig) {
    LOGE("¡NATIVE CRASH DETECTADO! Señal: %d", sig);
    
    // Aquí se integraría el SDK de Sentry o Crashlytics Nativo
    // Ejemplo de volcado de contexto:
    // Sentry::set_context("audio_frame", current_frame_index);
    // Sentry::capture_signal(sig);

    // Salida controlada para evitar "zombie states" en la tarjeta de sonido
    exit(sig);
}

void setup_crash_reporting() {
    struct sigaction sa;
    sa.sa_handler = native_signal_handler;
    sigemptyset(&sa.sa_mask);
    sa.sa_flags = 0;

    // Capturar errores de segmentación (Null pointers)
    sigaction(SIGSEGV, &sa, NULL);
    // Capturar errores aritméticos (División por cero en filtros DSP)
    sigaction(SIGFPE, &sa, NULL);
    // Capturar instrucciones ilegales
    sigaction(SIGILL, &sa, NULL);
}
