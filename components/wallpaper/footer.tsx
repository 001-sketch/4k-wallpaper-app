"use client";

import { Heart, Github, Mail, ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative glass border-t border-glass-border mt-20 safe-bottom">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-bold gradient-text">Wallscape</h2>
            </div>
            <p className="text-sm text-muted-foreground">
              Discover stunning 4K, 5K, and 8K wallpapers for every screen.
            </p>
          </div>

          {/* Links */}
          <div className="space-y-3">
            <h3 className="font-semibold text-sm">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="/" className="text-muted-foreground hover:text-foreground transition-colors">
                  Home
                </a>
              </li>
              <li>
                <a href="/wallpapers" className="text-muted-foreground hover:text-foreground transition-colors">
                  All Wallpapers
                </a>
              </li>
              <li>
                <a href="/help-support" className="text-muted-foreground hover:text-foreground transition-colors">
                  Help &amp; Support
                </a>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div className="space-y-3">
            <h3 className="font-semibold text-sm">Resources</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="/privacy-policy" className="text-muted-foreground hover:text-foreground transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="/terms-of-service" className="text-muted-foreground hover:text-foreground transition-colors">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="/contact" className="text-muted-foreground hover:text-foreground transition-colors">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div className="space-y-3">
            <h3 className="font-semibold text-sm">Follow Us</h3>
            <div className="flex gap-3">
              <a
                href="#"
                className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-secondary/50 text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
                aria-label="GitHub"
              >
                <Github className="w-5 h-5" />
              </a>
              <a
                href="https://x.com/WallScapeApp"
                className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-secondary/50 text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
                aria-label="X (Twitter)"
              >
                <svg
                  viewBox="0 0 1200 1227"
                  aria-hidden="true"
                  className="w-5 h-5 fill-current"
                >
                  <path d="M714.163 519.284L1160.89 0H1057.7L667.137 450.887L351.099 0H0L468.492 681.821L0 1226.37H103.19L515.387 749.895L849.245 1226.37H1200L714.137 519.284H714.163ZM567.147 689.27L521.68 624.475L144.01 79.694H303.1L607.412 513.895L652.878 578.69L1057.75 1154.67H898.66L567.147 689.296V689.27Z" />
                </svg>
              </a>
              <a
                href="mailto:mailstck@proton.me"
                className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-secondary/50 text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
                aria-label="Email"
              >
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-glass-border/50 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
            <p>
              © {currentYear} Wallscape. All rights reserved.
            </p>
            <p className="flex items-center gap-1">
              Made with <Heart className="w-4 h-4 text-accent" /> for wallpaper lovers
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
