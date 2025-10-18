#!/bin/bash
# setup-monitoring.sh
# Unified script to configure comprehensive Updown.io monitoring for Akash VPN

set -e

echo "==================================="
echo "Akash VPN Comprehensive Monitoring Setup"
echo "==================================="
echo ""

# Check if API key is provided
if [ -z "$UPDOWN_API_KEY" ]; then
    echo "Error: UPDOWN_API_KEY environment variable not set"
    echo "Please set it with: export UPDOWN_API_KEY='your-api-key'"
    echo "Get your API key from: https://updown.io/settings/edit"
    exit 1
fi

# Configuration
FRONTEND_URL="${FRONTEND_URL:-https://akashvpn.pupcakes.me}"
HEALTH_ENDPOINT="${FRONTEND_URL}/health"

echo "Configuring comprehensive monitoring for: $FRONTEND_URL"
echo ""

# Function to create a check
create_check() {
    local url=$1
    local alias=$2
    local period=${3:-300}  # Default 5 minutes
    
    echo "Creating check: $alias"
    
    response=$(curl -s -X POST https://updown.io/api/checks \
        -H "X-API-KEY: $UPDOWN_API_KEY" \
        -d "url=$url" \
        -d "period=$period" \
        -d "alias=$alias" \
        -d "enabled=true" \
        -d "published=false" \
        -d "apdex_t=0.5" \
        -d "string_match=" \
        -d "mute_until=")
    
    if echo "$response" | grep -q "token"; then
        token=$(echo "$response" | grep -o '"token":"[^"]*"' | cut -d'"' -f4)
        echo "✓ Created check: $alias (token: $token)"
        echo "$response" | python3 -m json.tool 2>/dev/null || echo "$response"
    else
        echo "✗ Failed to create check: $alias"
        echo "$response"
    fi
    echo ""
}

# Function to list existing checks
list_checks() {
    echo "Fetching existing checks..."
    response=$(curl -s https://updown.io/api/checks \
        -H "X-API-KEY: $UPDOWN_API_KEY")
    
    echo "$response" | python3 -m json.tool 2>/dev/null || echo "$response"
    echo ""
}

# Get VPN server data from API
echo "Step 1: Fetching VPN server configuration"
echo "----------------------------------------"
echo "Fetching VPN server data..."
REGIONS_DATA=$(curl -s "${FRONTEND_URL}/api/regions")

if [ $? -ne 0 ] || [ -z "$REGIONS_DATA" ]; then
    echo "Error: Failed to fetch regions data from ${FRONTEND_URL}/api/regions"
    echo "Falling back to basic monitoring setup..."
    BASIC_MODE=true
else
    echo "✓ Successfully fetched regions data"
    BASIC_MODE=false
fi
echo ""

# Parse regions data and create checks
if [ "$BASIC_MODE" = false ]; then
    echo "Step 2: Creating VPN server monitoring checks"
    echo "---------------------------------------------"
    
    # Create checks for each VPN server based on the known data
    echo "Creating monitoring checks for configured VPN servers..."
    
    # Belgium V2Ray
    echo "Creating V2Ray check for Belgium Server"
    create_check "https://4e53okbnf1cub0te8f1b9pk260.ingress.europlots.com:30419" "akash-v2ray-belgium" 3600
    
    # Belgium SoftEther
    echo "Creating SoftEther check for Belgium Server"
    create_check "https://4e53okbnf1cub0te8f1b9pk260.ingress.europlots.com:30142" "akash-softether-belgium" 3600
    
    # Switzerland V2Ray
    echo "Creating V2Ray check for Switzerland Server"
    create_check "https://srvae6otapdi751nsdjr13s714.ingress.d3akash.cloud:30873" "akash-v2ray-switzerland" 3600
    
    # Switzerland SoftEther
    echo "Creating SoftEther check for Switzerland Server"
    create_check "https://srvae6otapdi751nsdjr13s714.ingress.d3akash.cloud:32493" "akash-softether-switzerland" 3600
    
    echo ""
    echo "✓ VPN server monitoring checks created"
    echo ""
else
    echo "Skipping VPN server checks (basic mode)"
    echo ""
fi

# Create basic monitoring checks
echo "Step 3: Creating basic monitoring checks"
echo "----------------------------------------"

# Overall health check
echo "Creating overall health check"
create_check "$HEALTH_ENDPOINT" "akash-vpn-overall-health" 3600

# Frontend uptime check
echo "Creating frontend uptime check"
create_check "$FRONTEND_URL" "akash-vpn-frontend" 300

echo ""
echo "==================================="
echo "Monitoring Setup Complete!"
echo "==================================="
echo ""
echo "Created monitoring checks:"
if [ "$BASIC_MODE" = false ]; then
    echo "✓ Individual VPN server checks (V2Ray + SoftEther)"
    echo "✓ Per-region monitoring"
fi
echo "✓ Overall health check (/health endpoint)"
echo "✓ Frontend uptime check"
echo ""
echo "Next steps:"
echo "1. Visit https://updown.io to view your checks"
echo "2. Configure alerting (email, Slack, webhook, etc.)"
echo "3. Enable public status page if desired"
echo "4. Update the Status component with your check tokens"
echo ""
if [ "$BASIC_MODE" = true ]; then
    echo "Note: Running in basic mode - VPN server monitoring not available"
    echo "This usually means the /api/regions endpoint is not accessible"
fi
