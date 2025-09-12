var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* GET status endpoint */
router.get('/status', function(req, res) {
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
                  _comment: `VPN Credentials: Username: ${process.env.BELGIUM_USERNAME}, Password: ${process.env.BELGIUM_PASSWORD}`
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
                  _comment: `VPN Credentials: Username: ${process.env.US_USERNAME}, Password: ${process.env.US_PASSWORD}`
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
                  _comment: `VPN Credentials: Username: ${process.env.SWITZERLAND_USERNAME}, Password: ${process.env.SWITZERLAND_PASSWORD}`
                }
              ]
            }
          ]
        }
      ]
    };

    // validating that required environment variables are present
    const requiredVars = [
      'BELGIUM_HOSTNAME', 'BELGIUM_PORT', 'BELGIUM_USERNAME', 'BELGIUM_PASSWORD',
      'US_HOSTNAME', 'US_PORT', 'US_USERNAME', 'US_PASSWORD',
      'SWITZERLAND_HOSTNAME', 'SWITZERLAND_PORT', 'SWITZERLAND_USERNAME', 'SWITZERLAND_PASSWORD'
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

module.exports = router;
