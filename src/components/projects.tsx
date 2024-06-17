import { ProjectLight } from "@/types";
import { Button } from "./ui/button";
import { useState } from "react";
import { LoadingState } from "./loading-state";
import { PageTree } from "./page-tree";
import { usePageTree } from "@/hooks/usePageTree";
import { Todos } from "./todos";
import { cn } from "@/lib/utils";

export type ProjectsProps = {
  projects?: ProjectLight[];
  isLoading?: boolean;
};

export function Projects(props: ProjectsProps) {
  const { projects, isLoading } = props;

  const [selectedProject, setSelectedProject] = useState<ProjectLight>();

  const {
    data: pageTree,
    isLoading: isPageTreeLoading,
    isFetching: isPageTreeFetching,
  } = usePageTree(selectedProject?.id);

  return (
    <div className="space-y-4 h-full flex flex-col lg:grid md:grid-cols-3 lg:gap-4">
      <div className="p-1">
        <h2 className="font-bold text-lg">Projects</h2>
        {isLoading && <LoadingState />}
        {!isLoading && projects && (
          <ul>
            {projects.map((project) => (
              <li
                key={project.id}
                className={cn(
                  "flex justify-between items-center px-2 text-sm",
                  {
                    "bg-gray-200 font-bold": selectedProject?.id === project.id,
                  }
                )}
              >
                <span>{project.name}</span>
                <Button
                  variant={"link"}
                  onClick={() => setSelectedProject(project)}
                >
                  View
                </Button>
              </li>
            ))}
          </ul>
        )}
      </div>
      <div className="p-1">
        <PageTree
          pageTree={pageTree}
          isLoading={isPageTreeLoading || isPageTreeFetching}
        />
      </div>
      <div className="p-1">
        <Todos />
      </div>
    </div>
  );
}
