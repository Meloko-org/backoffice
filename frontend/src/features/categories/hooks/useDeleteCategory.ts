import { useMutation, useQueryClient } from "@tanstack/react-query"
import { deleteCategory } from "../api/categories.api";

export const useDeleteCategory = () => {

  const queryClient = useQueryClient();

  const deleteMutation = useMutation({
    mutationFn: (id: string) => deleteCategory(id),
    onSuccess: (_, id) => {
      queryClient.invalidateQueries({
        queryKey: ["adminCategories"],
      });
    }
  })


  return {
    del: deleteMutation.mutateAsync,
    isLoading: deleteMutation.isPending
  }
}