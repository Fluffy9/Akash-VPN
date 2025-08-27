# 🌐 Akash VPN - Decentralized VPN Service

[![Docker](https://img.shields.io/badge/Docker-Ready-blue?logo=docker)](https://docker.com)
[![Next.js](https://img.shields.io/badge/Next.js-15.4.6-black?logo=next.js)](https://nextjs.org)
[![Node.js](https://img.shields.io/badge/Node.js-20+-green?logo=node.js)](https://nodejs.org)
[![Caddy](https://img.shields.io/badge/Caddy-2.0-blue?logo=caddy)](https://caddyserver.com)
[![License](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

A modern, decentralized VPN service built on the Akash Network featuring a beautiful web interface, comprehensive documentation, and enterprise-grade infrastructure.

## 📋 Table of Contents

- [🎯 Overview](#-overview)
- [✨ Features](#-features)
- [🏗️ Architecture](#️-architecture)
- [🚀 Quick Start](#-quick-start)
- [🛠️ Local Development](#️-local-development)
- [🌍 Production Deployment](#-production-deployment)
- [📊 Service Overview](#-service-overview)
- [🧪 Testing](#-testing)
- [🔧 Configuration](#-configuration)
- [📚 Documentation](#-documentation)
- [🤝 Contributing](#-contributing)

## 🎯 Overview

Akash VPN is a **decentralized VPN-as-a-Service** that provides:

- 🔐 **Privacy-focused**: No-logs policy with decentralized infrastructure
- 🌍 **Global coverage**: Multiple server locations across 5+ countries
- 💻 **Modern interface**: Beautiful Next.js web application with 3D globe visualization
- 🐳 **Containerized**: Complete Docker setup for easy deployment
- 🔒 **Secure**: Automatic HTTPS with Let's Encrypt and comprehensive security headers
- ⚡ **Fast**: Built on Akash Network's decentralized cloud infrastructure

## ✨ Features

### Frontend Features

- **Interactive 3D Globe**: Three.js powered earth visualization
- **VPN Connection Controls**: One-click connect/disconnect interface
- **Responsive Design**: Works perfectly on desktop and mobile
- **Dark/Light Theme**: Automatic theme switching
- **Real-time Status**: Live connection status and server information

### Backend Features

- **SoftEther VPN Server**: Enterprise-grade VPN implementation
- **Multiple Protocols**: OpenVPN, IPsec, L2TP support
- **Dynamic User Management**: Runtime user creation and management
- **API Ready**: Express.js backend prepared for VPN control APIs

### Infrastructure Features

- **Reverse Proxy**: Caddy with automatic HTTPS and security headers
- **Service Discovery**: Docker networking with internal communication
- **Health Monitoring**: Built-in health checks and status endpoints
- **CI/CD Ready**: GitHub Actions with multi-arch builds and security scanning

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────┐
│                    Internet                     │
└─────────────────┬───────────────────────────────┘
                  │
┌─────────────────▼───────────────────────────────┐
│                Caddy Reverse Proxy              │
│        (Port 80/443 - Automatic HTTPS)         │
│                                                 │
│  Routes: / → Frontend                          │
│         /docs → Documentation                   │
│         /api/* → Backend API                    │
│         /health → Health Check                  │
└─────────────────┬───────────────────────────────┘
                  │
    ┌─────────────┼─────────────┐
    │             │             │
┌───▼───┐    ┌───▼───┐    ┌────▼────┐
│Frontend│    │ Docs  │    │Backend  │
│Next.js │    │Docusa.│    │Express  │
│:3000   │    │:3000  │    │:3000    │
└────────┘    └───────┘    └─────┬───┘
                                 │
                        ┌────────▼────────┐
                        │   VPN Service   │
                        │   SoftEther     │
                        │ :992,1194,etc.  │
                        └─────────────────┘
```

## 🚀 Quick Start

### Prerequisites

- **Docker** 20.10+ and **Docker Compose** 2.0+
- **Node.js** 20+ (for local development)
- **Git** for cloning the repository

### 1. Clone the Repository

```bash
git clone https://github.com/Fluffy9/Akash-VPN
cd Akash-VPN
```

### 2. Start All Services (Easiest)

```bash
# Start the complete stack locally with reverse proxy
docker-compose -f docker-compose.local.yml up -d --build
```

### 3. Access Services

- **🌐 Main Application**: http://localhost/
- **📚 Documentation**: http://localhost/docs
- **❤️ Health Check**: http://localhost/health
- **🔌 API**: http://localhost/api/\*

### 4. Test Everything

```bash
# Run comprehensive tests
./test-proxy.sh
```

**Expected Results:**

```
✅ Frontend (root path)... OK (HTTP 200)
✅ Documentation (/docs path)... OK (HTTP 200)
✅ Backend API (/api path)... OK (HTTP 404)
✅ Health check endpoint... OK (HTTP 200)
✅ All VPN ports... Open
```

## 🛠️ Local Development

### Option 1: Individual Services (Recommended for Development)

**Terminal 1 - Frontend:**

```bash
cd frontend/
npm install
npm run dev     # http://localhost:3000
```

**Terminal 2 - Backend:**

```bash
cd server/
npm install
npm start       # http://localhost:3000
```

**Terminal 3 - Documentation:**

```bash
cd akash-vpn-docs/
npm install
npm start       # http://localhost:3000
```

### Option 2: Docker Compose (Recommended for Testing)

```bash
# Start all services with hot reloading
docker-compose -f docker-compose.local.yml up --build

# Start in background
docker-compose -f docker-compose.local.yml up -d --build

# View logs
docker-compose -f docker-compose.local.yml logs -f

# Stop services
docker-compose -f docker-compose.local.yml down
```

### Development URLs

| Service  | Direct Access           | Via Proxy                 | Purpose             |
| -------- | ----------------------- | ------------------------- | ------------------- |
| Frontend | `http://localhost:3000` | `http://localhost/`       | Next.js development |
| Backend  | `http://localhost:3000` | `http://localhost/api/*`  | Express.js API      |
| Docs     | `http://localhost:3000` | `http://localhost/docs`   | Docusaurus site     |
| Caddy    | -                       | `http://localhost/health` | Reverse proxy       |

## 🌍 Production Deployment

### Option 1: Docker Compose Production

#### 1. Configure Your Domain

```bash
# Update Caddyfile with your actual domain
sed -i 's/your-domain.com/youractual.domain.com/g' Caddyfile
```

#### 2. Build and Push Images (Optional)

```bash
# The CI/CD pipeline will build and push images automatically
# Or build manually:
docker build -t your-registry/akash-vpn-frontend:latest ./frontend
docker build -t your-registry/akash-vpn-backend:latest ./server
docker build -t your-registry/akash-vpn-docs:latest ./akash-vpn-docs
```

#### 3. Update Production Compose

```bash
# Update image references
sed -i 's/ghcr.io\/your-username/your-registry/g' docker-compose.prod.yml
```

#### 4. Deploy

```bash
# Deploy to production
docker-compose -f docker-compose.prod.yml up -d

# Check status
docker-compose -f docker-compose.prod.yml ps

# View logs
docker-compose -f docker-compose.prod.yml logs -f
```

#### 5. Verify HTTPS

```bash
# Check SSL certificate
curl -v https://yourdomain.com/health

# Should return: HTTP 200 with valid SSL certificate
```

### Option 2: Akash Network Deployment

#### 1. Install Akash CLI

```bash
# Follow installation guide at https://docs.akash.network/cli
curl -sSfL https://raw.githubusercontent.com/akash-network/provider/main/install.sh | sh
```

#### 2. Create Wallet and Fund with AKT

```bash
akash keys add wallet
akash tx bank send [faucet-address] [your-address] 5000000uakt
```

#### 3. Deploy to Akash

```bash
# Update SDL with your images
sed -i 's/rodrirr/your-username/g' deploy.yml

# Create deployment
akash tx deployment create deploy.yml --from wallet

# Check deployment
akash query deployment list --owner [your-address]

# Get service URLs
akash provider lease-status --dseq [deployment-sequence]
```

## 📊 Service Overview

### Frontend Service (`/frontend/`)

- **Technology**: Next.js 15.4.6, React 19, TypeScript, Tailwind CSS 4
- **Port**: 3000 (internal)
- **Features**: 3D globe, VPN controls, responsive design
- **Build**: `npm run build` → Production optimized bundle

### Backend Service (`/server/`)

- **Technology**: Express.js 4.16.1, Node.js 20
- **Port**: 3000 (internal)
- **Features**: API endpoints, VPN management (to be implemented)
- **Build**: Standard Express.js server

### Documentation Service (`/akash-vpn-docs/`)

- **Technology**: Docusaurus, TypeScript, React
- **Port**: 3000 (internal) / 80 (production)
- **Features**: Interactive docs, blog, search
- **Build**: `npm run build` → Static site generation

### VPN Service (`/vpn/`)

- **Technology**: SoftEther VPN Server
- **Ports**: 992 (admin), 1194 (OpenVPN), 500/4500 (IPsec)
- **Features**: Multi-protocol VPN, user management
- **Image**: `andrey01/softether:4.38-9760-2`

### Reverse Proxy (`caddy`)

- **Technology**: Caddy 2.0
- **Ports**: 80 (HTTP), 443 (HTTPS)
- **Features**: Automatic HTTPS, security headers, load balancing
- **Config**: `Caddyfile` (production) / `Caddyfile.local` (development)

## 🧪 Testing

### Automated Testing

```bash
# Run complete test suite
./test-proxy.sh

# Manual endpoint testing
curl http://localhost/                    # Frontend
curl http://localhost/docs               # Documentation
curl http://localhost/api/health         # API
curl http://localhost/health             # Proxy health

# Test VPN ports
nc -zv localhost 992                     # SoftEther
nc -zuv localhost 1194                   # OpenVPN
nc -zuv localhost 500                    # IPsec IKE
nc -zuv localhost 4500                   # IPsec NAT-T
```

### Expected Test Results

```
🔧 Testing Akash VPN Caddy Reverse Proxy Setup
=================================================

📋 Checking Docker containers...
✅ All 5 containers running

🌐 Testing HTTP endpoints...
✅ Frontend (root path)... OK (HTTP 200)
✅ Documentation (/docs path)... OK (HTTP 200)
✅ Backend API (/api path)... OK (HTTP 404) [Expected - no endpoints yet]
✅ Health check endpoint... OK (HTTP 200)

🔒 Testing VPN service ports...
✅ SoftEther VPN port (992)... Open
✅ OpenVPN UDP port (1194)... Open
✅ IPsec IKE port (500)... Open
✅ IPsec NAT-T port (4500)... Open

🎯 Test completed!
```

### Troubleshooting

#### Services Not Starting

```bash
# Check logs
docker-compose -f docker-compose.local.yml logs [service-name]

# Restart specific service
docker-compose -f docker-compose.local.yml restart [service-name]
```

#### Port Conflicts

```bash
# Check what's using port 80
netstat -tulpn | grep :80

# Stop conflicting services
sudo systemctl stop apache2  # or nginx
```

#### TypeScript Errors

```bash
# Frontend
cd frontend && npm run lint

# Check types
npx tsc --noEmit
```

## 🔧 Configuration

### Environment Variables

#### Local Development

```bash
# Automatic via docker-compose.local.yml
NODE_ENV=development
NEXT_TELEMETRY_DISABLED=1
WATCHPACK_POLLING=true
```

#### Production

```bash
# Set in docker-compose.prod.yml or environment
NODE_ENV=production
API_URL=https://api.yourdomain.com
DOCS_URL=https://docs.yourdomain.com
VPN_SERVER_HOST=yourdomain.com
```

### Caddy Configuration

#### Local (`Caddyfile.local`)

- HTTP only (no TLS)
- Path-based routing on localhost
- Direct service access ports for debugging

#### Production (`Caddyfile`)

- Automatic HTTPS with Let's Encrypt
- Security headers (HSTS, XSS protection, etc.)
- Proper proxy headers
- Optional basic auth for admin interfaces

### VPN Configuration

#### Connection Methods

- **SoftEther**: `hostname:992`
- **OpenVPN**: `hostname:1194/udp`
- **IPsec**: `hostname:500/udp` and `hostname:4500/udp`

#### User Management

```bash
# Create user (via SoftEther admin)
UserCreate username /GROUP:none /REALNAME:none /NOTE:none
UserPasswordSet username /PASSWORD:password
```

## 📚 Documentation

### Available Documentation

- **User Guide**: `/akash-vpn-docs/docs/faq.md` - Comprehensive FAQ
- **Setup Guide**: `PROXY-SETUP.md` - Detailed proxy configuration
- **Status Report**: `PROXY-STATUS.md` - Current implementation status
- **Architecture**: `doc.md` - Technical architecture overview

### Documentation Development

```bash
cd akash-vpn-docs/
npm start                 # Development server
npm run build            # Build static site
npm run serve            # Serve built site
```

## 🔮 Roadmap

### Phase 1: Core Infrastructure ✅

- [x] Frontend application with 3D globe
- [x] Backend API structure
- [x] Documentation site
- [x] Reverse proxy setup
- [x] Docker containerization
- [x] CI/CD pipeline

### Phase 2: VPN Integration 🔄

- [ ] Backend API implementation
- [ ] VPN server management
- [ ] User authentication system
- [ ] Connection state management
- [ ] Server selection interface

### Phase 3: Advanced Features 🔄

- [ ] Multiple server locations
- [ ] Usage analytics
- [ ] Payment integration (crypto/fiat)
- [ ] Mobile applications
- [ ] Monitoring and alerting

### Phase 4: Scale & Optimize 🔄

- [ ] Load balancing
- [ ] Auto-scaling
- [ ] Performance optimization
- [ ] Advanced security features
- [ ] Enterprise features

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

### Development Workflow

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Make your changes
4. Run tests: `./test-proxy.sh`
5. Commit changes: `git commit -m 'Add amazing feature'`
6. Push to branch: `git push origin feature/amazing-feature`
7. Open a Pull Request

### Code Standards

- **Frontend**: ESLint + Prettier with Next.js rules
- **Backend**: ESLint with Express.js best practices
- **Documentation**: Markdown with consistent formatting
- **Docker**: Multi-stage builds with security best practices

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

- **Issues**: [GitHub Issues](https://github.com/Fluffy9/Akash-VPN/issues)
- **Discussions**: [GitHub Discussions](https://github.com/Fluffy9/Akash-VPN/discussions)
- **Discord**: [Join our community](https://discord.gg/JKGjJUHB)

## 🏆 Acknowledgments

- [Akash Network](https://akash.network) - Decentralized cloud infrastructure
- [SoftEther VPN](https://www.softether.org/) - VPN server implementation
- [Caddy](https://caddyserver.com) - Modern reverse proxy
- [Next.js](https://nextjs.org) - React framework
- [Docusaurus](https://docusaurus.io) - Documentation platform

---
