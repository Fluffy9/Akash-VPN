import React, { useState, useEffect } from 'react';

interface HealthRegion {
  name: string;
  status: 'up' | 'down';
  responseTime?: number;
  error?: string;
}

interface HealthData {
  status: 'healthy' | 'degraded' | 'down';
  timestamp: string;
  regions: HealthRegion[];
  error?: string;
}

interface UpdownStatusData {
  uptime?: number;
  down?: boolean;
  lastCheckAt?: string;
}

const StatusMonitor = () => {
  const [healthData, setHealthData] = useState<HealthData | null>(null);
  const [updownStatus, setUpdownStatus] = useState<Record<string, UpdownStatusData>>({});
  const [loading, setLoading] = useState<boolean>(true);

  // Replace these with your actual updown.io check tokens after setup
  const UPDOWN_CHECKS: Record<string, string> = {
    main: 'xxxx', // Main health check token
    frontend: 'yyyy', // Frontend check token
  };

  useEffect(() => {
    fetchHealthStatus();
    fetchUpdownStatus();
    
    // Poll every 60 seconds
    const interval = setInterval(() => {
      fetchHealthStatus();
      fetchUpdownStatus();
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  const fetchHealthStatus = async () => {
    try {
      const response = await fetch('/health');
      const data = await response.json();
      setHealthData(data);
    } catch (error) {
      console.error('Failed to fetch health status:', error);
      setHealthData({ 
        status: 'down', 
        timestamp: new Date().toISOString(),
        regions: [], 
        error: 'Failed to fetch' 
      });
    } finally {
      setLoading(false);
    }
  };

  const fetchUpdownStatus = async () => {
    const statuses: Record<string, UpdownStatusData> = {};
    
    for (const [key, token] of Object.entries(UPDOWN_CHECKS)) {
      if (token && token !== 'xxxx' && token !== 'yyyy') {
        try {
          // Updown.io public API endpoint
          const response = await fetch(`https://updown.io/api/checks/${token}`, {
            headers: {
              'X-API-KEY': process.env.NEXT_PUBLIC_UPDOWN_API_KEY || '',
            },
          });
          
          if (response.ok) {
            const data = await response.json();
            statuses[key] = {
              uptime: data.uptime,
              down: data.down,
              lastCheckAt: data.last_check_at,
            };
          }
        } catch (error) {
          console.error(`Failed to fetch updown.io status for ${key}:`, error);
        }
      }
    }
    
    setUpdownStatus(statuses);
  };

  const getStatusColor = (status?: string) => {
    switch (status) {
      case 'healthy':
      case 'up':
        return 'text-green-500';
      case 'degraded':
        return 'text-yellow-500';
      case 'down':
        return 'text-red-500';
      default:
        return 'text-gray-500';
    }
  };

  const getStatusIcon = (status?: string) => {
    const iconClass = "w-5 h-5";
    switch (status) {
      case 'healthy':
      case 'up':
        return (
          <svg className={iconClass} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
      case 'degraded':
        return (
          <svg className={iconClass} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        );
      case 'down':
        return (
          <svg className={iconClass} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
      default:
        return (
          <svg className={iconClass} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        );
    }
  };

  const formatUptime = (uptime?: number) => {
    if (!uptime) return 'N/A';
    return `${uptime.toFixed(2)}%`;
  };

  if (loading) {
    return (
      <div className="bg-gray-900 rounded-lg p-6 border border-gray-800">
        <div className="flex items-center space-x-3">
          <svg className="w-6 h-6 text-blue-500 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
          <div>
            <h3 className="text-lg font-semibold text-white">System Status</h3>
            <p className="text-sm text-gray-400">Checking status...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-900 rounded-lg p-6 border border-gray-800 space-y-6">
      {/* Overall Status */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className={getStatusColor(healthData?.status)}>
            {getStatusIcon(healthData?.status)}
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white">System Status</h3>
            <p className="text-sm text-gray-400">
              {healthData?.status === 'healthy' && 'All systems operational'}
              {healthData?.status === 'degraded' && 'Some regions experiencing issues'}
              {healthData?.status === 'down' && 'Service unavailable'}
            </p>
          </div>
        </div>
        
        {updownStatus.main && (
          <div className="text-right">
            <p className="text-2xl font-bold text-white">
              {formatUptime(updownStatus.main.uptime)}
            </p>
            <p className="text-xs text-gray-400">30-day uptime</p>
          </div>
        )}
      </div>

      {/* Region Status */}
      {healthData?.regions && healthData.regions.length > 0 && (
        <div className="space-y-3">
          <h4 className="text-sm font-semibold text-gray-300 uppercase tracking-wide">
            VPN Regions
          </h4>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {healthData.regions.map((region, index) => (
              <div
                key={index}
                className="bg-gray-800 rounded-lg p-4 border border-gray-700"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className={getStatusColor(region.status)}>
                      {getStatusIcon(region.status)}
                    </div>
                    <span className="text-white font-medium">{region.name}</span>
                  </div>
                  
                  {region.responseTime && (
                    <span className="text-sm text-gray-400">
                      {region.responseTime}ms
                    </span>
                  )}
                </div>
                
                {region.error && (
                  <p className="text-xs text-red-400 mt-2">{region.error}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Last Updated */}
      <div className="flex items-center justify-between pt-4 border-t border-gray-800">
        <p className="text-xs text-gray-500">
          Last checked: {healthData?.timestamp 
            ? new Date(healthData.timestamp).toLocaleTimeString()
            : 'Unknown'}
        </p>
        
        <a
          href="https://updown.io"
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs text-blue-400 hover:text-blue-300 transition-colors"
        >
          View detailed metrics →
        </a>
      </div>
    </div>
  );
};

export default StatusMonitor;