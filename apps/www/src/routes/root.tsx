import { For } from "solid-js";
import { createPollsQuery } from "../api/poll/poll.query";
import { A } from "@solidjs/router";
import { Title } from "../components/seo/title";

export function Root() {
  const state = createPollsQuery();

  return (
    <>
      <Title>Hello</Title>

      <main class="max-w-[400px] mx-auto w-full py-10">
        <h1 class="text-center text-3xl font-medium mb-4">SHIHAI</h1>

        <h2 class="text-center text-lg text-gray-700 mb-10">
          SHIHAI is the most advanced polling platform on the web.
        </h2>

        <ul class="flex flex-col gap-4">
          <For each={state.data}>
            {(poll) => (
              <li>
                <A
                  class="text-gray-800 hover:underline hover:bg-blue-200 transition-colors block rounded-lg border px-3 py-1"
                  href={`/poll/${poll.id}`}
                >
                  {poll.question}
                </A>
              </li>
            )}
          </For>
        </ul>
      </main>
    </>
  );
}
