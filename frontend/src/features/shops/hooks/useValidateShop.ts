import { useMutation, useQueryClient } from "@tanstack/react-query"

export const useValidateShop = () => {
  const queryClient = useQueryClient();

  const validateMutation = useMutation({
    mutationFn: (id: string) => validateShop(id),
    onSuccess: (_, id) => {
      queryClient.invalidateQueries({
        queryKey: ["user-dashboard", id],
      });

      queryClient.invalidateQueries({
        queryKey: ["adminUsers"],
      });
    },
  })

  const unvalidateMutation = useMutation({
    mutationFn: (id: string) => unvalidateShop(id),
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
    validate: validateMutation.mutateAsync,
    unvalidate: unvalidateMutation.mutateAsync,
    isLaoding: validateMutation.isPending || unvalidateMutation.isPending
  }
}