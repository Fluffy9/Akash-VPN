import { Sidebar } from "@/components/sidebar";
import { ConnectionControls } from "@/components/connection-controls";
import { BenefitsSection } from "@/components/benefits-section";
import { MobileNav } from "@/components/mobile-nav";
import { Button } from "@/components/ui/button";
import { Shield, Download, Lock, Zap, Globe2, Star, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function Home() {
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
      <main className="lg:ml-64 min-h-screen">
        {/* Hero Section */}
        <section className=" min-h-screen lg:h-screen overflow-hidden bg-gradient-to-br from-primary/5 via-background to-secondary/5">
          <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
          <div className="relative h-full flex items-center justify-center py-20 lg:py-0">
            <div className="max-w-6xl mx-auto px-4 text-center">
              <div className="space-y-4 lg:space-y-4">
                {/* Hero Badge */}
                <div className="inline-flex items-center gap-2 px-3 py-1.5 lg:px-4 lg:py-2 bg-primary/10 border border-primary/20 rounded-full text-xs lg:text-sm text-primary font-medium">
                  <Shield className="w-3 h-3 lg:w-4 lg:h-4" />
                  <span>Decentralized VPN Network</span>
                </div>

                {/* Hero Heading */}
                <div className="space-y-3 lg:space-y-4">
                  <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight">
                    <span className="text-red-500">
                      Secure
                    </span>{" "}
                    Your Privacy
                  </h1>
                  <p className="text-lg sm:text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed px-4">
                    Professional-grade VPN service powered by Akash Network's decentralized infrastructure. 
                    Download your OpenVPN config and connect instantly.
                  </p>
                </div>

                {/* Trust Indicators */}
                <div className="grid grid-cols-2 lg:flex lg:flex-wrap items-center justify-center gap-4 lg:gap-8 text-xs lg:text-sm text-muted-foreground px-4">
                  <div className="flex items-center gap-2 justify-center">
                    <Lock className="w-3 h-3 lg:w-4 lg:h-4 text-green-500" />
                    <span>AES-256 Encryption</span>
                  </div>
                  <div className="flex items-center gap-2 justify-center">
                    <Shield className="w-3 h-3 lg:w-4 lg:h-4 text-blue-500" />
                    <span>No Logs Policy</span>
                  </div>
                  <div className="flex items-center gap-2 justify-center">
                    <Zap className="w-3 h-3 lg:w-4 lg:h-4 text-yellow-500" />
                    <span>Lightning Fast</span>
                  </div>
                  <div className="flex items-center gap-2 justify-center">
                    <Globe2 className="w-3 h-3 lg:w-4 lg:h-4 text-purple-500" />
                    <span>Global Servers</span>
                  </div>
                </div>

                {/* CTA Button */}
                <div className="pt-2 lg:pt-4">
                  <Button size="lg" className="px-8 py-8 sm:px-8 sm:py-8 text-base sm:text-lg font-semibold min-h-[4rem]" asChild>
                    <a href="#download">
                      <Download className="w-8 h-8 lg:w-8 lg:h-8 mr-2" />
                      Get Started Free
                      <ArrowRight className="w-8 h-8 lg:w-8 lg:h-8 ml-2" />
                    </a>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Download Section */}
        <section id="download" className="py-20 px-4 bg-card/30">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Choose Your Server Location
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Select a server location and download your OpenVPN configuration file. 
                It's that simple – no registration required.
              </p>
            </div>

            <ConnectionControls />

            {/* Setup Instructions */}
            <div className="mt-16 bg-card border rounded-xl p-8">
              <h3 className="text-xl font-semibold mb-6 text-center">Quick Setup Guide</h3>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center space-y-3">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                    <span className="text-primary font-bold text-lg">1</span>
                  </div>
                  <h4 className="font-semibold">Download Config</h4>
                  <p className="text-sm text-muted-foreground">
                    Click on your preferred server location to download the .ovpn file
                  </p>
                </div>
                <div className="text-center space-y-3">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                    <span className="text-primary font-bold text-lg">2</span>
                  </div>
                  <h4 className="font-semibold">Install OpenVPN</h4>
                  <p className="text-sm text-muted-foreground">
                    Install OpenVPN client on your device if you haven't already
                  </p>
                </div>
                <div className="text-center space-y-3">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                    <span className="text-primary font-bold text-lg">3</span>
                  </div>
                  <h4 className="font-semibold">Connect Securely</h4>
                  <p className="text-sm text-muted-foreground">
                    Import the config file and connect using the provided credentials
                  </p>
                </div>
              </div>
              <div className="text-center mt-8">
                <Button variant="outline" asChild>
                  <Link href="/docs">
                    <span>View Detailed Setup Guide</span>
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <BenefitsSection />

        {/* Social Proof / Stats */}
        <section className="py-16 px-4 bg-muted/30">
          <div className="max-w-4xl mx-auto text-center">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div className="space-y-2">
                <div className="text-3xl font-bold text-primary">99.9%</div>
                <div className="text-sm text-muted-foreground">Uptime</div>
              </div>
              <div className="space-y-2">
                <div className="text-3xl font-bold text-primary">0</div>
                <div className="text-sm text-muted-foreground">Logs Stored</div>
              </div>
              <div className="space-y-2">
                <div className="text-3xl font-bold text-primary">3</div>
                <div className="text-sm text-muted-foreground">Global Locations</div>
              </div>
              <div className="space-y-2">
                <div className="text-3xl font-bold text-primary">24/7</div>
                <div className="text-sm text-muted-foreground">Protection</div>
              </div>
            </div>
          </div>
        </section>

        {/* Footer CTA */}
        <section className="py-20 px-4">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <h2 className="text-3xl md:text-4xl font-bold">
              Ready to Protect Your Privacy?
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Join thousands of users who trust Akash VPN for their online security and privacy needs.
            </p>
            <Button size="lg" className="px-8 py-8 text-lg font-semibold" asChild>
              <a href="#download">
                <Download className="w-5 h-5 mr-2" />
                Download Now - It's Free
              </a>
            </Button>
          </div>
        </section>
      </main>
    </div>
  );
}
