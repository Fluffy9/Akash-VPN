# Akash VPN Health Check Service

A dedicated microservice for monitoring VPN services (SoftEther and V2Ray) via TCP connectivity checks. Designed to run on Akash Network alongside VPN containers.

## 🎯 Purpose

This service solves the problem of monitoring VPN services that don't expose HTTP endpoints. It performs actual TCP connectivity checks on the VPN ports and exposes the results via an HTTP API for external monitoring tools like updown.io.

## 🏗️ Architecture

```
External Monitoring (updown.io)
         │
         ↓ HTTP GET /health
    Healthcheck Service
         ↓
    ┌────┴────┐
    ↓         ↓
softether  v2ray
 :5555     :1080
```

## ✨ Features

- ✅ **Real TCP Checks**: Actually connects to VPN ports, not just HTTP pings
- ✅ **Service Discovery**: Uses Akash's built-in DNS for service names
- ✅ **Configurable**: Environment variables for all settings
- ✅ **Secure**: Runs as non-root, minimal Alpine image
- ✅ **Observable**: Detailed health status with error messages
- ✅ **Standards-Compliant**: Returns HTTP 200/503 based on health

## 🚀 Quick Start

### Prerequisites
- Docker
- Node.js 18+ (for local testing)
- Akash CLI (for deployment)

### Local Testing
```bash
# Install dependencies
npm install

# Run tests
node test_tcp_connectivity.js

# Build Docker image
docker build -t akash-vpn-healthcheck:test .

# Run locally
docker run -p 3000:3000 akash-vpn-healthcheck:test

# Test endpoint
curl http://localhost:3000/health
```

### Deploy to Akash

1. **Build and push image:**
```bash
docker build -t your-registry/akash-vpn-healthcheck:1.0.0 .
docker push your-registry/akash-vpn-healthcheck:1.0.0
```

2. **Update `deploy.yml` with your image URL**

3. **Deploy:**
```bash
akash tx deployment create deploy.yml --from your-wallet --chain-id akashnet-2
```

4. **Configure monitoring:**
```bash
curl -X POST https://updown.io/api/checks \
  -H "X-API-KEY: $UPDOWN_API_KEY" \
  -d "url=https://your-lease-url/health" \
  -d "period=300"
```

## 📡 API Endpoints

### `GET /health`

Health check endpoint that tests VPN service connectivity.

**Response (Healthy - HTTP 200):**
```json
{
  "status": "healthy",
  "timestamp": "2025-11-03T12:00:00.000Z",
  "responseTime": "45ms",
  "services": [
    {
      "service": "SoftEther",
      "endpoint": "softether:5555",
      "status": "UP",
      "error": null
    },
    {
      "service": "V2Ray",
      "endpoint": "v2ray:1080",
      "status": "UP",
      "error": null
    }
  ]
}
```

**Response (Unhealthy - HTTP 503):**
```json
{
  "status": "unhealthy",
  "timestamp": "2025-11-03T12:00:00.000Z",
  "responseTime": "5023ms",
  "services": [
    {
      "service": "SoftEther",
      "endpoint": "softether:5555",
      "status": "DOWN",
      "error": "Connection timeout"
    },
    {
      "service": "V2Ray",
      "endpoint": "v2ray:1080",
      "status": "UP",
      "error": null
    }
  ]
}
```

### `GET /`

Service information endpoint.

**Response:**
```json
{
  "service": "VPN Healthcheck Service",
  "version": "1.0.0",
  "endpoints": {
    "health": "/health"
  }
}
```

## ⚙️ Configuration

All configuration is done via environment variables:

| Variable | Default | Description |
|----------|---------|-------------|
| `PORT` | `3000` | HTTP server port |
| `HEALTH_CHECK_TIMEOUT` | `5000` | TCP check timeout in milliseconds |
| `SOFTETHER_HOST` | `softether` | SoftEther service hostname |
| `SOFTETHER_PORT` | `5555` | SoftEther monitoring port |
| `V2RAY_HOST` | `v2ray` | V2Ray service hostname |
| `V2RAY_PORT` | `1080` | V2Ray monitoring port |

### Example Configuration

In `deploy.yml`:
```yaml
healthcheck:
  image: your-registry/akash-vpn-healthcheck:latest
  env:
    - PORT=3000
    - HEALTH_CHECK_TIMEOUT=10000
    - SOFTETHER_HOST=softether
    - V2RAY_HOST=v2ray
```

