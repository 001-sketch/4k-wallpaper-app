"use client";

import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function PrivacyPolicy() {
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
            Privacy Policy
          </h1>
          <p className="text-muted-foreground">
            Last updated: {new Date().toLocaleDateString()}
          </p>
        </div>

        {/* Content */}
        <div className="prose prose-invert max-w-none space-y-8 text-muted-foreground">
          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-foreground">1. Introduction</h2>
            <p>
              Wallscape ("we", "us", "our", or "Company") operates the Wallscape application. 
              This page informs you of our policies regarding the collection, use, and disclosure 
              of personal data when you use our Service and the choices you have associated with that data.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-foreground">2. Information Collection and Use</h2>
            <p>
              We collect several different types of information for various purposes to provide and 
              improve our Service to you.
            </p>
            <h3 className="text-xl font-semibold text-foreground mt-4">Types of Data Collected:</h3>
            <ul className="list-disc list-inside space-y-2">
              <li>
                <strong>Personal Data:</strong> While using our Service, we may ask you to provide 
                us with certain personally identifiable information that can be used to contact or 
                identify you ("Personal Data"). This may include, but is not limited to:
                <ul className="list-circle list-inside ml-4 mt-2 space-y-1">
                  <li>Email address</li>
                  <li>Usage data and preferences</li>
                  <li>Device information</li>
                </ul>
              </li>
              <li>
                <strong>Usage Data:</strong> We may also collect information on how the Service is 
                accessed and used ("Usage Data"). This may include information such as your computer's 
                Internet Protocol address, browser type, browser version, the pages you visit, the time 
                and date of your visit, and other diagnostic data.
              </li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-foreground">3. Use of Data</h2>
            <p>Wallscape uses the collected data for various purposes:</p>
            <ul className="list-disc list-inside space-y-2">
              <li>To provide and maintain our Service</li>
              <li>To notify you about changes to our Service</li>
              <li>To allow you to participate in interactive features of our Service</li>
              <li>To provide customer support</li>
              <li>To gather analysis or valuable information to improve our Service</li>
              <li>To monitor the usage of our Service</li>
              <li>To detect, prevent and address technical and security issues</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-foreground">4. Security of Data</h2>
            <p>
              The security of your data is important to us but remember that no method of transmission 
              over the Internet or method of electronic storage is 100% secure. While we strive to use 
              commercially acceptable means to protect your Personal Data, we cannot guarantee its 
              absolute security.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-foreground">5. Changes to This Privacy Policy</h2>
            <p>
              We may update our Privacy Policy from time to time. We will notify you of any changes by 
              posting the new Privacy Policy on this page and updating the "Last updated" date at the 
              top of this Privacy Policy.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-foreground">6. Contact Us</h2>
            <p>
              If you have any questions about this Privacy Policy, please contact us at{" "}
              <Link href="/contact" className="text-accent hover:underline">
                our contact page
              </Link>
              .
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
