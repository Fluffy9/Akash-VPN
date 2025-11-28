#!/usr/bin/env node

/**
 * Local TCP Connectivity Test Script
 * 
 * This script simulates the healthcheck service's TCP connectivity checks
 * to help verify the logic works before deploying to Akash.
 * 
 * Usage:
 *   node test_tcp_connectivity.js <host> <port>
 * 
 * Example:
 *   node test_tcp_connectivity.js localhost 5555
 *   node test_tcp_connectivity.js google.com 443
 */

const net = require('net');

// Configuration
const TIMEOUT = 5000; // 5 seconds

/**
 * Check TCP connectivity to a host:port
 */
function checkTcpEndpoint(host, port, timeout = TIMEOUT) {
  return new Promise((resolve) => {
    const startTime = Date.now();
    const socket = new net.Socket();
    let isResolved = false;

    const cleanup = () => {
      if (!isResolved) {
        isResolved = true;
        socket.destroy();
      }
    };

    const timer = setTimeout(() => {
      cleanup();
      const elapsed = Date.now() - startTime;
      resolve({ 
        success: false, 
        error: 'Connection timeout',
        responseTime: elapsed
      });
    }, timeout);

    socket.connect(port, host, () => {
      clearTimeout(timer);
      cleanup();
      const elapsed = Date.now() - startTime;
      resolve({ 
        success: true,
        responseTime: elapsed
      });
    });

    socket.on('error', (err) => {
      clearTimeout(timer);
      cleanup();
      const elapsed = Date.now() - startTime;
      resolve({ 
        success: false, 
        error: err.message,
        responseTime: elapsed
      });
    });
  });
}

/**
 * Run multiple endpoint tests
 */
async function testEndpoints(endpoints) {
  console.log('Starting TCP connectivity tests...\n');
  
  const results = [];
  
  for (const endpoint of endpoints) {
    console.log(`Testing ${endpoint.name}: ${endpoint.host}:${endpoint.port}`);
    const result = await checkTcpEndpoint(endpoint.host, endpoint.port);
    
    results.push({
      ...endpoint,
      ...result
    });
    
    if (result.success) {
      console.log(`  ✓ SUCCESS - Connected in ${result.responseTime}ms`);
    } else {
      console.log(`  ✗ FAILED - ${result.error} (${result.responseTime}ms)`);
    }
    console.log();
  }
  
  return results;
}

/**
 * Display summary
 */
function displaySummary(results) {
  const successful = results.filter(r => r.success).length;
  const failed = results.filter(r => !r.success).length;
  
  console.log('='.repeat(60));
  console.log('SUMMARY');
  console.log('='.repeat(60));
  console.log(`Total tests: ${results.length}`);
  console.log(`Successful: ${successful}`);
  console.log(`Failed: ${failed}`);
  console.log();
  
  if (failed > 0) {
    console.log('Failed endpoints:');
    results.filter(r => !r.success).forEach(r => {
      console.log(`  - ${r.name} (${r.host}:${r.port}): ${r.error}`);
    });
  }
  
  // Exit with error code if any failed
  process.exit(failed > 0 ? 1 : 0);
}

/**
 * Main execution
 */
async function main() {
  const args = process.argv.slice(2);
  
  let endpoints;
  
  if (args.length >= 2) {
    // Single endpoint test from command line
    endpoints = [{
      name: 'Custom',
      host: args[0],
      port: parseInt(args[1], 10)
    }];
  } else {
    // Default VPN endpoints (these will fail locally, used for demonstration)
    endpoints = [
      { name: 'SoftEther', host: 'softether', port: 5555 },
      { name: 'V2Ray', host: 'v2ray', port: 1080 },
      // Test with a known good endpoint
      { name: 'Google DNS', host: '8.8.8.8', port: 53 },
      { name: 'Cloudflare DNS', host: '1.1.1.1', port: 53 }
    ];
  }
  
  try {
    const results = await testEndpoints(endpoints);
    displaySummary(results);
  } catch (error) {
    console.error('Error running tests:', error);
    process.exit(1);
  }
}

// Run if executed directly
if (require.main === module) {
  main();
}

// Export for use as a module
module.exports = { checkTcpEndpoint, testEndpoints };