import { themes as prismThemes } from "prism-react-renderer";
import type { Config } from "@docusaurus/types";
import type * as Preset from "@docusaurus/preset-classic";

const config: Config = {
  title: "Akash VPN Docs",
  tagline: "Decentralized. Private. Secure.",
  favicon: "img/favicon.ico",

  future: {
    v4: true,
  },

  url: "https://akash-vpn-docs.example.com", // TBD
  baseUrl: "/docs/",

  organizationName: "Akash-Network",
  projectName: "Akash-VPN", // To use the GitHub repo name

  onBrokenLinks: "throw",
  onBrokenMarkdownLinks: "warn",

  i18n: {
    defaultLocale: "en",
    locales: ["en"],
  },

  presets: [
    [
      "classic",
      {
        docs: {
          sidebarPath: "./sidebars.ts",
          editUrl: "https://github.com/Fluffy9/Akash-VPN/edit/main/", //TBD
        },
        blog: false, // Disabled for now
        theme: {
          customCss: "./src/css/custom.css",
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    image: "img/docusaurus-social-card.jpg", // TBD
    navbar: {
      title: "Akash VPN",
      logo: {
        alt: "Akash VPN Logo",
        src: "img/logo.svg", // TBD
      },
      items: [
        {
          type: "docSidebar",
          sidebarId: "tutorialSidebar",
          position: "left",
          label: "Docs",
        },
        {
          href: "https://github.com/Fluffy9/Akash-VPN",
          label: "GitHub",
          position: "right",
        },
        {
          href: "https://discord.gg/JKGjJUHB",
          label: "Support",
          position: "right",
        },
      ],
    },

    footer: {
      style: "dark",
      links: [
        {
          title: "Docs",
          items: [
            {
              label: "Getting Started",
              to: "/docs/",
            },
            {
              label: "FAQ",
              to: "/docs/faq",
            },
          ],
        },
        {
          title: "Community",
          items: [
            {
              label: "Discord",
              href: "https://discord.gg/JKGjJUHB",
            },
            {
              label: "Twitter/X",
              href: "https://x.com/akashnet_",
            },
          ],
        },
        {
          title: "More",
          items: [
            {
              label: "GitHub",
              href: "https://github.com/Fluffy9/Akash-VPN",
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Akash VPN.`,
    },

    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
