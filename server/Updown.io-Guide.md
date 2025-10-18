# Updown.io Monitoring Setup

Simple setup for monitoring your Akash VPN infrastructure with Updown.io.

## Quick Setup

1. **Get your Updown.io API key** from https://updown.io/settings/edit

2. **Set environment variables as shown in the .env.example file**


3. **Run the monitoring setup:**
   ```bash
   ./server/setup-monitoring.sh
   ```

That's it! The script will:
- Monitor your VPN servers (V2Ray + SoftEther)
- Monitor your website uptime
- Create checks for each configured region
- Set up 1-hour monitoring intervals

## What Gets Monitored

- **VPN Servers**: Individual V2Ray and SoftEther services per region
- **Website**: Frontend availability
- **Health Endpoint**: Overall system health

## Configure Alerts

Visit https://updown.io/checks to:
- Add email/Slack notifications
- Set alert thresholds
- Enable public status pages

## Troubleshooting

- **Health endpoint returns 503**: Check that VPN server environment variables are set in your frontend deployment
- **No VPN server checks**: Ensure your `/api/regions` endpoint is accessible and returns valid data
- **Duplicate checks**: The script skips URLs that are already being monitored