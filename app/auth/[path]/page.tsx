import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { AuthView } from "@neondatabase/auth/react";
import type { Metadata } from "next";

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ path: string }>;
}): Promise<Metadata> {
  const { path } = await params;
  const title = path === "sign-up" ? "Create account" : "Sign in";

  return {
    title,
    robots: {
      index: false,
      follow: false,
    },
  };
}

export default async function AuthPage({
  params,
}: {
  params: Promise<{ path: string }>;
}) {
  const { path } = await params;
  const redirectTo = path === "sign-up" ? "/?auth=signup" : "/";

  return (
    <main className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="mb-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
            aria-label="Back to home"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to home
          </Link>
        </div>
        <AuthView path={path} redirectTo={redirectTo} />
      </div>
    </main>
  );
}
