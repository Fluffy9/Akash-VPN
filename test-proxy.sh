#!/bin/bash
# Test script for Caddy reverse proxy setup

echo "🔧 Testing Akash VPN Caddy Reverse Proxy Setup"
echo "================================================="

# Colors for output
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Test function
test_endpoint() {
    local url="$1"
    local description="$2"
    local expected_code="${3:-200}"
    
    echo -n "Testing $description... "
    
    # Test with curl and get HTTP status code
    http_code=$(curl -s -o /dev/null -w "%{http_code}" --connect-timeout 10 --max-time 30 "$url")
    
    if [ "$http_code" = "$expected_code" ]; then
        echo -e "${GREEN}✅ OK (HTTP $http_code)${NC}"
        return 0
    else
        echo -e "${RED}❌ FAIL (HTTP $http_code, expected $expected_code)${NC}"
        return 1
    fi
}

# Test Docker containers
echo -e "\n${YELLOW}📋 Checking Docker containers...${NC}"
docker-compose -f docker-compose.local.yml ps

echo -e "\n${YELLOW}🌐 Testing HTTP endpoints...${NC}"

# Main routing tests
test_endpoint "http://localhost/" "Frontend (root path)"
test_endpoint "http://localhost/docs" "Documentation (/docs path)"
test_endpoint "http://localhost/api" "Backend API (/api path)" 404
test_endpoint "http://localhost/health" "Health check endpoint"

# Direct service access tests
echo -e "\n${YELLOW}🔍 Testing direct service access...${NC}"
test_endpoint "http://localhost:3001/" "Frontend (direct access)"
test_endpoint "http://localhost:3002/" "Backend (direct access)"
test_endpoint "http://localhost:3003/" "Documentation (direct access)"

# VPN service tests
echo -e "\n${YELLOW}🔒 Testing VPN service ports...${NC}"

# Test VPN ports with netcat (if available)
if command -v nc &> /dev/null; then
    echo -n "Testing SoftEther VPN port (992)... "
    if nc -z localhost 992; then
        echo -e "${GREEN}✅ Open${NC}"
    else
        echo -e "${RED}❌ Closed${NC}"
    fi
    
    echo -n "Testing OpenVPN UDP port (1194)... "
    if nc -u -z localhost 1194; then
        echo -e "${GREEN}✅ Open${NC}"
    else
        echo -e "${RED}❌ Closed${NC}"
    fi
    
    echo -n "Testing IPsec IKE port (500)... "
    if nc -u -z localhost 500; then
        echo -e "${GREEN}✅ Open${NC}"
    else
        echo -e "${RED}❌ Closed${NC}"
    fi
    
    echo -n "Testing IPsec NAT-T port (4500)... "
    if nc -u -z localhost 4500; then
        echo -e "${GREEN}✅ Open${NC}"
    else
        echo -e "${RED}❌ Closed${NC}"
    fi
    
    # Test VPN admin interface via Caddy
    test_endpoint "http://localhost:5555/" "VPN Admin Interface (via Caddy)"
else
    echo "⚠️  netcat (nc) not available - skipping port tests"
fi

# Container health check
echo -e "\n${YELLOW}🏥 Checking container health...${NC}"
echo "Docker containers status:"
docker-compose -f docker-compose.local.yml ps --format "table {{.Name}}\t{{.State}}\t{{.Ports}}"

echo -e "\n${YELLOW}📊 Summary${NC}"
echo "============"
echo "✅ Main entry point: http://localhost/"
echo "📚 Documentation: http://localhost/docs"
echo "🔌 API endpoint: http://localhost/api/*"
echo "❤️  Health check: http://localhost/health"
echo ""
echo "🔍 Direct access ports:"
echo "   Frontend: http://localhost:3001"
echo "   Backend: http://localhost:3002"
echo "   Docs: http://localhost:3003"
echo "   VPN Admin: http://localhost:5555"
echo ""
echo "🔒 VPN client ports:"
echo "   SoftEther: 992"
echo "   OpenVPN: 1194/udp"
echo "   IPsec: 500/udp, 4500/udp"

echo -e "\n${GREEN}🎯 Test completed!${NC}"