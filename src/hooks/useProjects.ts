import { useQuery } from "@tanstack/react-query";
import { ProjectLight } from "../types";

export function useProjects() {
  return useQuery<ProjectLight[]>({
    queryKey: ["projects"],
    queryFn: async () => {
      const response = await fetch(
        `${import.meta.env.VITE_BASE_URL}/projects/list`,
        {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${import.meta.env.VITE_API_KEY}`,
          },
        }
      );
      return response.json();
    },
    initialData: [],
  });
}
