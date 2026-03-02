import { useMutation, useQueryClient } from "@tanstack/react-query";
import { suspendUser, unsuspendUser } from "../features/users/api/users.api";

export const useSuspendUser = (id: string) => {
  const queryClient = useQueryClient();

  const suspendMutation = useMutation({
    mutationFn: (reason: string) => suspendUser(id, reason),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["user-dashboard", id],
        exact: false,
      });
    },
  });

  const unsuspendMutation = useMutation({
    mutationFn: () => unsuspendUser(id),
    onSuccess: () => {
        queryClient.invalidateQueries({
        queryKey: ["user-dashboard", id],
        exact: false,
      });
    },
  });

  return {
    suspend: suspendMutation.mutateAsync,
    unsuspend: unsuspendMutation.mutateAsync,
    isLoading:
      suspendMutation.isPending || unsuspendMutation.isPending,
  };
};
