import Link from "next/link";

const navLinks = [
  {
    label: "Browse",
    href: "/#featured",
  },
  {
    label: "Categories",
    href: "/#categories",
  },
  {
    label: "How it works",
    href: "/#how-it-works",
  },
  {
    label: "Testimonials",
    href: "/#testimonials",
  },
];

type NavLinksProps = {
  onClick?: () => void;
  mobile?: boolean;
};

const NavLinks = ({ onClick, mobile = false }: NavLinksProps) => {
  return (
    <nav
      className={
        mobile
          ? "flex flex-col gap-1"
          : "hidden items-center gap-7 md:flex"
      }
    >
      {navLinks.map((link) => (
        <Link
          key={link.label}
          href={link.href}
          onClick={onClick}
          className={
            mobile
              ? "rounded-md px-3 py-2.5 text-sm font-medium text-muted-foreground transition hover:bg-muted hover:text-foreground"
              : "text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          }
        >
          {link.label}
        </Link>
      ))}
    </nav>
  );
};

export default NavLinks;