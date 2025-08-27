# Akash VPN - Comprehensive Codebase Documentation

## 🏗️ Architecture Overview

Akash VPN is a **decentralized VPN service** built on the Akash Network, featuring a modern web interface and containerized architecture. The project consists of four main components designed to work together as a complete VPN-as-a-Service solution.

## 📁 Project Structure

```
Akash-VPN/
├── frontend/           # Next.js web application with VPN controls
├── server/            # Express.js API server
├── akash-vpn-docs/    # Docusaurus documentation site
├── vpn/               # VPN configuration and research
├── scopes/            # Project scope and task definitions
└── doc.md            # This comprehensive documentation
```

## 🎯 Core Components

### 1. Frontend (`/frontend/`)

**Technology Stack**: Next.js 15.4.6, React 19, TypeScript, Tailwind CSS 4, Radix UI

**Key Features**:

- **Modern UI**: Clean, responsive design with dark/light theme support
- **3D Globe Visualization**: Interactive earth globe using Three.js and three-globe
- **Connection Controls**: VPN connect/disconnect interface with visual feedback
- **Mobile Responsive**: Dedicated mobile navigation and responsive layout
- **Component Library**: Reusable UI components built with Radix UI primitives

**Main Components**:

- `src/app/page.tsx` - Main landing page with globe and connection controls
- `src/components/connection-controls.tsx` - VPN connection toggle interface
- `src/components/earth-globe.tsx` - 3D interactive earth visualization
- `src/components/sidebar.tsx` - Desktop navigation sidebar
- `src/components/mobile-nav.tsx` - Mobile navigation menu
- `src/components/benefits-section.tsx` - Marketing/benefits section

**Dependencies**:

- **UI Framework**: Next.js with React 19
- **Styling**: Tailwind CSS 4 with custom animations
- **3D Graphics**: Three.js for globe visualization
- **UI Components**: Radix UI for accessible primitives
- **Animations**: Anime.js for smooth animations
- **Icons**: Lucide React icons

### 2. Server (`/server/`)

**Technology Stack**: Express.js 4.16.1, Node.js, Jade templating

**Architecture**:

- **Basic Express Server**: Standard Express.js setup with middleware
- **Template Engine**: Jade for server-side rendering
- **Routes**: Basic routing structure with index and users routes
- **Testing Files**: Includes test files for VPN connection/disconnection

**Files**:

- `app.js` - Main Express application setup
- `routes/index.js` - Main route handlers
- `routes/users.js` - User-related routes
- `test-connect.js` - VPN connection testing
- `test-disconnect.js` - VPN disconnection testing
- `test.js` - General testing utilities

**Current State**: Basic Express scaffold - requires VPN integration implementation

### 3. Documentation (`/akash-vpn-docs/`)

**Technology Stack**: Docusaurus, TypeScript, React

**Content Structure**:

- **FAQ Section**: Comprehensive user questions and answers
- **Tutorial Basics**: Getting started guides (using Docusaurus defaults)
- **Blog System**: Built-in blog for updates and announcements
- **Interactive Features**: Search, versioning, and localization ready

**Key Documentation Files**:

- `docs/intro.md` - Welcome page explaining Akash VPN concept
- `docs/faq.md` - 15+ frequently asked questions covering:
  - What is a VPN and Akash Network
  - Server locations (US, Spain, Germany, Romania, Switzerland)
  - Privacy policy and no-logs commitment
  - Free vs paid tiers
  - Connection troubleshooting
  - Support via Discord

**Features**:

- **Modern Documentation**: Clean, searchable interface
- **Responsive Design**: Works on all devices
- **Blog Integration**: Ready for project updates
- **Customizable**: Easy to extend and modify

### 4. VPN Configuration (`/vpn/`)

**Research and Implementation Notes**:

**Key Findings from `VPNConfigGeneratorResearch.md`**:

- **SoftEther VPN Integration**: Research shows successful connection to SoftEther VPN servers
- **User Management**: Dynamic user creation during runtime is possible
- **Connection Method**: Connects via specific endpoints (e.g., `provider.ingress.europlots.com:30435`)
- **Authentication**: Both HUB and ADMIN password authentication tested
- **Anonymous Users**: Option to enable anonymous connections
- **Certificate Sharing**: Server certificates can be shared across users

**Technical Implementation Details**:

- **Mass User Generation**: Possible by modifying launch scripts
- **Runtime User Creation**: Proven working with commands like `UserCreate` and `UserPasswordSet`
- **Connection String Format**: Uses format `hostname:port` for connections
- **Hub Management**: Uses DEFAULT hub with configurable passwords

## 🔄 Workflow & CI/CD Implementation

### GitHub Actions Workflow (`.github/workflows/build.yml`)

The project implements a **comprehensive CI/CD pipeline** with the following features:

**Pipeline Stages**:

1. **Change Detection**: Uses `dorny/paths-filter` to detect changes in specific directories
2. **Multi-Service Builds**: Parallel builds for frontend, backend, and documentation
3. **Security Scanning**: Trivy vulnerability scanning on all container images
4. **Multi-Architecture Support**: Builds for both `linux/amd64` and `linux/arm64`
5. **Container Registry**: Pushes images to GitHub Container Registry (`ghcr.io`)

