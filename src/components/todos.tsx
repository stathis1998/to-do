import { useTodos } from "@/store";
import { FaCheck, FaTrash } from "react-icons/fa6";
import { toast } from "sonner";

export function Todos() {
  const { todos, setTodos } = useTodos();

  function handleDelete(id: string) {
    setTodos((prevState) => {
      const newState = { ...prevState };
      const key = Object.keys(newState).find((key) =>
        newState[key].some((todo) => todo.id === id)
      );
      if (key) {
        newState[key] = newState[key].filter((todo) => todo.id !== id);

        if (newState[key].length === 0) {
          delete newState[key];
        }
      }
      toast.success("Todo deleted");
      return newState;
    });
  }

  return (
    <div>
      <h3 className="font-bold text-base">Todos</h3>
      {Object.keys(todos).map((key) => (
        <div key={key} className="py-2 space-y-2 divide-y">
          <h4 className="font-bold text-sm">{todos[key]?.[0]?.page}</h4>
          <ul className="p-2">
            {todos[key].map((todo) => (
              <li key={todo.id} className="flex justify-between items-center">
                <span>{todo.todo}</span>
                <div className="flex gap-1">
                  <FaCheck
                    className="ml-2 text-green-500 cursor-pointer"
                    onClick={() => handleDelete(todo.id)}
                  />
                  <FaTrash
                    className="ml-2 text-red-500 cursor-pointer"
                    onClick={() => handleDelete(todo.id)}
                  />
                </div>
              </li>
            ))}
          </ul>
        </div>
      ))}
      {Object.keys(todos).length === 0 && <p>No todos</p>}
    </div>
  );
}
