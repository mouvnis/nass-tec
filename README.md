[README.md](https://github.com/user-attachments/files/28339691/README.md)
# نص تك — Nass Tec OCR App 📄✨

> استخراج النصوص من الصور بالذكاء الاصطناعي — مجاناً، بدون إنترنت

![License](https://img.shields.io/badge/license-MIT-gold)
![Platform](https://img.shields.io/badge/platform-Android-green)
![Capacitor](https://img.shields.io/badge/Capacitor-v6-blue)

---

## 🚀 Quick Start — Build APK Automatically (GitHub Actions)

**No Android Studio needed!** Just push to GitHub and download the APK.

### Step 1 — Create GitHub Repository
1. Go to [github.com/new](https://github.com/new)
2. Name it `nasstec-app`
3. Set to **Public** (required for free Actions)
4. Click **Create repository**

### Step 2 — Upload This Project
```bash
git init
git add .
git commit -m "🚀 Initial release — NassTec OCR v1.0"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/nasstec-app.git
git push -u origin main
```

### Step 3 — Download Your APK
1. Go to your repo on GitHub
2. Click **Actions** tab
3. Wait ~5 minutes for the build to finish ✅
4. Click the completed workflow → **Artifacts** → Download `nasstec-debug-apk`
5. Unzip → install `app-debug.apk` on your Android phone

---

## 🛠️ Local Build (Android Studio)

### Prerequisites
- Node.js 18+
- Android Studio + JDK 17
- Android SDK (API 22+)

### Commands
```bash
# Install dependencies
npm install

# Add Android platform
npx cap add android

# Sync web files to Android
npx cap sync android

# Open in Android Studio
npx cap open android
# Then: Build → Build APK
```

---

## 📁 Project Structure

```
nasstec-app/
├── www/
│   ├── index.html      ← Splash / Start Page (your logo)
│   ├── app.html        ← Main OCR Application
│   ├── logo.jpg        ← Your NassTec logo
│   └── manifest.json   ← PWA Manifest
├── .github/
│   └── workflows/
│       └── build-apk.yml  ← Auto APK builder
├── capacitor.config.json
├── package.json
└── README.md
```

---

## ✨ Features

| Feature | Description |
|---------|-------------|
| 📷 Smart Camera | Auto-detect and capture documents |
| 📄 OCR Engine | Tesseract.js v5 — Arabic + English |
| 🤖 AI Summary | Offline extractive summarization |
| 🔊 Text-to-Speech | Listen to extracted text |
| 💾 History | Save & search past scans |
| 📡 Offline | 100% works without internet |
| 🎯 Random Ads | 14 rotating realistic ad units |

---

## 📱 App Icons

Place your generated icons in `www/icons/`:
- `icon-72.png` — 72×72
- `icon-96.png` — 96×96  
- `icon-128.png` — 128×128
- `icon-144.png` — 144×144
- `icon-192.png` — 192×192
- `icon-512.png` — 512×512

Use [realfavicongenerator.net](https://realfavicongenerator.net) to generate from your logo.

---

## 🔑 Sign APK for Play Store (optional)

```bash
# Generate keystore
keytool -genkey -v -keystore nasstec.keystore -alias nasstec -keyalg RSA -keysize 2048 -validity 10000

# Add to android/app/build.gradle under android { signingConfigs { ... } }
```

---

## 📄 License
MIT © NassTec
