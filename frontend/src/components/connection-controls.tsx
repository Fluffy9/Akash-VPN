"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Download, Copy, Check, QrCode } from "lucide-react";
import QRCode from "qrcode";
import { generateVMessURL, generateServerQRCode, validateV2RayServer } from "@/lib/v2ray-generator";

interface V2RayConfig {
  uuid: string;
  ports: number[];
  protocol: string;
  security: string;
  network: string;
}

interface Server {
  region: string;
  hostname: string;
  external_port: number;
  hub_name: string;
  ca_certificate?: string;
  _comment?: string;
  v2ray?: V2RayConfig;
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
  const [showQRCode, setShowQRCode] = useState(false);
  const [vmessUrl, setVmessUrl] = useState<string>("");
  const [qrCodeDataUrl, setQrCodeDataUrl] = useState<string>("");

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
    setShowQRCode(false);
  };

  const handleV2RayQR = async (server: Server) => {
    if (validateV2RayServer(server)) {
      const url = generateVMessURL(server);
      setVmessUrl(url);
      setSelectedServer(server);
      setShowQRCode(true);
      
      try {
        const qrDataUrl = await QRCode.toDataURL(url, {
          width: 200,
          margin: 1,
          color: {
            dark: '#000000',
            light: '#FFFFFF'
          }
        });
        setQrCodeDataUrl(qrDataUrl);
      } catch (error) {
        console.error('Error generating QR code:', error);
      }
    } else {
      console.error('Invalid V2Ray server configuration');
    }
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
            <div key={`${country.country_code}-${index}`} className="flex flex-col gap-2">
              <div className="flex items-center justify-center gap-2 text-lg font-semibold mb-2">
                <span className="text-xl">{country.flag}</span>
                {server.region}
              </div>
              <div className="flex gap-2">
                <Button
                  onClick={() => handleDownload(server)}
                  size="sm"
                  className="flex-1 bg-primary hover:bg-primary/90 flex items-center justify-center gap-2"
                >
                  <Download className="w-4 h-4" />
                  OpenVPN
                </Button>
                {server.v2ray && validateV2RayServer(server) && (
                  <Button
                    onClick={() => handleV2RayQR(server)}
                    size="sm"
                    variant="outline"
                    className="flex-1 flex items-center justify-center gap-2"
                  >
                    <QrCode className="w-4 h-4" />
                    V2Ray QR
                  </Button>
                )}
              </div>
            </div>
          ))
        )}
      </div>

      {/* Connection Info Display */}
      {selectedServer && (
        <div className="bg-card border rounded-lg p-6 w-full max-w-2xl">
          {showQRCode ? (
            // V2Ray QR Code Display
            <div className="text-center">
              <h3 className="text-xl font-semibold mb-4">
                V2Ray QR Code for {selectedServer.region}
              </h3>
              <div className="flex flex-col items-center gap-4">
                <div className="bg-white p-4 rounded-lg">
                  {qrCodeDataUrl ? (
                    <img 
                      src={qrCodeDataUrl} 
                      alt="V2Ray QR Code" 
                      className="w-48 h-48 mx-auto"
                    />
                  ) : (
                    <div className="w-48 h-48 bg-gray-200 flex items-center justify-center">
                      <span className="text-gray-500">Generating QR Code...</span>
                    </div>
                  )}
                </div>
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">
                    Scan this QR code with your V2Ray client app
                  </p>
                  <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-muted-foreground">VMess URL</p>
                      <p className="font-mono text-xs break-all">{vmessUrl}</p>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => copyToClipboard(vmessUrl, 'vmess')}
                      className="ml-2 flex-shrink-0"
                    >
                      {copiedField === 'vmess' ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                    </Button>
                  </div>
                </div>
                <div className="text-xs text-muted-foreground">
                  <p>Recommended apps: v2rayNG (Android), Shadowrocket (iOS)</p>
                </div>
              </div>
            </div>
          ) : (
            // OpenVPN Credentials Display
            <div>
              <h3 className="text-xl font-semibold mb-4 text-center">
                OpenVPN Credentials for {selectedServer.region}
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
      )}
    </div>
  );
}
