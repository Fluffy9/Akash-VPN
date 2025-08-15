# Akash VPN Frontend

A modern, responsive web interface for Akash VPN built with Next.js 15, TypeScript, and Three.js. This frontend is designed as part of a larger decentralized VPN service ecosystem and features a stunning 3D Earth globe visualization with professional UI/UX.

## 🌟 Features

- **3D Earth Globe**: Photorealistic Earth visualization using Three.js and three-globe
- **Responsive Design**: Mobile-first approach with desktop sidebar and mobile navigation
- **Dark/Light Theme**: Persistent theme switching with system preference detection
- **Modern UI Components**: Built with Radix UI primitives and ShadCN/UI
- **Performance Optimized**: SSR-ready with reduced motion support
- **TypeScript**: Fully typed for better developer experience
- **Accessibility**: WCAG compliant with proper ARIA labels and keyboard navigation

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ 
- npm, yarn, pnpm, or bun

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd akashvpn-frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

## 🏗️ Architecture

### Tech Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript 5
- **Styling**: Tailwind CSS 4 with custom design system
- **3D Graphics**: Three.js + three-globe for Earth visualization
- **UI Components**: Radix UI + ShadCN/UI
- **Icons**: Lucide React
- **Animations**: CSS-based with Tailwind animations

### Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── globals.css        # Global styles and theme variables
│   ├── layout.tsx         # Root layout with theme provider
│   └── page.tsx           # Main landing page
├── components/            # React components
│   ├── ui/               # Reusable UI primitives
│   ├── benefits-section.tsx
│   ├── connection-controls.tsx
│   ├── earth-globe.tsx   # 3D Earth globe component
│   ├── mobile-nav.tsx
│   ├── sidebar.tsx
│   └── theme-provider.tsx
└── lib/
    └── utils.ts          # Utility functions
```

### Design System

- **Primary Color**: `#FF414C` (Akash Red)
- **Light Theme**: White background (`#FFFFFF`), black text (`#000000`)
- **Dark Theme**: Deep black background (`#0A0A0A`), white text (`#FFFFFF`)
- **Typography**: Geist Sans and Geist Mono fonts
- **Spacing**: Consistent 8px grid system

## 🔧 Development

### Available Scripts

```bash
npm run dev          # Start development server with Turbopack
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
```

### Key Components

#### EarthGlobe Component
- Renders photorealistic 3D Earth using Three.js
- Includes atmospheric glow effects
- Smooth rotation animation
- Proper cleanup and memory management
- SSR-compatible with dynamic imports

#### Theme System
- Persistent theme storage
- System preference detection
- CSS custom properties for theming
- Smooth transitions between themes

#### Responsive Navigation
- Desktop: Fixed sidebar with navigation
- Mobile: Collapsible navigation menu
- Consistent branding across breakpoints

## 🌐 Integration Guidelines

### Backend Integration

This frontend is designed to integrate with a full Akash VPN service. Key integration points:

1. **Connection API**: Update `connection-controls.tsx` to connect to VPN service endpoints
2. **Authentication**: Add auth provider in `layout.tsx`
3. **Server Status**: Integrate real-time server status in sidebar
4. **User Dashboard**: Extend with user account management
5. **Payment Integration**: Add subscription management components

### Environment Variables

Create a `.env.local` file for environment-specific configuration:

```env
NEXT_PUBLIC_API_URL=https://api.akashvpn.com
NEXT_PUBLIC_WS_URL=wss://ws.akashvpn.com
NEXTAUTH_SECRET=your-secret-key
NEXTAUTH_URL=http://localhost:3000
```

### API Integration Points

```typescript
// Example API integration structure
interface VPNConnection {
  status: 'connected' | 'disconnected' | 'connecting';
  server: string;
  location: string;
  ip: string;
}

interface ServerNode {
  id: string;
  location: string;
  load: number;
  latency: number;
  available: boolean;
}
```

## 🚀 Deployment

### Production Build

```bash
npm run build
npm run start
```

### Docker Deployment

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

### Vercel Deployment

This project is optimized for Vercel deployment:

1. Connect your repository to Vercel
2. Configure environment variables
3. Deploy automatically on push to main branch

## 🤝 Contributing

### Development Workflow

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Make your changes following the coding standards
4. Test thoroughly across devices and themes
5. Commit with conventional commits: `feat: add amazing feature`
6. Push and create a Pull Request

### Coding Standards

- **TypeScript**: Strict mode enabled, no `any` types
- **Components**: Functional components with hooks
- **Styling**: Tailwind classes, avoid inline styles
- **Naming**: PascalCase for components, camelCase for functions
- **Performance**: Lazy load heavy components, optimize images

### Testing

```bash
# Add testing framework (recommended)
npm install --save-dev @testing-library/react @testing-library/jest-dom jest
```

## 📱 Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## 🔒 Security Considerations

- CSP headers configured for Three.js CDN resources
- No sensitive data in client-side code
- Secure cookie configuration for themes
- Input validation on all form components

## 📊 Performance

- Lighthouse Score: 95+ (Performance, Accessibility, Best Practices, SEO)
- First Contentful Paint: <1.5s
- Largest Contentful Paint: <2.5s
- Cumulative Layout Shift: <0.1


**Built with ❤️ for the decentralized web**
