import { Sidebar } from "@/components/sidebar";
import { EarthGlobe } from "@/components/earth-globe";
import { ConnectionControls } from "@/components/connection-controls";
import { BenefitsSection } from "@/components/benefits-section";
import { MobileNav } from "@/components/mobile-nav";

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
      <main className="lg:ml-64 min-h-screen flex flex-col">
        {/* Hero Section with Globe */}
        <section className="flex-1 flex items-center justify-center px-4 py-8">
          <div className="max-w-4xl mx-auto text-center">
            <div className="mb-8">
              <EarthGlobe />
            </div>
            <ConnectionControls />
            <div className="mt-6 text-sm text-muted-foreground max-w-md mx-auto">
              Secure, fast, and private VPN powered by decentralized infrastructure. 
              No logs, no tracking, just pure privacy.
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <BenefitsSection />
      </main>
    </div>
  );
}
