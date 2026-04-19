# 🎧 Hi-Fi Audio Player: Professional Mobile Transport 

![Build Status](https://img.shields.io/badge/Build-Optimized--O3-orange)
![Platform](https://img.shields.io/badge/Platform-Android%20|%20macOS-blue)
![Audio](https://img.shields.io/badge/Audio-Bit--Perfect-green)

A reference-grade music player designed for audiophiles who demand the highest audio fidelity. This application bypasses system limitations to provide a raw, high-resolution signal path to your hardware.

## 🌟 Key Features

- **Bit-Perfect Engine:** Bypasses Android AudioFlinger for 24-bit/192kHz native playback.
- **Parametric DSP:** 10-band surgical EQ using custom C++ Biquad filters.
- **Auto-EQ Support:** Import calibration curves for over 2,500 headphone models.
- **USB Host API:** Direct communication with external USB DACs (DSD/DoP supported).
- **Network Link:** Stream lossless audio to your PC wirelessly with mDNS discovery.

---

## 📥 Installation

### 📱 Android
1. Download the `app-release.apk`.
2. Enable **"Unknown Sources"** in your device security settings.
3. Install and grant **Storage** & **USB** permissions.

### 💻 macOS (Monterey+)
1. Drag `HiFiPlayer.app` to your `/Applications` folder.
2. **Right-Click > Open** on the first launch to bypass Gatekeeper.
3. Allow **Local Network** access for PC Link features.

---

## 🖥️ PC Link Setup
To use your computer as a wireless audio output:
1. Ensure Python 3.x is installed.
2. Install dependencies: `pip install zeroconf requests numpy sounddevice`.
3. Run `python pc_receiver.py`.
4. Tap **"Start PC Link"** in the mobile app.

---

## 🛠️ Developer & Portfolio
This project showcases high-performance systems programming and low-level audio architecture.
- For deep technical details, see [WHITEPAPER.md](./WHITEPAPER.md).
- For a high-level project overview, see [SHOWCASE.md](./SHOWCASE.md).
- For build instructions, see [BUILD_INSTRUCTIONS.md](./distribution/BUILD_INSTRUCTIONS.md).

---
*Developed by the Hi-Fi Engineering Team*
