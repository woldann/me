import { createNavigation } from "next-intl/navigation";
import { routing } from "./routing.config";

export { routing };

// Lightweight wrappers around Next.js' navigation APIs
export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing);
