import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../api/axios";
import type { Item } from "../components/uiComponent/FavoriteCard";

export const useFavorites = () => {
  return useQuery({
    queryKey: ["favorites"],
    queryFn: async () => {
      const res = await api.get("/api/favorites");
      return res.data as Item[];
    },
  });
};

export const useToggleFavorite = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => api.post(`/api/favorites/${id}`),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["favorites"] }),
  });
};