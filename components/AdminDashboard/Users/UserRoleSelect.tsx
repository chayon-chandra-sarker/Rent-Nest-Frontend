"use client";

import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { updateUserRole } from "@/service/admin.service";

type UserRole = "TENANT" | "LANDLORD" | "ADMIN";

interface UserRoleSelectProps {
  userId: string;
  currentRole: string;
}

const UserRoleSelect = ({
  userId,
  currentRole,
}: UserRoleSelectProps) => {
  const queryClient = useQueryClient();

  const initialRole: UserRole =
    currentRole === "LANDLORD" ||
    currentRole === "ADMIN" ||
    currentRole === "TENANT"
      ? currentRole
      : "TENANT";

  const [selectedRole, setSelectedRole] =
    useState<UserRole>(initialRole);

  const roleMutation = useMutation({
    mutationFn: (role: UserRole) =>
      updateUserRole(userId, role),

    onSuccess: () => {
      toast.success("User role updated successfully");

      queryClient.invalidateQueries({
        queryKey: ["admin-users"],
      });
    },

    onError: () => {
      toast.error("Failed to update user role");
    },
  });

  const handleUpdate = () => {
    if (selectedRole === currentRole) return;

    roleMutation.mutate(selectedRole);
  };

  return (
    <div>
      <p className="mb-1 text-xs font-medium uppercase tracking-wide text-slate-400">
        Role
      </p>

      <div className="flex flex-wrap items-center gap-2">
        <select
          value={selectedRole}
          onChange={(e) =>
            setSelectedRole(e.target.value as UserRole)
          }
          disabled={roleMutation.isPending}
          className="rounded-full border-0 bg-cyan-500/10 px-3 py-1.5 text-xs font-semibold text-cyan-600 outline-none ring-1 ring-inset ring-cyan-500/20 dark:text-cyan-400"
        >
          <option value="TENANT">TENANT</option>
          <option value="LANDLORD">LANDLORD</option>
          <option value="ADMIN">ADMIN</option>
        </select>

        {selectedRole !== currentRole && (
          <button
            type="button"
            onClick={handleUpdate}
            disabled={roleMutation.isPending}
            className="rounded-lg bg-cyan-500 px-3 py-1.5 text-xs font-semibold text-white transition hover:bg-cyan-600 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {roleMutation.isPending
              ? "Updating..."
              : "Update"}
          </button>
        )}
      </div>
    </div>
  );
};

export default UserRoleSelect;