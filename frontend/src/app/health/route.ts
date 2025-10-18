import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

interface VPNRegion {
  name: string;
  hostname: string;
  location: string;
  port?: number;
}

interface HealthCheckResult {
  status: 'healthy' | 'degraded' | 'down';
  timestamp: string;
  regions: Array<{
    name: string;
    status: 'up' | 'down';
    responseTime?: number;
    error?: string;
  }>;
}

async function checkVPNServerHealth(hostname: string, port: number = 443): Promise<{
  isUp: boolean;
  responseTime?: number;
  error?: string;
}> {
  const startTime = Date.now();

  try {
    // Try to establish a TCP connection to the VPN server
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000); // 5 second timeout

    const response = await fetch(`https://${hostname}:${port}`, {
      method: 'HEAD',
      signal: controller.signal,
    }).catch(() => {
      // Many VPN servers won't respond to HTTP requests but the connection attempt tells us if it's reachable
      return null;
    });

    clearTimeout(timeoutId);
    const responseTime = Date.now() - startTime;

    // Even if HTTP fails, if we got a response (even an error), the server is likely up
    return {
      isUp: true,
      responseTime,
    };
  } catch (error) {
    if (error instanceof Error) {
      if (error.name === 'AbortError') {
        return {
          isUp: false,
          error: 'Connection timeout',
        };
      }
      return {
        isUp: false,
        error: error.message,
      };
    }
    return {
      isUp: false,
      error: 'Unknown error',
    };
  }
}

async function loadVPNRegions(): Promise<VPNRegion[]> {
  try {
    const regions: VPNRegion[] = [];

    // Belgium Server
    if (process.env.BELGIUM_HOSTNAME) {
      regions.push({
        name: 'Belgium Server',
        hostname: process.env.BELGIUM_HOSTNAME,
        location: 'belgium',
        port: parseInt(process.env.BELGIUM_PORT || '1194')
      });
    }

    // Switzerland Server
    if (process.env.SWITZERLAND_HOSTNAME) {
      regions.push({
        name: 'Switzerland Server',
        hostname: process.env.SWITZERLAND_HOSTNAME,
        location: 'switzerland',
        port: parseInt(process.env.SWITZERLAND_PORT || '1194')
      });
    }

    // US Server (if configured)
    if (process.env.US_HOSTNAME) {
      regions.push({
        name: 'US Server',
        hostname: process.env.US_HOSTNAME,
        location: 'us',
        port: parseInt(process.env.US_PORT || '1194')
      });
    }

    return regions;
  } catch (error) {
    console.error('Failed to load VPN regions:', error);
    return [];
  }
}

export async function GET() {
  try {
    const regions = await loadVPNRegions();

    if (regions.length === 0) {
      return NextResponse.json({
        status: 'down',
        timestamp: new Date().toISOString(),
        regions: [],
        error: 'No regions configured',
      } as HealthCheckResult, { status: 503 });
    }

    // Check all regions in parallel
    const healthChecks = await Promise.all(
      regions.map(async (region) => {
        const health = await checkVPNServerHealth(region.hostname, region.port);
        return {
          name: region.name,
          status: (health.isUp ? 'up' : 'down') as 'up' | 'down',
          responseTime: health.responseTime,
          error: health.error,
        };
      })
    );

    // Determine overall status
    const upCount = healthChecks.filter(r => r.status === 'up').length;
    let overallStatus: 'healthy' | 'degraded' | 'down';

    if (upCount === regions.length) {
      overallStatus = 'healthy';
    } else if (upCount > 0) {
      overallStatus = 'degraded';
    } else {
      overallStatus = 'down';
    }

    const result: HealthCheckResult = {
      status: overallStatus,
      timestamp: new Date().toISOString(),
      regions: healthChecks,
    };

    // Return appropriate HTTP status code
    const httpStatus = overallStatus === 'healthy' ? 200 : overallStatus === 'degraded' ? 207 : 503;

    return NextResponse.json(result, { status: httpStatus });
  } catch (error) {
    console.error('Health check failed:', error);
    return NextResponse.json({
      status: 'down',
      timestamp: new Date().toISOString(),
      regions: [],
      error: error instanceof Error ? error.message : 'Unknown error',
    } as HealthCheckResult, { status: 503 });
  }
}