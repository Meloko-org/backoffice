import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteUser, restoreUser } from "../features/users/api/users.api";

export const useDeleteUser = (userId: string) => {
  const queryClient = useQueryClient();

  const deleteMutation = useMutation({
    mutationFn: () => deleteUser(userId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["userDashboard", userId],
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
        queryKey: ["userDashboard", userId],
      });

      queryClient.invalidateQueries({
        queryKey: ["adminUsers"],
      });
    },
  })

  return {
    delete: deleteMutation.mutate,
    restore: restoreMutation.mutate,
    isLoading: deleteMutation.isPending || restoreMutation.isPending,
  }

  
};



// return useMutation({
//     mutationFn: () => deleteUser(userId),
//     onSuccess: () => {
//       queryClient.invalidateQueries({
//         queryKey: ["userDashboard", userId],
//       });

//       queryClient.invalidateQueries({
//         queryKey: ["adminUsers"],
//       });
//     },
//   });