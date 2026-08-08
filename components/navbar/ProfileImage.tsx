"use client";

import Image from "next/image";
import { useState } from "react";

type ProfileImageProps = {
  image?: string | null;
  name?: string;
  size?: "small" | "medium" | "large";
};

const ProfileImage = ({
  image,
  name,
  size = "medium",
}: ProfileImageProps) => {
  const [imageError, setImageError] = useState(false);

  const imageSize =
    size === "small" ? 32 : size === "medium" ? 40 : 44;

  const avatarLetter =
    name?.trim()?.charAt(0)?.toUpperCase() || "U";

  if (!image || imageError) {
    return (
      <div className="flex size-full items-center justify-center font-semibold text-primary">
        {avatarLetter}
      </div>
    );
  }

  return (
    <Image
      src={image}
      alt={name || "Profile"}
      fill
      sizes={`${imageSize}px`}
      className="object-cover"
      onError={() => setImageError(true)}
      unoptimized
    />
  );
};

export default ProfileImage;