**Workflow Triggers**:

- Push to `main` or `develop` branches
- Pull requests to `main`
- Manual workflow dispatch

**Build Process**:

```yaml
# Example build job structure
build-frontend:
  - Checkout code
  - Setup Docker Buildx with QEMU
  - Login to GitHub Container Registry
  - Extract metadata for tagging
  - Build and push multi-arch container
  - Cache layers for faster builds
```

**Security Features**:

- **Vulnerability Scanning**: Trivy scans all built images
- **SARIF Upload**: Security results uploaded to GitHub Security tab
- **Non-Root Containers**: All Dockerfiles use non-root users
- **Health Checks**: Built-in health monitoring

**Deployment Automation**:

- **Staging**: Auto-deploy from `develop` branch
- **Production**: Auto-deploy from `main` branch
- **Cleanup**: Automatic old image cleanup

## 🐳 Local Development Setup

### Option 1: Individual Service Development (Recommended for Development)

**Prerequisites**:

```bash
# Install Node.js
node --version
npm --version
```

**Frontend Development**:

```bash
cd frontend/
npm install
npm run dev     # Runs on http://localhost:3000 with Turbo
```

**Backend Development**:

```bash
cd server/
npm install
npm start       # Runs on http://localhost:3000
```

**Documentation Development**:

```bash
cd akash-vpn-docs/
npm install
npm start       # Runs on http://localhost:3000
npm run build   # Build static site
```

### Option 2: Docker Compose Local Development

**Using the Local Docker Compose**:
Make sure Docker Desktop is running: open it manually if needed.

```bash
# Build and run all services locally
docker-compose -f docker-compose.local.yml up --build

# Run in detached mode.
# "Detached" mode — runs containers in the background (you don’t see logs in the terminal).
docker-compose -f docker-compose.local.yml up -d --build

# View logs
docker-compose -f docker-compose.local.yml logs -f

# Stop services
docker-compose -f docker-compose.local.yml down
```

**Local Service URLs**:

- **Frontend**: http://localhost:3000
- **Backend**: http://localhost:3001
- **Documentation**: http://localhost:3002
- **VPN Service**: Multiple ports (80, 443, 992, 5555, etc.)

**Local Development Features**:

- **Live Reloading**: Code changes trigger automatic rebuilds
- **Volume Mounting**: Local code changes reflected immediately
- **Service Communication**: All services can communicate via internal network
- **VPN Testing**: SoftEther VPN available for local testing

## 🌐 Production Deployment Options

### Option 1: Docker Compose Production

**Using Production Docker Compose**:

```bash
# Pull latest images and deploy
docker-compose -f docker-compose.prod.yml pull
docker-compose -f docker-compose.prod.yml up -d

# Update specific service
docker-compose -f docker-compose.prod.yml up -d frontend
```

**Production Features**:

- **Pre-built Images**: Uses images from GitHub Container Registry
- **Reverse Proxy**: Caddy handles routing and TLS termination
- **Health Monitoring**: Container restart policies
- **Persistent Volumes**: Data persistence for Caddy certificates

**Caddy Configuration** (`Caddyfile`):

```caddyfile
# Automatic HTTPS with Let's Encrypt
your-domain.com {
    reverse_proxy frontend:3000
}

docs.your-domain.com {
    reverse_proxy docs:80
}

api.your-domain.com {
    reverse_proxy backend:3000
}
```

### Option 2: Akash Network Deployment

**Individual Service SDL Files**:

- `deploy.yml` - Complete multi-service deployment
- `frontend/deploy.yml` - Frontend-only deployment
- `akash-vpn-docs/deploy.yml` - Documentation-only deployment
- `vpn/deploy.yml` - VPN-only deployment

**Complete Multi-Service Akash Deployment** (`deploy.yml`):

```yaml
services:
  # SoftEther VPN with multiple ports
  softether:
    image: andrey01/softether:4.38-9760-2
    expose: [80, 443, 992, 5555, 1194/udp, 500/udp, 4500/udp]

  # Next.js Frontend
  frontend:
    image: rodrirr/akashvpn-frontend:latest
    expose: [3000->80]

  # Docusaurus Documentation
  docs:
    image: rodrirr/akashvpn-docs:latest
    expose: [80]

profiles:
  compute:
    softether-profile: { cpu: 1.0, memory: 512Mi, storage: 512Mi }
    frontend-profile: { cpu: 0.5, memory: 512Mi, storage: 512Mi }
    docs-profile: { cpu: 0.5, memory: 256Mi, storage: 512Mi }
```

**Deployment Commands**:

```bash
# Deploy to Akash Network
akash tx deployment create deploy.yml --from your-wallet

# Check deployment status
akash query deployment list --owner your-address

# Get service URLs
akash provider lease-status --dseq DEPLOYMENT_SEQ
```

## 🔧 Service Communication & Integration

### Local Development Communication

**Network Configuration**:

- **Docker Network**: `akash-vpn-network` connects all services
- **Service Discovery**: Services communicate using container names
- **Port Mapping**: Each service exposed on different ports

**Frontend ↔ Backend Integration**:

```typescript
// Frontend API calls (Next.js)
const API_BASE_URL =
  process.env.NODE_ENV === "production"
    ? "https://api.your-domain.com"
    : "http://localhost:3001";

// Example API call
const connectVPN = async () => {
  const response = await fetch(`${API_BASE_URL}/api/vpn/connect`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ server: "us-east-1" }),
  });
  return response.json();
};
```

**Backend ↔ VPN Integration** (Needs Implementation):

```javascript
// server/routes/vpn.js (Example structure needed)
const express = require("express");
const router = express.Router();

// Connect to VPN endpoint
router.post("/connect", async (req, res) => {
  try {
    // Implementation needed: Connect to SoftEther VPN
    // Use VPN management commands from research
    const result = await vpnService.connect(req.body.server);
    res.json({ success: true, connection: result });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
```

### Production Communication

**Reverse Proxy Routing**:

```
Internet → Caddy Proxy → {
  / → Frontend (Next.js)
  /docs → Documentation (Docusaurus)
  /api → Backend (Express.js)
  VPN Ports → SoftEther VPN
}
```

**Environment Variables**:

```bash
# Production environment setup
NODE_ENV=production
API_URL=https://api.your-domain.com
DOCS_URL=https://docs.your-domain.com
VPN_SERVER_HOST=your-domain.com
VPN_SERVER_PORTS=992,5555,1194,500,4500
```

## 🚀 Complete Setup Guide

### Step 1: Clone and Initial Setup

```bash
# Clone the repository
git clone https://github.com/Fluffy9/Akash-VPN
cd Akash-VPN

# Install dependencies for all services
cd frontend && npm install && cd ..
cd server && npm install && cd ..
cd akash-vpn-docs && npm install && cd ..
```

### Step 2: Local Development Setup

```bash
# Option A: Run services individually (recommended for development)
# Terminal 1: Frontend
cd frontend && npm run dev

# Terminal 2: Backend
cd server && npm start

# Terminal 3: Documentation
cd akash-vpn-docs && npm start

# Option B: Use Docker Compose (recommended for testing)
docker-compose -f docker-compose.local.yml up --build
```

### Step 3: Production Deployment

**For Docker Compose Deployment**:

```bash
# 1. Update Caddyfile with your domain
# 2. Update docker-compose.prod.yml image references
# 3. Deploy
docker-compose -f docker-compose.prod.yml up -d
```

**For Akash Network Deployment**:

```bash
# 1. Install Akash CLI
# 2. Create wallet and fund with AKT tokens
# 3. Update deploy.yml with your image references
# 4. Deploy to Akash
akash tx deployment create deploy.yml --from your-wallet
```

## 🐳 Containerization Status

All components have Dockerfile configurations:

- **Frontend**: `frontend/Dockerfile` - Next.js production build
- **Server**: `server/Dockerfile` - Express.js application
- **Documentation**: `akash-vpn-docs/Dockerfile` - Docusaurus static site
- **Deployment**: `deploy.yml` files for various components

## 🌐 Target Deployment Architecture

```
┌─────────────────────────────────────┐
│          Reverse Proxy              │
│         (Caddy/Traefik)             │
│    ┌─────────────────────────────┐   │
│    │     TLS Termination         │   │
│    │    (Let's Encrypt)          │   │
│    └─────────────────────────────┘   │
└─────────────────────────────────────┘
                    │
        ┌───────────┼───────────┐
        │           │           │
   ┌────▼────┐ ┌───▼───┐ ┌─────▼─────┐
   │Frontend │ │ Docs  │ │API Server │
   │Next.js  │ │Docusa.│ │Express.js │
   └─────────┘ └───────┘ └───────────┘
                              │
                        ┌─────▼─────┐
                        │    VPN    │
                        │SoftEther  │
                        └───────────┘
```

## 📋 Current Deployment Status

### ✅ Ready for Deployment

- **Containerization**: All services have working Dockerfiles
- **CI/CD Pipeline**: Automated builds and security scanning
- **Service Discovery**: Docker Compose networking configured
- **SSL/TLS**: Caddy automatic HTTPS setup
- **Multi-Architecture**: ARM64 and AMD64 support

## 🔐 Security & Privacy Features

- **No-Logs Policy**: Explicitly documented commitment to privacy
- **Decentralized Infrastructure**: Reduces single points of failure
- **Multiple Server Locations**: Global coverage across 5 countries
- **TLS Encryption**: End-to-end encrypted connections
- **Open Source**: Transparent, auditable codebase

## 🎯 Unique Value Proposition

1. **Decentralized**: Built on Akash Network for censorship resistance
2. **Modern UI**: Beautiful, responsive web interface with 3D visualization
3. **Transparent**: Open-source with comprehensive documentation
4. **Global**: Multiple server locations with room for expansion
5. **Flexible**: Both free and paid tiers available
6. **Community-Driven**: Discord support and open collaboration
