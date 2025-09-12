/**
 * V2Ray QR Code Generator
 * Generates VMess configuration strings and QR codes for V2Ray connections
 */

import QRCode from 'qrcode';

export interface V2RayConfig {
  uuid: string;
  ports: number[];
  protocol: string;
  security: string;
  network: string;
}

export interface Server {
  region: string;
  hostname: string;
  v2ray: V2RayConfig;
}

export interface VMessConfig {
  v: string;
  ps: string;
  add: string;
  port: number;
  id: string;
  aid: string;
  scy: string;
  net: string;
  type: string;
  host: string;
  path: string;
  tls: string;
  sni: string;
  alpn: string;
}

/**
 * Generates a VMess configuration object from server data
 */
export function generateVMessConfig(server: Server): VMessConfig {
  const { region, hostname, v2ray } = server;
  
  return {
    v: "2", // VMess protocol version
    ps: `Akash VPN - ${region}`, // Profile name
    add: hostname, // Server address
    port: v2ray.ports[0], // Use first port (1010)
    id: v2ray.uuid, // User UUID
    aid: "0", // Alter ID (legacy, set to 0)
    scy: v2ray.security, // Security method
    net: v2ray.network, // Network type
    type: "none", // Header type
    host: "", // Host header
    path: "", // Path for websocket
    tls: "", // TLS setting
    sni: "", // SNI
    alpn: "" // ALPN
  };
}

/**
 * Generates a VMess URL from server data
 */
export function generateVMessURL(server: Server): string {
  const config = generateVMessConfig(server);
  const configString = JSON.stringify(config);
  const base64Config = btoa(configString);
  return `vmess://${base64Config}`;
}

/**
 * Generates a QR code data URL from VMess URL
 */
export async function generateQRCodeDataURL(vmessUrl: string, options?: QRCode.QRCodeToDataURLOptions): Promise<string> {
  const defaultOptions: QRCode.QRCodeToDataURLOptions = {
    type: 'image/png',
    quality: 0.92,
    margin: 1,
    color: {
      dark: '#000000',
      light: '#FFFFFF'
    },
    width: 256,
    ...options
  };

  try {
    return await QRCode.toDataURL(vmessUrl, defaultOptions);
  } catch (error) {
    console.error('Error generating QR code:', error);
    throw new Error('Failed to generate QR code');
  }
}

/**
 * Generates QR code data URL directly from server data
 */
export async function generateServerQRCode(server: Server, options?: QRCode.QRCodeToDataURLOptions): Promise<string> {
  const vmessUrl = generateVMessURL(server);
  return generateQRCodeDataURL(vmessUrl, options);
}

/**
 * Generates multiple QR codes for different ports
 */
export async function generateMultiPortQRCodes(server: Server, options?: QRCode.QRCodeToDataURLOptions): Promise<{ port: number; qrCode: string; vmessUrl: string }[]> {
  const results = [];
  
  for (const port of server.v2ray.ports) {
    const config = generateVMessConfig(server);
    config.port = port;
    
    const configString = JSON.stringify(config);
    const base64Config = btoa(configString);
    const vmessUrl = `vmess://${base64Config}`;
    
    const qrCode = await generateQRCodeDataURL(vmessUrl, options);
    
    results.push({
      port,
      qrCode,
      vmessUrl
    });
  }
  
  return results;
}

/**
 * Validates V2Ray server data
 */
export function validateV2RayServer(server: Server): boolean {
  if (!server.v2ray) {
    return false;
  }
  
  const { uuid, ports, protocol, security, network } = server.v2ray;
  
  return !!(
    uuid &&
    Array.isArray(ports) &&
    ports.length > 0 &&
    protocol &&
    security &&
    network &&
    server.hostname
  );
}

/**
 * Gets the primary port (first port in the array)
 */
export function getPrimaryPort(server: Server): number {
  return server.v2ray.ports[0];
}

/**
 * Gets all available ports
 */
export function getAllPorts(server: Server): number[] {
  return server.v2ray.ports;
}

