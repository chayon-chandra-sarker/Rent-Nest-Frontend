
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const navLinks = [
  {
    label: "Home",
    href: "/",
  },
  {
    label: "Categories",
    href: "/categories",
  },
  {
    label: "About",
    href: "/about",
  },
  {
    label: "Contacts",
    href: "/contact",
  },
];

type NavLinksProps = {
  onClick?: () => void;
  mobile?: boolean;
  isLoggedIn?: boolean;
  role?: string;
};

const NavLinks = ({
  onClick,
  mobile = false,
  isLoggedIn = false,
}: NavLinksProps) => {
  const pathname = usePathname();

  const links = isLoggedIn
    ? [
        ...navLinks,
        {
          label: "Profile",
          href: "/profile",
        },
        {
          label: "Dashboard",
          href: "/dashboard",
        },
      ]
    : navLinks;

  // Active link check
  const isLinkActive = (href: string) => {
    // Profile route
    if (href === "/profile") {
      return (
        pathname === "/profile" ||
        pathname.endsWith("/dashboard/profile")
      );
    }

    // Dashboard route
    if (href === "/dashboard") {
      return (
        pathname === "/dashboard" ||
        (
          pathname.startsWith("/dashboard/") &&
          !pathname.endsWith("/profile")
        )
      );
    }

    // Other routes
    return (
      pathname === href ||
      pathname.startsWith(`${href}/`)
    );
  };

  if (mobile) {
    return (
      <nav className="flex flex-col gap-1">
        {links.map((link) => {
          const isActive = isLinkActive(link.href);

          return (
            <Link
              key={link.label}
              href={link.href}
              onClick={onClick}
              className={cn(
                "group relative overflow-hidden rounded-xl px-4 py-3 text-[15px] font-semibold transition-all duration-300",
                isActive
                  ? "bg-primary text-primary-foreground shadow-[0_6px_20px_rgba(0,220,229,0.25)]"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground",
              )}
            >
              <span className="relative z-10">
                {link.label}
              </span>

              {isActive && (
                <span className="absolute right-0 top-1/2 h-6 w-1 -translate-y-1/2 rounded-l-full bg-primary-foreground/80" />
              )}
            </Link>
          );
        })}
      </nav>
    );
  }

  return (
    <nav className="flex items-center gap-1">
      {links.map((link) => {
        const isActive = isLinkActive(link.href);

        return (
          <Link
            key={link.label}
            href={link.href}
            onClick={onClick}
            className={cn(
              "group relative overflow-hidden rounded-xl px-5 py-3 text-[15px] font-semibold tracking-[-0.01em] transition-all duration-300",
              isActive
                ? "bg-background text-foreground shadow-[0_4px_14px_rgba(0,0,0,0.08)] ring-1 ring-border/60"
                : "text-muted-foreground hover:bg-background/70 hover:text-foreground",
            )}
          >
            {/* Active background */}
            {isActive && (
              <span className="absolute inset-0 rounded-xl bg-primary/[0.04]" />
            )}

            {/* Text */}
            <span className="relative z-10">
              {link.label}
            </span>

            {/* Active indicator */}
            {isActive && (
              <span className="absolute bottom-1 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-primary shadow-[0_0_10px_3px_rgba(0,220,229,0.55)]" />
            )}

            {/* Hover line */}
            {!isActive && (
              <span className="absolute bottom-1 left-1/2 h-0.5 w-0 -translate-x-1/2 rounded-full bg-primary transition-all duration-300 group-hover:w-6" />
            )}
          </Link>
        );
      })}
    </nav>
  );
};

export default NavLinks;

