#!/bin/bash
# setup-down.sh
# Script to configure updown.io monitoring for Akash VPN

set -e

echo "==================================="
echo "Akash VPN Updown.io Setup"
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
FRONTEND_URL="${FRONTEND_URL:-https://your-frontend-url.akash.network}"
HEALTH_ENDPOINT="${FRONTEND_URL}/api/health"

echo "Configuring monitoring for: $FRONTEND_URL"
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

# Main setup
echo "Step 1: Listing existing checks"
echo "--------------------------------"
list_checks

echo "Step 2: Creating main health check"
echo "-----------------------------------"
create_check "$HEALTH_ENDPOINT" "akash-vpn-health" 300

echo "Step 3: Creating frontend uptime check"
echo "---------------------------------------"
create_check "$FRONTEND_URL" "akash-vpn-frontend" 300

echo ""
echo "==================================="
echo "Setup Complete!"
echo "==================================="
echo ""
echo "Next steps:"
echo "1. Visit https://updown.io to view your checks"
echo "2. Configure alerting (email, Slack, webhook, etc.)"
echo "3. Enable public status page if desired"
echo "4. Update the Status component with your check tokens"
echo ""
echo "To add region-specific monitoring, run:"
echo "./setup-down.sh add-region <region-url> <region-name>
echo ""