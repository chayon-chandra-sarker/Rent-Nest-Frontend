"use client";

import Link from "next/link";
import { ArrowUpRight, Mail, MapPin, UserRound } from "lucide-react";
import { FaFacebookF, FaGithub } from "react-icons/fa";

const footerLinks = [
  { label: "Home", href: "/" },
  { label: "Categories", href: "/categories" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

const socials = [
  {
    label: "Facebook",
    href: "https://www.facebook.com/chayonsarkerns",
    icon: FaFacebookF,
  },
  {
    label: "Portfolio",
    href: "https://chayonsarker.vercel.app/",
    icon: UserRound,
  },
  {
    label: "GitHub",
    href: "https://github.com/chayon-chandra-sarker",
    icon: FaGithub,
  },
  
];

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-background">
      <div className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 sm:py-12 lg:px-8">
        {/* Main Footer */}
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-2">
            <Link href="/" className="inline-flex items-center gap-2.5">
              <div className="flex size-10 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-sm">
                <span className="text-lg font-black">R</span>
              </div>

              <span className="text-xl font-extrabold tracking-tight text-foreground">
                Rent<span className="text-primary">Nest</span>
              </span>
            </Link>

            <p className="mt-4 max-w-md text-sm leading-6 text-muted-foreground">
              Find verified rental properties and connect with trusted
              landlords. Your next home is just a few clicks away.
            </p>

            {/* Contact Info */}
            <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:gap-x-6 sm:gap-y-3">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <MapPin className="size-4 shrink-0 text-primary" />
                Bangladesh
              </div>

              <p
                className="flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-primary"
              >
                <Mail className="size-4 shrink-0 text-primary" />
                chayon438@gmail.com
              </p>
            </div>
          </div>

          {/* Explore */}
          <div>
            <h3 className="text-sm font-semibold text-foreground">Explore</h3>

            <nav className="mt-4 flex flex-col gap-3">
              {footerLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="group flex w-fit items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-primary"
                >
                  {link.label}

                  <ArrowUpRight className="size-3 opacity-0 transition-all duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:opacity-100" />
                </Link>
              ))}
            </nav>
          </div>

          {/* Connect */}
          <div>
            <h3 className="text-sm font-semibold text-foreground">Connect</h3>

            <p className="mt-4 max-w-xs text-sm leading-6 text-muted-foreground">
              Follow us for updates, new properties and rental opportunities.
            </p>

            <div className="mt-5 flex items-center gap-2">
              {socials.map(({ label, href, icon: Icon }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  target="_blank"
                  className="flex size-9 items-center justify-center rounded-lg border border-border bg-background text-muted-foreground transition-all duration-200 hover:border-primary hover:bg-primary hover:text-primary-foreground"
                >
                  <Icon className="size-4" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
