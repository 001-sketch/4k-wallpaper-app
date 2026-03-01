"use client";

import React from "react";

import { useState } from "react";
import { Trash2, Bell, Shield, HelpCircle, ChevronRight, Download } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

export function SettingsPage() {
  const [notifications, setNotifications] = useState(true);
  const [autoDownload, setAutoDownload] = useState(false);
  const [isClearCacheOpen, setIsClearCacheOpen] = useState(false);

  const handleClearCache = () => {
    // In a real app, this would clear the image cache
    setIsClearCacheOpen(false);
  };

  return (
    <div className="pb-24 min-h-screen">
      {/* Header */}
      <header className="px-4 pt-4 pb-6 safe-top">
        <h1 className="text-xl font-bold text-foreground">Settings</h1>
        <p className="text-xs text-muted-foreground">Customize your experience</p>
      </header>

      {/* Preferences */}
      <section className="px-4 mb-6">
        <h2 className="text-sm font-semibold text-foreground mb-3">Preferences</h2>
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
            <div className="h-full gradient-bg rounded-full" style={{ width: "24.8%" }} />
          </div>
          <p className="text-xs text-muted-foreground mb-3">124 MB of 500 MB used</p>
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

      {/* More */}
      <section className="px-4 mb-6">
        <h2 className="text-sm font-semibold text-foreground mb-3">More</h2>
        <div className="space-y-1">
          <SettingsLink icon={Shield} title="Privacy Policy" />
          <SettingsLink icon={HelpCircle} title="Help & Support" />
        </div>
      </section>

      {/* Clear cache dialog */}
      <Dialog open={isClearCacheOpen} onOpenChange={setIsClearCacheOpen}>
        <DialogContent className="max-w-[90%] rounded-2xl">
          <DialogHeader>
            <DialogTitle>Clear Cache?</DialogTitle>
            <DialogDescription>
              This will remove all cached images. Your favorites and collections will
              not be affected.
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
      <span className="flex-1 text-sm font-medium text-foreground text-left">{title}</span>  
      <ChevronRight className="w-4 h-4 text-muted-foreground" />  
    </button>  
  );
}