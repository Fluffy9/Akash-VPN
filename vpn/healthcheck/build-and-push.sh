#!/bin/bash
#
# build-and-push.sh
# Automated script to build and push the healthcheck Docker image
#
# Usage:
#   ./build-and-push.sh <registry> <version>
#
# Example:
#   ./build-and-push.sh myusername 1.0.0
#

set -e  # Exit on error

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Function to print colored output
print_info() {
    echo -e "${GREEN}[INFO]${NC} $1"
}

print_warn() {
    echo -e "${YELLOW}[WARN]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check if Docker is running
if ! docker info > /dev/null 2>&1; then
    print_error "Docker is not running. Please start Docker and try again."
    exit 1
fi

# Parse arguments
REGISTRY="${1}"
VERSION="${2:-latest}"

if [ -z "$REGISTRY" ]; then
    print_error "Usage: $0 <registry> [version]"
    echo "Example: $0 myusername 1.0.0"
    exit 1
fi

IMAGE_NAME="akash-vpn-healthcheck"
FULL_IMAGE="${REGISTRY}/${IMAGE_NAME}:${VERSION}"
LATEST_IMAGE="${REGISTRY}/${IMAGE_NAME}:latest"

print_info "Building image: ${FULL_IMAGE}"
echo ""

# Check if Dockerfile exists
if [ ! -f "Dockerfile" ]; then
    print_error "Dockerfile not found in current directory"
    exit 1
fi

# Check if source files exist
if [ ! -f "healthcheck_service.ts" ]; then
    print_error "healthcheck_service.ts not found"
    exit 1
fi

if [ ! -f "package.json" ]; then
    print_error "package.json not found"
    exit 1
fi

print_info "All source files found"
print_info "Starting build..."
echo ""

# Build the image
if docker build -t "${FULL_IMAGE}" . ; then
    print_info "Build successful!"
else
    print_error "Build failed"
    exit 1
fi

# Tag as latest if version is not "latest"
if [ "$VERSION" != "latest" ]; then
    print_info "Tagging as latest..."
    docker tag "${FULL_IMAGE}" "${LATEST_IMAGE}"
fi

echo ""
print_info "Images built:"
docker images | grep "${IMAGE_NAME}" | head -n 2

echo ""
read -p "Push to registry? (y/n) " -n 1 -r
echo ""

if [[ $REPLY =~ ^[Yy]$ ]]; then
    print_info "Pushing ${FULL_IMAGE}..."
    
    if docker push "${FULL_IMAGE}"; then
        print_info "Push successful!"
    else
        print_error "Push failed. Make sure you're logged in: docker login"
        exit 1
    fi
    
    if [ "$VERSION" != "latest" ]; then
        print_info "Pushing ${LATEST_IMAGE}..."
        if docker push "${LATEST_IMAGE}"; then
            print_info "Push successful!"
        else
            print_warn "Failed to push latest tag"
        fi
    fi
    
    echo ""
    print_info "All done! 🎉"
    echo ""
    print_info "Update your deploy.yml with:"
    echo "  image: ${FULL_IMAGE}"
    echo ""
else
    print_info "Skipping push. Images are available locally."
    echo ""
    print_info "To push later, run:"
    echo "  docker push ${FULL_IMAGE}"
    if [ "$VERSION" != "latest" ]; then
        echo "  docker push ${LATEST_IMAGE}"
    fi
fi

echo ""
print_info "Next steps:"
echo "  1. Update deploy.yml with the image URL"
echo "  2. Deploy to Akash: akash tx deployment create deploy.yml ..."
echo "  3. Configure updown.io monitoring"
echo ""