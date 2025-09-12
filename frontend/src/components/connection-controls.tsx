"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Download, Copy, Check } from "lucide-react";

interface Server {
  region: string;
  hostname: string;
  external_port: number;
  hub_name: string;
  ca_certificate?: string;
  _comment?: string;
}

interface Country {
  country: string;
  country_code: string;
  flag: string;
  servers: Server[];
}

interface Continent {
  continent: string;
  continent_code: string;
  countries: Country[];
}

interface RegionsData {
  regions: Continent[];
}

export function ConnectionControls() {
  const [regions, setRegions] = useState<RegionsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedServer, setSelectedServer] = useState<Server | null>(null);
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [downloading, setDownloading] = useState<string | null>(null);

  useEffect(() => {
    // fetching from server API instead of static JSON
    fetch('/api/vpn-configs')
      .then(response => {
        if (!response.ok) throw new Error('Failed to load server data');
        return response.json();
      })
      .then(data => {
        console.log('Loaded regions data:', data);
        setRegions(data);
        setError(null);
      })
      .catch(err => {
        console.error('Failed to load regions:', err);
        setError('Failed to load server locations. Please refresh the page.');
      })
      .finally(() => setLoading(false));
  }, []);

  const downloadConfig = (server: Server) => {
    let configContent = `client
dev tun
proto tcp
remote ${server.hostname} ${server.external_port}
resolv-retry infinite
nobind
persist-key
persist-tun
cipher AES-256-CBC
auth SHA1
auth-user-pass
verb 3
`;

    // Add CA certificate if available
    if (server.ca_certificate) {
      configContent += `\n<ca>\n${server.ca_certificate}\n</ca>\n`;
      console.log('CA certificate added to config');
    } else {
      console.log('No CA certificate found');
    }
    const blob = new Blob([configContent], { type: 'application/x-openvpn-profile' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `akash-vpn-${server.region.toLowerCase().replace(/\s+/g, '-')}.ovpn`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleDownload = async (server: Server) => {
    try {
      setDownloading(server.hostname);
      await new Promise(resolve => setTimeout(resolve, 500)); // Brief loading state
      downloadConfig(server);
      setSelectedServer(server);
    } catch (error) {
      console.error('Download failed:', error);
    } finally {
      setDownloading(null);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col gap-4 items-center justify-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        <div className="text-center text-muted-foreground">Loading VPN servers...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col gap-4 items-center justify-center py-8">
        <div className="text-center text-red-500">{error}</div>
        <Button onClick={() => window.location.reload()} variant="outline">
          Retry
        </Button>
      </div>
    );
  }

  const copyToClipboard = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const extractCredentials = (comment: string) => {
    const match = comment.match(/Username: (\w+), Password: ([\w-]+)/);
    if (match) {
      return { username: match[1], password: match[2] };
    }
    return null;
  };

  return (
    <div className="flex flex-col gap-6 items-center justify-center mb-20 lg:mb-0">
      {/* Region Buttons */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 w-full max-w-4xl px-4">
        {regions?.regions?.[0]?.countries?.flatMap((country: Country) =>
          country.servers.map((server: Server, index: number) => (
            <Button
              key={`${country.country_code}-${index}`}
              onClick={() => handleDownload(server)}
              disabled={downloading === server.hostname}
              size="lg"
              className="px-4 py-6 sm:px-6 sm:py-4 text-base sm:text-lg font-semibold bg-primary hover:bg-primary/90 disabled:opacity-50 flex items-center justify-center gap-2 min-h-[4rem]"
            >
              <span className="text-lg sm:text-xl">{country.flag}</span>
              {downloading === server.hostname ? (
                <div className="animate-spin rounded-full h-4 w-4 sm:h-5 sm:w-5 border-b-2 border-current"></div>
              ) : (
                <Download className="w-4 h-4 sm:w-5 sm:h-5" />
              )}
              <span className="truncate">{server.region}</span>
            </Button>
          ))
        )}
      </div>

      {/* Auth Info Display */}
      {selectedServer && (
        <div className="bg-card border rounded-lg p-4 sm:p-6 w-full max-w-2xl mx-4">
          <h3 className="text-lg sm:text-xl font-semibold mb-4 text-center">
            VPN Credentials for {selectedServer.region}
          </h3>
          <div className="space-y-3 sm:space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-3 bg-muted rounded-lg gap-2">
              <div className="min-w-0 flex-1">
                <p className="text-sm text-muted-foreground">Username</p>
                <p className="font-mono text-sm sm:text-base break-all">{extractCredentials(selectedServer._comment || '')?.username || 'N/A'}</p>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => copyToClipboard(extractCredentials(selectedServer._comment || '')?.username || '', 'username')}
                className="shrink-0"
              >
                {copiedField === 'username' ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              </Button>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-3 bg-muted rounded-lg gap-2">
              <div className="min-w-0 flex-1">
                <p className="text-sm text-muted-foreground">Password</p>
                <p className="font-mono text-sm sm:text-base break-all">{extractCredentials(selectedServer._comment || '')?.password || 'N/A'}</p>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => copyToClipboard(extractCredentials(selectedServer._comment || '')?.password || '', 'password')}
                className="shrink-0"
              >
                {copiedField === 'password' ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              </Button>
            </div>
          </div>
          <p className="text-xs sm:text-sm text-muted-foreground mt-4 text-center">
            Use these credentials when your OpenVPN client prompts for authentication.
          </p>
        </div>
      )}
    </div>
  );
}
