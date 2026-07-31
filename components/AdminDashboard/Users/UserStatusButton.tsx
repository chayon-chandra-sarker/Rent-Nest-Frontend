
"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { updateUserStatus } from "@/service/admin.service";

interface UserStatusButtonProps {
  userId: string;
  status?: string;
}

const UserStatusButton = ({
  userId,
  status,
}: UserStatusButtonProps) => {
  const queryClient = useQueryClient();

  const isActive = status?.toUpperCase() === "ACTIVE";

  const updateStatusMutation = useMutation({
    mutationFn: () =>
      updateUserStatus(userId, isActive ? "BANNED" : "ACTIVE"),

    onSuccess: () => {
      toast.success(
        isActive
          ? "User blocked successfully"
          : "User unblocked successfully"
      );

      queryClient.invalidateQueries({
        queryKey: ["admin-users"],
      });
    },

    onError: (error: Error) => {
      toast.error(error.message || "Failed to update user status");
    },
  });

  return (
    <button
      type="button"
      onClick={() => updateStatusMutation.mutate()}
      disabled={updateStatusMutation.isPending}
      className={`mt-3 w-full rounded-lg px-3 py-2 text-xs font-semibold text-white transition disabled:cursor-not-allowed disabled:opacity-50 ${
        isActive
          ? "bg-red-500 hover:bg-red-600"
          : "bg-emerald-500 hover:bg-emerald-600"
      }`}
    >
      {updateStatusMutation.isPending
        ? "Updating..."
        : isActive
          ? "Block User"
          : "Unblock User"}
    </button>
  );
};

export default UserStatusButton;
