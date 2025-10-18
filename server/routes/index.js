var express = require('express');
var router = express.Router();
const QRCode = require('qrcode');

/* GET status endpoint */
router.get('/status', function (req, res) {
  res.send('hello world');
});

/* GET V2Ray QR code endpoint */
router.get('/api/v2ray-qr/:serverId', async function (req, res) {
  try {
    const { serverId } = req.params;
    console.log('V2Ray QR request for serverId:', serverId);

    // Helper functions (same as regions endpoint)
    const getEnvVar = (key, defaultValue = null) => {
      const value = process.env[key];
      return value && value !== 'undefined' ? value : defaultValue;
    };

    const safeParseInt = (value, defaultValue = 0) => {
      if (!value || value === 'undefined') return defaultValue;
      const parsed = parseInt(value);
      return isNaN(parsed) ? defaultValue : parsed;
    };

    const hasRealV2RayUUID = (uuid) => {
      if (!uuid) return false;
      const placeholderPatterns = [
        'your_',
        'placeholder',
        'example',
        'test',
        'dummy'
      ];
      return !placeholderPatterns.some(pattern =>
        uuid.toLowerCase().includes(pattern)
      ) && uuid.length > 10;
    };

    // Helper function to format CA certificate for OpenVPN
    const formatCACertificate = (cert) => {
      if (!cert) return '';

      // If certificate already has proper formatting, return as is
      if (cert.includes('-----BEGIN CERTIFICATE-----') && cert.includes('-----END CERTIFICATE-----')) {
        return cert;
      }

      // Clean the certificate data more aggressively
      // Remove all whitespace, line breaks, and non-base64 characters
      let cleanCert = cert.replace(/[^A-Za-z0-9+/=]/g, '');

      // Don't remove padding characters - they're essential for base64

      // Format the certificate with proper line breaks (64 characters per line)
      const formatted = cleanCert.replace(/(.{64})/g, '$1\n');
      return `-----BEGIN CERTIFICATE-----\n${formatted}\n-----END CERTIFICATE-----`;
    };

    // Build countries array dynamically (same logic as regions endpoint)
    const countries = [];

    // Belgium Server
    if (getEnvVar('BELGIUM_HOSTNAME')) {
      countries.push({
        country: "Belgium",
        country_code: "BE-WL",
        flag: "🇧🇪",
        servers: [{
          region: "Belgium Server",
          hostname: getEnvVar('BELGIUM_HOSTNAME'),
          external_port: safeParseInt(process.env.BELGIUM_PORT, 1194),
          hub_name: "AKASH_HUB",
          ca_certificate: formatCACertificate(getEnvVar('BELGIUM_CA_CERT')),
          _comment: `VPN Credentials: Username: ${getEnvVar('BELGIUM_USERNAME', 'N/A')}, Password: ${getEnvVar('BELGIUM_PASSWORD', 'N/A')}`,
          v2ray: hasRealV2RayUUID(getEnvVar('BELGIUM_V2RAY_UUID')) ? {
            uuid: getEnvVar('BELGIUM_V2RAY_UUID'),
            ports: [safeParseInt(process.env.BELGIUM_V2RAY_PORT, 1010)],
            protocol: "vmess",
            security: "auto",
            network: "tcp"
          } : null
        }]
      });
    }



    // Find the server by hostname
    let selectedServer = null;
    for (const country of countries) {
      for (const server of country.servers) {
        if (server.hostname === serverId && server.v2ray) {
          selectedServer = server;
          break;
        }
      }
      if (selectedServer) break;
    }

    if (!selectedServer) {
      console.log('Server not found or V2Ray not configured for:', serverId);
      return res.status(404).json({
        success: false,
        message: 'Server not found or V2Ray not configured'
      });
    }

    console.log('Found server for V2Ray QR:', selectedServer.region);

    // Generate VMess configuration
    const vmessConfig = {
      v: "2",
      ps: `Akash VPN - ${selectedServer.region}`,
      add: selectedServer.hostname,
      port: selectedServer.v2ray.ports[0],
      id: selectedServer.v2ray.uuid,
      aid: "0",
      scy: selectedServer.v2ray.security,
      net: selectedServer.v2ray.network,
      type: "none",
      host: "",
      path: "",
      tls: "",
      sni: "",
      alpn: ""
    };

    // Generate VMess URL
    const configString = JSON.stringify(vmessConfig);
    const base64Config = Buffer.from(configString).toString('base64');
    const vmessUrl = `vmess://${base64Config}`;

    // Generate QR code
    const qrCodeDataUrl = await QRCode.toDataURL(vmessUrl, {
      width: 256,
      margin: 1,
      color: {
        dark: '#000000',
        light: '#FFFFFF'
      }
    });

    res.json({
      success: true,
      data: {
        server: selectedServer.region,
        vmessUrl: vmessUrl,
        qrCode: qrCodeDataUrl
      }
    });

  } catch (error) {
    console.error('V2Ray QR code generation error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to generate V2Ray QR code'
    });
  }
});

// Health check endpoint

