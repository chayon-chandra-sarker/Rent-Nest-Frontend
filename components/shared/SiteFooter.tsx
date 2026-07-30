import { Home, Globe, Mail, MessageCircle, Send } from "lucide-react";
import Link from "next/link";

const columns = [
  {
    title: "Explore",
    links: ["Browse rentals", "Featured homes", "Categories", "Neighborhoods"],
  },
  {
    title: "Company",
    links: ["About us", "Careers", "Press", "Contact"],
  },
  {
    title: "Support",
    links: ["Help center", "Safety", "Cancellation", "Report a listing"],
  },
  {
    title: "Legal",
    links: ["Terms of service", "Privacy policy", "Cookie policy", "Sitemap"],
  },
];

const socials = [Globe, MessageCircle, Mail, Send];

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-secondary/40">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Main Footer */}
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4 lg:grid-cols-6 lg:gap-6">
          {/* Brand */}
          <div className="col-span-2">
            <Link href="/" className="flex items-center gap-2">
              <span className="flex size-9 items-center justify-center rounded-xl bg-primary text-primary-foreground">
                <Home className="size-5" />
              </span>

              <span className="text-lg font-extrabold tracking-tight text-foreground">
                RentNest
              </span>
            </Link>

            <p className="mt-3 max-w-sm text-sm leading-relaxed text-muted-foreground">
              The trusted marketplace connecting tenants and landlords to
              discover, rent, and manage verified rental properties.
            </p>

            {/* Social */}
            <div className="mt-4 flex gap-2">
              {socials.map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  aria-label="Social media link"
                  className="flex size-8 items-center justify-center rounded-lg border border-border bg-background text-muted-foreground transition-colors hover:border-primary/40 hover:text-primary"
                >
                  <Icon className="size-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Columns */}
          {columns.map((col) => (
            <div key={col.title}>
              <h3 className="text-sm font-bold text-foreground">
                {col.title}
              </h3>

              <ul className="mt-3 space-y-2">
                {col.links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-sm text-muted-foreground transition-colors hover:text-primary"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom */}
        <div className="mt-8 flex flex-col items-center justify-between gap-2 border-t border-border pt-5 sm:flex-row">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} RentNest. All rights reserved.
          </p>

          <p className="text-xs text-muted-foreground">
            Made for renters and landlords everywhere.
          </p>
        </div>
      </div>
    </footer>
  );
}