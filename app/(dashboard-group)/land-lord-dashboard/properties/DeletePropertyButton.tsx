
"use client";

import { useState } from "react";
import { Loader2, Trash2, X } from "lucide-react";
import { toast } from "sonner";

import { deleteProperty } from "@/service/property.service";

interface DeletePropertyButtonProps {
  propertyId: string;
  propertyTitle: string;
}

const DeletePropertyButton = ({
  propertyId,
  propertyTitle,
}: DeletePropertyButtonProps) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    try {
      setLoading(true);

      // Delete from backend
      await deleteProperty(propertyId);

      window.dispatchEvent(
        new CustomEvent("property-deleted", {
          detail: propertyId,
        })
      );

      toast.success("Property deleted successfully");

      setOpen(false);
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
    <>
      {/* DELETE BUTTON */}

      <button
        type="button"
        onClick={() => setOpen(true)}
        className="flex items-center justify-center rounded-xl border border-red-500/30 px-3 py-2.5 text-red-500 transition-colors hover:bg-red-500/10"
        aria-label={`Delete ${propertyTitle}`}
      >
        <Trash2 className="size-3.5" />
      </button>

      {/* CONFIRMATION MODAL */}

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-md rounded-2xl border border-border bg-card p-6 shadow-xl">
            {/* HEADER */}

            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="text-lg font-bold">
                  Delete Property?
                </h2>

                <p className="mt-1 text-sm text-muted-foreground">
                  Are you sure you want to delete this property?
                </p>
              </div>

              <button
                type="button"
                onClick={() => setOpen(false)}
                disabled={loading}
                className="rounded-lg p-1.5 transition-colors hover:bg-muted"
              >
                <X className="size-5" />
              </button>
            </div>

            {/* PROPERTY TITLE */}

            <div className="mt-4 rounded-xl bg-muted/50 p-3">
              <p className="truncate text-sm font-semibold">
                {propertyTitle}
              </p>
            </div>

            <p className="mt-3 text-xs leading-5 text-muted-foreground">
              This action cannot be undone. The property and its
              related rental data will be removed.
            </p>

            {/* ACTIONS */}

            <div className="mt-6 flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setOpen(false)}
                disabled={loading}
                className="rounded-xl border border-border px-4 py-2.5 text-sm font-semibold transition-colors hover:bg-muted disabled:cursor-not-allowed disabled:opacity-50"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={handleDelete}
                disabled={loading}
                className="inline-flex items-center gap-2 rounded-xl bg-red-500 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-red-600 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {loading ? (
                  <>
                    <Loader2 className="size-4 animate-spin" />
                    Deleting...
                  </>
                ) : (
                  <>
                    <Trash2 className="size-4" />
                    Delete
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default DeletePropertyButton;

