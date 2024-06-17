import React, { createContext, useState, useContext, ReactNode } from "react";

export type Todo = {
  id: string;
  page: string;
  todo: string;
};

export type TodosContext = {
  todos: { [key: string]: Todo[] };
  setTodos: React.Dispatch<React.SetStateAction<{ [key: string]: Todo[] }>>;
  folderState: { [key: string]: boolean };
  setFolderState: React.Dispatch<
    React.SetStateAction<{ [key: string]: boolean }>
  >;
};

const UserContext = createContext<TodosContext | undefined>(undefined);

export type TodosProviderProps = {
  children: ReactNode;
};

export const TodosProvider: React.FC<TodosProviderProps> = ({ children }) => {
  const [todos, setTodos] = useState<{ [key: string]: Todo[] }>({});
  const [folderState, setFolderState] = useState<{ [key: string]: boolean }>(
    {}
  );

  return (
    <UserContext.Provider
      value={{ todos, setTodos, folderState, setFolderState }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useTodos = (): TodosContext => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useTodos must be used within a TodosProvider");
  }
  return context;
};