// API endpoint for regions data
router.get('/api/regions', (req, res) => {
  console.log('API /api/regions called');
  try {
    // Helper function to safely get environment variables
    const getEnvVar = (key, defaultValue = null) => {
      const value = process.env[key];
      return value && value !== 'undefined' ? value : defaultValue;
    };

    // Helper function to safely parse integers
    const safeParseInt = (value, defaultValue = 0) => {
      if (!value || value === 'undefined') return defaultValue;
      const parsed = parseInt(value);
      return isNaN(parsed) ? defaultValue : parsed;
    };

    // Helper function to check if V2Ray UUID is real (not a placeholder)
    const hasRealV2RayUUID = (uuid) => {
      if (!uuid) return false;
      // Check if it's a placeholder value
      const placeholderPatterns = [
        'your_',
        'placeholder',
        'example',
        'test',
        'dummy'
      ];
      return !placeholderPatterns.some(pattern =>
        uuid.toLowerCase().includes(pattern)
      ) && uuid.length > 10; // Real UUIDs are longer
    };

    // Helper function to format CA certificate for OpenVPN
    const formatCACertificate = (cert) => {
      if (!cert) return '';

      // If certificate already has proper formatting, return as is
      if (cert.includes('-----BEGIN CERTIFICATE-----') && cert.includes('-----END CERTIFICATE-----')) {
        return cert;
      }

      // Clean the certificate data more aggressively
      // Remove all whitespace, line breaks, and non-base64 characters
      let cleanCert = cert.replace(/[^A-Za-z0-9+/=]/g, '');

      // Don't remove padding characters - they're essential for base64

      // Format the certificate with proper line breaks (64 characters per line)
      const formatted = cleanCert.replace(/(.{64})/g, '$1\n');
      return `-----BEGIN CERTIFICATE-----\n${formatted}\n-----END CERTIFICATE-----`;
    };

    // Build countries array dynamically based on available environment variables
    const countries = [];

    // Belgium Server
    if (getEnvVar('BELGIUM_HOSTNAME')) {
      countries.push({
        country: "Belgium",
        country_code: "BE-WL",
        flag: "🇧🇪",
        servers: [{
          region: "Belgium Server",
          hostname: getEnvVar('BELGIUM_HOSTNAME'),
          external_port: safeParseInt(process.env.BELGIUM_PORT, 1194),
          hub_name: "AKASH_HUB",
          ca_certificate: formatCACertificate(getEnvVar('BELGIUM_CA_CERT')),
          _comment: `VPN Credentials: Username: ${getEnvVar('BELGIUM_USERNAME', 'N/A')}, Password: ${getEnvVar('BELGIUM_PASSWORD', 'N/A')}`,
          v2ray: hasRealV2RayUUID(getEnvVar('BELGIUM_V2RAY_UUID')) ? {
            uuid: getEnvVar('BELGIUM_V2RAY_UUID'),
            ports: [safeParseInt(process.env.BELGIUM_V2RAY_PORT, 1010)],
            protocol: "vmess",
            security: "auto",
            network: "tcp"
          } : null
        }]
      });
    }

    // Switzerland Server
    if (getEnvVar('SWITZERLAND_HOSTNAME')) {
      countries.push({
        country: "Switzerland",
        country_code: "CH",
        flag: "🇨🇭",
        servers: [{
          region: "Switzerland Server",
          hostname: getEnvVar('SWITZERLAND_HOSTNAME'),
          external_port: safeParseInt(process.env.SWITZERLAND_PORT, 1194),
          hub_name: "AKASH_HUB",
          ca_certificate: formatCACertificate(getEnvVar('SWITZERLAND_CA_CERT')),
          _comment: `VPN Credentials: Username: ${getEnvVar('SWITZERLAND_USERNAME', 'N/A')}, Password: ${getEnvVar('SWITZERLAND_PASSWORD', 'N/A')}`,
          v2ray: hasRealV2RayUUID(getEnvVar('SWITZERLAND_V2RAY_UUID')) ? {
            uuid: getEnvVar('SWITZERLAND_V2RAY_UUID'),
            ports: [safeParseInt(process.env.SWITZERLAND_V2RAY_PORT, 1010)],
            protocol: "vmess",
            security: "auto",
            network: "tcp"
          } : null
        }]
      });
    }

    const regionsData = {
      regions: [{
        continent: "Global",
        continent_code: "GL",
        countries: countries
      }]
    };

    console.log('Returning regions data with', countries.length, 'countries');
    res.json(regionsData);
  } catch (error) {
    console.error('Error fetching regions data:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch regions data',
      error: error.message
    });
  }
});

// API endpoint for stats
router.get('/api/stats', (req, res) => {
  console.log('API /api/stats called');
  try {
    // Helper function to safely get environment variables
    const getEnvVar = (key, defaultValue = null) => {
      const value = process.env[key];
      return value && value !== 'undefined' ? value : defaultValue;
    };

    // Calculate dynamic stats
    const countries = [
      getEnvVar('BELGIUM_HOSTNAME'),
      getEnvVar('US_HOSTNAME'),
      getEnvVar('SWITZERLAND_HOSTNAME')
    ].filter(Boolean); // Remove undefined/null values

    const stats = {
      uptime: "99.9%",
      logsStored: 0,
      globalLocations: countries.length,
      protection: "24/7"
    };

    console.log('Returning stats with', countries.length, 'locations');
    res.json({
      success: true,
      stats: stats
    });
  } catch (error) {
    console.error('Error fetching stats:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch stats',
      error: error.message
    });
  }
});

module.exports = router;
