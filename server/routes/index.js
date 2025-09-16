var express = require('express');
var router = express.Router();
const QRCode = require('qrcode');

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

/* GET status endpoint */
router.get('/status', function (req, res) {
  res.send('hello world');
});

/* GET VPN configurations endpoint */
router.get('/api/vpn-configs', function (req, res) {
  try {
    // building VPN configs from environment variables
    const vpnConfigs = {
      regions: [
        {
          continent: "Global",
          continent_code: "GL",
          countries: [
            {
              country: "Belgium",
              country_code: "BE-WL",
              flag: "🇧🇪",
              servers: [
                {
                  region: "Belgium Server",
                  hostname: process.env.BELGIUM_HOSTNAME,
                  external_port: parseInt(process.env.BELGIUM_PORT),
                  hub_name: "AKASH_HUB",
                  ca_certificate: process.env.BELGIUM_CA_CERT,
                  _comment: `VPN Credentials: Username: ${process.env.BELGIUM_USERNAME}, Password: ${process.env.BELGIUM_PASSWORD}`,
                  v2ray: {
                    uuid: process.env.BELGIUM_V2RAY_UUID,
                    ports: [parseInt(process.env.BELGIUM_V2RAY_PORT) || 1010],
                    protocol: "vmess",
                    security: "auto",
                    network: "tcp"
                  }
                }
              ]
            },
            {
              country: "United States",
              country_code: "US",
              flag: "🇺🇸",
              servers: [
                {
                  region: "Texas Server",
                  hostname: process.env.US_HOSTNAME,
                  external_port: parseInt(process.env.US_PORT),
                  hub_name: "AKASH_HUB",
                  ca_certificate: process.env.US_CA_CERT,
                  _comment: `VPN Credentials: Username: ${process.env.US_USERNAME}, Password: ${process.env.US_PASSWORD}`,
                  v2ray: {
                    uuid: process.env.US_V2RAY_UUID,
                    ports: [parseInt(process.env.US_V2RAY_PORT) || 1010],
                    protocol: "vmess",
                    security: "auto",
                    network: "tcp"
                  }
                }
              ]
            },
            {
              country: "Switzerland",
              country_code: "CH",
              flag: "🇨🇭",
              servers: [
                {
                  region: "Switzerland Server",
                  hostname: process.env.SWITZERLAND_HOSTNAME,
                  external_port: parseInt(process.env.SWITZERLAND_PORT),
                  hub_name: "AKASH_HUB",
                  ca_certificate: process.env.SWITZERLAND_CA_CERT,
                  _comment: `VPN Credentials: Username: ${process.env.SWITZERLAND_USERNAME}, Password: ${process.env.SWITZERLAND_PASSWORD}`,
                  v2ray: {
                    uuid: process.env.SWITZERLAND_V2RAY_UUID,
                    ports: [parseInt(process.env.SWITZERLAND_V2RAY_PORT) || 1010],
                    protocol: "vmess",
                    security: "auto",
                    network: "tcp"
                  }
                }
              ]
            }
          ]
        }
      ]
    };

    // validating that required environment variables are present
    const requiredVars = [
      'BELGIUM_HOSTNAME', 'BELGIUM_PORT', 'BELGIUM_USERNAME', 'BELGIUM_PASSWORD', 'BELGIUM_V2RAY_UUID', 'BELGIUM_V2RAY_PORT',
      'US_HOSTNAME', 'US_PORT', 'US_USERNAME', 'US_PASSWORD', 'US_V2RAY_UUID', 'US_V2RAY_PORT',
      'SWITZERLAND_HOSTNAME', 'SWITZERLAND_PORT', 'SWITZERLAND_USERNAME', 'SWITZERLAND_PASSWORD', 'SWITZERLAND_V2RAY_UUID', 'SWITZERLAND_V2RAY_PORT'
    ];

    const missingVars = requiredVars.filter(varName => !process.env[varName]);

    if (missingVars.length > 0) {
      return res.status(500).json({
        success: false,
        message: 'Server configuration incomplete',
        missing_variables: missingVars
      });
    }

    res.json(vpnConfigs);

  } catch (error) {
    console.error('VPN configs error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to load VPN configurations'
    });
  }
});

