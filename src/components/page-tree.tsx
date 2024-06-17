import { ObjectType, ProjectTree } from "@/types";
import { LoadingState } from "./loading-state";
import { FaFolderOpen, FaFolder, FaFile, FaFileImage } from "react-icons/fa6";
import { cn } from "@/lib/utils";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "./ui/collapsible";
import { useState } from "react";

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { toast } from "sonner";
import { useTodos } from "@/store";

export type PageTreeProps = {
  pageTree?: ProjectTree;
  isLoading?: boolean;
};

function getIcon(type: ObjectType, isOpen?: boolean) {
  switch (type) {
    case ObjectType.PAGES_ROOT:
    case ObjectType.FOLDER:
      return isOpen ? (
        <FaFolderOpen className="mr-1 h-4 min-w-4 text-blue-500" />
      ) : (
        <FaFolder className="mr-1 h-4 min-w-4 text-blue-500" />
      );
    case ObjectType.PAGE:
      return <FaFile className="mr-1 h-4 min-w-4 text-gray-500" />;
    case ObjectType.IMAGE:
      return <FaFileImage className="mr-1 h-4 min-w-4 text-green-500" />;
    default:
      return null;
  }
}

function List({ tree }: { tree: ProjectTree }) {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const [selectedTree, setSelectedTree] = useState<ProjectTree | null>(null);
  const [todo, setTodo] = useState<string>("");

  const { todos, setTodos, folderState, setFolderState } = useTodos();

  function handleToggle(id: string) {
    setFolderState((prevState) => ({
      ...prevState,
      [id]: !prevState[id],
    }));
  }

  return (
    <>
      <ul key={tree.id} className="ml-2">
        {tree.children.map((child) => (
          <li key={child.id}>
            <div
              className={cn("flex items-center", {
                "hover:bg-gray-200 cursor-pointer":
                  child.type === ObjectType.FOLDER,
              })}
              onClick={() => {
                handleToggle(child.id);
              }}
            >
              {getIcon(child.type, folderState[child.id])}
              <span
                className={cn("text-nowrap", {
                  "hover:underline cursor-pointer": child.type === "PAGE",
                })}
                onClick={() => {
                  if (child.type === "PAGE") {
                    setIsDrawerOpen(true);
                    setSelectedTree(child);
                  }
                }}
                title={child.name}
              >
                {child.name}{" "}
                {child.type === ObjectType.PAGE && (
                  <>({todos[child.id]?.length || 0})</>
                )}
              </span>
            </div>
            <Collapsible open={folderState[child.id]}>
              <CollapsibleContent>
                {child.children.length > 0 && (
                  <div className="border-l border-black ml-2">
                    <List tree={child} />
                  </div>
                )}
              </CollapsibleContent>
            </Collapsible>
          </li>
        ))}
      </ul>
      <Drawer open={isDrawerOpen}>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>Create Todo</DrawerTitle>
            <DrawerDescription>
              Add a todo for <strong>{selectedTree?.name}</strong>
            </DrawerDescription>
          </DrawerHeader>
          <div className="container space-y-2">
            <Label htmlFor="name">Todo</Label>
            <Input
              id="name"
              placeholder="Enter todo"
              value={todo}
              onChange={(e) => setTodo(e.target.value)}
            />
          </div>
          <DrawerFooter>
            <Button
              onClick={() => {
                if (!selectedTree) return;

                if (todo.trim() === "") {
                  toast.error("Todo cannot be empty");
                  return;
                }

                setTodos((prevState) => ({
                  ...prevState,
                  [selectedTree.id]: [
                    ...(prevState[selectedTree.id] || []),
                    {
                      id: selectedTree.id,
                      page: selectedTree.name,
                      todo,
                    },
                  ],
                }));
                setTodo("");
                toast.success("Todo added successfully");
                setIsDrawerOpen(false);
              }}
            >
              Submit
            </Button>
            <DrawerClose asChild>
              <Button onClick={() => setIsDrawerOpen(false)} variant="outline">
                Cancel
              </Button>
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
}

export function PageTree(props: PageTreeProps) {
  const { pageTree, isLoading } = props;

  const { folderState, setFolderState } = useTodos();

  return (
    <div className="space-y-4">
      <h3 className="font-bold text-base">Page Tree</h3>
      <div className="overflow-auto">
        {isLoading && <LoadingState rows={1} />}
        {!isLoading && !pageTree && <p>No page tree found</p>}
        {!isLoading && pageTree && (
          <div>
            <Collapsible
              open={folderState[`${pageTree.id}:${pageTree.projectId}`]}
            >
              <CollapsibleTrigger asChild>
                <div
                  className={cn("flex items-center", {
                    "hover:bg-gray-200 cursor-pointer":
                      pageTree.children.length > 0,
                  })}
                  onClick={() => {
                    if (pageTree.children.length > 0) {
                      setFolderState((prevState) => ({
                        ...prevState,
                        [`${pageTree.id}:${pageTree.projectId}`]:
                          !prevState[`${pageTree.id}:${pageTree.projectId}`],
                      }));
                    }
                  }}
                >
                  {getIcon(
                    pageTree.type,
                    folderState[`${pageTree.id}:${pageTree.projectId}`]
                  )}
                  <span className="text-nowrap">{pageTree.type}</span>
                </div>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <div className="ml-2 border-l border-black">
                  <List tree={pageTree} />
                </div>
              </CollapsibleContent>
            </Collapsible>
          </div>
        )}
      </div>
    </div>
  );
}
