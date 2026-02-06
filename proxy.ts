import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing.config";

export default createMiddleware(routing);

export const config = {
  // Match only internationalized pathnames
  matcher: [
    // Skip all internal paths (_next, api, etc) and static files
    "/((?!api|_next|_static|_vercel|.*\\..*).*)",
    // Always run on root
    "/",
  ],
};
