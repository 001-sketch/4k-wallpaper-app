"use client";

import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function TermsOfService() {
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
            Terms of Service
          </h1>
          <p className="text-muted-foreground">
            Last updated: {new Date().toLocaleDateString()}
          </p>
        </div>

        {/* Content */}
        <div className="prose prose-invert max-w-none space-y-8 text-muted-foreground">
          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-foreground">1. Agreement to Terms</h2>
            <p>
              By accessing and using the Wallscape application, you accept and agree to be bound by 
              the terms and provision of this agreement. If you do not agree to abide by the above, 
              please do not use this service.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-foreground">2. Use License</h2>
            <p>
              Permission is granted to temporarily download one copy of the materials (information or 
              software) on Wallscape for personal, non-commercial transitory viewing only. This is the 
              grant of a license, not a transfer of title, and under this license you may not:
            </p>
            <ul className="list-disc list-inside space-y-2">
              <li>Modifying or copying the materials</li>
              <li>Using the materials for any commercial purpose or for any public display</li>
              <li>Attempting to decompile or reverse engineer any software contained on Wallscape</li>
              <li>Removing any copyright or other proprietary notations from the materials</li>
              <li>Transferring the materials to another person or "mirror" the materials on any other server</li>
              <li>Attempting to gain unauthorized access to any portion or feature of Wallscape</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-foreground">3. Disclaimer</h2>
            <p>
              The materials on Wallscape are provided "as is". Wallscape makes no warranties, expressed 
              or implied, and hereby disclaims and negates all other warranties including, without 
              limitation, implied warranties or conditions of merchantability, fitness for a particular 
              purpose, or non-infringement of intellectual property or other violation of rights.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-foreground">4. Limitations</h2>
            <p>
              In no event shall Wallscape or its suppliers be liable for any damages (including, without 
              limitation, damages for loss of data or profit, or due to business interruption) arising out 
              of the use or inability to use the materials on Wallscape.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-foreground">5. Accuracy of Materials</h2>
            <p>
              The materials appearing on Wallscape could include technical, typographical, or photographic 
              errors. Wallscape does not warrant that any of the materials on its website are accurate, 
              complete, or current. Wallscape may make changes to the materials contained on its website 
              at any time without notice.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-foreground">6. User Responsibilities</h2>
            <p>You are responsible for:</p>
            <ul className="list-disc list-inside space-y-2">
              <li>Maintaining the confidentiality of any account information you may have</li>
              <li>Being responsible for all activity that occurs under your account</li>
              <li>Notifying us immediately of any unauthorized use of your account</li>
              <li>Using the Service in compliance with all applicable laws and regulations</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-foreground">7. Modifications</h2>
            <p>
              Wallscape may revise these terms of service for its website at any time without notice. 
              By using this website, you are agreeing to be bound by the then current version of these 
              terms of service.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-foreground">8. Governing Law</h2>
            <p>
              These terms and conditions are governed by and construed in accordance with the laws of 
              applicable jurisdiction, and you irrevocably submit to the exclusive jurisdiction of the 
              courts in that location.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-foreground">9. Contact Us</h2>
            <p>
              If you have any questions about these Terms of Service, please contact us at{" "}
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
