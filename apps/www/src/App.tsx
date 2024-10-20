import { Route, Router } from "@solidjs/router";
import { QueryClientProvider } from "@tanstack/solid-query";
import { Root } from "./routes/root";
import { Poll } from "./routes/poll.$id";
import { queryClient } from "./lib/query-client";
import { DefaultLayout } from "./layouts/default-layout";
import { NotFound } from "./routes/not-found";
import { NewPoll } from "./routes/poll.new";
import { Login } from "./routes/login";
import { Register } from "./routes/register";

export function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Route path="/" component={DefaultLayout}>
          <Route path="/" component={Root} />
          <Route path="/poll/new" component={NewPoll} />
          <Route path="/poll/:id" component={Poll} />
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <Route path="*404" component={NotFound} />
        </Route>
      </Router>
    </QueryClientProvider>
  );
}
