"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Shield, ShieldOff } from "lucide-react";

export function ConnectionControls() {
  const [isConnected, setIsConnected] = useState(false);

  const handleConnect = () => {
    setIsConnected(!isConnected);
  };

  return (
    <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
      <Button
        onClick={handleConnect}
        size="lg"
        className={`px-8 py-3 text-lg font-semibold transition-all duration-300 ${
          isConnected 
            ? 'bg-green-500 hover:bg-green-600 text-white' 
            : 'bg-primary hover:bg-primary/90'
        }`}
      >
        {isConnected ? (
          <>
            <Shield className="w-5 h-5 mr-2" />
            Connected
          </>
        ) : (
          <>
            <Shield className="w-5 h-5 mr-2" />
            Connect
          </>
        )}
      </Button>

      <Button
        onClick={() => setIsConnected(false)}
        variant="outline"
        size="lg"
        className="px-8 py-3 text-lg font-semibold"
        disabled={!isConnected}
      >
        <ShieldOff className="w-5 h-5 mr-2" />
        Disconnect
      </Button>
    </div>
  );
}
