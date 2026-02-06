# Woldan – Personal Blog & Portfolio Template

[![Open Source Love](https://badges.frapsoft.com/os/v1/open-source.svg?v=103)](https://github.com/woldann/me)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Bun](https://img.shields.io/badge/Runtime-Bun-black?logo=bun)](https://bun.sh)
[![Next.js 16](https://img.shields.io/badge/Framework-Next.js%2016-black?logo=next.js)](https://nextjs.org)

> **Modern, Ultra-Fast, and Minimalist Personal Website Template.**

Woldan is a high-performance personal portfolio and blog engine designed for developers who want a sleek, modern, and easily customizable website. It bridges the gap between powerful features and simplicity, allowing you to showcase your work and thoughts with style.

## ✨ Key Features

- 🏎️ **Ultra-Fast Performance:** Built with Next.js 16 and powered by the Bun runtime.
- 🎨 **Modern Aesthetics:** Clean, minimalist design with "terminal-modern" vibes, typewriter effects, and dynamic Lucide icons.
- 🌍 **Full i18n Support:** Built-in internationalization (Turkish/English) using `next-intl`.
- 🛡️ **Hybrid Blog Engine:** Write articles in MDX with full support for React components, Tailwind v4, and dynamic Lucide icons.
- 💾 **RAM Caching:** Intelligent in-memory caching for MDX translations and blog posts for instant page loads.
- ✍️ **Publishing CLI:** A secure, token-based API and CLI for simple content publishing.
- 🧹 **Code Standards:** Pre-configured ESLint and Prettier with automatic Tailwind class sorting.
- 📱 **Mobile Optimized:** Fully responsive design with a smooth mobile navigation drawer.

## 🚀 Quick Setup

### 1. Prerequisites

- [Bun](https://bun.sh) installed on your system.
- Basic knowledge of Markdown/MDX.

### 2. Installation

```bash
# Clone the repository
git clone https://github.com/woldann/me.git
cd me

# Install dependencies
bun install
```

### 3. Configuration

Copy the example config and fill in your personal details:

```bash
cp config.yaml.example config.yaml
```

Open `config.yaml` and set your `FullName`, `Nickname`, `Socials`, `Domain`, and a secure `Token` for publishing.

### 4. Run Development Server

```bash
bun run dev
```

Open `http://localhost:3000` to see your site launch.

## ✍️ Publishing Content

You can publish blog posts directly from your local environment using the built-in CLI tool:

1. Create your post files (e.g., `my-article.en.mdx` and `my-article.tr.mdx`) in the project root.
2. Run the publish command:
   ```bash
   bun run publish my-article
   ```
3. The API validates your token, writes the files to `content/blog/`, and invalidates the RAM cache instantly.

## 🛠️ Tech Stack

- **Framework:** Next.js 16 (Turbopack)
- **Styling:** Tailwind CSS v4
- **Runtime:** Bun
- **Content:** MDX (next-mdx-remote)
- **Animation:** Framer Motion
- **Icons:** Lucide React

## 📄 License

This project is open-source and available under the [MIT License](LICENSE).

---

Built with 💻 by [woldann](https://github.com/woldann)
