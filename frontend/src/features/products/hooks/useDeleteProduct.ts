import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteProduct } from "../api/products.api";

export const useDeleteProduct = () => {

  const queryClient = useQueryClient();

  const deleteMutation = useMutation({
    mutationFn: (id: string) => deleteProduct(id),
    onSuccess: (_, id) => {
      queryClient.invalidateQueries({
        queryKey: ["adminProducts"],
      });
    }
  })


  return {
    del: deleteMutation.mutateAsync,
    isLoading: deleteMutation.isPending
  }
}