"use client";

import { Sidebar } from "@/components/sidebar";
import { MobileNav } from "@/components/mobile-nav";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Shield, Eye, Database, Lock, Globe, Calendar, Mail } from "lucide-react";

export default function PrivacyPolicy() {
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
      <main className="lg:ml-64 min-h-screen flex flex-col p-6 lg:p-8 max-w-4xl">
        
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center">
              <Shield className="w-6 h-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-4xl font-bold">Privacy Policy</h1>
              <p className="text-muted-foreground text-lg">How we protect your privacy</p>
            </div>
          </div>
          
          <div className="flex flex-wrap gap-3 mt-6">
            <Badge variant="secondary" className="flex items-center gap-2">
              <Eye className="w-3 h-3" />
              No Logs Policy
            </Badge>
            <Badge variant="secondary" className="flex items-center gap-2">
              <Database className="w-3 h-3" />
              No Data Collection
            </Badge>
            <Badge variant="secondary" className="flex items-center gap-2">
              <Lock className="w-3 h-3" />
              End-to-End Privacy
            </Badge>
          </div>
        </div>

        {/* Last Updated */}
        <div className="mb-6 p-4 bg-muted rounded-lg">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Calendar className="w-4 h-4" />
            <span>Last updated: September 10, 2025</span>
          </div>
        </div>

        {/* Privacy Policy Content */}
        <div className="space-y-8">
          
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Eye className="w-5 h-5" />
                Our Privacy Commitment
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground leading-relaxed">
                At Akash VPN, your privacy is our top priority. We are committed to providing a truly private VPN service 
                that doesn't log, track, or store any of your online activities. This privacy policy explains how we handle 
                your data (spoiler: we don't collect it).
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Database className="w-5 h-5" />
                Information We Don't Collect
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">Zero Logs Policy</h4>
                  <p className="text-muted-foreground">
                    We do not log, monitor, or store any of your online activity, including:
                  </p>
                  <ul className="list-disc pl-6 mt-2 text-muted-foreground space-y-1">
                    <li>Websites you visit</li>
                    <li>Files you download</li>
                    <li>Your browsing history</li>
                    <li>Your real IP address</li>
                    <li>Connection timestamps</li>
                    <li>Bandwidth usage</li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-semibold mb-2">No Personal Information</h4>
                  <p className="text-muted-foreground">
                    We don't require registration, so we don't collect:
                  </p>
                  <ul className="list-disc pl-6 mt-2 text-muted-foreground space-y-1">
                    <li>Email addresses</li>
                    <li>Names or usernames</li>
                    <li>Payment information</li>
                    <li>Phone numbers</li>
                    <li>Physical addresses</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Globe className="w-5 h-5" />
                Decentralized Infrastructure
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-muted-foreground leading-relaxed">
                  Our VPN service is powered by the Akash Network, a decentralized cloud computing marketplace. 
                  This means:
                </p>
                <ul className="list-disc pl-6 text-muted-foreground space-y-1">
                  <li>No single point of control or surveillance</li>
                  <li>Servers are operated by independent providers</li>
                  <li>Distributed infrastructure across multiple jurisdictions</li>
                  <li>Enhanced privacy through decentralization</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lock className="w-5 h-5" />
                Technical Safeguards
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">Encryption</h4>
                  <p className="text-muted-foreground">
                    All your internet traffic is encrypted using AES-256-CBC encryption, ensuring that even if 
                    intercepted, your data remains unreadable.
                  </p>
                </div>
                
                <div>
                  <h4 className="font-semibold mb-2">No DNS Leaks</h4>
                  <p className="text-muted-foreground">
                    Our VPN routes all DNS requests through our secure servers, preventing DNS leaks that 
                    could reveal your browsing activity.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Minimal Technical Data</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground leading-relaxed mb-4">
                The only information we temporarily process is what's necessary for the VPN connection to function:
              </p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-1">
                <li>Server selection for connection routing</li>
                <li>Bandwidth allocation for quality of service</li>
                <li>Connection status for service reliability</li>
              </ul>
              <p className="text-muted-foreground mt-4">
                This data is processed in real-time and is never stored or logged.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Third Parties</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground leading-relaxed">
                We don't share any data with third parties because we don't collect any data to share. 
                We don't use analytics, tracking pixels, or any third-party services that could compromise your privacy.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Legal Requests</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground leading-relaxed">
                Since we don't log or store any user activity data, we have nothing to provide to law enforcement 
                or government agencies, even if legally compelled. We cannot share what we don't have.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Changes to This Policy</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground leading-relaxed">
                We may update this privacy policy from time to time. Any changes will be posted on this page 
                with an updated "Last Modified" date. Since we don't collect contact information, we recommend 
                checking this page periodically for updates.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Mail className="w-5 h-5" />
                Contact Us
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground leading-relaxed">
                If you have any questions about this privacy policy or our privacy practices, you can reach us through:
              </p>
              <ul className="list-disc pl-6 mt-2 text-muted-foreground space-y-1">
                <li>GitHub Issues: <a href="https://github.com/Fluffy9/Akash-VPN/issues" className="text-primary hover:underline">Akash-VPN Repository</a></li>
                <li>Discord Community: <a href="https://discord.com/invite/akash" className="text-primary hover:underline">Akash Network Discord</a></li>
              </ul>
            </CardContent>
          </Card>

        </div>

      </main>
    </div>
  );
}
