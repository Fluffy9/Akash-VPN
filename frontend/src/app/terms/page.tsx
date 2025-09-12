"use client";

import { Sidebar } from "@/components/sidebar";
import { MobileNav } from "@/components/mobile-nav";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FileText, AlertTriangle, Scale, Globe, Calendar, Shield } from "lucide-react";

export default function TermsOfUse() {
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
              <FileText className="w-6 h-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-4xl font-bold">Terms of Use</h1>
              <p className="text-muted-foreground text-lg">Service terms and conditions</p>
            </div>
          </div>
          
          <div className="flex flex-wrap gap-3 mt-6">
            <Badge variant="secondary" className="flex items-center gap-2">
              <Scale className="w-3 h-3" />
              Fair Use Policy
            </Badge>
            <Badge variant="secondary" className="flex items-center gap-2">
              <Shield className="w-3 h-3" />
              Free Service
            </Badge>
            <Badge variant="secondary" className="flex items-center gap-2">
              <Globe className="w-3 h-3" />
              Open Source
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

        {/* Terms Content */}
        <div className="space-y-8">
          
          <Card>
            <CardHeader>
              <CardTitle>Acceptance of Terms</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground leading-relaxed">
                By using Akash VPN, you agree to be bound by these Terms of Use. If you do not agree 
                to these terms, please do not use our service. These terms apply to all users of the 
                Akash VPN service.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Service Description</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-muted-foreground leading-relaxed">
                  Akash VPN is a free, open-source VPN service powered by the Akash Network's decentralized 
                  infrastructure. We provide:
                </p>
                <ul className="list-disc pl-6 text-muted-foreground space-y-1">
                  <li>Encrypted internet connection through our VPN servers</li>
                  <li>OpenVPN configuration files for various server locations</li>
                  <li>No registration required access</li>
                  <li>Community-driven development and support</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Scale className="w-5 h-5" />
                Acceptable Use Policy
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-muted-foreground leading-relaxed">
                  You agree to use Akash VPN responsibly and in accordance with applicable laws. 
                  You may NOT use our service for:
                </p>
                <ul className="list-disc pl-6 text-muted-foreground space-y-1">
                  <li>Illegal activities or content distribution</li>
                  <li>Spamming, phishing, or malware distribution</li>
                  <li>Harassment, abuse, or hate speech</li>
                  <li>Copyright infringement or intellectual property violations</li>
                  <li>Attempting to hack, disrupt, or overload our servers</li>
                  <li>Commercial use without explicit permission</li>
                  <li>Any activity that could harm the service or other users</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="w-5 h-5" />
                Service Availability
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-muted-foreground leading-relaxed">
                  Akash VPN is provided "as is" and "as available." We make no guarantees about:
                </p>
                <ul className="list-disc pl-6 text-muted-foreground space-y-1">
                  <li>100% uptime or service availability</li>
                  <li>Connection speeds or performance</li>
                  <li>Uninterrupted access to our servers</li>
                  <li>Compatibility with all devices or configurations</li>
                </ul>
                <p className="text-muted-foreground">
                  Our servers run on decentralized infrastructure, which may experience occasional 
                  downtime or maintenance periods.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Privacy and Logging</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground leading-relaxed">
                We maintain a strict no-logs policy. We do not monitor, log, or store any of your 
                online activities. For complete details about our privacy practices, please refer 
                to our Privacy Policy.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Intellectual Property</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-muted-foreground leading-relaxed">
                  Akash VPN is open-source software. Our code is available under open-source licenses 
                  on GitHub. You are free to:
                </p>
                <ul className="list-disc pl-6 text-muted-foreground space-y-1">
                  <li>View and modify the source code</li>
                  <li>Contribute improvements and bug fixes</li>
                  <li>Create your own deployments (following license terms)</li>
                  <li>Share and distribute according to the license</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Limitation of Liability</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-muted-foreground leading-relaxed">
                  Akash VPN is provided free of charge. To the maximum extent permitted by law, 
                  we disclaim all warranties and shall not be liable for:
                </p>
                <ul className="list-disc pl-6 text-muted-foreground space-y-1">
                  <li>Any damages arising from your use of the service</li>
                  <li>Loss of data or privacy breaches</li>
                  <li>Service interruptions or downtime</li>
                  <li>Actions taken by third parties</li>
                  <li>Compliance with local laws and regulations</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>User Responsibilities</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-muted-foreground leading-relaxed">
                  As a user of Akash VPN, you are responsible for:
                </p>
                <ul className="list-disc pl-6 text-muted-foreground space-y-1">
                  <li>Ensuring your use complies with applicable laws</li>
                  <li>Protecting your OpenVPN configuration files</li>
                  <li>Not sharing credentials with unauthorized users</li>
                  <li>Respecting the rights of others online</li>
                  <li>Using the service in good faith</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Termination</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground leading-relaxed">
                We reserve the right to terminate access to our service for users who violate these 
                terms. Since we don't track users, termination typically involves blocking specific 
                IP addresses or implementing technical measures to prevent abuse.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Governing Law</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground leading-relaxed">
                These terms are governed by the laws of the jurisdiction where our primary operations 
                are based. Any disputes shall be resolved through binding arbitration or in the courts 
                of competent jurisdiction.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Changes to Terms</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground leading-relaxed">
                We may update these Terms of Use from time to time. Changes will be posted on this page 
                with an updated "Last Modified" date. Continued use of the service after changes 
                constitutes acceptance of the new terms.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Contact Information</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground leading-relaxed">
                For questions about these Terms of Use, please contact us through:
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
