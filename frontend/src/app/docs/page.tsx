"use client";

import { Sidebar } from "@/components/sidebar";
import { MobileNav } from "@/components/mobile-nav";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { Download, Shield, Globe, Lock, Zap, CheckCircle, ExternalLink, HelpCircle, Book, Smartphone, Monitor, ArrowRight } from "lucide-react";

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
      <main className="lg:ml-64 min-h-screen flex flex-col p-6 lg:p-8 max-w-6xl">
        
        {/* Header Section */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center">
              <Book className="w-6 h-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-2xl  md:text-4xl font-bold">Akash VPN Documentation</h1>
              <p className="text-muted-foreground text-lg">Complete guide to our decentralized VPN service</p>
            </div>
          </div>
          
          <div className="flex flex-wrap gap-3 mt-6">
            <Badge variant="secondary" className="flex items-center gap-2">
              <Shield className="w-3 h-3" />
              AES-256 Encryption
            </Badge>
            <Badge variant="secondary" className="flex items-center gap-2">
              <Globe className="w-3 h-3" />
              3 Global Servers
            </Badge>
            <Badge variant="secondary" className="flex items-center gap-2">
              <Lock className="w-3 h-3" />
              No-Logs Policy
            </Badge>
            <Badge variant="secondary" className="flex items-center gap-2">
              <Zap className="w-3 h-3" />
              Decentralized Network
            </Badge>
          </div>
        </div>

        {/* Quick Start Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Zap className="w-5 h-5 text-green-500" />
                Quick Start
              </CardTitle>
              <CardDescription>Get connected in under 5 minutes</CardDescription>
            </CardHeader>
            <CardContent>
              <ol className="space-y-2 text-sm">
                <li className="flex items-center gap-2">
                  <div className="w-5 h-5 bg-primary rounded-full flex items-center justify-center text-xs text-primary-foreground">1</div>
                  Choose server location
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-5 h-5 bg-primary rounded-full flex items-center justify-center text-xs text-primary-foreground">2</div>
                  Download .ovpn file
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-5 h-5 bg-primary rounded-full flex items-center justify-center text-xs text-primary-foreground">3</div>
                  Import to OpenVPN client
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center text-xs text-white">✓</div>
                  Connect & browse safely
                </li>
              </ol>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Download className="w-5 h-5 text-blue-500" />
                OpenVPN Clients
              </CardTitle>
              <CardDescription>Download the right client for your device</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <Link href="https://openvpn.net/client-connect-vpn-for-windows/" target="_blank" className="flex items-center justify-between p-2 rounded-lg bg-muted/50 hover:bg-muted transition-colors">
                <div className="flex items-center gap-2">
                  <Monitor className="w-4 h-4" />
                  <span className="text-sm">Windows</span>
                </div>
                <ExternalLink className="w-3 h-3" />
              </Link>
              <Link href="https://openvpn.net/client-connect-vpn-for-mac-os/" target="_blank" className="flex items-center justify-between p-2 rounded-lg bg-muted/50 hover:bg-muted transition-colors">
                <div className="flex items-center gap-2">
                  <Monitor className="w-4 h-4" />
                  <span className="text-sm">macOS</span>
                </div>
                <ExternalLink className="w-3 h-3" />
              </Link>
              <Link href="https://play.google.com/store/apps/details?id=net.openvpn.openvpn" target="_blank" className="flex items-center justify-between p-2 rounded-lg bg-muted/50 hover:bg-muted transition-colors">
                <div className="flex items-center gap-2">
                  <Smartphone className="w-4 h-4" />
                  <span className="text-sm">Android</span>
                </div>
                <ExternalLink className="w-3 h-3" />
              </Link>
              <Link href="https://apps.apple.com/app/openvpn-connect/id590379981" target="_blank" className="flex items-center justify-between p-2 rounded-lg bg-muted/50 hover:bg-muted transition-colors">
                <div className="flex items-center gap-2">
                  <Smartphone className="w-4 h-4" />
                  <span className="text-sm">iOS</span>
                </div>
                <ExternalLink className="w-3 h-3" />
              </Link>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <HelpCircle className="w-5 h-5 text-purple-500" />
                Need Help?
              </CardTitle>
              <CardDescription>Get support when you need it</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="text-sm text-muted-foreground">
                Common issues and solutions:
              </div>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500 mt-0.5" />
                  Check internet connection
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500 mt-0.5" />
                  Verify credentials
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500 mt-0.5" />
                  Try different server
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500 mt-0.5" />
                  Restart OpenVPN client
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* Server Locations */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
            <Globe className="w-8 h-8 text-primary" />
            Server Locations
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Belgium Server */}
            <Card className="border-l-4 border-l-blue-500">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <span className="text-2xl">🇧🇪</span>
                  Belgium Server
                </CardTitle>
                <CardDescription>Brussels, Europe</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="border-green-500 text-green-500">
                      <CheckCircle className="w-3 h-3 mr-1" />
                      Online
                    </Badge>
                  </div>
                  <div className="text-sm space-y-1">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Best for:</span>
                      <span>EU users</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Texas Server */}
            <Card className="border-l-4 border-l-green-500">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <span className="text-2xl">🇺🇸</span>
                  Texas Server
                  <Badge variant="secondary" className="text-xs">Recommended</Badge>
                </CardTitle>
                <CardDescription>Texas, United States</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="border-green-500 text-green-500">
                      <CheckCircle className="w-3 h-3 mr-1" />
                      Online
                    </Badge>
                  </div>
                  <div className="text-sm space-y-1">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Best for:</span>
                      <span>US users</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Switzerland Server */}
            <Card className="border-l-4 border-l-purple-500">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <span className="text-2xl">🇨🇭</span>
                  Switzerland Server
                </CardTitle>
                <CardDescription>Zurich, Europe</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="border-green-500 text-green-500">
                      <CheckCircle className="w-3 h-3 mr-1" />
                      Online
                    </Badge>
                  </div>
                  <div className="text-sm space-y-1">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Best for:</span>
                      <span>Privacy focused</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Security Features */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
            <Shield className="w-8 h-8 text-primary" />
            Security & Privacy
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Encryption & Protocols</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  <li className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <div>
                      <div className="font-medium">AES-256-CBC Encryption</div>
                      <div className="text-sm text-muted-foreground">Military-grade 256-bit encryption</div>
                    </div>
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <div>
                      <div className="font-medium">OpenVPN Protocol</div>
                      <div className="text-sm text-muted-foreground">Industry-standard VPN protocol</div>
                    </div>
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                    <div>
                      <div className="font-medium">Username/Password Auth</div>
                      <div className="text-sm text-muted-foreground">Simple, secure authentication</div>
                    </div>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Privacy Guarantees</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  <li className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <div>
                      <div className="font-medium">Zero-Logs Policy</div>
                      <div className="text-sm text-muted-foreground">No browsing history stored</div>
                    </div>
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <div>
                      <div className="font-medium">Decentralized Infrastructure</div>
                      <div className="text-sm text-muted-foreground">No single point of failure</div>
                    </div>
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                    <div>
                      <div className="font-medium">Independent Providers</div>
                      <div className="text-sm text-muted-foreground">Powered by Akash Network</div>
                    </div>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Detailed Setup Guide */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold mb-6">Detailed Setup Instructions</h2>
          
          <div className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle className="text-xl flex items-center gap-2">
                  <Monitor className="w-5 h-5" />
                  Desktop Setup (Windows/macOS/Linux)
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ol className="space-y-4">
                  <li className="flex gap-4">
                    <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-bold text-sm">1</div>
                    <div>
                      <div className="font-medium">Download OpenVPN Client</div>
                      <div className="text-sm text-muted-foreground mt-1">Install the official OpenVPN Connect client or OpenVPN GUI for your operating system.</div>
                    </div>
                  </li>
                  <li className="flex gap-4">
                    <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-bold text-sm">2</div>
                    <div>
                      <div className="font-medium">Choose Server & Download Config</div>
                      <div className="text-sm text-muted-foreground mt-1">Select your preferred server location from our homepage and download the .ovpn configuration file.</div>
                    </div>
                  </li>
                  <li className="flex gap-4">
                    <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-bold text-sm">3</div>
                    <div>
                      <div className="font-medium">Import Configuration</div>
                      <div className="text-sm text-muted-foreground mt-1">Open your OpenVPN client and import the downloaded .ovpn file.</div>
                    </div>
                  </li>
                  <li className="flex gap-4">
                    <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-bold text-sm">4</div>
                    <div>
                      <div className="font-medium">Enter Credentials</div>
                      <div className="text-sm text-muted-foreground mt-1">When prompted, enter the username and password displayed on our website (unique for each server).</div>
                    </div>
                  </li>
                  <li className="flex gap-4">
                    <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white font-bold text-sm">✓</div>
                    <div>
                      <div className="font-medium">Connect & Verify</div>
                      <div className="text-sm text-muted-foreground mt-1">Click connect and verify your new IP address at whatismyipaddress.com</div>
                    </div>
                  </li>
                </ol>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-xl flex items-center gap-2">
                  <Smartphone className="w-5 h-5" />
                  Mobile Setup (Android/iOS)
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ol className="space-y-4">
                  <li className="flex gap-4">
                    <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-bold text-sm">1</div>
                    <div>
                      <div className="font-medium">Install OpenVPN Connect</div>
                      <div className="text-sm text-muted-foreground mt-1">Download the official OpenVPN Connect app from your device's app store.</div>
                    </div>
                  </li>
                  <li className="flex gap-4">
                    <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-bold text-sm">2</div>
                    <div>
                      <div className="font-medium">Download Configuration</div>
                      <div className="text-sm text-muted-foreground mt-1">Visit our website on your mobile device and download the .ovpn file for your chosen server.</div>
                    </div>
                  </li>
                  <li className="flex gap-4">
                    <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-bold text-sm">3</div>
                    <div>
                      <div className="font-medium">Import Profile</div>
                      <div className="text-sm text-muted-foreground mt-1">Open OpenVPN Connect, tap the "+" button, select "File" and choose your downloaded .ovpn file.</div>
                    </div>
                  </li>
                  <li className="flex gap-4">
                    <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-bold text-sm">4</div>
                    <div>
                      <div className="font-medium">Enter Credentials</div>
                      <div className="text-sm text-muted-foreground mt-1">Input the username and password shown on our website when prompted.</div>
                    </div>
                  </li>
                  <li className="flex gap-4">
                    <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white font-bold text-sm">✓</div>
                    <div>
                      <div className="font-medium">Connect</div>
                      <div className="text-sm text-muted-foreground mt-1">Tap the connect button and you're ready to browse securely!</div>
                    </div>
                  </li>
                </ol>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Troubleshooting */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
            <HelpCircle className="w-8 h-8 text-primary" />
            Troubleshooting
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Connection Issues</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <ArrowRight className="w-4 h-4 text-primary mt-0.5" />
                    <div>
                      <div className="font-medium">Check Internet Connection</div>
                      <div className="text-sm text-muted-foreground">Ensure you can browse websites normally</div>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <ArrowRight className="w-4 h-4 text-primary mt-0.5" />
                    <div>
                      <div className="font-medium">Verify Credentials</div>
                      <div className="text-sm text-muted-foreground">Double-check username and password</div>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <ArrowRight className="w-4 h-4 text-primary mt-0.5" />
                    <div>
                      <div className="font-medium">Try Different Server</div>
                      <div className="text-sm text-muted-foreground">Switch to another location</div>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <ArrowRight className="w-4 h-4 text-primary mt-0.5" />
                    <div>
                      <div className="font-medium">Restart OpenVPN Client</div>
                      <div className="text-sm text-muted-foreground">Close and reopen the application</div>
                    </div>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Advanced Solutions</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <ArrowRight className="w-4 h-4 text-primary mt-0.5" />
                    <div>
                      <div className="font-medium">Check Firewall Settings</div>
                      <div className="text-sm text-muted-foreground">Ensure OpenVPN is allowed through firewall</div>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <ArrowRight className="w-4 h-4 text-primary mt-0.5" />
                    <div>
                      <div className="font-medium">Update OpenVPN Client</div>
                      <div className="text-sm text-muted-foreground">Install the latest version</div>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <ArrowRight className="w-4 h-4 text-primary mt-0.5" />
                    <div>
                      <div className="font-medium">Download Fresh Config</div>
                      <div className="text-sm text-muted-foreground">Get a new .ovpn file from our website</div>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <ArrowRight className="w-4 h-4 text-primary mt-0.5" />
                    <div>
                      <div className="font-medium">Contact Support</div>
                      <div className="text-sm text-muted-foreground">
                        <Link href="https://discord.com/invite/akash" target="_blank" className="text-primary hover:underline">
                          Join our Discord for help
                        </Link>
                      </div>
                    </div>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Footer Section */}
        <div className="bg-card/30 rounded-2xl p-8 text-center">
          <h3 className="text-2xl font-bold mb-4">Still Need Help?</h3>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Our community is here to help! Join our Discord server for real-time support, or check out our comprehensive documentation on GitHub.
          </p>
          <div className="flex flex-wrap mb-20 justify-center gap-4">
            <Link 
              href="https://discord.com/invite/akash" 
              target="_blank"
              className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-lg hover:bg-primary/90 transition-colors"
            >
              <HelpCircle className="w-4 h-4" />
              Discord Support
              <ExternalLink className="w-3 h-3" />
            </Link>
            <Link 
              href="https://github.com/Fluffy9/Akash-VPN/tree/main/akash-vpn-docs" 
              target="_blank"
              className="inline-flex items-center gap-2 bg-slate-200 text-slate-900 px-6 py-3 rounded-lg hover:bg-slate-300 transition-colors"
            >
              <Book className="w-4 h-4" />
              Full Documentation
              <ExternalLink className="w-3 h-3" />
            </Link>
          </div>
        </div>

      </main>
    </div>
  );

