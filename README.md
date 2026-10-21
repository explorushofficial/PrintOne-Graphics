# PrintOne Graphics — Official Website

Modern, production-ready Next.js application (App Router) for **PrintOne Graphics**, Mumbai's premier design, digital printing, publications, and corporate gifting partner.

---

## 🚀 Tech Stack

- **Framework:** [Next.js](https://nextjs.org/) (App Router, Turbopack)
- **UI Library:** [React 19](https://react.dev/)
- **Styling:** [Tailwind CSS v4](https://tailwindcss.com/)
- **Icons:** [Lucide React](https://lucide.dev/)
- **Typography:** DM Sans & Manrope via `next/font/google`
- **Language:** TypeScript 5

---

## 📁 Project Structure

```text
├── app/
│   ├── layout.tsx                # Root layout with fonts, metadata, providers, header & footer
│   ├── page.tsx                  # Home page
│   ├── products/
│   │   ├── page.tsx              # Products & services page (Server Component with metadata)
│   │   └── products-client.tsx   # Interactive category filters & service grid
│   ├── about/
│   │   └── page.tsx              # About us page (story, mission, vision, values)
│   ├── contact/
│   │   ├── page.tsx              # Contact page (Server Component with metadata)
│   │   └── contact-client.tsx    # Direct contact information & interactive WhatsApp inquiry form
│   ├── not-found.tsx             # Custom branded 404 page
│   └── globals.css               # Global theme tokens, typography, grain texture & animations
├── components/
│   ├── header.tsx                # Announcement bar, logo, responsive navigation & cart badge
│   ├── footer.tsx                # Footer with address, quick links, contacts & copyright
│   ├── cart-drawer.tsx           # Slide-out enquiry list drawer with WhatsApp deep link
│   ├── service-card.tsx          # Service card with catalog preview, tag, add-to-cart & WhatsApp link
│   └── providers.tsx             # Client context providers
├── context/
│   └── cart-context.tsx          # Persistent inquiry cart state (localStorage) & WhatsApp URL generator
├── data/
│   └── services.ts               # Complete services catalog data (30 items across 6 categories)
├── public/
│   ├── catalog/                  # High-resolution service photography
│   ├── production/               # Production machinery & workshop photography
│   ├── printone-logo.jpeg        # Brand logo
│   ├── printone-logo-full.jpeg   # Full brand banner logo
│   ├── print-editorial.jpg       # Hero editorial imagery
│   └── robots.txt                # Search engine crawler configuration
├── next.config.ts                # Next.js configuration
├── tsconfig.json                 # TypeScript compiler configuration
└── package.json                  # Scripts and dependencies
```

---

## 🛠️ Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Run Local Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 3. Build for Production
```bash
npm run build
```

### 4. Start Production Server
```bash
npm run start
```
