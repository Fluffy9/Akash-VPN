import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

// Manual sidebar setup for Akash VPN docs
const sidebars: SidebarsConfig = {
  tutorialSidebar: [
    {
      type: 'doc',
      id: 'intro',
      label: 'Welcome',
    },
    {
      type: 'doc',
      id: 'getting-started',
      label: 'Getting Started',
    },
    {
      type: 'doc',
      id: 'server-locations',
      label: 'Server Locations',
    },
    {
      type: 'doc',
      id: 'faq',
      label: 'FAQ',
    },
    // More sections to be added here later
    // {
    //   type: 'category',
    //   label: 'Advanced',
    //   items: ['provider-guide', 'deployment'],
    // },

    {
      type: 'category',
      label: 'Platform Guides',
      items: [
        'setup/windows',
        'setup/macos', 
        'setup/linux',
        'setup/android',
        'setup/ios',
      ],
    },
    {
      type: 'category',
      label: 'Security & Privacy',
      items: [
        'security/encryption',
        'security/privacy-policy',
        'security/no-logs-policy',
      ],
    },
    {
      type: 'category',
      label: 'Support',
      items: [
        'support/troubleshooting',
        'support/performance',
        'support/contact',
      ],
    },
    {
      type: 'category',
      label: 'Legal',
      items: [
        'legal/terms-of-service',
        'legal/acceptable-use',
      ],
    },
  ],
};

export default sidebars;
