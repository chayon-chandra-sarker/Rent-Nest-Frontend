"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2, Save, X } from "lucide-react";
import { toast } from "sonner";

import {
  updateProfile,
  UpdateProfileData,
  UserProfile,
} from "@/service/user.service";

interface ProfileEditFormProps {
  profile: UserProfile;
  onClose: () => void;
  onUpdated: (profile: UserProfile) => void;
}

const ProfileEditForm = ({
  profile,
  onClose,
  onUpdated,
}: ProfileEditFormProps) => {
  const router = useRouter();

  const [name, setName] = useState(profile.name ?? "");
  const [phone, setPhone] = useState(profile.phone ?? "");
  const [image, setImage] = useState(profile.image ?? "");
  const [address, setAddress] = useState(profile.address ?? "");

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (
    event: FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();

    if (loading) return;

    try {
      setLoading(true);
      const payload: UpdateProfileData = {
        name: name.trim(),
        phone: phone.trim(),
        image: image.trim(),
        address: address.trim(),
      };

      const updatedProfile = await updateProfile(payload);

      onUpdated(updatedProfile);

      toast.success("Profile updated successfully!");

      onClose();

      router.refresh();
    } catch (error) {
      console.error("Update profile error:", error);

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
    <div className="rounded-3xl border border-primary/20 bg-card shadow-sm">
  
      <div className="flex items-center justify-between border-b border-border/60 px-5 py-5 sm:px-7">
        <div>
          <h2 className="text-lg font-bold">
            Edit Profile
          </h2>

          <p className="mt-1 text-sm text-muted-foreground">
            Update your personal information.
          </p>
        </div>

        {/* Close */}
        <button
          type="button"
          onClick={onClose}
          disabled={loading}
          aria-label="Close edit profile"
          className="flex size-9 items-center justify-center rounded-xl border border-border transition hover:bg-muted disabled:cursor-not-allowed disabled:opacity-50"
        >
          <X className="size-4" />
        </button>
      </div>

      <form
        onSubmit={handleSubmit}
        className="space-y-5 p-5 sm:p-7"
      >

        <div>
          <label
            htmlFor="profile-name"
            className="mb-2 block text-sm font-semibold"
          >
            Full Name
          </label>

          <input
            id="profile-name"
            type="text"
            value={name}
            onChange={(event) => {
              setName(event.target.value);
            }}
            placeholder="Enter your name"
            disabled={loading}
            className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/10 disabled:cursor-not-allowed disabled:opacity-60"
          />
        </div>

        <div>
          <label
            htmlFor="profile-phone"
            className="mb-2 block text-sm font-semibold"
          >
            Phone Number
          </label>

          <input
            id="profile-phone"
            type="tel"
            value={phone}
            onChange={(event) => {
              setPhone(event.target.value);
            }}
            placeholder="Enter your phone number"
            disabled={loading}
            className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/10 disabled:cursor-not-allowed disabled:opacity-60"
          />
        </div>

        <div>
          <label
            htmlFor="profile-image"
            className="mb-2 block text-sm font-semibold"
          >
            Profile Image URL
          </label>

          <input
            id="profile-image"
            type="url"
            value={image}
            onChange={(event) => {
              setImage(event.target.value);
            }}
            placeholder="https://example.com/profile.jpg"
            disabled={loading}
            className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/10 disabled:cursor-not-allowed disabled:opacity-60"
          />

          <p className="mt-1.5 text-xs text-muted-foreground">
            Use a valid public image URL.
          </p>
        </div>

        <div>
          <label
            htmlFor="profile-address"
            className="mb-2 block text-sm font-semibold"
          >
            Address
          </label>

          <textarea
            id="profile-address"
            value={address}
            onChange={(event) => {
              setAddress(event.target.value);
            }}
            placeholder="Enter your address"
            rows={3}
            disabled={loading}
            className="w-full resize-none rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/10 disabled:cursor-not-allowed disabled:opacity-60"
          />
        </div>

        <div className="flex flex-col-reverse gap-3 border-t border-border/60 pt-5 sm:flex-row sm:justify-end">
          {/* Cancel */}
          <button
            type="button"
            onClick={onClose}
            disabled={loading}
            className="rounded-xl border border-border px-5 py-3 text-sm font-semibold transition hover:bg-muted disabled:cursor-not-allowed disabled:opacity-50"
          >
            Cancel
          </button>

          {/* Save */}
          <button
            type="submit"
            disabled={loading}
            className="flex items-center justify-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-bold text-primary-foreground transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? (
              <>
                <Loader2 className="size-4 animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Save className="size-4" />
                Save Changes
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProfileEditForm;