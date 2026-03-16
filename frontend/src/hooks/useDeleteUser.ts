import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteUser, restoreUser } from "../features/users/api/users.api";

export const useDeleteUser = () => {

  const queryClient = useQueryClient();

  const deleteMutation = useMutation({
    mutationFn: (id: string) => deleteUser(id),
    onSuccess: (_, id) => {
      queryClient.invalidateQueries({
        queryKey: ["user-dashboard", id],
      });

      queryClient.invalidateQueries({
        queryKey: ["adminUsers"],
      });
    },
  })

  const restoreMutation = useMutation({
    mutationFn: (id: string) => restoreUser(id),
    onSuccess: (_, id) => {
      queryClient.invalidateQueries({
        queryKey: ["user-dashboard", id],
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


