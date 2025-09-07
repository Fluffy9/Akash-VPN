"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Moon, Sun, Shield, FileText, Github } from "lucide-react";
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
        <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
          <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
            <span className="text-primary-foreground font-bold text-lg">A</span>
          </div>
          <span className="font-bold text-xl">Akash VPN</span>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-2">
        <Button variant="ghost" className="w-full justify-start gap-3" asChild>
          <a href="/docs">
            <Shield className="w-4 h-4" />
            About
          </a>
        </Button>
        <Button variant="ghost" className="w-full justify-start gap-3" asChild>
          <a href="/docs" target="_blank" rel="noopener noreferrer">
            <FileText className="w-4 h-4" />
            Docs
          </a>
        </Button>
      </nav>

      {/* Footer */}
      <div className="space-y-3">
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
          <Button variant="ghost" size="sm" className="flex-1" asChild>
            <a href="https://github.com/Fluffy9/Akash-VPN" target="_blank" rel="noopener noreferrer" title="GitHub Repository">
              <Github className="w-4 h-4" />
            </a>
          </Button>
          <Button variant="ghost" size="sm" className="flex-1" asChild>
            <a href="https://github.com/Fluffy9/Akash-VPN/tree/main/akash-vpn-docs" target="_blank" rel="noopener noreferrer" title="Full Documentation">
              <FileText className="w-4 h-4" />
            </a>
          </Button>
        </div>

        <div className="text-xs text-muted-foreground text-center pt-2 border-t border-sidebar-border">
          <p>Powered by Akash Network</p>
        </div>
      </div>
    </div>
  );
}
