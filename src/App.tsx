import { Header } from "./components/layout/header";
import { Footer } from "./components/layout/footer";
import { Main } from "./components/layout/main";

import { useProjects } from "./hooks/useProjects";
import { Projects } from "./components/projects";

export function App() {
  const {
    data: projects,
    isLoading: isProjectsLoading,
    isFetching: isProjectsFetching,
  } = useProjects();

  return (
    <div className="h-full flex flex-col">
      <Header />
      <Main>
        <Projects
          projects={projects}
          isLoading={isProjectsLoading || isProjectsFetching}
        />
      </Main>
      <Footer />
    </div>
  );
}
