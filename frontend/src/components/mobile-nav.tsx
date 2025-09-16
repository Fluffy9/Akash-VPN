"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, Shield, FileText, Zap, Github, Moon, Sun, Eye, Scale } from "lucide-react";
import { useTheme } from "@/components/theme-provider";
import Image from "next/image";
import akashLogo from "@/assets/akash-red-t.png";

export function MobileNav() {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <>
      {/* Top Bar */}
      <div className="relative z-50 flex items-center justify-between p-4 border-b border-border bg-background">
        <Link href="/" className="flex items-center gap-3">
          <div className="w-8 h-8 flex items-center justify-center">
            <Image 
              src={akashLogo} 
              alt="Akash VPN Logo" 
              width={32} 
              height={32}
              className="w-8 h-8 object-contain"
            />
          </div>
          <span className="font-bold text-xl">Akash VPN</span>
        </Link>
        
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="sm">
              <Menu className="w-5 h-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-64">
            <div className="flex flex-col h-full">
              {/* Logo */}
              <div className="mb-6 p-4">
                <Link href="/" className="flex items-center gap-3">
                  <div className="w-8 h-8 flex items-center justify-center">
                    <Image 
                      src={akashLogo} 
                      alt="Akash VPN Logo" 
                      width={32} 
                      height={32}
                      className="w-8 h-8 object-contain"
                    />
                  </div>
                  <span className="font-bold text-xl">Akash VPN</span>
                </Link>
              </div>

              {/* Secondary Actions */}
              <div className="space-y-4 flex-1">
                <div className="space-y-2">
                  <h3 className="text-sm font-medium text-muted-foreground px-3">Settings</h3>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={toggleTheme}
                    className="w-full justify-start gap-3"
                  >
                    {theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
                    {theme === "dark" ? "Light Mode" : "Dark Mode"}
                  </Button>
                </div>
                
                <div className="space-y-2">
                  <h3 className="text-sm font-medium text-muted-foreground px-3">Legal</h3>
                  <Button variant="ghost" size="sm" className="w-full justify-start gap-3" asChild>
                    <Link href="/privacy">
                      <Eye className="w-4 h-4" />
                      Privacy Policy
                    </Link>
                  </Button>
                  <Button variant="ghost" size="sm" className="w-full justify-start gap-3" asChild>
                    <Link href="/terms">
                      <Scale className="w-4 h-4" />
                      Terms of Use
                    </Link>
                  </Button>
                </div>
                
                <div className="space-y-2">
                  <h3 className="text-sm font-medium text-muted-foreground px-3">External Links</h3>
                  <Button variant="ghost" size="sm" className="w-full justify-start gap-3" asChild>
                    <a href="https://github.com/Fluffy9/Akash-VPN" target="_blank" rel="noopener noreferrer">
                      <Github className="w-4 h-4" />
                      GitHub Repository
                    </a>
                  </Button>
                  <Button variant="ghost" size="sm" className="w-full justify-start gap-3" asChild>
                    <a href="https://github.com/Fluffy9/Akash-VPN/tree/main/akash-vpn-docs" target="_blank" rel="noopener noreferrer">
                      <FileText className="w-4 h-4" />
                      Full Documentation
                    </a>
                  </Button>
                </div>
              </div>

              {/* Footer */}
              <div className="text-xs text-muted-foreground text-center pt-4 border-t border-border">
                <p>Powered by Akash Network</p>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>

      {/* Bottom Navigation - Primary Navigation */}
      <div className="fixed bottom-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-t border-border pb-safe pointer-events-auto">
        <div className="flex items-center justify-around max-w-sm mx-auto px-2 py-2">
          <Button variant="ghost" size="sm" className="flex-col gap-0.5 min-w-0 flex-1 h-12 px-1 pointer-events-auto" asChild>
            <Link href="/">
              <Shield className="w-4 h-4 sm:w-5 sm:h-5" />
              <span className="text-[10px] sm:text-xs truncate leading-tight">Home</span>
            </Link>
          </Button>
          <Button variant="ghost" size="sm" className="flex-col gap-0.5 min-w-0 flex-1 h-12 px-1 pointer-events-auto" asChild>
            <Link href="/docs">
              <FileText className="w-4 h-4 sm:w-5 sm:h-5" />
              <span className="text-[10px] sm:text-xs truncate leading-tight">Docs</span>
            </Link>
          </Button>
          <Button variant="default" size="sm" className="flex-col gap-0.5 min-w-0 flex-1 h-12 px-1 pointer-events-auto" asChild>
            <a href="#download">
              <Zap className="w-4 h-4 sm:w-5 sm:h-5" />
              <span className="text-[10px] sm:text-xs truncate leading-tight">Connect</span>
            </a>
          </Button>
        </div>
      </div>
    </>
  );
}
