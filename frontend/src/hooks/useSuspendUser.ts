import { useMutation, useQueryClient } from "@tanstack/react-query";
import { suspendUser, unsuspendUser } from "../features/users/api/users.api";

export const useSuspendUser = () => {
  
  const queryClient = useQueryClient();

  const suspendMutation = useMutation({
    mutationFn: ({id, reason}: { id: string, reason: string}) => suspendUser(id, reason),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["user-dashboard", variables.id],
        exact: false,
      });
    },
  });

  const unsuspendMutation = useMutation({
    mutationFn: (id: string) => unsuspendUser(id),
    onSuccess: (_, id) => {
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
