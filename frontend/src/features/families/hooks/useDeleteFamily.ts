import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteFamily } from "../api/families.api";

export const useDeleteFamily = () => {

  const queryClient = useQueryClient();

  const deleteMutation = useMutation({
    mutationFn: (id: string) => deleteFamily(id),
    onSuccess: (_, id) => {
      queryClient.invalidateQueries({
        queryKey: ["adminFamilies"],
      });
    }
  })


  return {
    del: deleteMutation.mutateAsync,
    isLoading: deleteMutation.isPending
  }
}