import { AccountView } from "@neondatabase/auth/react";
import type { Metadata } from "next";

export const dynamicParams = false;

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Account",
    robots: {
      index: false,
      follow: false,
    },
  };
}

export default async function AccountPage({
  params,
}: {
  params: Promise<{ path: string }>;
}) {
  const { path } = await params;

  return (
    <main className="container mx-auto flex grow flex-col items-center justify-center gap-3 self-center p-4 md:p-6">
      <AccountView path={path} />
    </main>
  );
}
