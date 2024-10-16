import { A, useParams } from "@solidjs/router";
import { createPollQuery, createVoteMutation } from "../api/poll/poll.query";
import { For, createMemo } from "solid-js";
import { Title } from "../components/seo/title";
import { getCurrentUser } from "../api/auth/auth.query";
import { cn } from "../lib/cn";
import { queryClient } from "../lib/query-client";

export function Poll() {
  const params = useParams();
  const user = getCurrentUser();
  const pollQuery = createPollQuery(params.id);
  const voteMutation = createVoteMutation();

  const options = createMemo(() => {
    const options = pollQuery.data?.options.sort((a, b) => a.order - b.order);

    if (!options) {
      return [];
    }

    const votes = pollQuery.data?.votes.reduce(
      (acc, vote) => {
        const optionId = vote.voteOptionId;
        acc[optionId] = (acc[optionId] || 0) + 1;
        return acc;
      },
      {} as Record<string, number>,
    )!;

    return options.map((option) => ({
      ...option,
      votes: votes[option.id] || 0,
    }));
  });

  const votedOption = createMemo(() =>
    pollQuery.data?.votes.find((vote) => vote.userId === user?.id),
  );

  const handleVote = async (optionId: string) => {
    await voteMutation.mutateAsync({ pollId: params.id, optionId });
    queryClient.invalidateQueries({ queryKey: ["poll", params.id] });
  };

  return (
    <>
      <Title>{pollQuery.data?.question}</Title>

      <div>
        <A href="/" class="block text-blue-500 hover:underline">
          &larr; Back
        </A>

        <main class="max-w-[400px] mx-auto w-full py-10">
          <h1 class="text-3xl font-medium mb-4">{pollQuery.data?.question}</h1>

          <For each={options()}>
            {(option) => {
              return (
                <button
                  onClick={() => handleVote(option.id)}
                  class={cn(
                    "w-full bg-gray-100 hover:bg-gray-200 transition-colors rounded-lg px-3 py-1 mb-2",
                    {
                      "bg-green-200 hover:bg-green-300": votedOption()?.voteOptionId === option.id,
                    },
                  )}
                >
                  {option.votes} {option.caption}
                </button>
              );
            }}
          </For>
        </main>
      </div>
    </>
  );
}
