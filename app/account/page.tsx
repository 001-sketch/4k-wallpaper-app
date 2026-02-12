import type { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Account",
  robots: {
    index: false,
    follow: false,
  },
};

export default function AccountPage() {
  redirect("/account/settings");
}
