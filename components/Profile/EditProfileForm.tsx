"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { ImageIcon, MapPin, Phone, Save, User } from "lucide-react";
import Image from "next/image";

interface EditProfileFormProps {
  currentName: string;
  currentPhone: string | null;
  currentAddress: string | null;
  currentImage: string | null;
}

export default function EditProfileForm({
  currentName,
  currentPhone,
  currentAddress,
  currentImage,
}: EditProfileFormProps) {
  const router = useRouter();

  const [name, setName] = useState(currentName);
  const [phone, setPhone] = useState(currentPhone || "");
  const [address, setAddress] = useState(currentAddress || "");
  const [image, setImage] = useState(currentImage || "");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const trimmedName = name.trim();
    const trimmedPhone = phone.trim();
    const trimmedAddress = address.trim();
    const trimmedImage = image.trim();

    if (!trimmedName) {
      toast.error("Name is required");
      return;
    }

    if (
      trimmedName === currentName &&
      trimmedPhone === (currentPhone || "") &&
      trimmedAddress === (currentAddress || "") &&
      trimmedImage === (currentImage || "")
    ) {
      toast.info("No changes made");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch("/api/profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: trimmedName,
          phone: trimmedPhone || null,
          address: trimmedAddress || null,
          image: trimmedImage || null,
        }),
      });

      const data = await response.json();

      if (!response.ok || !data?.success) {
        throw new Error(data?.message || "Failed to update profile");
      }

      toast.success(data?.message || "Profile updated successfully!");

      router.push("/admin-dashboard/profile");
      router.refresh();
    } catch (error) {
      console.error("Update profile error:", error);

      toast.error(
        error instanceof Error ? error.message : "Something went wrong",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="rounded-3xl border bg-card p-6 shadow-sm sm:p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold tracking-tight">Edit Profile</h1>

        <p className="mt-1 text-sm text-muted-foreground">
          Update your personal information.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Name */}
        <div className="space-y-2">
          <label
            htmlFor="name"
            className="flex items-center gap-2 text-sm font-medium"
          >
            <User className="size-4 text-primary" />
            Full Name
          </label>

          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your name"
            disabled={loading}
            className="w-full rounded-xl border bg-background px-4 py-3 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20 disabled:cursor-not-allowed disabled:opacity-50"
          />
        </div>

        {/* Phone */}
        <div className="space-y-2">
          <label
            htmlFor="phone"
            className="flex items-center gap-2 text-sm font-medium"
          >
            <Phone className="size-4 text-primary" />
            Phone Number
          </label>

          <input
            id="phone"
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="Enter your phone number"
            disabled={loading}
            className="w-full rounded-xl border bg-background px-4 py-3 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20 disabled:cursor-not-allowed disabled:opacity-50"
          />
        </div>

        {/* Image URL */}
        <div className="space-y-2">
          <label
            htmlFor="image"
            className="flex items-center gap-2 text-sm font-medium"
          >
            <ImageIcon className="size-4 text-primary" />
            Profile Image URL
          </label>

          <input
            id="image"
            type="url"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            placeholder="https://example.com/profile.jpg"
            disabled={loading}
            className="w-full rounded-xl border bg-background px-4 py-3 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20 disabled:cursor-not-allowed disabled:opacity-50"
          />

          <p className="text-xs text-muted-foreground">
            Paste a public image URL.
          </p>

          {/* Preview */}
          {image.trim() && (
            <div className="mt-3 flex items-center gap-4 rounded-2xl border bg-background/60 p-3">
              <Image
                src={image}
                alt="Profile preview"
                width={64}
                height={64}
                className="size-16 rounded-xl object-cover"
              />

              <div className="min-w-0">
                <p className="text-sm font-medium">Image Preview</p>

                <p className="truncate text-xs text-muted-foreground">
                  {image}
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Address */}
        <div className="space-y-2">
          <label
            htmlFor="address"
            className="flex items-center gap-2 text-sm font-medium"
          >
            <MapPin className="size-4 text-primary" />
            Address
          </label>

          <textarea
            id="address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Enter your address"
            rows={3}
            disabled={loading}
            className="w-full resize-none rounded-xl border bg-background px-4 py-3 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20 disabled:cursor-not-allowed disabled:opacity-50"
          />
        </div>

        {/* Buttons */}
        <div className="flex flex-col-reverse gap-3 pt-2 sm:flex-row sm:justify-end">
          <button
            type="button"
            onClick={() => router.push("/admin-dashboard/profile")}
            disabled={loading}
            className="rounded-xl border px-5 py-3 text-sm font-medium transition hover:bg-accent disabled:cursor-not-allowed disabled:opacity-50"
          >
            Cancel
          </button>

          <button
            type="submit"
            disabled={loading}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground shadow-sm transition hover:-translate-y-0.5 hover:shadow-md disabled:cursor-not-allowed disabled:opacity-50"
          >
            <Save className="size-4" />

            {loading ? "Updating..." : "Save Changes"}
          </button>
        </div>
      </form>
    </div>
  );
}
