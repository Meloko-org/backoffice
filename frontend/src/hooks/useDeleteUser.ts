import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteUser, restoreUser } from "../features/users/api/users.api";

export const useDeleteUser = (userId: string) => {
  const queryClient = useQueryClient();

  const deleteMutation = useMutation({
    mutationFn: () => deleteUser(userId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["user-dashboard", userId],
      });

      queryClient.invalidateQueries({
        queryKey: ["adminUsers"],
      });
    },
  })

  const restoreMutation = useMutation({
    mutationFn: () => restoreUser(userId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["user-dashboard", userId],
      });

      queryClient.invalidateQueries({
        queryKey: ["adminUsers"],
      });
    },
  })

  return {
    del: deleteMutation.mutateAsync,
    restore: restoreMutation.mutateAsync,
    isLoading: deleteMutation.isPending || restoreMutation.isPending,
  }

  
};


