import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../api/axios";

export const useProperties = () => {
  return useQuery({
    queryKey: ["items"],
    queryFn: async () => {
      const res = await api.get("/api/items");
      return res.data;
    },
  });
};

export const useCreateProperty = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (data: any) => api.post("/api/items", data),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["items"] }),
  });
};

export const useUpdateProperty = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: any) => api.put(`/api/items/${id}`, data),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["items"] }),
  });
};

export const useDeleteProperty = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => api.delete(`/api/items/${id}`),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["items"] }),
  });
};