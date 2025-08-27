# 🌐 Caddy Reverse Proxy Setup Guide

This guide covers the complete setup of Caddy as a reverse proxy for both local development and production environments.

## 📋 Architecture Overview

```
┌─────────────────────────────────────────────────┐
│                    Caddy                        │
│              Reverse Proxy                      │
│                                                 │
│  ┌─────────────┬─────────────┬─────────────┐    │
│  │   Port 80   │   Port 443  │ VPN Ports   │    │
│  │    HTTP     │   HTTPS     │ 992,1194,   │    │
│  │             │ (Auto TLS)  │ 500,4500    │    │
│  └─────────────┴─────────────┴─────────────┘    │
└─────────────────────────────────────────────────┘
                       │
        ┌──────────────┼──────────────┐
        │              │              │
   ┌────▼────┐    ┌───▼───┐    ┌─────▼─────┐
   │Frontend │    │ Docs  │    │   API     │
   │Next.js  │    │Docusa.│    │Express.js │
   │:3000    │    │:3000  │    │   :3000   │
   └─────────┘    └───────┘    └───────────┘
                                     │
                               ┌─────▼─────┐
                               │    VPN    │
                               │SoftEther  │
                               │:5555 etc. │
                               └───────────┘
```

## 🚀 Local Development Setup

### 1. Directory Structure

```
Akash-VPN/
├── Caddyfile.local          # Local development configuration
├── Caddyfile                # Production configuration
├── docker-compose.local.yml # Local development compose
├── docker-compose.prod.yml  # Production compose
└── test-proxy.sh           # Testing script
```

### 2. Local Configuration (`Caddyfile.local`)

**Main Features:**

- ✅ HTTP only (no TLS needed for localhost)
- ✅ Path-based routing on `localhost:80`
- ✅ Direct service access for debugging
- ✅ Health check endpoint

**Routing Table:**
| Path | Destination | Description |
|------|-------------|-------------|
| `/` | `frontend:3000` | Next.js frontend |
| `/docs*` | `docs:3000` | Docusaurus documentation |
| `/api*` | `backend:3000` | Express.js API |
| `/health` | Caddy response | Health check |

**Direct Access Ports:**
| Port | Service | Purpose |
|------|---------|---------|
| `3001` | Frontend | Direct frontend access |
| `3002` | Backend | Direct backend access |
| `3003` | Docs | Direct docs access |
| `5555` | VPN Admin | SoftEther admin interface |

### 3. Start Local Environment

```bash
# Start all services with Caddy proxy
docker-compose -f docker-compose.local.yml up --build

# Test the setup
./test-proxy.sh

# Access services
open http://localhost/           # Frontend
open http://localhost/docs       # Documentation
open http://localhost/health     # Health check
```

## 🌍 Production Setup

### 1. Production Configuration (`Caddyfile`)

**Main Features:**

- ✅ Automatic HTTPS with Let's Encrypt
- ✅ Security headers (HSTS, XSS protection, etc.)
- ✅ Proper proxy headers
- ✅ Path-based routing on your domain

**Security Headers:**

- `Strict-Transport-Security` (HSTS)
- `X-Content-Type-Options`
- `X-Frame-Options`
- `X-XSS-Protection`
- `Referrer-Policy`

### 2. Production Deployment

```bash
# 1. Update domain in Caddyfile
sed -i 's/your-domain.com/youractual.domain.com/g' Caddyfile

# 2. Update image references in docker-compose.prod.yml
sed -i 's/your-username/yourgithub/g' docker-compose.prod.yml

# 3. Deploy
docker-compose -f docker-compose.prod.yml up -d

# 4. Check HTTPS certificates
curl -v https://youractual.domain.com/health
```

## ✅ Testing Checklist

| Check                | Command                            | Expected Result            | ✅  |
| -------------------- | ---------------------------------- | -------------------------- | --- |
| **Frontend routing** | `curl http://localhost/`           | HTTP 200, Next.js app      | ⬜  |
| **Docs routing**     | `curl http://localhost/docs`       | HTTP 200, Docusaurus       | ⬜  |
| **API routing**      | `curl http://localhost/api/health` | HTTP 200/404, API response | ⬜  |
| **Health check**     | `curl http://localhost/health`     | "Caddy is running"         | ⬜  |
| **VPN ports**        | `nc -z localhost 992`              | Connection successful      | ⬜  |
| **Docker health**    | `docker ps`                        | All containers running     | ⬜  |
| **TLS (prod)**       | `curl -v https://domain.com/`      | Valid SSL certificate      | ⬜  |

### Automated Testing

```bash
# Run comprehensive test suite
./test-proxy.sh

# Manual testing commands
curl -I http://localhost/                    # Frontend
curl -I http://localhost/docs                # Docs
curl -I http://localhost/api/health          # API
curl http://localhost/health                 # Health check

# Test direct service access
curl -I http://localhost:3001/               # Direct frontend
curl -I http://localhost:3002/               # Direct backend
curl -I http://localhost:3003/               # Direct docs
curl -I http://localhost:5555/               # VPN admin
```

## 🔧 Configuration Details

### Local Development Features

1. **Service Discovery**: All services communicate via Docker network
2. **Volume Mounting**: Live code reloading for all services
3. **Port Mapping**: Direct access to services for debugging
4. **No TLS**: HTTP only for faster local development

### Production Features

1. **Automatic HTTPS**: Let's Encrypt certificates
2. **Security Headers**: Comprehensive security configuration
3. **Proxy Headers**: Proper forwarding of client information
4. **Health Monitoring**: Built-in health checks

### VPN Service Integration

**Exposed Ports:**

- `992` - SoftEther VPN Server (TCP)
- `1194` - OpenVPN (UDP)
- `500` - IPsec IKE (UDP)
- `4500` - IPsec NAT-T (UDP)

**Admin Interface:**

- Local: `http://localhost:5555/` (via Caddy)
- Production: Secured with basic auth (optional)

## 🚨 Security Considerations

### Local Development

- ⚠️ Services exposed on multiple ports for debugging
- ⚠️ No authentication on admin interfaces
- ✅ Isolated Docker network

### Production

- ✅ All services behind reverse proxy
- ✅ HTTPS enforced with HSTS
- ✅ Security headers configured
- ✅ VPN admin interface can be secured with basic auth
- ⚠️ Consider IP whitelisting for admin access

## 🔍 Troubleshooting

### Common Issues

1. **Service not responding**

   ```bash
   docker-compose logs caddy
   docker-compose logs frontend
   ```

2. **Port conflicts**

   ```bash
   netstat -tulpn | grep :80
   docker-compose down && docker-compose up
   ```

3. **DNS issues (production)**

   ```bash
   nslookup yourdomain.com
   dig yourdomain.com A
   ```

4. **Certificate issues**
   ```bash
   docker-compose exec caddy caddy list-certificates
   ```

### Log Analysis

```bash
# View Caddy logs
docker-compose logs -f caddy

# View all service logs
docker-compose logs -f

# Check individual service
docker-compose logs frontend
docker-compose logs backend
docker-compose logs docs
docker-compose logs vpn
```

## 🎯 Next Steps

1. ✅ **Test locally** with `./test-proxy.sh`
2. ✅ **Configure domain** in production Caddyfile
3. ✅ **Deploy to production** environment
4. ✅ **Verify HTTPS** certificates
5. ✅ **Test VPN connections** with actual VPN clients
6. 🔄 **Monitor logs** and performance
7. 🔄 **Set up monitoring** and alerting
