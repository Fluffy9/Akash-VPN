"use client";

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, Shield, FileText, Zap, Github, Moon, Sun } from "lucide-react";
import { useTheme } from "@/components/theme-provider";

export function MobileNav() {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <>
      {/* Top Bar */}
      <div className="flex items-center justify-between p-4 border-b border-border bg-background">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
            <span className="text-primary-foreground font-bold text-lg">A</span>
          </div>
          <span className="font-bold text-xl">Akash VPN</span>
        </div>
        
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="sm">
              <Menu className="w-5 h-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-64">
            <div className="flex flex-col h-full">
              <nav className="flex-1 space-y-2 mt-6">
                <Button variant="ghost" className="w-full justify-start gap-3">
                  <Shield className="w-4 h-4" />
                  About
                </Button>
                <Button variant="ghost" className="w-full justify-start gap-3">
                  <Zap className="w-4 h-4" />
                  Benefits
                </Button>
                <Button variant="ghost" className="w-full justify-start gap-3">
                  <FileText className="w-4 h-4" />
                  Docs
                </Button>
                <Button variant="default" className="w-full justify-start gap-3">
                  <Shield className="w-4 h-4" />
                  Connect
                </Button>
              </nav>

              <div className="space-y-4">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={toggleTheme}
                  className="w-full justify-start gap-3"
                >
                  {theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
                  {theme === "dark" ? "Light Mode" : "Dark Mode"}
                </Button>
                
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="sm" className="flex-1">
                    <Github className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="sm" className="flex-1">
                    Privacy
                  </Button>
                </div>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-background border-t border-border p-4">
        <div className="flex items-center justify-around">
          <Button variant="ghost" size="sm" className="flex-col gap-1">
            <Shield className="w-4 h-4" />
            <span className="text-xs">About</span>
          </Button>
          <Button variant="ghost" size="sm" className="flex-col gap-1">
            <Zap className="w-4 h-4" />
            <span className="text-xs">Benefits</span>
          </Button>
          <Button variant="ghost" size="sm" className="flex-col gap-1">
            <FileText className="w-4 h-4" />
            <span className="text-xs">Docs</span>
          </Button>
          <Button variant="default" size="sm" className="flex-col gap-1">
            <Shield className="w-4 h-4" />
            <span className="text-xs">Connect</span>
          </Button>
        </div>
      </div>
    </>
  );
}
