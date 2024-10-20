import { Show } from "solid-js";
import { getCurrentUser } from "../api/auth/auth.query";
import { Title } from "../components/seo/title";
import { Alert } from "../components/ui/alert";

export function NewPoll() {
  const user = getCurrentUser();

  return (
    <>
      <Title>New Poll</Title>

      <main class="max-w-screen-sm mx-auto">
        <Show when={!user()}>
          <Alert>You can not create a poll without being logged in.</Alert>
        </Show>

        <h1>New Poll</h1>
      </main>
    </>
  );
}
