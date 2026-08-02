"use client";

import { useState } from "react";
import { Loader2, Trash2 } from "lucide-react";
import { toast } from "sonner";

import { deleteProperty } from "@/service/property.service";

interface DeletePropertyButtonProps {
  propertyId: string;
  propertyTitle: string;
  onDeleted: (propertyId: string) => void;
}

const DeletePropertyButton = ({
  propertyId,
  propertyTitle,
  onDeleted,
}: DeletePropertyButtonProps) => {
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    const confirmed = window.confirm(
      `Are you sure you want to delete "${propertyTitle}"?`
    );

    if (!confirmed || loading) return;

    try {
      setLoading(true);

      await deleteProperty(propertyId);

      toast.success("Property deleted successfully!");

      onDeleted(propertyId);
    } catch (error) {
      console.error("Delete property error:", error);

      toast.error(
        error instanceof Error
          ? error.message
          : "Failed to delete property"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      type="button"
      onClick={handleDelete}
      disabled={loading}
      className="flex items-center justify-center rounded-xl border border-red-500/20 px-3 py-2.5 text-red-500 transition hover:bg-red-500/10 disabled:cursor-not-allowed disabled:opacity-50"
      aria-label={`Delete ${propertyTitle}`}
    >
      {loading ? (
        <Loader2 className="size-3.5 animate-spin" />
      ) : (
        <Trash2 className="size-3.5" />
      )}
    </button>
  );
};

export default DeletePropertyButton;