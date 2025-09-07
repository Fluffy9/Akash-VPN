"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Shield, Zap, Eye, Network, Lock, Globe } from "lucide-react";

const benefits = [
  {
    icon: Shield,
    title: "No Logs",
    description: "We don't track, store, or monitor your online activity. Your privacy is guaranteed."
  },
  {
    icon: Network,
    title: "Decentralized",
    description: "Powered by Akash Network's distributed infrastructure for maximum reliability."
  },
  {
    icon: Zap,
    title: "Lightning Fast",
    description: "Optimized routing and premium servers ensure blazing-fast connection speeds."
  },
  {
    icon: Eye,
    title: "Anonymous",
    description: "Browse the web without revealing your identity or location to anyone."
  },
  {
    icon: Lock,
    title: "Strong Encryption",
    description: "Your data is protected with AES-256-CBC encryption and secure protocols."
  },
  {
    icon: Globe,
    title: "Global Network",
    description: "Access servers in Wales, Texas, and Switzerland with easy server switching."
  }
];

export function BenefitsSection() {
  return (
    <section className="py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Why Choose Akash VPN?</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Experience the future of VPN technology with our decentralized, privacy-first approach.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <Card key={index} className="hover:shadow-lg transition-shadow duration-300">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <Icon className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-2">{benefit.title}</h3>
                      <p className="text-muted-foreground text-sm leading-relaxed">
                        {benefit.description}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
