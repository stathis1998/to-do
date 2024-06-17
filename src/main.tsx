import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/sonner";

import { App } from "./App.tsx";
import { TodosProvider } from "./store/index.tsx";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <TodosProvider>
        <App />
      </TodosProvider>
      <Toaster richColors position="top-center" />
    </QueryClientProvider>
  </React.StrictMode>
);
