import { useState, useEffect, useRef, type ReactNode } from 'react';
import { 
  Play, 
  Pause, 
  SkipBack, 
  SkipForward, 
  Volume2, 
  Music, 
  FileAudio, 
  Settings, 
  Info, 
  ChevronRight,
  ListMusic,
  Disc,
  Activity,
  Cpu,
  Zap,
  AlertTriangle,
  Layers,
  Sliders,
  Waves,
  Usb,
  Wifi,
  Cast,
  Network,
  Package,
  Activity as Heartbeat,
  ShieldAlert,
  Gauge,
  Bug,
  Terminal,
  FileCode,
  BookOpen,
  Briefcase
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// --- Types ---
interface Track {
  id: string;
  title: string;
  artist: string;
  duration: string;
  cover: string;
  format: 'FLAC' | 'WAV' | 'MP3';
  bitrate: string;
}

const MOCK_TRACKS: Track[] = [
  { id: '1', title: 'Midnight City', artist: 'M83', duration: '4:03', cover: 'https://picsum.photos/seed/m83/400/400', format: 'FLAC', bitrate: '24-bit/96kHz' },
  { id: '2', title: 'Starboy', artist: 'The Weeknd', duration: '3:50', cover: 'https://picsum.photos/seed/weeknd/400/400', format: 'WAV', bitrate: '16-bit/44.1kHz' },
  { id: '3', title: 'Instant Crush', artist: 'Daft Punk', duration: '5:37', cover: 'https://picsum.photos/seed/daft/400/400', format: 'FLAC', bitrate: '24-bit/192kHz' },
];

export default function App() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState<Track>(MOCK_TRACKS[0]);
  const [progress, setProgress] = useState(35);
  const [volume, setVolume] = useState(80);
  const [activeTab, setActiveTab] = useState<'player' | 'architecture' | 'engine' | 'dsp' | 'usb' | 'network' | 'release'>('player');
  const [telemetry, setTelemetry] = useState({ xruns: 0, latency: 1.2, cpuLoad: 0.8 });
  const [autoEqEnabled, setAutoEqEnabled] = useState(false);
  const [selectedPreset, setSelectedPreset] = useState('Harman In-Ear');
  const [bitPerfect, setBitPerfect] = useState(true);
  const [gapless, setGapless] = useState(true);
  const [usbConnected, setUsbConnected] = useState(false);
  const [isCasting, setIsCasting] = useState(false);

  // Simulated progress
  useEffect(() => {
    let interval: any;
    if (isPlaying) {
      interval = setInterval(() => {
        setProgress((p) => (p < 100 ? p + 0.1 : 0));
        // Simular telemetría real
        setTelemetry(t => ({
          ...t,
          latency: 1.1 + Math.random() * 0.4,
          cpuLoad: 0.7 + Math.random() * 0.3
        }));
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isPlaying]);

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-[#e0e0e0] font-sans selection:bg-orange-500/30">
      {/* Navigation Rail */}
      <nav className="fixed left-0 top-0 bottom-0 w-16 bg-[#121212] border-r border-white/5 flex flex-col items-center py-8 gap-8 z-50">
        <div className="w-10 h-10 bg-orange-500 rounded-xl flex items-center justify-center mb-4">
          <Disc className="text-black animate-spin-slow" size={24} />
        </div>
        
        <NavButton 
          active={activeTab === 'player'} 
          onClick={() => setActiveTab('player')} 
          icon={<Music size={20} />} 
          label="Player" 
        />
        <NavButton 
          active={activeTab === 'architecture'} 
          onClick={() => setActiveTab('architecture')} 
          icon={<Activity size={20} />} 
          label="Arch" 
        />
        <NavButton 
          active={activeTab === 'engine'} 
          onClick={() => setActiveTab('engine')} 
          icon={<Cpu size={20} />} 
          label="Engine" 
        />
        <NavButton 
          active={activeTab === 'dsp'} 
          onClick={() => setActiveTab('dsp')} 
          icon={<Sliders size={20} />} 
          label="DSP" 
        />
        <NavButton 
          active={activeTab === 'usb'} 
          onClick={() => setActiveTab('usb')} 
          icon={<Usb size={20} />} 
          label="USB" 
        />
        <NavButton 
          active={activeTab === 'network'} 
          onClick={() => setActiveTab('network')} 
          icon={<Wifi size={20} />} 
          label="Cast" 
        />
        <NavButton 
          active={activeTab === 'release'} 
          onClick={() => setActiveTab('release')} 
          icon={<Package size={20} />} 
          label="Release" 
        />
        
        <div className="mt-auto flex flex-col gap-6">
          <button className="text-white/40 hover:text-white transition-colors">
            <Settings size={20} />
          </button>
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-orange-500 to-yellow-500 p-[1px]">
            <div className="w-full h-full rounded-full bg-[#121212] flex items-center justify-center text-[10px] font-bold">
              MV
            </div>
          </div>
        </div>
      </nav>

      <main className="pl-16 min-h-screen">
        <AnimatePresence mode="wait">
          {activeTab === 'player' ? (
// ... (omitted for brevity in template, but I will provide the full block)
            <motion.div 
              key="player"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="p-8 lg:p-12 grid grid-cols-1 lg:grid-cols-12 gap-12 max-w-7xl mx-auto"
            >
              {/* Left Column: Player Core */}
              <div className="lg:col-span-7 flex flex-col gap-8">
                <header className="flex justify-between items-start">
                  <div>
                    <h1 className="text-4xl font-light tracking-tight text-white mb-2">Now Playing</h1>
                    <div className="flex items-center gap-3 text-white/40 text-sm font-mono uppercase tracking-widest">
                      <Activity size={14} className="text-orange-500" />
                      <span>Studio Monitor Mode</span>
                      <span className="w-1 h-1 rounded-full bg-white/20" />
                      <span>{currentTrack.bitrate}</span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    {bitPerfect && (
                      <div className="flex items-center gap-1.5 px-3 py-1 bg-orange-500/10 border border-orange-500/20 rounded-full text-[10px] font-bold text-orange-500 uppercase tracking-tighter">
                        <Zap size={12} />
                        Bit-Perfect
                      </div>
                    )}
                    {gapless && (
                      <div className="flex items-center gap-1.5 px-3 py-1 bg-blue-500/10 border border-blue-500/20 rounded-full text-[10px] font-bold text-blue-400 uppercase tracking-tighter">
                        <Layers size={12} />
                        Gapless
                      </div>
                    )}
                    {usbConnected && (
                      <div className="flex items-center gap-1.5 px-3 py-1 bg-green-500/10 border border-green-500/20 rounded-full text-[10px] font-bold text-green-400 uppercase tracking-tighter">
                        <Usb size={12} />
                        USB DAC
                      </div>
                    )}
                    {isCasting && (
                      <div className="flex items-center gap-1.5 px-3 py-1 bg-purple-500/10 border border-purple-500/20 rounded-full text-[10px] font-bold text-purple-400 uppercase tracking-tighter">
                        <Cast size={12} />
                        PC Cast
                      </div>
                    )}
                  </div>
                </header>

                {/* Cover Art Section */}
                <div className="relative group">
                  <div className="aspect-square rounded-3xl overflow-hidden shadow-2xl shadow-black/50 border border-white/10">
                    <img 
                      src={currentTrack.cover} 
                      alt={currentTrack.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    
                    {/* Visualizer Overlay */}
                    <div className="absolute bottom-8 left-8 right-8 flex items-end gap-1 h-12 opacity-40">
                      {[...Array(24)].map((_, i) => (
                        <motion.div 
                          key={i}
                          animate={{ height: isPlaying ? [4, Math.random() * 48 + 4, 4] : 4 }}
                          transition={{ repeat: Infinity, duration: 0.5 + Math.random(), ease: "easeInOut" }}
                          className="flex-1 bg-orange-500 rounded-full"
                        />
                      ))}
                    </div>
                  </div>
                  
                  {/* Format Badge */}
                  <div className="absolute top-6 right-6 bg-black/80 backdrop-blur-md border border-white/10 px-4 py-2 rounded-full flex items-center gap-2">
                    <FileAudio size={14} className="text-orange-500" />
                    <span className="text-xs font-bold tracking-tighter">{currentTrack.format}</span>
                  </div>
                </div>

                {/* Controls */}
                <div className="bg-[#161616] rounded-3xl p-8 border border-white/5">
                  <div className="flex flex-col gap-6">
                    <div className="flex justify-between items-end">
                      <div>
                        <h2 className="text-2xl font-medium text-white">{currentTrack.title}</h2>
                        <p className="text-white/50">{currentTrack.artist}</p>
                      </div>
                      <div className="text-right font-mono text-sm text-white/30">
                        {Math.floor((progress / 100) * 243)}s / 243s
                      </div>
                    </div>

                    {/* Progress Bar */}
                    <div className="relative h-1.5 bg-white/5 rounded-full overflow-hidden cursor-pointer group">
                      <div 
                        className="absolute top-0 left-0 h-full bg-orange-500 transition-all duration-300"
                        style={{ width: `${progress}%` }}
                      />
                      <div className="absolute top-0 left-0 h-full w-full opacity-0 group-hover:opacity-100 transition-opacity bg-white/10" />
                    </div>

                    {/* Playback Buttons */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-8">
                        <button className="text-white/40 hover:text-white transition-colors">
                          <SkipBack size={28} />
                        </button>
                        <button 
                          onClick={() => setIsPlaying(!isPlaying)}
                          className="w-16 h-16 bg-white rounded-full flex items-center justify-center text-black hover:scale-105 active:scale-95 transition-all shadow-xl shadow-white/10"
                        >
                          {isPlaying ? <Pause size={32} fill="currentColor" /> : <Play size={32} fill="currentColor" className="ml-1" />}
                        </button>
                        <button className="text-white/40 hover:text-white transition-colors">
                          <SkipForward size={28} />
                        </button>
                      </div>

                      <div className="flex items-center gap-4 bg-white/5 px-4 py-2 rounded-2xl">
                        <Volume2 size={18} className="text-white/40" />
                        <input 
                          type="range" 
                          min="0" 
                          max="100" 
                          value={volume} 
                          onChange={(e) => setVolume(parseInt(e.target.value))}
                          className="w-24 accent-orange-500 h-1 bg-white/10 rounded-full appearance-none cursor-pointer"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                
                {bitPerfect && (
                  <div className="flex items-center gap-3 p-4 bg-orange-500/5 border border-orange-500/10 rounded-2xl text-xs text-orange-200/60">
                    <AlertTriangle size={16} className="text-orange-500 shrink-0" />
                    <p>El modo <span className="text-orange-500 font-bold">Bit-Perfect</span> desactiva el mezclador del sistema. El consumo de batería puede aumentar un 15-20% debido al uso exclusivo del hardware de audio.</p>
                  </div>
                )}
              </div>

              {/* Right Column: Library & Metadata */}
              <div className="lg:col-span-5 flex flex-col gap-8">
                <section>
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xl font-medium flex items-center gap-2">
                      <ListMusic size={20} className="text-orange-500" />
                      Queue
                    </h3>
                    <span className="text-xs text-white/30 uppercase tracking-widest">{MOCK_TRACKS.length} Tracks</span>
                  </div>
                  
                  <div className="flex flex-col gap-2">
                    {MOCK_TRACKS.map((track) => (
                      <button 
                        key={track.id}
                        onClick={() => setCurrentTrack(track)}
                        className={`group flex items-center gap-4 p-3 rounded-2xl transition-all ${
                          currentTrack.id === track.id ? 'bg-white/10 border border-white/10' : 'hover:bg-white/5 border border-transparent'
                        }`}
                      >
                        <div className="w-12 h-12 rounded-lg overflow-hidden relative">
                          <img src={track.cover} alt="" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                          {currentTrack.id === track.id && isPlaying && (
                            <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                              <div className="flex gap-1 items-end h-4">
                                <motion.div animate={{ height: [4, 12, 4] }} transition={{ repeat: Infinity, duration: 0.8 }} className="w-1 bg-orange-500" />
                                <motion.div animate={{ height: [8, 4, 16] }} transition={{ repeat: Infinity, duration: 0.6 }} className="w-1 bg-orange-500" />
                                <motion.div animate={{ height: [4, 16, 8] }} transition={{ repeat: Infinity, duration: 0.7 }} className="w-1 bg-orange-500" />
                              </div>
                            </div>
                          )}
                        </div>
                        <div className="flex-1 text-left">
                          <div className={`text-sm font-medium ${currentTrack.id === track.id ? 'text-white' : 'text-white/70'}`}>
                            {track.title}
                          </div>
                          <div className="text-xs text-white/40">{track.artist}</div>
                        </div>
                        <div className="text-xs font-mono text-white/20 group-hover:text-white/40 transition-colors">
                          {track.duration}
                        </div>
                      </button>
                    ))}
                  </div>
                </section>

                <section className="mt-auto bg-orange-500/5 border border-orange-500/10 rounded-3xl p-6">
                  <h4 className="text-orange-500 text-xs font-bold uppercase tracking-widest mb-4">Audiophile Insights</h4>
                  <div className="space-y-4">
                    <div className="flex justify-between text-sm">
                      <span className="text-white/40">Sample Rate</span>
                      <span className="text-white/80 font-mono">{currentTrack.bitrate.split('/')[1] || '44.1kHz'}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-white/40">Dynamic Range</span>
                      <span className="text-white/80 font-mono">14.2 LUFS</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-white/40">Output Buffer</span>
                      <span className="text-white/80 font-mono">Low Latency (2ms)</span>
                    </div>
                  </div>
                </section>
              </div>
            </motion.div>
          ) : activeTab === 'network' ? (
// ... (omitted for brevity)
            <motion.div 
              key="network"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="p-8 lg:p-12 max-w-5xl mx-auto"
            >
              <div className="prose prose-invert max-w-none">
                <header className="mb-12">
                  <h1 className="text-5xl font-light mb-4 text-white">Network Audio Bridge: PC Link</h1>
                  <p className="text-white/40 text-lg">Transmisión Looseless vía WiFi con descubrimiento automático.</p>
                </header>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
                  <div className="lg:col-span-2 space-y-8">
                    <section className="bg-[#161616] p-8 rounded-3xl border border-white/5">
                      <h2 className="text-xl font-medium text-orange-500 mb-6 flex items-center gap-2">
                        <Network size={20} />
                        1. LPCM Streaming Strategy
                      </h2>
                      <p className="text-sm text-white/60 mb-6 leading-relaxed">
                        Implementamos un servidor HTTP interno que sirve un flujo LPCM crudo. Es más robusto que un WebSocket para audio de alta fidelidad debido al manejo nativo de buffers en clientes como VLC o navegadores.
                      </p>
                      <div className="bg-black/40 p-6 rounded-2xl font-mono text-[10px] text-blue-300 border border-white/5">
                        <pre>
{`// Kotlin: NanoHTTPD para streaming de audio
override fun serve(session: IHTTPSession): Response {
    val audioStream = PipedInputStream(outputBuffer)
    return newChunkedResponse(
        Response.Status.OK, 
        "audio/wav", 
        audioStream
    ).apply {
        addHeader("Content-Disposition", "attachment; filename=\\"stream.wav\\"")
    }
}`}
                        </pre>
                      </div>
                    </section>

                    <section className="bg-[#161616] p-8 rounded-3xl border border-white/5">
                      <h2 className="text-xl font-medium text-blue-400 mb-6 flex items-center gap-2">
                        <Waves size={20} />
                        2. Jitter Buffer & Sync
                      </h2>
                      <div className="space-y-4 text-sm text-white/60">
                        <p>Para mitigar las fluctuaciones de red (Wi-Fi jitter), el receptor PC debe mantener un buffer ajustable de 500ms a 2000ms.</p>
                        <div className="p-4 bg-blue-500/5 border border-blue-500/10 rounded-2xl">
                          <p className="text-[10px] text-blue-200/60 font-mono italic">
                            Handshake: Discovery vía mDNS (_hifi_audio._tcp.local)
                          </p>
                        </div>
                      </div>
                    </section>
                  </div>

                  <aside className="space-y-6">
                    <div className="bg-[#161616] p-6 rounded-3xl border border-white/5">
                      <h3 className="text-white font-bold text-xs uppercase tracking-widest mb-4">Cast State</h3>
                      <div className="space-y-4">
                        <div className="flex justify-between text-xs">
                          <span className="text-white/40">Status</span>
                          <span className={`${isCasting ? 'text-green-500' : 'text-white/20'}`}>
                            {isCasting ? 'Casting' : 'Idle'}
                          </span>
                        </div>
                        <div className="flex justify-between text-xs">
                          <span className="text-white/40">Local IP</span>
                          <span className="font-mono text-white/60">192.168.1.45</span>
                        </div>
                        <button 
                          onClick={() => setIsCasting(!isCasting)}
                          className={`w-full py-3 rounded-xl text-xs font-bold transition-all ${
                            isCasting ? 'bg-red-500/20 text-red-400 border border-red-500/20' : 'bg-orange-500 text-black'
                          }`}
                        >
                          {isCasting ? 'Stop Casting' : 'Start PC Link'}
                        </button>
                      </div>
                    </div>

                    <div className="bg-purple-500/10 border border-purple-500/20 p-6 rounded-3xl">
                      <h3 className="text-purple-400 font-bold text-xs uppercase tracking-widest mb-4 flex items-center gap-2">
                        <Zap size={14} />
                        DSD (DoP v1.1)
                      </h3>
                      <p className="text-[10px] text-purple-200/60 leading-relaxed">
                        El motor detecta archivos .dsf y empaqueta los bits DSD en frames de 24 bits. Los 8 bits superiores alternan entre 0x05 y 0xFA para que el DAC reconozca el flujo DSD.
                      </p>
                    </div>
                  </aside>
                </div>

                <section className="bg-[#161616] p-8 rounded-3xl border border-white/5 mb-8">
                  <h2 className="text-xl font-medium text-purple-400 mb-6">DSD over PCM (C++ Implementation)</h2>
                  <div className="bg-black/40 p-6 rounded-2xl font-mono text-xs overflow-x-auto border border-white/5">
                    <pre className="text-purple-300">
{`// C++: Empaquetado DoP para DACs compatibles
void packDoP(uint8_t* dsdData, uint32_t* pcmBuffer, int numFrames) {
    static uint8_t marker = 0x05;
    for (int i = 0; i < numFrames; ++i) {
        // Empacar 16 bits de DSD en los 16 bits inferiores del PCM de 24 bits
        uint32_t frame = (marker << 16) | (dsdData[i*2] << 8) | dsdData[i*2+1];
        pcmBuffer[i] = frame;
        
        // Alternar marcador DoP
        marker = (marker == 0x05) ? 0xFA : 0x05;
    }
}`}
                    </pre>
                  </div>
                </section>

                <section className="bg-gradient-to-br from-purple-500/10 to-blue-500/10 p-8 rounded-3xl border border-white/10">
                  <h2 className="text-xl font-medium text-white mb-6 flex items-center gap-2">
                    <Settings size={20} className="text-purple-400" />
                    PC Receiver Setup
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-sm text-white/60">
                    <div>
                      <h3 className="text-white font-bold mb-3 uppercase tracking-tighter">1. Preparación</h3>
                      <p className="mb-4">Para recibir el audio en tu PC, necesitas Python y las siguientes dependencias:</p>
                      <pre className="bg-black/40 p-4 rounded-xl text-[10px] border border-white/5 text-green-400">
                        pip install zeroconf requests numpy sounddevice
                      </pre>
                    </div>
                    <div>
                      <h3 className="text-white font-bold mb-3 uppercase tracking-tighter">2. Ejecución</h3>
                      <p className="mb-4">Ejecuta el script <span className="text-purple-400 font-mono">pc_receiver.py</span> proporcionado en la raíz del proyecto. El script encontrará el móvil automáticamente.</p>
                      <ul className="space-y-2 text-xs">
                        <li>• <span className="text-white">mDNS:</span> Descubrimiento sin configurar IPs.</li>
                        <li>• <span className="text-white">Low Latency:</span> Utiliza el driver ASIO/WASAPI de tu PC.</li>
                        <li>• <span className="text-white">Monitor:</span> Muestra Bitrate y estado del buffer.</li>
                      </ul>
                    </div>
                  </div>
                </section>
              </div>
            </motion.div>
          ) : activeTab === 'release' ? (
            <motion.div 
              key="release"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="p-8 lg:p-12 max-w-6xl mx-auto"
            >
              <div className="prose prose-invert max-w-none">
                <header className="mb-12">
                  <h1 className="text-5xl font-light mb-4 text-white">Release Management</h1>
                  <p className="text-white/40 text-lg">Configuraciones de compilación para distribución final.</p>
                </header>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
                  <section className="bg-[#161616] p-8 rounded-3xl border border-white/5">
                    <h2 className="text-xl font-medium text-orange-500 mb-6 flex items-center gap-2">
                      <Heartbeat size={20} />
                      Audio Telemetry (XRuns & Stability)
                    </h2>
                    <div className="grid grid-cols-3 gap-4 mb-6">
                      <div className="p-4 bg-black/40 rounded-xl border border-white/5">
                        <span className="text-[10px] text-white/40 uppercase block mb-1">XRuns</span>
                        <span className="text-xl font-mono text-white">{telemetry.xruns}</span>
                      </div>
                      <div className="p-4 bg-black/40 rounded-xl border border-white/5">
                        <span className="text-[10px] text-white/40 uppercase block mb-1">DSP Time</span>
                        <span className="text-xl font-mono text-orange-500">{telemetry.latency.toFixed(2)}ms</span>
                      </div>
                      <div className="p-4 bg-black/40 rounded-xl border border-white/5">
                        <span className="text-[10px] text-white/40 uppercase block mb-1">CPU Load</span>
                        <span className="text-xl font-mono text-blue-400">{telemetry.cpuLoad.toFixed(1)}%</span>
                      </div>
                    </div>
                    <div className="space-y-4 text-[10px] font-mono text-white/30">
                      <p>// C++ Performance Monitor</p>
                      <pre className="text-green-500/80">
{`void onAudioReady(...) {
  auto start = now();
  processDSP();
  auto end = now();
  lastDspTime = end - start;
  if(isUnderrun()) xruns++;
}`}
                      </pre>
                    </div>
                  </section>

                  <section className="bg-[#161616] p-8 rounded-3xl border border-white/5">
                    <h2 className="text-xl font-medium text-blue-400 mb-6 flex items-center gap-2">
                      <ShieldAlert size={20} />
                      Watchdog & CI/CD Status
                    </h2>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-4 bg-white/5 rounded-2xl">
                        <span className="text-xs text-white/60">mDNS Discovery Listener</span>
                        <span className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.5)]" />
                      </div>
                      <div className="flex items-center justify-between p-4 bg-white/5 rounded-2xl">
                        <span className="text-xs text-white/60">GitHub Actions Build Cache</span>
                        <span className="text-xs font-mono text-blue-400">HIT (142MB)</span>
                      </div>
                      <div className="flex items-center justify-between p-4 bg-white/5 rounded-2xl">
                        <span className="text-xs text-white/60">Audio Priority (SCHED_FIFO)</span>
                        <span className="text-xs px-2 py-0.5 bg-orange-500/10 text-orange-500 rounded border border-orange-500/20">Active</span>
                      </div>
                    </div>
                  </section>
                </div>

                  <section className="bg-[#161616] p-8 rounded-3xl border border-white/5">
                    <h2 className="text-xl font-medium text-red-500 mb-6 flex items-center gap-2">
                      <Bug size={20} />
                      Native Crash Handling (SRE)
                    </h2>
                    <div className="space-y-4">
                      <div className="p-4 bg-red-500/5 border border-red-500/10 rounded-2xl">
                        <h3 className="text-white font-bold text-xs mb-2">Signal Handler (SIGSEGV/SIGFPE)</h3>
                        <p className="text-[10px] text-white/40 leading-relaxed italic">
                          Capturamos fallos del motor de audio (Segfaults) enviando el "Mini-Dump" de memoria a Sentry con los símbolos nativos extraídos durante el build.
                        </p>
                      </div>
                      <div className="bg-black/40 p-4 rounded-xl font-mono text-[9px] text-red-400 border border-red-500/10">
                        <pre>
{`// C++: Signal Handler for Native Crashes
void signalHandler(int sig) {
    LOG_CRASH_VERBOSE(sig);
    Sentry::capture_native_crash(sig);
    exit(sig);
}`}
                        </pre>
                      </div>
                    </div>
                  </section>

                <div className="mt-8 bg-[#161616] p-8 rounded-3xl border border-white/5">
                  <h2 className="text-xl font-medium text-white mb-6 flex items-center gap-2">
                    <Terminal size={20} className="text-green-500" />
                    One-Click Build Engine
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="p-6 bg-white/5 rounded-2xl border border-white/5 group hover:border-orange-500/30 transition-all cursor-pointer">
                      <FileCode className="text-orange-500 mb-4" />
                      <h3 className="text-white font-bold text-xs mb-1">Android Build</h3>
                      <p className="text-[10px] text-white/40">ARM64-v8a con NDK Debug Symbols FULL.</p>
                    </div>
                    <div className="p-6 bg-white/5 rounded-2xl border border-white/5 group hover:border-blue-500/30 transition-all cursor-pointer">
                      <FileCode className="text-blue-500 mb-4" />
                      <h3 className="text-white font-bold text-xs mb-1">macOS Universal</h3>
                      <p className="text-[10px] text-white/40">Intel + Silicon con dSYM optimizados.</p>
                    </div>
                    <div className="p-6 bg-white/5 rounded-2xl border border-white/5 group hover:border-purple-500/30 transition-all cursor-pointer">
                      <ShieldAlert className="text-purple-500 mb-4" />
                      <h3 className="text-white font-bold text-xs mb-1">Crash Logs</h3>
                      <p className="text-[10px] text-white/40">Breadcrumbs y Offline persistence activos.</p>
                    </div>
                  </div>
                </div>

                <div className="mt-8 bg-[#161616] p-8 rounded-3xl border border-white/5">
                  <h2 className="text-xl font-medium text-white mb-6 flex items-center gap-2">
                    <BookOpen size={20} className="text-blue-400" />
                    CTO & Portfolio Documentation
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="p-6 bg-blue-500/5 rounded-2xl border border-blue-500/10 group hover:bg-blue-500/10 transition-all cursor-pointer">
                      <div className="flex justify-between items-start mb-4">
                        <BookOpen className="text-blue-400" />
                        <span className="text-[9px] bg-blue-500/20 text-blue-300 px-2 py-0.5 rounded uppercase font-bold tracking-widest">Whitepaper</span>
                      </div>
                      <h3 className="text-white font-bold text-sm mb-2">Technical Whitepaper</h3>
                      <p className="text-[10px] text-white/40 leading-relaxed">
                        Análisis profundo de la arquitectura Bit-Perfect, bypass de AudioFlinger y síntesis de filtros Biquad en C++.
                      </p>
                    </div>
                    <div className="p-6 bg-purple-500/5 rounded-2xl border border-purple-500/10 group hover:bg-purple-500/10 transition-all cursor-pointer">
                      <div className="flex justify-between items-start mb-4">
                        <Briefcase className="text-purple-400" />
                        <span className="text-[9px] bg-purple-500/20 text-purple-300 px-2 py-0.5 rounded uppercase font-bold tracking-widest">Showcase</span>
                      </div>
                      <h3 className="text-white font-bold text-sm mb-2">Portfolio Showcase</h3>
                      <p className="text-[10px] text-white/40 leading-relaxed">
                        Presentación ejecutiva de retos de ingeniería, optimización (-O3) y stacks tecnológicos (NDK/JNI).
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-8 bg-orange-500/5 border border-orange-500/10 p-8 rounded-3xl flex items-center justify-between">
                  <div>
                    <h3 className="text-orange-500 font-bold mb-2">Archivos Listos para Descarga</h3>
                    <p className="text-sm text-white/40">He generado todos los archivos en el directorio <span className="text-white font-mono">/distribution</span>.</p>
                  </div>
                  <div className="flex gap-4">
                    <div className="p-3 bg-white/5 rounded-xl border border-white/5 text-[10px] items-center flex gap-2">
                      <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                      Build Config Ready
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ) : activeTab === 'architecture' ? (
            <motion.div 
              key="architecture"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="p-8 lg:p-12 max-w-5xl mx-auto"
            >
              <div className="prose prose-invert max-w-none">
                <header className="mb-12">
                  <h1 className="text-5xl font-light mb-4 text-white">Arquitectura de Audio High-End</h1>
                  <p className="text-white/40 text-lg">De Prototipo Visual a Sistema Funcional de Alta Fidelidad.</p>
                </header>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                  <section className="bg-[#161616] p-8 rounded-3xl border border-white/5">
                    <h2 className="text-xl font-medium text-orange-500 mb-6 flex items-center gap-2">
                      <Activity size={20} />
                      1. Extracción de Metadatos Técnicos
                    </h2>
                    <p className="text-sm text-white/60 mb-6 leading-relaxed">
                      Para obtener datos como <span className="text-white">Sample Rate</span> y <span className="text-white">Bit Depth</span>, las librerías estándar de metadatos suelen ser insuficientes. Recomiendo el uso de <span className="text-orange-500 font-mono">ffmpeg_kit_flutter</span> para una inspección profunda.
                    </p>
                    <div className="space-y-3">
                      <TechBadge label="Bitrate" value="kbps (CBR/VBR)" />
                      <TechBadge label="Sample Rate" value="kHz (44.1 - 192)" />
                      <TechBadge label="Bit Depth" value="16, 24, 32-bit" />
                      <TechBadge label="Lossless" value="FLAC / ALAC / WAV" />
                    </div>
                  </section>

                  <section className="bg-[#161616] p-8 rounded-3xl border border-white/5">
                    <h2 className="text-xl font-medium text-orange-500 mb-6 flex items-center gap-2">
                      <ListMusic size={20} />
                      2. Lógica de Indexación Eficiente
                    </h2>
                    <p className="text-sm text-white/60 mb-6 leading-relaxed">
                      El escaneo de +2000 canciones debe ocurrir en un <span className="text-white">Isolate</span> separado para no bloquear el hilo de la UI.
                    </p>
                    <ul className="text-sm text-white/50 space-y-3">
                      <li>• <span className="text-white/80">Whitelist:</span> Permitir al usuario elegir carpetas mediante <span className="text-mono">file_picker</span>.</li>
                      <li>• <span className="text-white/80">Filtros:</span> Ignorar archivos menores a 1MB o carpetas ocultas (Android <span className="text-mono">.nomedia</span>).</li>
                      <li>• <span className="text-white/80">DB Recomendada:</span> <span className="text-orange-500 font-bold">Isar</span> o <span className="text-orange-500 font-bold">ObjectBox</span>. Son NoSQL, ultra rápidas y soportan ACID.</li>
                    </ul>
                  </section>
                </div>

                <section className="mb-12 bg-[#161616] p-8 rounded-3xl border border-white/5">
                  <h2 className="text-xl font-medium text-orange-500 mb-6">3. Implementación: Audio Metadata Provider</h2>
                  <div className="bg-black/40 p-6 rounded-2xl font-mono text-xs overflow-x-auto border border-white/5">
                    <pre className="text-blue-400">
{`// Definición del objeto técnico para la UI de Alta Densidad
class TechnicalMetadata {
  final String title;
  final String artist;
  final int sampleRate; // Hz
  final int bitDepth;   // bits
  final int bitrate;    // bps
  final String format;  // FLAC, WAV...
  final Uint8List? cover;

  TechnicalMetadata({...});
}

class AudioMetadataProvider {
  // Uso de FFmpeg para extraer datos que el OS oculta
  static Future<TechnicalMetadata> extract(String path) async {
    final session = await FFprobeKit.execute(
      "-v error -show_entries stream=sample_rate,bits_per_raw_sample,bit_rate -of default=noprint_wrappers=1 $path"
    );
    
    // Parseo de la salida de FFprobe y mapeo al objeto
    return TechnicalMetadata(
      format: path.split('.').last.toUpperCase(),
      // ... lógica de parseo
    );
  }
}`}
                    </pre>
                  </div>
                </section>

                <section className="bg-orange-500/5 border border-orange-500/10 p-8 rounded-3xl">
                  <h2 className="text-xl font-medium text-orange-500 mb-4">Gestión de Permisos (Android 13+ & iOS)</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 text-sm">
                    <div>
                      <h3 className="font-bold mb-2">Android 13+ (API 33)</h3>
                      <p className="text-white/50 leading-relaxed">
                        Ya no se usa <span className="text-mono">READ_EXTERNAL_STORAGE</span>. Debes solicitar específicamente <span className="text-white font-mono">READ_MEDIA_AUDIO</span> en el Manifest y en tiempo de ejecución.
                      </p>
                    </div>
                    <div>
                      <h3 className="font-bold mb-2">iOS</h3>
                      <p className="text-white/50 leading-relaxed">
                        Requiere <span className="text-white font-mono">NSAppleMusicUsageDescription</span> en el <span className="text-mono">Info.plist</span>. Para archivos fuera de la librería de música, se usa el <span className="text-white">Document Picker</span>.
                      </p>
                    </div>
                  </div>
                </section>
              </div>
            </motion.div>
          ) : activeTab === 'engine' ? (
            <motion.div 
              key="engine"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
              className="p-8 lg:p-12 max-w-5xl mx-auto"
            >
              <div className="prose prose-invert max-w-none">
                <header className="mb-12">
                  <h1 className="text-5xl font-light mb-4 text-white">Audio Engine: Low-Level Logic</h1>
                  <p className="text-white/40 text-lg">Bypass del Mezclador, Bit-Perfect y Gapless Playback.</p>
                </header>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
                  <div className="lg:col-span-2 space-y-8">
                    <section className="bg-[#161616] p-8 rounded-3xl border border-white/5">
                      <h2 className="text-xl font-medium text-orange-500 mb-6 flex items-center gap-2">
                        <Zap size={20} />
                        1. Bit-Perfect Output (Bypass)
                      </h2>
                      <div className="space-y-4 text-sm text-white/60 leading-relaxed">
                        <p>
                          Para evitar el resampling forzado, tomamos control exclusivo del hardware.
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="p-4 bg-white/5 rounded-2xl border border-white/5">
                            <h3 className="text-white font-bold mb-2">Android: AAudio</h3>
                            <p>Modo exclusivo para bypass de AudioFlinger.</p>
                          </div>
                          <div className="p-4 bg-white/5 rounded-2xl border border-white/5">
                            <h3 className="text-white font-bold mb-2">DSD over PCM (DoP)</h3>
                            <p>Empaquetado de muestras de 1-bit en frames PCM de 24-bits con marcadores 0x05/0xFA.</p>
                          </div>
                        </div>
                      </div>
                    </section>

                    <section className="bg-[#161616] p-8 rounded-3xl border border-white/5">
                      <h2 className="text-xl font-medium text-blue-400 mb-6 flex items-center gap-2">
                        <Layers size={20} />
                        2. Gapless Playback (Look-ahead)
                      </h2>
                      <div className="space-y-4 text-sm text-white/60 leading-relaxed">
                        <p>
                          El silencio entre canciones ocurre por la latencia al abrir el siguiente archivo. La solución es el **Look-ahead buffering**.
                        </p>
                        <ul className="space-y-2">
                          <li>• <span className="text-white">Pre-decodificación:</span> Cuando faltan 5 segundos para terminar la pista A, el motor ya debe tener los primeros 2 segundos de la pista B en un buffer secundario.</li>
                          <li>• <span className="text-white">Zero-Crossfade:</span> Si se desea crossfade, se realiza una mezcla matemática en el dominio digital, pero para audiófilos puristas, se recomienda el cambio instantáneo de puntero de buffer.</li>
                        </ul>
                      </div>
                    </section>
                  </div>

                  <aside className="space-y-6">
                    <div className="bg-orange-500/10 border border-orange-500/20 p-6 rounded-3xl">
                      <h3 className="text-orange-500 font-bold text-xs uppercase tracking-widest mb-4 flex items-center gap-2">
                        <AlertTriangle size={14} />
                        Battery Warning
                      </h3>
                      <p className="text-xs text-orange-200/60 leading-relaxed">
                        El modo exclusivo de AAudio impide que el procesador entre en estados de bajo consumo (C-states) profundos para mantener la latencia estable. 
                        <br /><br />
                        <span className="text-orange-500 font-bold">Impacto estimado:</span> +18% consumo de energía.
                      </p>
                    </div>
                    
                    <div className="bg-blue-500/10 border border-blue-500/20 p-6 rounded-3xl">
                      <h3 className="text-blue-400 font-bold text-xs uppercase tracking-widest mb-4 flex items-center gap-2">
                        <Zap size={14} />
                        Zero-Copy Path
                      </h3>
                      <p className="text-xs text-blue-200/60 leading-relaxed">
                        Nuestra arquitectura utiliza <span className="text-white">Direct ByteBuffers</span> para pasar datos de la DB Isar al motor C++ sin copias intermedias en el heap de Java/Dart.
                      </p>
                    </div>
                  </aside>
                </div>

                <section className="bg-[#161616] p-8 rounded-3xl border border-white/5">
                  <h2 className="text-xl font-medium text-orange-500 mb-6">3. Implementación C++ (Oboe / AAudio)</h2>
                  <div className="bg-black/40 p-6 rounded-2xl font-mono text-xs overflow-x-auto border border-white/5">
                    <pre className="text-green-400">
{`#include <oboe/Oboe.h>

class BitPerfectEngine : public oboe::AudioStreamDataCallback {
public:
    void setupStream(int sampleRate) {
        oboe::AudioStreamBuilder builder;
        builder.setDirection(oboe::Direction::Output)
               ->setPerformanceMode(oboe::PerformanceMode::LowLatency)
               ->setSharingMode(oboe::SharingMode::Exclusive) // BIT-PERFECT BYPASS
               ->setFormat(oboe::AudioFormat::Float)
               ->setSampleRate(sampleRate)
               ->setCallback(this)
               ->openStream(mStream);
        
        mStream->requestStart();
    }

    oboe::DataCallbackResult onAudioReady(oboe::AudioStream *oboeStream, 
                                        void *audioData, 
                                        int32_t numFrames) override {
        // Manejo de Buffer Circular para Gapless
        fillBufferWithNextSamples(static_cast<float*>(audioData), numFrames);
        return oboe::DataCallbackResult::Continue;
    }

private:
    std::shared_ptr<oboe::AudioStream> mStream;
    // Lógica de buffer circular aquí...
};`}
                    </pre>
                  </div>
                </section>
              </div>
            </motion.div>
          ) : activeTab === 'dsp' ? (
            <motion.div 
              key="dsp"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="p-8 lg:p-12 max-w-5xl mx-auto"
            >
              <div className="prose prose-invert max-w-none">
                <header className="mb-12">
                  <h1 className="text-5xl font-light mb-4 text-white">DSP Engine: Parametric EQ</h1>
                  <p className="text-white/40 text-lg">Ecualización de 10 bandas con filtros Biquad de alta precisión.</p>
                </header>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
                  <section className="bg-[#161616] p-8 rounded-3xl border border-white/5">
                    <h2 className="text-xl font-medium text-orange-500 mb-6 flex items-center gap-2">
                      <Waves size={20} />
                      1. Diseño de Filtros Biquad (IIR)
                    </h2>
                    <div className="space-y-4 text-sm text-white/60">
                      <p>Implementamos filtros de segundo orden (Direct Form II) para cada banda. Las fórmulas de diseño se basan en el Cookbook de Robert Bristow-Johnson:</p>
                      <div className="bg-black/40 p-4 rounded-xl font-mono text-[10px] text-blue-300 border border-white/5">
                        <p>H(z) = (b0 + b1*z^-1 + b2*z^-2) / (a0 + a1*z^-1 + a2*z^-2)</p>
                      </div>
                      <ul className="space-y-2 text-xs">
                        <li>• <span className="text-white">Peaking EQ:</span> Para las 8 bandas centrales.</li>
                        <li>• <span className="text-white">Shelving:</span> Low-shelf (20-100Hz) y High-shelf (10-20kHz).</li>
                        <li>• <span className="text-white">Factor Q:</span> Controla el ancho de banda para ajustes quirúrgicos.</li>
                      </ul>
                    </div>
                  </section>

                  <section className="bg-[#161616] p-8 rounded-3xl border border-white/5">
                    <h2 className="text-xl font-medium text-orange-500 mb-6 flex items-center gap-2">
                      <Zap size={20} />
                      2. Smooth Transition & Protection
                    </h2>
                    <div className="space-y-4 text-sm text-white/60">
                      <p>Para evitar artefactos audibles (pops/clicks) al mover los sliders:</p>
                      <ul className="space-y-2 text-xs">
                        <li>• <span className="text-white">Interpolación de Coeficientes:</span> Los coeficientes (a, b) no cambian instantáneamente; se interpolan linealmente a lo largo de 128-256 muestras.</li>
                        <li>• <span className="text-white">Soft Clipper:</span> Al final de la cadena de EQ, aplicamos una función sigmoide para limitar la señal si excede los 0dB sin clipping digital abrupto.</li>
                      </ul>
                      <div className="p-4 bg-orange-500/5 border border-orange-500/10 rounded-2xl">
                        <p className="text-[10px] text-orange-200/60 font-mono italic">output = tanh(input * gain);</p>
                      </div>
                    </div>
                  </section>
                </div>

                <section className="bg-[#161616] p-8 rounded-3xl border border-white/5">
                  <h2 className="text-xl font-medium text-orange-500 mb-6">3. Implementación C++ (DSP Loop)</h2>
                  <div className="bg-black/40 p-6 rounded-2xl font-mono text-xs overflow-x-auto border border-white/5 mb-8">
                    <pre className="text-green-400">
{`struct BiquadCoeffs {
    float b0, b1, b2, a1, a2; // a0 normalizado a 1.0
};

class BiquadFilter {
public:
    float process(float in) {
        float out = coeffs.b0*in + coeffs.b1*z1 + coeffs.b2*z2 - coeffs.a1*y1 - coeffs.a2*y2;
        z2 = z1; z1 = in;
        y2 = y1; y1 = out;
        return out;
    }
private:
    BiquadCoeffs coeffs;
    float z1=0, z2=0, y1=0, y2=0;
};`}
                    </pre>
                  </div>

                  <section className="bg-orange-500/5 border border-orange-500/10 p-8 rounded-3xl">
                    <div className="flex items-center justify-between mb-8">
                      <div>
                        <h2 className="text-2xl font-medium text-orange-500 mb-2 flex items-center gap-3">
                          <Gauge size={24} />
                          Auto-EQ: Calibration Import
                        </h2>
                        <p className="text-white/40 text-sm">Carga curvas de compensación AutoEq (.txt/.csv) para una respuesta plana.</p>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className="text-[10px] text-white/30 uppercase tracking-widest">A/B Testing</span>
                        <button 
                          onClick={() => setAutoEqEnabled(!autoEqEnabled)}
                          className={`px-6 py-2 rounded-full text-xs font-bold transition-all border ${
                            autoEqEnabled ? 'bg-orange-500 text-black border-orange-500 shadow-lg shadow-orange-500/20' : 'bg-transparent text-white/40 border-white/10'
                          }`}
                        >
                          {autoEqEnabled ? 'CALIB ON' : 'RAW BYPASS'}
                        </button>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="bg-black/40 p-6 rounded-2xl border border-white/5">
                        <label className="text-[10px] text-white/40 uppercase block mb-2">Preset File</label>
                        <select 
                          value={selectedPreset}
                          onChange={(e) => setSelectedPreset(e.target.value)}
                          className="bg-transparent text-white text-sm w-full outline-none"
                        >
                          <option className="bg-[#161616]">Harman In-Ear 2019</option>
                          <option className="bg-[#161616]">Sennheiser HD600 Flat</option>
                          <option className="bg-[#161616]">Sony WH-1000XM4 EQ</option>
                        </select>
                      </div>
                      <div className="bg-black/40 p-6 rounded-2xl border border-white/5 md:col-span-2">
                        <div className="flex items-center justify-between mb-4">
                          <label className="text-[10px] text-white/40 uppercase block">Correction Curve (10 Bands)</label>
                          <span className="text-[9px] text-orange-500 font-mono">Mapped to Biquad Engine</span>
                        </div>
                        <div className="flex items-end gap-1 h-12">
                          {[3, 5, 2, -2, -4, -2, 4, -1, 3, -4].map((v, i) => (
                            <div key={i} className="flex-1 bg-white/5 relative h-full rounded-sm overflow-hidden">
                              <div 
                                className="absolute bottom-0 left-0 w-full bg-orange-500/40" 
                                style={{ height: `${50 + v * 10}%` }}
                              />
                              <div className="absolute top-1/2 left-0 w-full h-[1px] bg-white/10" />
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </section>
                </section>
              </div>
            </motion.div>
          ) : (
            <motion.div 
              key="usb"
              initial={{ opacity: 0, scale: 1.1 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="p-8 lg:p-12 max-w-5xl mx-auto"
            >
              <div className="prose prose-invert max-w-none">
                <header className="mb-12">
                  <h1 className="text-5xl font-light mb-4 text-white">USB Host: Direct DAC Control</h1>
                  <p className="text-white/40 text-lg">Comunicación directa y Bit-Perfect con Hardware Externo.</p>
                </header>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
                  <section className="bg-[#161616] p-8 rounded-3xl border border-white/5">
                    <h2 className="text-xl font-medium text-orange-500 mb-6 flex items-center gap-2">
                      <Usb size={20} />
                      1. Detección y Handshake
                    </h2>
                    <div className="space-y-4 text-sm text-white/60">
                      <p>Usamos la <span className="text-white">USB Host API</span> para identificar dispositivos de clase de audio y negociar capacidades nativas.</p>
                      <ul className="space-y-2 text-xs">
                        <li>• <span className="text-white">Enumeración:</span> Filtramos por <span className="text-mono">USB_CLASS_AUDIO</span>.</li>
                        <li>• <span className="text-white">Handshake:</span> Consultamos los <span className="text-mono">AudioControl</span> descriptores para obtener el rango de Sample Rates (44.1 - 768kHz).</li>
                        <li>• <span className="text-white">Modo Asíncrono:</span> Priorizamos el modo asíncrono donde el DAC controla el reloj para eliminar el <span className="text-orange-500">Jitter</span>.</li>
                      </ul>
                    </div>
                  </section>

                  <section className="bg-[#161616] p-8 rounded-3xl border border-white/5">
                    <h2 className="text-xl font-medium text-orange-500 mb-6 flex items-center gap-2">
                      <AlertTriangle size={20} />
                      2. Failover & Error Handling
                    </h2>
                    <div className="space-y-4 text-sm text-white/60">
                      <p>La desconexión física del USB es un evento crítico que debe manejarse sin crasheos:</p>
                      <ul className="space-y-2 text-xs">
                        <li>• <span className="text-white">Fallback Automático:</span> Ante una pérdida de sincronía, el motor conmuta instantáneamente al mezclador del sistema (<span className="text-mono">AAudio</span> estándar).</li>
                        <li>• <span className="text-white">Pausa de Seguridad:</span> Opcionalmente se pausa la reproducción para proteger el oído del usuario ante cambios bruscos de volumen.</li>
                      </ul>
                    </div>
                  </section>
                </div>

                <section className="bg-[#161616] p-8 rounded-3xl border border-white/5">
                  <h2 className="text-xl font-medium text-orange-500 mb-6">3. Implementación Kotlin (USB Permissions)</h2>
                  <div className="bg-black/40 p-6 rounded-2xl font-mono text-xs overflow-x-auto border border-white/5">
                    <pre className="text-blue-400">
{`val usbManager = getSystemService(Context.USB_SERVICE) as UsbManager
val deviceList = usbManager.deviceList

for (device in deviceList.values) {
    if (device.deviceClass == UsbConstants.USB_CLASS_AUDIO) {
        val permissionIntent = PendingIntent.getBroadcast(this, 0, Intent(ACTION_USB_PERMISSION), 0)
        usbManager.requestPermission(device, permissionIntent)
        
        // Al obtener permiso, pasamos el file descriptor al motor C++
        val connection = usbManager.openDevice(device)
        nativeAudioEngine.initUsbDac(connection.fileDescriptor)
    }
}`}
                    </pre>
                  </div>
                </section>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}

function TechBadge({ label, value }: { label: string, value: string }) {
  return (
    <div className="flex justify-between items-center p-3 bg-white/5 rounded-xl border border-white/5">
      <span className="text-xs text-white/40 uppercase tracking-widest font-bold">{label}</span>
      <span className="text-sm font-mono text-white/80">{value}</span>
    </div>
  );
}

function NavButton({ active, onClick, icon, label }: { active: boolean, onClick: () => void, icon: ReactNode, label: string }) {
  return (
    <button 
      onClick={onClick}
      className={`relative group flex flex-col items-center gap-1 transition-all ${active ? 'text-orange-500' : 'text-white/30 hover:text-white/60'}`}
    >
      {active && (
        <motion.div 
          layoutId="nav-active"
          className="absolute -left-4 w-1 h-6 bg-orange-500 rounded-r-full"
        />
      )}
      {icon}
      <span className="text-[10px] font-bold uppercase tracking-tighter">{label}</span>
    </button>
  );
}
