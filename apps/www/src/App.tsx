import { Route, Router } from "@solidjs/router";
import { QueryClientProvider } from "@tanstack/solid-query";
import { Root } from "./routes/root";
import { Poll } from "./routes/poll.$id";
import { queryClient } from "./lib/query-client";

export function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Route path="/" component={Root} />
        <Route path="/poll/:id" component={Poll} />
      </Router>
    </QueryClientProvider>
  );
}
