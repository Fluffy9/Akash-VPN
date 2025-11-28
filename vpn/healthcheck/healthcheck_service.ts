import express, { Request, Response } from 'express';
import net from 'net';

const app = express();
const PORT = parseInt(process.env.PORT || process.env.HEALTH_CHECK_PORT || '3000', 10);
const TIMEOUT = parseInt(process.env.HEALTH_CHECK_TIMEOUT || '5000', 10);

interface VpnEndpoint {
  name: string;
  host: string;
  port: number;
}

interface CheckResult {
  success: boolean;
  error?: string;
}

interface ServiceStatus {
  service: string;
  endpoint: string;
  status: 'UP' | 'DOWN';
  error: string | null;
}

interface HealthResponse {
  status: 'healthy' | 'unhealthy';
  timestamp: string;
  responseTime: string;
  services: ServiceStatus[];
}

// VPN endpoints to check
const VPN_ENDPOINTS: VpnEndpoint[] = [
  { 
    name: 'SoftEther', 
    host: process.env.SOFTETHER_HOST || 'softether', 
    port: parseInt(process.env.SOFTETHER_PORT || '5555', 10) 
  },
  { 
    name: 'V2Ray', 
    // FIXED: Changed default from 'app' to 'v2ray' to match service name in SDL
    host: process.env.V2RAY_HOST || 'v2ray', 
    port: parseInt(process.env.V2RAY_PORT || '1080', 10) 
  }
];

// TCP connectivity check with timeout
function checkTcpEndpoint(
  host: string,
  port: number,
  timeout: number = TIMEOUT
): Promise<CheckResult> {
  return new Promise((resolve) => {
    const socket = new net.Socket();
    let isResolved = false;

    const cleanup = (): void => {
      if (!isResolved) {
        isResolved = true;
        socket.destroy();
      }
    };

    const timer = setTimeout(() => {
      cleanup();
      resolve({ success: false, error: 'Connection timeout' });
    }, timeout);

    socket.connect(port, host, () => {
      clearTimeout(timer);
      cleanup();
      resolve({ success: true });
    });

    socket.on('error', (err: Error) => {
      clearTimeout(timer);
      cleanup();
      resolve({ success: false, error: err.message });
    });
  });
}

// Main health check endpoint
app.get('/health', async (req: Request, res: Response): Promise<void> => {
  const startTime = Date.now();
  const results: ServiceStatus[] = [];
  let allHealthy = true;

  // Check all VPN endpoints
  for (const endpoint of VPN_ENDPOINTS) {
    const result = await checkTcpEndpoint(endpoint.host, endpoint.port);
    results.push({
      service: endpoint.name,
      endpoint: `${endpoint.host}:${endpoint.port}`,
      status: result.success ? 'UP' : 'DOWN',
      error: result.error || null
    });

    if (!result.success) {
      allHealthy = false;
    }
  }

  const responseTime = Date.now() - startTime;

  // Prepare response
  const response: HealthResponse = {
    status: allHealthy ? 'healthy' : 'unhealthy',
    timestamp: new Date().toISOString(),
    responseTime: `${responseTime}ms`,
    services: results
  };

  // Return 200 if all healthy, 503 if any service is down
  const statusCode = allHealthy ? 200 : 503;
  res.status(statusCode).json(response);
});

// Simple root endpoint
app.get('/', (req: Request, res: Response): void => {
  res.json({
    service: 'VPN Healthcheck Service',
    version: '1.0.0',
    endpoints: {
      health: '/health'
    }
  });
});

let server: ReturnType<typeof app.listen>;

// Start server
server = app.listen(PORT, '0.0.0.0', () => {
  console.log(`VPN Healthcheck service listening on port ${PORT}`);
  console.log(`Monitoring endpoints:`, VPN_ENDPOINTS);
});

// Graceful shutdown
const shutdown = (signal: string) => {
  console.log(`${signal} received, shutting down gracefully`);
  server.close(() => {
    console.log('Server closed');
    process.exit(0);
  });
  
  // Force close after 10 seconds
  setTimeout(() => {
    console.error('Forced shutdown after timeout');
    process.exit(1);
  }, 10000);
};

process.on('SIGTERM', () => shutdown('SIGTERM'));
process.on('SIGINT', () => shutdown('SIGINT'));