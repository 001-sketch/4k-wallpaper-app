"use client";

import { ArrowLeft, Mail, MessageSquare } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Handle form submission here (e.g., send to API)
    console.log("Form submitted:", formData);
    setSubmitted(true);
    setTimeout(() => {
      setFormData({ name: "", email: "", subject: "", message: "" });
      setSubmitted(false);
    }, 3000);
  };

  return (
    <main className="min-h-screen pt-20 pb-20">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Back Button */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </Link>

        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold gradient-text mb-4">
            Contact Us
          </h1>
          <p className="text-muted-foreground text-lg">
            Have questions or feedback? We'd love to hear from you.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {/* Contact Info Cards */}
          <div className="glass p-6 rounded-lg border border-glass-border">
            <div className="flex items-center gap-3 mb-4">
              <Mail className="w-6 h-6 text-accent" />
              <h3 className="font-semibold">Email</h3>
            </div>
            <p className="text-muted-foreground">
              <a href="mailto:support@wallscape.app" className="hover:text-foreground transition-colors">
                support@wallscape.app
              </a>
            </p>
          </div>

          <div className="glass p-6 rounded-lg border border-glass-border">
            <div className="flex items-center gap-3 mb-4">
              <MessageSquare className="w-6 h-6 text-accent" />
              <h3 className="font-semibold">Response Time</h3>
            </div>
            <p className="text-muted-foreground">
              We typically respond within 24-48 hours
            </p>
          </div>

          <div className="glass p-6 rounded-lg border border-glass-border">
            <div className="flex items-center gap-3 mb-4">
              <MessageSquare className="w-6 h-6 text-accent" />
              <h3 className="font-semibold">Support</h3>
            </div>
            <p className="text-muted-foreground">
              Available Monday to Friday, 9 AM - 5 PM UTC
            </p>
          </div>
        </div>

        {/* Contact Form */}
        <div className="glass p-8 rounded-lg border border-glass-border">
          <h2 className="text-2xl font-bold mb-6">Send us a Message</h2>

          {submitted ? (
            <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4 text-green-400 text-center">
              Thank you for your message! We'll get back to you soon.
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 bg-secondary/50 border border-glass-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent transition-colors"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 bg-secondary/50 border border-glass-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent transition-colors"
                    placeholder="your@email.com"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-medium mb-2">
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 bg-secondary/50 border border-glass-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent transition-colors"
                  placeholder="What is this about?"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={6}
                  className="w-full px-4 py-2 bg-secondary/50 border border-glass-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent transition-colors resize-none"
                  placeholder="Your message..."
                />
              </div>

              <Button
                type="submit"
                className="w-full bg-accent hover:bg-accent/90 text-black font-semibold py-2 rounded-lg transition-colors"
              >
                Send Message
              </Button>
            </form>
          )}
        </div>

        {/* Additional Info */}
        <div className="mt-12 text-center text-muted-foreground">
          <p className="mb-4">
            You can also reach us through our social media channels or by visiting our{" "}
            <Link href="/privacy-policy" className="text-accent hover:underline">
              Privacy Policy
            </Link>
            {" "}and{" "}
            <Link href="/terms-of-service" className="text-accent hover:underline">
              Terms of Service
            </Link>
            .
          </p>
        </div>
      </div>
    </main>
  );
}
