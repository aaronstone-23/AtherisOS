# AtherisOS 🐍💻

A sleek, web-based operating system interface built with **React**, **Vite**, and **Tailwind CSS v4**. **AtherisOS** brings desktop-like window management, custom applications, and interactive workflows straight to your browser.

---

## 🌟 Features

* **Desktop Environment:** Interactive, draggable, and resizable application windows via `react-rnd`.
* **Centralized State Management:** Unified OS context (`useOSStore`) handling window states, active app focal tracking, and system configs.
* **Modern Styling:** Powered by **Tailwind CSS v4** with native Vite integration for fast rendering and CSS processing.
* **Modular App Engine:** Designed to easily plug in apps like a Terminal, Text Editor, Settings, and Taskbar.

---

## 🛠️ Tech Stack

* **Frontend Framework:** React 18 / 19
* **Build Tool:** Vite
* **Styling:** Tailwind CSS v4 (`@tailwindcss/vite`)
* **Window Drag & Resize:** `react-rnd`

---

## 🚀 Getting Started

### Prerequisites

Make sure you have **Node.js** (v18 or higher) and **npm** installed on your machine.

### Installation

1. **Clone the repository:**
   ```bash
   git clone [https://github.com/your-username/AtherisOS.git](https://github.com/your-username/AtherisOS.git)
   cd AtherisOS

```

2. **Install dependencies:**
```bash
npm install

```


3. **Start the development server:**
```bash
npm run dev

```


4. **Open in Browser:**
Navigate to `http://localhost:5173` to launch AtherisOS!

---

## 📂 Project Structure

```text
AtherisOS/
├── public/              # Static assets (wallpapers, icons, etc.)
├── src/
│   ├── components/
│   │   ├── apps/        # System applications (TextEditor, Terminal, Settings, etc.)
│   │   └── system/      # OS core UI (WindowManager, Taskbar, Desktop)
│   ├── context/         # React context stores (useOSStore.js)
│   ├── App.jsx          # Root application component
│   ├── index.css        # Tailwind v4 directives (@import "tailwindcss";)
│   └── main.jsx         # React DOM entry point
├── index.html           # Root HTML template
├── vite.config.js       # Vite configuration with Tailwind plugin
└── package.json         # Project dependencies and scripts

```

---

## 🗺️ Roadmap

* [x] Initial Vite + React environment setup
* [x] Tailwind CSS v4 migration
* [x] Window Manager & draggable component architecture
* [ ] **Phase 2:** Taskbar, Start Menu, and System Tray Clock
* [ ] **Phase 3:** Full App Ecosystem (File Explorer, Terminal commands, Notepad persistence)
* [ ] **Phase 4:** Theme customization & dynamic wallpapers

---

## 📜 License

This project is licensed under the **MIT License**.

```

```
