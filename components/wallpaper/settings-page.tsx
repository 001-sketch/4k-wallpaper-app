"use client";

import React from "react"

import { useState } from "react";
import {
  Moon,
  Sun,
  Monitor,
  Trash2,
  Bell,
  Shield,
  HelpCircle,
  ChevronRight,
  Crown,
  Sparkles,
  Zap,
  Download,
  Heart,
  FolderPlus,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useFavoritesStore } from "@/lib/favorites-store";
import { Switch } from "@/components/ui/switch";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

type Theme = "light" | "dark" | "system";

export function SettingsPage() {
  const [theme, setTheme] = useState<Theme>("dark");
  const [notifications, setNotifications] = useState(true);
  const [autoDownload, setAutoDownload] = useState(false);
  const [isClearCacheOpen, setIsClearCacheOpen] = useState(false);

  const { favorites, downloads, collections } = useFavoritesStore();

  const themeOptions = [
    { id: "light" as Theme, icon: Sun, label: "Light" },
    { id: "dark" as Theme, icon: Moon, label: "Dark" },
    { id: "system" as Theme, icon: Monitor, label: "System" },
  ];

  const stats = [
    { icon: Heart, label: "Favorites", value: favorites.length },
    { icon: Download, label: "Downloads", value: downloads.length },
    { icon: FolderPlus, label: "Collections", value: collections.length },
  ];

  const handleClearCache = () => {
    // In a real app, this would clear the image cache
    setIsClearCacheOpen(false);
  };

  return (
    <div className="pb-24 min-h-screen">
      {/* Header */}
      <header className="px-4 pt-4 pb-6 safe-top">
        <h1 className="text-xl font-bold text-foreground">Settings</h1>
        <p className="text-xs text-muted-foreground">
          Customize your experience
        </p>
      </header>

      {/* Premium banner */}
      <section className="px-4 mb-6">
        <div className="relative overflow-hidden rounded-2xl gradient-bg p-5">
          <div className="absolute top-0 right-0 w-32 h-32 opacity-20">
            <Crown className="w-full h-full" />
          </div>
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-2">
              <Crown className="w-5 h-5 text-amber-300" />
              <span className="text-sm font-bold text-foreground">
                Upgrade to Premium
              </span>
            </div>
            <p className="text-xs text-foreground/80 mb-4 max-w-[200px]">
              Unlock 4K+ wallpapers, unlimited downloads, and exclusive
              collections
            </p>
            <div className="flex flex-wrap gap-2 mb-4">
              {[
                { icon: Sparkles, label: "4K+ Quality" },
                { icon: Zap, label: "No Ads" },
                { icon: Download, label: "Unlimited" },
              ].map((feature) => (
                <div
                  key={feature.label}
                  className="flex items-center gap-1 px-2 py-1 rounded-full bg-foreground/10 text-[10px] text-foreground"
                >
                  <feature.icon className="w-3 h-3" />
                  {feature.label}
                </div>
              ))}
            </div>
            <Button className="bg-foreground text-background hover:bg-foreground/90 rounded-full px-6 h-9 text-sm font-semibold">
              $3.99/month
            </Button>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="px-4 mb-6">
        <div className="grid grid-cols-3 gap-3">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="flex flex-col items-center gap-1 p-3 rounded-xl bg-secondary"
            >
              <stat.icon className="w-5 h-5 text-muted-foreground" />
              <span className="text-lg font-bold text-foreground">
                {stat.value}
              </span>
              <span className="text-[10px] text-muted-foreground">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* Theme */}
      <section className="px-4 mb-6">
        <h2 className="text-sm font-semibold text-foreground mb-3">
          Appearance
        </h2>
        <div className="flex gap-2 p-1 bg-secondary rounded-xl">
          {themeOptions.map((option) => (
            <button
              key={option.id}
              onClick={() => setTheme(option.id)}
              className={cn(
                "flex-1 flex items-center justify-center gap-2 py-3 rounded-lg text-sm font-medium transition-all",
                theme === option.id
                  ? "bg-background text-foreground shadow-sm"
                  : "text-muted-foreground"
              )}
              aria-pressed={theme === option.id}
            >
              <option.icon className="w-4 h-4" />
              {option.label}
            </button>
          ))}
        </div>
      </section>

      {/* Preferences */}
      <section className="px-4 mb-6">
        <h2 className="text-sm font-semibold text-foreground mb-3">
          Preferences
        </h2>
        <div className="space-y-1">
          <SettingsToggle
            icon={Bell}
            title="Notifications"
            description="Get notified about new wallpapers"
            checked={notifications}
            onCheckedChange={setNotifications}
          />
          <SettingsToggle
            icon={Download}
            title="Auto-download on WiFi"
            description="Download favorites when connected to WiFi"
            checked={autoDownload}
            onCheckedChange={setAutoDownload}
          />
        </div>
      </section>

      {/* Storage */}
      <section className="px-4 mb-6">
        <h2 className="text-sm font-semibold text-foreground mb-3">Storage</h2>
        <div className="p-4 rounded-xl bg-secondary">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm text-foreground">Cache Usage</span>
            <span className="text-sm text-muted-foreground">124 MB</span>
          </div>
          <div className="h-2 rounded-full bg-muted overflow-hidden mb-3">
            <div
              className="h-full gradient-bg rounded-full"
              style={{ width: "24.8%" }}
            />
          </div>
          <p className="text-xs text-muted-foreground mb-3">
            124 MB of 500 MB used
          </p>
          <Button
            variant="outline"
            className="w-full rounded-xl h-10 border-destructive/50 text-destructive hover:bg-destructive/10 bg-transparent"
            onClick={() => setIsClearCacheOpen(true)}
          >
            <Trash2 className="w-4 h-4 mr-2" />
            Clear Cache
          </Button>
        </div>
      </section>

      {/* Other */}
      <section className="px-4 mb-6">
        <h2 className="text-sm font-semibold text-foreground mb-3">More</h2>
        <div className="space-y-1">
          <SettingsLink icon={Shield} title="Privacy Policy" />
          <SettingsLink icon={HelpCircle} title="Help & Support" />
        </div>
      </section>

      {/* Version */}
      <div className="px-4 text-center">
        <p className="text-xs text-muted-foreground">Wallscape v1.0.0</p>
        <p className="text-[10px] text-muted-foreground mt-1">
          Made with care for wallpaper enthusiasts
        </p>
      </div>

      {/* Clear cache dialog */}
      <Dialog open={isClearCacheOpen} onOpenChange={setIsClearCacheOpen}>
        <DialogContent className="max-w-[90%] rounded-2xl">
          <DialogHeader>
            <DialogTitle>Clear Cache?</DialogTitle>
            <DialogDescription>
              This will remove all cached images. Your favorites and collections
              will not be affected.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex-row gap-2">
            <Button
              variant="outline"
              className="flex-1 rounded-xl bg-transparent"
              onClick={() => setIsClearCacheOpen(false)}
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              className="flex-1 rounded-xl"
              onClick={handleClearCache}
            >
              Clear
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

function SettingsToggle({
  icon: Icon,
  title,
  description,
  checked,
  onCheckedChange,
}: {
  icon: React.ElementType;
  title: string;
  description: string;
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
}) {
  return (
    <div className="flex items-center gap-3 p-4 rounded-xl bg-secondary">
      <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center flex-shrink-0">
        <Icon className="w-5 h-5 text-muted-foreground" />
      </div>
      <div className="flex-1 min-w-0">
        <h3 className="text-sm font-medium text-foreground">{title}</h3>
        <p className="text-xs text-muted-foreground">{description}</p>
      </div>
      <Switch checked={checked} onCheckedChange={onCheckedChange} />
    </div>
  );
}

function SettingsLink({
  icon: Icon,
  title,
}: {
  icon: React.ElementType;
  title: string;
}) {
  return (
    <button className="w-full flex items-center gap-3 p-4 rounded-xl bg-secondary hover:bg-secondary/80 transition-colors">
      <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center flex-shrink-0">
        <Icon className="w-5 h-5 text-muted-foreground" />
      </div>
      <span className="flex-1 text-sm font-medium text-foreground text-left">
        {title}
      </span>
      <ChevronRight className="w-4 h-4 text-muted-foreground" />
    </button>
  );
}
