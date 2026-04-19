# Guía de Depuración de Bajo Nivel (C++ & DSP)

Esta guía explica cómo interpretar los fallos en el motor de audio y el sistema de telemetría.

## 1. El Callback de Audio (`onAudioReady`)
Si ocurre un crash dentro del callback, lo más probable es que sea un **Null Pointer** o una **División por Cero** en el proceso de los filtros Biquad.

### Cómo leer el Stack Trace:
1. Localiza el símbolo `processAudioFrame` en el reporte.
2. Si el error es `SIGSEGV` (Segmentation Fault), verifica los punteros de los buffers de entrada/salida.
3. El sistema de telemetría guarda el **"Last Known State"** antes de cada frame para identificar el canal exacto que falló.

## 2. Sistema de Breadcrumbs (Migas de Pan)
Hemos implementado un buffer circular que guarda las últimas 50 acciones del usuario. 
Ejemplo de flujo de error:
- `USER_ACTION: Changed EQ Band 3 Gain to +6dB`
- `SYSTEM_LOG: USB DAC Reconnected`
- `SYSTEM_LOG: DoP Handshake Initiated`
- `CRASH: SIGSEGV in FilterCalculation`

## 3. Manejo de Errores de Red (PC Link)
Si el PC Link falla sin cerrar la app, revisa los logs de **HTTP Handshake**:
- `ERROR_CODE_408`: Timeout (WiFi inestable).
- `ERROR_CODE_415`: Formato no soportado (El DAC de la PC no soporta Float32).

## 4. Desofuscación de Símbolos
Para macOS, utiliza los archivos `.dsym` generados en `/debug-symbols`.
Para Android, el archivo `native_debug_symbols.zip` contiene las tablas de símbolos para `addr2line`.
