import { getAuth } from "@/lib/auth/server";

export default function middleware(request: Request) {
  return getAuth().middleware({
    loginUrl: "/auth/sign-in",
  })(request);
}

export const config = {
  matcher: ["/account/:path*"],
};
