import Link from "next/link";

export default function ProfileActions() {
  return (
    <div className="flex flex-wrap gap-3">
      <Link
        href="/profile/edit"
        className="rounded-lg bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition hover:opacity-90"
      >
        Edit Profile
      </Link>
    </div>
  );
}