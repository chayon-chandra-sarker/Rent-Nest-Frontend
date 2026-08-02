
"use client";

import { useEffect, useState } from "react";
import {
  AlertTriangle,
  Loader2,
  Trash2,
  X,
} from "lucide-react";
import { useRouter } from "next/navigation";
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
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  // ==========================================
  // Prevent background layout shift
  // ==========================================

  useEffect(() => {
    if (!open) return;

    const originalOverflow = document.body.style.overflow;
    const originalPaddingRight = document.body.style.paddingRight;

    // Calculate scrollbar width
    const scrollbarWidth =
      window.innerWidth - document.documentElement.clientWidth;

    // Prevent page jumping when scrollbar disappears
    if (scrollbarWidth > 0) {
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    }

    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = originalOverflow;
      document.body.style.paddingRight = originalPaddingRight;
    };
  }, [open]);

  // ==========================================
  // ESC key close
  // ==========================================

  useEffect(() => {
    if (!open || loading) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [open, loading]);

  // ==========================================
  // Delete property
  // ==========================================

  const handleDelete = async () => {
    try {
      setLoading(true);

      await deleteProperty(propertyId);

      toast.success("Property deleted successfully", {
        description: `${propertyTitle} has been removed.`,
      });

      setOpen(false);

      router.refresh();
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
      {/* ==========================================
          DELETE BUTTON
      ========================================== */}

      <button
        type="button"
        onClick={() => setOpen(true)}
        disabled={loading}
        className="flex items-center justify-center gap-1.5 rounded-xl border border-red-500/20 bg-red-500/5 px-3 py-2.5 text-xs font-semibold text-red-500 transition-colors duration-200 hover:border-red-500/30 hover:bg-red-500/10 disabled:cursor-not-allowed disabled:opacity-50"
        aria-label={`Delete ${propertyTitle}`}
      >
        <Trash2 className="size-3.5" />

        <span className="hidden sm:inline">
          Delete
        </span>
      </button>

      {/* ==========================================
          DELETE MODAL
      ========================================== */}

      {open && (
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center overflow-y-auto bg-black/60 p-4 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-labelledby="delete-property-title"
          onMouseDown={(event) => {
            // Only close when clicking the actual overlay
            if (
              event.target === event.currentTarget &&
              !loading
            ) {
              setOpen(false);
            }
          }}
        >
          {/* ==========================================
              MODAL CARD
          ========================================== */}

          <div
            className="relative w-full max-w-md overflow-hidden rounded-3xl border border-border/60 bg-card shadow-2xl"
            onMouseDown={(event) => {
              event.stopPropagation();
            }}
          >
            {/* ==========================================
                HEADER
            ========================================== */}

            <div className="flex items-center justify-between border-b border-border/60 px-5 py-4 sm:px-6">
              <div className="flex items-center gap-3">
                <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-red-500/10">
                  <Trash2 className="size-5 text-red-500" />
                </div>

                <div>
                  <h2
                    id="delete-property-title"
                    className="text-base font-bold"
                  >
                    Delete Property
                  </h2>

                  <p className="text-xs text-muted-foreground">
                    This action cannot be undone.
                  </p>
                </div>
              </div>

              {/* Close */}

              <button
                type="button"
                onClick={() => setOpen(false)}
                disabled={loading}
                className="flex size-9 items-center justify-center rounded-xl text-muted-foreground transition-colors duration-200 hover:bg-muted hover:text-foreground disabled:cursor-not-allowed disabled:opacity-50"
                aria-label="Close delete modal"
              >
                <X className="size-4" />
              </button>
            </div>

            {/* ==========================================
                CONTENT
            ========================================== */}

            <div className="px-5 py-6 sm:px-6">
              <div className="flex gap-4 rounded-2xl border border-red-500/15 bg-red-500/5 p-4">
                {/* Warning Icon */}

                <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-red-500/10">
                  <AlertTriangle className="size-5 text-red-500" />
                </div>

                {/* Message */}

                <div className="min-w-0">
                  <p className="text-sm font-semibold">
                    Are you sure you want to delete this property?
                  </p>

                  <p className="mt-1 text-sm leading-6 text-muted-foreground">
                    You are about to permanently delete{" "}
                    <span className="font-semibold text-foreground">
                      {propertyTitle}
                    </span>
                    .
                  </p>
                </div>
              </div>
            </div>

            {/* ==========================================
                ACTIONS
            ========================================== */}

            <div className="flex flex-col-reverse gap-2 border-t border-border/60 bg-muted/20 px-5 py-4 sm:flex-row sm:justify-end sm:px-6">
              {/* Cancel */}

              <button
                type="button"
                onClick={() => setOpen(false)}
                disabled={loading}
                className="rounded-xl border border-border px-4 py-2.5 text-sm font-semibold transition-colors duration-200 hover:bg-muted disabled:cursor-not-allowed disabled:opacity-50"
              >
                Cancel
              </button>

              {/* Confirm Delete */}

              <button
                type="button"
                onClick={handleDelete}
                disabled={loading}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-red-500 px-4 py-2.5 text-sm font-bold text-white shadow-sm transition-colors duration-200 hover:bg-red-600 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? (
                  <>
                    <Loader2 className="size-4 animate-spin" />
                    Deleting...
                  </>
                ) : (
                  <>
                    <Trash2 className="size-4" />
                    Delete Property
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