## 📁 Project Structure

```
.
├── healthcheck_service.ts    # Main service implementation
├── package.json               # Dependencies
├── tsconfig.json             # TypeScript config
├── Dockerfile                # Multi-stage Docker build
├── deploy.yml                # Akash deployment config
├── test_tcp_connectivity.js  # Testing utility
├── DEPLOYMENT_GUIDE.md       # Detailed deployment docs
├── FIX_SUMMARY.md           # Technical details
└── README.md                 # This file
```

## 🔒 Security

- **Non-root User**: Runs as `nodejs:nodejs` user
- **Minimal Image**: Alpine Linux base (~50MB)
- **No Secrets**: No credentials or sensitive data stored
- **Internal Ports**: VPN ports not exposed globally
- **Read-only**: No filesystem writes

## 🧪 Testing

### Test TCP Logic Locally
```bash
# Test against localhost
node test_tcp_connectivity.js localhost 80

# Test with default endpoints (will fail, shows logic works)
node test_tcp_connectivity.js
```

### Test Docker Container
```bash
# Build
docker build -t test .

# Run with custom config
docker run -p 3000:3000 \
  -e HEALTH_CHECK_TIMEOUT=10000 \
  test

# Test endpoint
curl -v http://localhost:3000/health
```

### Test on Akash
```bash
# Get lease URL
akash provider lease-status --dseq <dseq> --from <wallet>

# Test health endpoint
curl https://your-lease-url/health

# Check logs
akash provider lease-logs --dseq <dseq> --service healthcheck
```

## 🐛 Troubleshooting

### Services Show as DOWN

**Symptom**: All services return status "DOWN"

**Possible Causes**:
1. Service names don't match (check `deploy.yml`)
2. VPN services not running
3. Ports not properly exposed in SDL

**Solution**:
```bash
# Check service names resolve
akash provider lease-shell --dseq <dseq>
> ping softether
> ping v2ray

# Check if ports are listening
> nc -zv softether 5555
> nc -zv v2ray 1080
```

### Connection Timeout

**Symptom**: Error "Connection timeout" in response

**Possible Causes**:
1. VPN service is hung/crashed
2. Timeout too short for network conditions
3. Port not exposed in SDL

**Solution**:
- Check VPN service logs
- Increase `HEALTH_CHECK_TIMEOUT`
- Verify SDL port configuration

### DNS Resolution Fails

**Symptom**: Error "getaddrinfo EAI_AGAIN"

**Cause**: Service name doesn't exist

**Solution**: Verify service names in `deploy.yml` match exactly

## 📊 Monitoring with updown.io

### Basic Setup
```bash
export UPDOWN_API_KEY="your-key"
export HEALTHCHECK_URL="https://your-lease/health"

curl -X POST https://updown.io/api/checks \
  -H "X-API-KEY: $UPDOWN_API_KEY" \
  -d "url=$HEALTHCHECK_URL" \
  -d "period=300" \
  -d "alias=akash-vpn"
```

### Configure Alerts

1. Visit https://updown.io/checks
2. Click on your check
3. Add notifications:
   - Email
   - Slack/Discord webhook
   - SMS (paid plans)

### Recommended Settings

- **Check Frequency**: 5 minutes (free) or 1 minute (paid)
- **Alert After**: 2 failed checks (prevents false alarms)
- **Timeout**: 30 seconds
- **Apdex T**: 0.5 seconds

## 🚀 Production Recommendations

1. **Use Version Tags**: Not `:latest` in production
2. **Resource Allocation**: Monitor and adjust based on actual usage
3. **Alerting**: Set up multiple notification channels
4. **Monitoring**: Use updown.io paid plan for 1-minute checks
5. **Backup Monitoring**: Consider a secondary monitoring service

## 📝 Contributing

Issues and pull requests welcome! Please ensure:
- Code follows existing style
- Tests pass locally
- Documentation is updated
- Commit messages are clear

## 📄 License

MIT

## 🔗 Links

- [Akash Network](https://akash.network)
- [updown.io](https://updown.io)
- [SoftEther VPN](https://www.softether.org)
- [V2Ray](https://www.v2ray.com)

## 📞 Support

- **Documentation**: See `DEPLOYMENT_GUIDE.md` for detailed instructions
- **Issues**: Open an issue on GitHub
- **Akash Support**: https://docs.akash.network

---

