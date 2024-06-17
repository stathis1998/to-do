import { useQuery } from "@tanstack/react-query";
import { ProjectTree } from "../types";

export function usePageTree(id: string | undefined) {
  return useQuery<ProjectTree>({
    queryKey: ["page-tree", id],
    queryFn: async () => {
      const response = await fetch(
        `${import.meta.env.VITE_BASE_URL}/${id}/page/tree`,
        {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${import.meta.env.VITE_API_KEY}`,
          },
        }
      );
      return response.json();
    },
    enabled: !!id,
  });
}
