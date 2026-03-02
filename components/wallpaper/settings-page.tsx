"use client";

import React from "react";

import { useState } from "react";
import Link from "next/link";
import { Bell, Shield, HelpCircle, ChevronRight, Download } from "lucide-react";
import { Switch } from "@/components/ui/switch";

export function SettingsPage() {
  const [notifications, setNotifications] = useState(true);
  const [autoDownload, setAutoDownload] = useState(false);

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

      {/* More */}
      <section className="px-4 mb-6">
        <h2 className="text-sm font-semibold text-foreground mb-3">More</h2>
        <div className="space-y-1">
          <SettingsLink icon={Shield} title="Privacy Policy" href="/privacy-policy" />
          <SettingsLink icon={HelpCircle} title="Help & Support" href="/help-support" />
        </div>
      </section>

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
  href,
}: {
  icon: React.ElementType;
  title: string;
  href: string;
}) {
  return (
    <Link href={href} className="w-full flex items-center gap-3 p-4 rounded-xl bg-secondary hover:bg-secondary/80 transition-colors">  
      <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center flex-shrink-0">  
        <Icon className="w-5 h-5 text-muted-foreground" />  
      </div>  
      <span className="flex-1 text-sm font-medium text-foreground text-left">{title}</span>  
      <ChevronRight className="w-4 h-4 text-muted-foreground" />  
    </Link>  
  );
}