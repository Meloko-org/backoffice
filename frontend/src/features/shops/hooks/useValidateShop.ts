import { useMutation, useQueryClient } from "@tanstack/react-query"
import { unvalidateShop, validateShop } from "../api/shops.api";

export const useValidateShop = () => {

  const queryClient = useQueryClient();

  const validateMutation = useMutation({
    mutationFn: ({id}:{id: string}) => validateShop(id),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["shop-dashboard", variables.id],
      });
    },
  })

  const unvalidateMutation = useMutation({
    mutationFn: (id: string) => unvalidateShop(id),
    onSuccess: (_, id) => {
      queryClient.invalidateQueries({
        queryKey: ["shop-dashboard", id],
      });
    },
  })

  return {
    validate: validateMutation.mutateAsync,
    unvalidate: unvalidateMutation.mutateAsync,
    isLaoding: validateMutation.isPending || unvalidateMutation.isPending
  }
}