/* POST endpoint to connect to a server */
router.post('/connect', function (req, res) {
  try {
    const { host, port, username, password } = req.body;

    // Validate required fields
    if (!host || !port) {
      return res.status(400).json({
        success: false,
        message: 'Host and port are required'
      });
    }

    // Here you would implement the actual server connection logic
    // For now, we'll just return a success response
    console.log(`Attempting to connect to ${host}:${port}`);

    // Simulate connection attempt
    setTimeout(() => {
      res.json({
        success: true,
        message: `Successfully connected to ${host}:${port}`,
        connection: {
          host: host,
          port: port,
          username: username || 'anonymous',
          timestamp: new Date().toISOString()
        }
      });
    }, 1000);

  } catch (error) {
    console.error('Connection error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error during connection attempt'
    });
  }
});

/* POST endpoint to disconnect from a server */
router.post('/disconnect', function (req, res) {
  try {
    const { host, port, username, password } = req.body;

    // Validate required fields
    if (!host || !port) {
      return res.status(400).json({
        success: false,
        message: 'Host and port are required'
      });
    }

    // Simulate disconnection attempt
    setTimeout(() => {
      res.json({
        success: true,
        message: `Successfully disconnected from ${host}:${port}`,
        disconnection: {
          host: host,
          port: port,
          username: username || 'anonymous',
          timestamp: new Date().toISOString()
        }
      });
    }, 1000);

  } catch (error) {
    console.error('Disconnection error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error during disconnection attempt'
    });
  }
});

/* GET V2Ray QR code endpoint */
router.get('/v2ray-qr/:serverId', async function (req, res) {
  try {
    const { serverId } = req.params;

    // Get the server configuration
    const vpnConfigs = {
      regions: [
        {
          continent: "Global",
          continent_code: "GL",
          countries: [
            {
              country: "Belgium",
              country_code: "BE-WL",
              flag: "🇧🇪",
              servers: [
                {
                  region: "Belgium Server",
                  hostname: process.env.BELGIUM_HOSTNAME,
                  external_port: parseInt(process.env.BELGIUM_PORT),
                  hub_name: "AKASH_HUB",
                  ca_certificate: process.env.BELGIUM_CA_CERT,
                  _comment: `VPN Credentials: Username: ${process.env.BELGIUM_USERNAME}, Password: ${process.env.BELGIUM_PASSWORD}`,
                  v2ray: {
                    uuid: process.env.BELGIUM_V2RAY_UUID,
                    ports: [parseInt(process.env.BELGIUM_V2RAY_PORT) || 1010],
                    protocol: "vmess",
                    security: "auto",
                    network: "tcp"
                  }
                }
              ]
            },
            {
              country: "United States",
              country_code: "US",
              flag: "🇺🇸",
              servers: [
                {
                  region: "Texas Server",
                  hostname: process.env.US_HOSTNAME,
                  external_port: parseInt(process.env.US_PORT),
                  hub_name: "AKASH_HUB",
                  ca_certificate: process.env.US_CA_CERT,
                  _comment: `VPN Credentials: Username: ${process.env.US_USERNAME}, Password: ${process.env.US_PASSWORD}`,
                  v2ray: {
                    uuid: process.env.US_V2RAY_UUID,
                    ports: [parseInt(process.env.US_V2RAY_PORT) || 1010],
                    protocol: "vmess",
                    security: "auto",
                    network: "tcp"
                  }
                }
              ]
            },
            {
              country: "Switzerland",
              country_code: "CH",
              flag: "🇨🇭",
              servers: [
                {
                  region: "Switzerland Server",
                  hostname: process.env.SWITZERLAND_HOSTNAME,
                  external_port: parseInt(process.env.SWITZERLAND_PORT),
                  hub_name: "AKASH_HUB",
                  ca_certificate: process.env.SWITZERLAND_CA_CERT,
                  _comment: `VPN Credentials: Username: ${process.env.SWITZERLAND_USERNAME}, Password: ${process.env.SWITZERLAND_PASSWORD}`,
                  v2ray: {
                    uuid: process.env.SWITZERLAND_V2RAY_UUID,
                    ports: [parseInt(process.env.SWITZERLAND_V2RAY_PORT) || 1010],
                    protocol: "vmess",
                    security: "auto",
                    network: "tcp"
                  }
                }
              ]
            }
          ]
        }
      ]
    };

    // Find the server by ID (using hostname as ID)
    let selectedServer = null;
    for (const region of vpnConfigs.regions) {
      for (const country of region.countries) {
        for (const server of country.servers) {
          if (server.hostname === serverId && server.v2ray) {
            selectedServer = server;
            break;
          }
        }
        if (selectedServer) break;
      }
      if (selectedServer) break;
    }

    if (!selectedServer) {
      return res.status(404).json({
        success: false,
        message: 'Server not found or V2Ray not configured'
      });
    }

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

module.exports = router;
