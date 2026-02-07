"use client";

import Link from "next/link";
import { Home, Search, Compass, Heart, Settings } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { SignedIn, SignedOut, UserButton } from "@neondatabase/auth/react";

interface HeaderNavProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const navItems = [
  { id: "home", icon: Home, label: "Home" },
  { id: "explore", icon: Compass, label: "Explore" },
  { id: "search", icon: Search, label: "Search" },
  { id: "library", icon: Heart, label: "Library" },
  { id: "settings", icon: Settings, label: "Settings" },
];

export function HeaderNav({ activeTab, onTabChange }: HeaderNavProps) {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass border-b border-glass-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-3">
          <div className="flex items-center gap-2">
            <Link 
              href="/" 
              onClick={() => onTabChange("home")}
              className="text-xl font-bold gradient-text cursor-pointer hover:opacity-80 transition-opacity"
            >
              Wallscape
            </Link>
          </div>
          
          <nav className="flex items-center gap-1">
            {navItems.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => onTabChange(item.id)}
                  className={cn(
                    "flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200",
                    isActive
                      ? "gradient-bg text-foreground"
                      : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
                  )}
                  aria-label={item.label}
                  aria-current={isActive ? "page" : undefined}
                >
                  <item.icon className="w-4 h-4" />
                  <span className="text-sm font-medium hidden sm:inline">
                    {item.label}
                  </span>
                </button>
              );
            })}
          </nav>

          <div className="flex items-center gap-2">
            <SignedIn>
              <UserButton size="icon" />
            </SignedIn>
            <SignedOut>
                <Link href="/auth/sign-in">
                  <Button
                    size="sm"
                    className="rounded-full gradient-bg hover:opacity-90"
                  >
                    Sign in
                  </Button>
                </Link>
            </SignedOut>
          </div>
        </div>
      </div>
    </header>
  );
}
