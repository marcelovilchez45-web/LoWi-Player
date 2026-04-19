import time
import requests
import numpy as np
import sounddevice as sd
from zeroconf import ServiceBrowser, Zeroconf
import threading
import queue
import sys

# --- Configuración y Constantes ---
SERVICE_TYPE = "_hifi_audio._tcp.local."
BUFFER_SIZE_MS = 1000  # 1 segundo de Jitter Buffer
CHANNELS = 2
SAMPLE_RATE = 44100   # Valor inicial, se negociará con el stream
BIT_DEPTH = 'float32'  # 'int16', 'int24' (manually handled), 'float32'

audio_queue = queue.Queue(maxsize=100) # Buffer de fragmentos
is_running = True

class AudioServiceListener:
    def __init__(self):
        self.found_service = None

    def remove_service(self, zeroconf, type, name):
        print(f"[-] Servicio {name} desconectado.")
        self.found_service = None

    def add_service(self, zeroconf, type, name):
        info = zeroconf.get_service_info(type, name)
        if info:
            ip = ".".join(map(str, info.addresses[0]))
            port = info.port
            print(f"[+] Móvil Detectado: {name}")
            print(f"    IP: {ip}:{port}")
            self.found_service = (ip, port)

def audio_callback(outdata, frames, time, status):
    """Callback de la tarjeta de sonido para extraer datos del buffer"""
    if status:
        print(f"[!] Status: {status}", file=sys.stderr)
    try:
        data = audio_queue.get_nowait()
        if len(data) < len(outdata):
            # Rellenar con ceros si el fragmento es más pequeño
            outdata[:len(data)] = data
            outdata[len(data):] = 0
        else:
            outdata[:] = data[:len(outdata)]
    except queue.Empty:
        outdata.fill(0) # Underrun: Silencio

def stream_processor(ip, port):
    """Hilo encargado de descargar y procesar el stream HTTP"""
    global is_running
    url = f"http://{ip}:{port}/stream.wav"
    
    print(f"[*] Conectando al stream: {url}")
    try:
        with requests.get(url, stream=True, timeout=10) as r:
            r.raise_for_status()
            print("[*] Stream conectado. Llenando Jitter Buffer...")
            
            # En una implementación real, leeríamos la cabecera WAV para ajustar SAMPLE_RATE
            # Aquí procesamos el flujo de audio crudo (RAW)
            for chunk in r.iter_content(chunk_indices=None, chunk_size=4096):
                if not is_running: break
                
                # Convertir bytes a numpy array
                # Asumimos Float32 enviado por la App (Oboe default format)
                samples = np.frombuffer(chunk, dtype=np.float32)
                
                if samples.size > 0:
                    # Reformatear a estéreo (L/R)
                    samples = samples.reshape(-1, CHANNELS)
                    audio_queue.put(samples)
                    
                    if audio_queue.full():
                        # Si el buffer está lleno, esperamos un poco
                        time.sleep(0.01)
                        
    except Exception as e:
        print(f"[X] Error en el stream: {e}")

def main():
    zeroconf = Zeroconf()
    listener = AudioServiceListener()
    browser = ServiceBrowser(zeroconf, SERVICE_TYPE, listener)

    print("=== Hi-Fi Audio PC Receiver ===")
    print(f"[*] Buscando servicios {SERVICE_TYPE}...")

    try:
        with sd.OutputStream(samplerate=SAMPLE_RATE, 
                            channels=CHANNELS, 
                            callback=audio_callback,
                            dtype='float32'):
            
            while True:
                if listener.found_service:
                    ip, port = listener.found_service
                    t = threading.Thread(target=stream_processor, args=(ip, port))
                    t.start()
                    
                    # Mantener loop mientras el servicio exista
                    while listener.found_service:
                        time.sleep(1)
                    
                    is_running = False
                    t.join()
                    is_running = True
                    print("[*] Volviendo a modo escucha...")
                
                time.sleep(1)
                
    except KeyboardInterrupt:
        print("\n[*] Cerrando receptor...")
    finally:
        zeroconf.close()

if __name__ == "__main__":
    # Instrucciones de instalación:
    # pip install zeroconf requests numpy sounddevice
    main()
