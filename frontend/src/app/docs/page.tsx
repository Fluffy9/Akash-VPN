"use client";

import { Sidebar } from "@/components/sidebar";
import { MobileNav } from "@/components/mobile-nav";
import Link from "next/link";

export default function Docs() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Desktop Sidebar */}
      <div className="hidden lg:block">
        <Sidebar />
      </div>

      {/* Mobile Navigation */}
      <div className="lg:hidden">
        <MobileNav />
      </div>

      {/* Main Content */}
      <main className="lg:ml-64 min-h-screen flex flex-col p-4 md:p-6 lg:p-8">
        <h1 className="text-3xl font-bold mb-4">Akash VPN Documentation</h1>

        <h2 className="text-2xl font-bold mb-2">Getting Started</h2>
        <p className="text-muted-foreground mb-4">
          To get started with Akash VPN, follow these steps:
        </p>
        <ol className="list-decimal list-inside mb-6 space-y-2">
          <li>Visit our homepage and choose your preferred server location (Wales, Texas, or Switzerland)</li>
          <li>Click the download button for your chosen region</li>
          <li>Import the OpenVPN configuration file into your OpenVPN client</li>
          <li>Enter your credentials when prompted (username and password are displayed on our website)</li>
          <li>Connect and enjoy secure, private browsing!</li>
        </ol>

        <h2 className="text-2xl font-bold mb-2">Server Locations</h2>
        <p className="text-muted-foreground mb-4">
          We currently have active servers in:
        </p>
        <ul className="list-disc list-inside mb-6 space-y-1">
          <li><strong>🇧🇪 Belgium Server</strong> (Belgium)</li>
          <li><strong>🇺🇸 Texas Server</strong> (United States)</li>
          <li><strong>🇨🇭 Switzerland Server</strong> (Switzerland)</li>
        </ul>

        <h2 className="text-2xl font-bold mb-2">Security Features</h2>
        <ul className="list-disc list-inside mb-6 space-y-1">
          <li><strong>AES-256-CBC Encryption</strong> - Strong 256-bit encryption</li>
          <li><strong>Username/Password Authentication</strong> - Simple, secure client authentication (no client certificates required)</li>
          <li><strong>No-Logs Policy</strong> - Zero data retention</li>
          <li><strong>Decentralized Infrastructure</strong> - Independent Akash Network providers</li>
          <li><strong>Unique Credentials</strong> - Each server has its own authentication credentials</li>
        </ul>

        <h2 className="text-2xl font-bold mb-2">OpenVPN Clients</h2>
        <p className="text-muted-foreground mb-4">
          You can use any OpenVPN client to connect to Akash VPN. Here are some popular options:
        </p>
        <ul className="list-disc list-inside mb-6 space-y-1">
          <li><Link href="https://openvpn.net/community-downloads/" className="underline hover:text-primary" target="_blank" rel="noopener noreferrer">OpenVPN Connect (Official)</Link></li>
          <li><Link href="https://tunnelblick.net/" className="underline hover:text-primary" target="_blank" rel="noopener noreferrer">Tunnelblick (for macOS)</Link></li>
          <li><Link href="https://openvpn.net/connect-docs/android-installation-guide.html" className="underline hover:text-primary" target="_blank" rel="noopener noreferrer">OpenVPN Connect (for Android)</Link></li>
          <li><Link href="https://openvpn.net/connect-docs/ios-installation-guide.html" className="underline hover:text-primary" target="_blank" rel="noopener noreferrer">OpenVPN Connect (for iOS)</Link></li>
        </ul>

        <h2 className="text-2xl font-bold mb-2">Troubleshooting</h2>
        <p className="text-muted-foreground mb-4">
          If you're having trouble connecting:
        </p>
        <ul className="list-disc list-inside mb-6 space-y-1">
          <li>Make sure you're connected to the internet</li>
          <li>Verify your credentials are correct</li>
          <li>Try a different server location</li>
          <li>Restart your OpenVPN client</li>
          <li>Check your firewall settings</li>
        </ul>

        <h2 className="text-2xl font-bold mb-2">Need More Help?</h2>
        <p className="text-muted-foreground mb-4">
          For more detailed documentation, visit our <Link href="https://github.com/Fluffy9/Akash-VPN/tree/main/akash-vpn-docs" className="underline hover:text-primary" target="_blank" rel="noopener noreferrer">comprehensive documentation</Link> on GitHub.
        </p>
      </main>
    </div>
  );
}
