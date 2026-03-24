import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteMarket } from "../api/markets.api";

export const useDeleteMarket = () => {

  const queryClient = useQueryClient();

  const deleteMutation = useMutation({
    mutationFn: (id: string) => deleteMarket(id),
    onSuccess: (_, id) => {
      queryClient.invalidateQueries({
        queryKey: ["adminMarkets"],
      });
    }
  })


  return {
    del: deleteMutation.mutateAsync,
    isLoading: deleteMutation.isPending
  }
}