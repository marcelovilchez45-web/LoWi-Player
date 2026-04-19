# Project Showcase: Hi-Fi Mobile Audio Engine

## 🚀 Executive Summary: "A Professional Audio Studio in Your Pocket"
This project represents the pinnacle of mobile audio engineering. We have transformed a standard smartphone into a reference-grade audio source capable of driving high-impedance headphones and external DACs with bit-perfect precision. By moving critical audio logic from Java to C++, we've achieved a performance level previously reserved for dedicated high-end DAP (Digital Audio Players).

## 🛠 Engineering Specifications
- **Core Engine:** C++ (Oboe/AAudio) with NDK integration.
- **DSP Pipeline:** 10-Band Parametric EQ (Linear-interpolated Biquads).
- **Communication:** USB Host API (Direct DAC control) & mDNS (Network Discovery).
- **Format Support:** FLAC, WAV, ALAC, and DSD (via DoP v1.1).
- **Optimization:** `-O3` architecture-specific compilation (arm64-v8a / x86_64).
- **Reliability:** SRE Telemetry, XRun monitoring, and Native Crash Reporting.

## 🧠 Engineering Challenges & Solutions

### Challenge 1: The "Android Resampling" Problem
**Problem:** Android's internal mixer degrades 192kHz files down to 48kHz.
**Solution:** Implemented Oboe's `SharingMode::Exclusive` and MMAP support to gain direct hardware access, bypassing the system mixer for bit-perfect delivery.

### Challenge 2: DSP Latency vs. Battery Life
**Problem:** High-precision EQ processing can drain battery and cause UI lag.
**Solution:** Optimized the C++ processing loop with SIMD-like logic and offloaded database operations to a non-blocking Isar isolate. The UI runs on a separate thread, ensuring 60 FPS even during heavy DSP loads.

### Challenge 3: Seamless Network Audio
**Problem:** Wi-Fi jitter causes clicks and pops in wireless streaming.
**Solution:** Developed a custom LPCM streaming server on the mobile device with a deep jitter buffer on the Python-based PC receiver, ensuring studio-accurate wireless sound.

## 📈 Impact
This architecture reduces THD+N (Total Harmonic Distortion + Noise) by ensuring the signal path stays in the high-bit-depth digital domain until it reaches the external DAC, effectively making the smartphone an "audiophile transport" device.
