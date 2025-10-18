# Updown.io Integration Guide for Akash VPN

This guide walks you through setting up comprehensive uptime monitoring for your Akash VPN service using updown.io.

## Overview

The monitoring system consists of:

1. **Health Check API** - Backend endpoint that verifies VPN server connectivity
2. **Updown.io Monitoring** - External monitoring service that tracks uptime
3. **Status Display** - Frontend component showing real-time status to users
4. **Alerting** - Notifications when services go down

## Prerequisites

- Active updown.io account (free tier supports 2 checks)
- API key from https://updown.io/settings/edit
- Your Akash VPN frontend deployed and accessible

## Setup Instructions

### Step 1: Add Health Check API

Create the health check endpoint in your Next.js frontend:

```bash
mkdir -p frontend/src/app/health
```

Copy the `health/route.ts` file to `frontend/src/app/health/route.ts`

**Important**: Update the `loadVPNRegions()` function to match your actual `akashic-records.json` structure.

Example `akashic-records.json` structure:
```json
{
  "regions": [
    {
      "name": "Region 1 - US East",
      "hostname": "provider.akash.network",
      "location": "us-east",
      "port": 443
    },
    {
      "name": "Region 2 - EU West",
      "hostname": "provider2.akash.network",
      "location": "eu-west",
      "port": 443
    }
  ]
}
```

### Step 2: Configure Updown.io

1. Sign up at https://updown.io if you haven't already

2. Get your API key from https://updown.io/settings/edit

3. Run the setup script:

```bash
# Make it executable
chmod +x server/setup-down.sh
./server/setup-down.sh

# Set your configuration
export UPDOWN_API_KEY="your-api-key-here"
export FRONTEND_URL="https://your-frontend.akash.network"

# Run setup
./setup-updown.sh
```

This will create two checks:
- **Main Health Check**: Monitors `/health` endpoint (all regions)
- **Frontend Check**: Monitors main website availability

### Step 3: Configure Alerting

1. Go to https://updown.io/checks
2. Click on each check to configure:
   - **Email alerts**: Add your email
   - **Slack/Discord**: Add webhook URLs
   - **SMS**: Add phone number (paid plans)
   - **PagerDuty/OpsGenie**: Integrate with incident management

3. Set alert thresholds:
   - Alert after: 1-2 failed checks (recommended)
   - Check frequency: 5 minutes (free tier) or 1 minute (paid)

### Step 4: Add Status Component to Frontend

1. Copy the `StatusMonitor` component to your frontend:

```bash
# Option A: As a standalone page
cp StatusMonitor.tsx frontend/src/app/status/page.tsx

# Option B: Add to your main page
# Import and use <StatusMonitor /> in your existing layout
```

2. Update the component with your actual check tokens:

```typescript
const UPDOWN_CHECKS = {
  main: 'abcd1234',    // Replace with your health check token
  frontend: 'efgh5678', // Replace with your frontend check token
};
```

You can find tokens in the updown.io dashboard or in the setup script output.

3. (Optional) Add environment variable for API access:

```bash
# .env.local
NEXT_PUBLIC_UPDOWN_API_KEY=your-read-only-api-key
```

### Step 5: Deploy and Test

1. Rebuild and redeploy your frontend:

```bash
cd frontend
docker build -t your-docker-username/akash-vpn-frontend:latest .
docker push your-docker-username/akash-vpn-frontend:latest
```

2. Update your Akash deployment with the new image

3. Test the health endpoint:

```bash
curl https://your-frontend.akash.network/health
```

Expected response:
```json
{
  "status": "healthy",
  "timestamp": "2025-10-07T10:30:00.000Z",
  "regions": [
    {
      "name": "Region 1 - US East",
      "status": "up",
      "responseTime": 145
    }
  ]
}
```

4. Verify updown.io is monitoring:
   - Visit https://updown.io/checks
   - You should see your checks with green status
   - Click through to see metrics

## Advanced Configuration

### Add Region-Specific Monitoring

To monitor each VPN region independently:

```bash
# For each region, create a dedicated check
curl -X POST https://updown.io/api/checks \
  -H "X-API-KEY: $UPDOWN_API_KEY" \
  -d "url=https://region1.provider.akash.network" \
  -d "period=300" \
  -d "alias=akash-vpn-region1"
```

### Enable Public Status Page

1. Go to https://updown.io/checks
2. Click on a check → Settings
3. Enable "Public page"
4. Get the public URL (e.g., `https://updown.io/abcd`)
5. Link to it from your frontend

### Custom Webhooks

For advanced integrations, set up a webhook:

```bash
curl -X POST https://updown.io/api/checks/{TOKEN}/recipients/webhook \
  -H "X-API-KEY: $UPDOWN_API_KEY" \
  -d "url=https://your-webhook-endpoint.com/notify"
```

Webhook payload format:
```json
{
  "check": {
    "url": "https://your-site.com",
    "alias": "akash-vpn-health"
  },
  "downtime": {
    "started_at": "2025-10-07T10:00:00Z",
    "error": "Connection timeout"
  }
}
```

### Monitoring Best Practices

1. **Check Frequency**:
   - Critical services: 1-2 minutes (paid plans)
   - Standard services: 5 minutes (free tier)
   - Non-critical: 15-30 minutes

2. **Alert Thresholds**:
   - Alert after 1 failure for critical services
   - Alert after 2-3 failures for standard services
   - Prevents false alarms from network blips

3. **Maintenance Mode**:
   - Use "Mute until" feature during planned maintenance
   - Prevents unnecessary alerts

4. **Response Time Monitoring**:
   - Set Apdex threshold (default: 0.5s)
   - Get alerts for slow responses, not just downtime

## Troubleshooting

### Health Check Returns 503

- Verify `akashic-records.json` exists and is properly formatted
- Check that VPN server hostnames are correct
- Ensure servers are actually running on Akash

### Updown.io Not Receiving Data

- Verify frontend URL is correct and publicly accessible
- Check that health endpoint returns proper HTTP status codes
- Look at updown.io logs for specific errors

### Status Component Not Showing Data

- Check browser console for errors
- Verify check tokens are correct
- Ensure CORS is properly configured if using API directly

### False Positives

- Increase alert threshold to 2-3 failures
- Adjust check timeout (default: 30s)
- Verify network connectivity from updown.io monitoring locations

## Cost Estimates

**Updown.io Pricing**:
- **Hobby (Free)**: 2 checks, 5-minute frequency
- **Starter ($16/month)**: 10 checks, 1-minute frequency
- **Business ($48/month)**: 50 checks, 30-second frequency
- **Enterprise**: Custom pricing

**Recommended Setup**:
- Free tier: Main health check + frontend check
- Starter: Add per-region monitoring (up to 10 regions)
- Business: High-frequency checks for production systems

## Support

For issues specific to:
- **Updown.io**: https://updown.io/support
- **Akash Network**: https://akash.network/docs
- **This integration**: Open an issue on GitHub

## Next Steps

1. Set up monitoring for your production deployment
2. Configure Slack/email alerts
3. Add status component to your frontend
4. Consider enabling public status page
5. Monitor and adjust alert thresholds based on real-world data