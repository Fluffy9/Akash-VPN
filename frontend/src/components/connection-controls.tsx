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
  const [selectedServer, setSelectedServer] = useState<Server | null>(null);
  const [copiedField, setCopiedField] = useState<string | null>(null);

  useEffect(() => {
    fetch('/data/akashic-records.json')
      .then(response => response.json())
      .then(data => {
        console.log('Loaded regions data:', data);
        console.log('Countries:', data?.regions?.[0]?.countries);
        setRegions(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
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

  const handleDownload = (server: Server) => {
    downloadConfig(server);
    setSelectedServer(server);
  };

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

  if (loading) {
    return (
      <div className="flex flex-col gap-4 items-center justify-center">
        <div className="text-center">Loading VPN configuration...</div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6 items-center justify-center">
      {/* Region Buttons */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full max-w-4xl">
        {regions?.regions?.[0]?.countries?.flatMap((country) =>
          country.servers.map((server, index) => (
            <Button
              key={`${country.country_code}-${index}`}
              onClick={() => handleDownload(server)}
              size="lg"
              className="px-6 py-4 text-lg font-semibold bg-primary hover:bg-primary/90 flex items-center justify-center gap-2"
            >
              <span className="text-xl">{country.flag}</span>
              <Download className="w-5 h-5" />
              {server.region}
            </Button>
          ))
        )}
      </div>

      {/* Auth Info Display */}
      {selectedServer && (
        <div className="bg-card border rounded-lg p-6 w-full max-w-2xl">
          <h3 className="text-xl font-semibold mb-4 text-center">
            VPN Credentials for {selectedServer.region}
          </h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
              <div>
                <p className="text-sm text-muted-foreground">Username</p>
                <p className="font-mono text-lg">{extractCredentials(selectedServer._comment || '')?.username || 'N/A'}</p>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => copyToClipboard(extractCredentials(selectedServer._comment || '')?.username || '', 'username')}
              >
                {copiedField === 'username' ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              </Button>
            </div>
            <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
              <div>
                <p className="text-sm text-muted-foreground">Password</p>
                <p className="font-mono text-lg">{extractCredentials(selectedServer._comment || '')?.password || 'N/A'}</p>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => copyToClipboard(extractCredentials(selectedServer._comment || '')?.password || '', 'password')}
              >
                {copiedField === 'password' ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              </Button>
            </div>
          </div>
          <p className="text-sm text-muted-foreground mt-4 text-center">
            Use these credentials when your OpenVPN client prompts for authentication.
          </p>
        </div>
      )}
    </div>
  );
}
