"use client";

import { Button } from "@/components/ui/button";
import { Moon, Sun, Shield, FileText, Zap, Github } from "lucide-react";
import { useTheme } from "@/components/theme-provider";

export function Sidebar() {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <div className="fixed left-0 top-0 h-full w-64 bg-sidebar border-r border-sidebar-border p-6 flex flex-col">
      {/* Logo */}
      <div className="mb-8">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
            <span className="text-primary-foreground font-bold text-lg">A</span>
          </div>
          <span className="font-bold text-xl">Akash VPN</span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-2">
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

      {/* Footer */}
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
  );
}
