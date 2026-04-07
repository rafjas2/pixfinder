# PixFinder 📸

PixFinder is a modern, high-performance image search application built with **React 19**, **Vite**, and **TypeScript**. It provides a seamless interface to discover stunning, high-resolution photography powered by the [Pixabay API](https://pixabay.com/api/docs/).

The project has been architected for speed, security, and premium aesthetics, featuring a serverless API proxy for sensitive key protection and optimized asset delivery.

---

## ✨ Features

- **⚡ Lightning-Fast Search**: Powered by **TanStack Query** for intelligent caching, background fetching, and smooth loading states.
- **🛡️ Secure API Proxy**: Implements a **Vercel Edge Function** (`/api/search`) to protect the Pixabay API key from being exposed to the client browser.
- **🖼️ High-Res Modal**: View images in crisp high-definition, alongside author metadata and dynamic fallback avatars.
- **🚀 Performance Optimized**: Features an 89% smaller **WebP** hero background and responsive `loading="lazy"` images.
- **🎨 Premium UI/UX**: Built with **Tailwind CSS**, featuring dark mode support, glassmorphism, and smooth micro-animations.
- **🧹 Search Utility**: One-click "X" clear button that resets the navigation state and URL parameters instantly.

## 🛠️ Technology Stack

- **Core**: React 19, Vite, TypeScript
- **State & Data**: TanStack Query (v5), Zod (Validation), React Router (v7)
- **Styling**: Tailwind CSS, Lucide Icons
- **Testing**: Vitest, React Testing Library
- **Deployment**: Vercel (Edge Functions enabled)

## 📁 Architecture & Structure

The codebase follows a modular, component-based architecture for maximum reusability:

```text
pixfinder/
├── api/                  # Vercel Serverless Functions (API Proxy)
├── public/               # Static public assets (manifest, favicon)
├── src/
│   ├── components/       # UI Components (Hero, Search, Gallery, Modal, etc.)
│   ├── images/           # Optimized assets (Hero WebP)
│   ├── lib/              # Logic & Utilities (API client, cn helper)
│   ├── types/            # Zod schemas & TypeScript definitions
│   ├── App.tsx           # Layout & Routing root
│   └── index.css         # Tailwind directives & Design System tokens
├── eslint.config.js      # Modern ESLint 9 (Flat Config)
├── vite.config.ts        # Vite build & alias configuration
└── tsconfig.json         # Strict TypeScript configuration
```

## 🧠 Skills Demonstrated

- **Modern React Architecture**: Leveraging **React 19** features, functional components, and custom hooks for a modular, maintainable UI.
- **Strict TypeScript Implementation**: End-to-end type safety across the application, including API responses, component props, and design system tokens.
- **Security Engineering**: Architecting a **Vercel Edge Proxy** to securely handle sensitive API keys server-side, preventing client-side leakage.
- **Advanced State Management**: Utilizing **TanStack Query** for professional server state handling, including smart caching, background synchronization, and retry logic.
- **Schema-Driven Development**: Implementing **Zod** for strict runtime validation of third-party API data, ensuring application resiliance.
- **Performance & Optimization**: achieving high Core Web Vitals through **WebP** asset conversion, lazy loading, and Edge runtime execution.
- **Automated QA & Tooling**: Maintaining a 0-error codebase using **Vitest** for logic verification and **ESLint 9** (Flat Config) for code quality.

## 🚀 Getting Started

### Prerequisites

You will need a free API Key from [Pixabay](https://pixabay.com/api/docs/).

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/rafjas2/pixfinder.git
   cd pixfinder
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Configure Environment Variables**:
   Create a `.env` file in the root directory:
   ```env
   VITE_PIXABAY_API_KEY=your_key_here
   VITE_PIXABAY_API_URL=https://pixabay.com/api
   ```

4. **Run Development Server**:
   ```bash
   npm run dev
   ```

---

## 🏗️ Production & Deployment

### Important: Vercel Setup
This project uses an Edge Proxy to hide your API key. When deploying to **Vercel**:
1. Go to **Settings > Environment Variables**.
2. Add `PIXABAY_API_KEY` (without the `VITE_` prefix) to your production environment.

### Scripts
- `npm run dev` - Start development server (HMR active)
- `npm run build` - Create optimized production bundle
- `npm run test` - Execute unit tests via Vitest
- `npm run lint` - Run ESLint audit on the `src` directory

---
*Built & Designed by Rafal Jasinski*
