
"use client";

import { useState } from "react";
import { Loader2, X } from "lucide-react";
import { toast } from "sonner";

import {
  updateProfile,
  type UserProfile,
} from "@/service/user.service";

interface EditProfileFormProps {
  profile: UserProfile;
  onClose: () => void;
  onUpdated: (profile: UserProfile) => void;
}

const EditProfileForm = ({
  profile,
  onClose,
  onUpdated,
}: EditProfileFormProps) => {
  const [name, setName] = useState(profile.name);
  const [phone, setPhone] = useState(profile.phone || "");
  const [address, setAddress] = useState(profile.address || "");
  const [image, setImage] = useState(profile.image || "");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>,
  ) => {
    e.preventDefault();

    try {
      setLoading(true);

      const updatedProfile = await updateProfile({
        name: name.trim(),
        phone: phone.trim(),
        address: address.trim(),
        image: image.trim(),
      });

      /*
       * Profile page update
       */
      onUpdated(updatedProfile);

      /*
       * Navbar + Sidebar update
       */
      window.dispatchEvent(
        new CustomEvent("profile-updated", {
          detail: updatedProfile,
        }),
      );

      toast.success("Profile updated successfully");

      onClose();
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "Failed to update profile",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-lg rounded-2xl border bg-background shadow-xl">
        {/* Header */}

        <div className="flex items-center justify-between border-b px-6 py-4">
          <div>
            <h2 className="text-lg font-semibold">
              Edit Profile
            </h2>

            <p className="text-sm text-muted-foreground">
              Update your personal information.
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            disabled={loading}
            className="rounded-lg p-2 text-muted-foreground transition hover:bg-muted hover:text-foreground disabled:opacity-50"
          >
            <X className="size-5" />
          </button>
        </div>

        {/* Form */}

        <form
          onSubmit={handleSubmit}
          className="space-y-5 p-6"
        >
          {/* Name */}

          <div className="space-y-2">
            <label
              htmlFor="name"
              className="text-sm font-medium"
            >
              Name
            </label>

            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
              required
              className="w-full rounded-xl border bg-background px-4 py-2.5 text-sm outline-none transition focus:border-primary"
            />
          </div>

          {/* Email */}

          <div className="space-y-2">
            <label
              htmlFor="email"
              className="text-sm font-medium"
            >
              Email
            </label>

            <input
              id="email"
              type="email"
              value={profile.email}
              disabled
              className="w-full cursor-not-allowed rounded-xl border bg-muted px-4 py-2.5 text-sm text-muted-foreground"
            />
          </div>

          {/* Phone */}

          <div className="space-y-2">
            <label
              htmlFor="phone"
              className="text-sm font-medium"
            >
              Phone
            </label>

            <input
              id="phone"
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Enter your phone number"
              className="w-full rounded-xl border bg-background px-4 py-2.5 text-sm outline-none transition focus:border-primary"
            />
          </div>

          {/* Address */}

          <div className="space-y-2">
            <label
              htmlFor="address"
              className="text-sm font-medium"
            >
              Address
            </label>

            <textarea
              id="address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Enter your address"
              rows={3}
              className="w-full resize-none rounded-xl border bg-background px-4 py-2.5 text-sm outline-none transition focus:border-primary"
            />
          </div>

          {/* Image */}

          <div className="space-y-2">
            <label
              htmlFor="image"
              className="text-sm font-medium"
            >
              Profile Image URL
            </label>

            <input
              id="image"
              type="url"
              value={image}
              onChange={(e) => setImage(e.target.value)}
              placeholder="https://example.com/image.jpg"
              className="w-full rounded-xl border bg-background px-4 py-2.5 text-sm outline-none transition focus:border-primary"
            />

            {/* Image Preview */}

            {image && (
              <div className="mt-3 flex items-center gap-3">
                <div className="size-14 overflow-hidden rounded-full border bg-muted">
                  <img
                    src={image}
                    alt="Preview"
                    className="size-full object-cover"
                    onError={(e) => {
                      e.currentTarget.style.display = "none";
                    }}
                  />
                </div>

                <p className="text-xs text-muted-foreground">
                  Image preview
                </p>
              </div>
            )}
          </div>

          {/* Actions */}

          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              disabled={loading}
              className="rounded-xl border px-4 py-2.5 text-sm font-medium transition hover:bg-muted disabled:opacity-50"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {loading && (
                <Loader2 className="size-4 animate-spin" />
              )}

              {loading ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProfileForm;

