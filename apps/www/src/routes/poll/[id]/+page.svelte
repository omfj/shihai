<script lang="ts">
	import { invalidate } from '$app/navigation';
	import { votePoll } from '$lib/api/polls/polls.fetch.js';
	import { cn } from '$lib/cn.js';
	import Alert from '$lib/components/Alert.svelte';
	import { getAuthContext } from '$lib/context/auth-context.svelte.js';
	import { ThumbsUp } from 'lucide-svelte';

	let { data } = $props();

	let auth = getAuthContext();
	let isLoggedIn = $derived(!!auth.user);
	let votedOption = $derived(
		data.poll.votes.find((vote) => vote.userId === auth.user?.id)?.voteOptionId
	);

	const handleVote = async (voteOptionId: string) => {
		await votePoll({
			pollId: data.poll.id,
			voteOptionId
		});

		await invalidate(`poll:${data.poll.id}`);
	};

	const countVotes = (voteOptionId: string) => {
		return data.poll.votes.filter((vote) => vote.voteOptionId === voteOptionId).length;
	};
</script>

<svelte:head>
	<title>{data.poll.question}</title>
</svelte:head>

{#if !isLoggedIn}
	<Alert class="mb-4">
		<p>You need to be logged in to vote.</p>
	</Alert>
{/if}

<h1 class="text-2xl font-medium mb-4">{data.poll.question}</h1>

<ul class="flex flex-col gap-2">
	{#each data.poll.options as option}
		{@const hasVotedOnOption = votedOption === option.id}
		<li>
			<div class="border rounded h-16 px-4 py-2 flex items-center gap-2">
				<p class="font-medium text-xl flex-1">{option.caption}</p>

				<div class="flex flex-col items-center justify-center h-10 w-10 -space-y-1">
					<p class="text-sm text-gray-500">Votes</p>
					<p class="font-medium text-lg">{countVotes(option.id)}</p>
				</div>

				<button
					onclick={() => handleVote(option.id)}
					class={cn(
						'flex items-center justify-center border text-gray-600 h-10 w-10 rounded transition-colors duration-300 ease-in-out hover:bg-indigo-100 hover:border-2 hover:text-indigo-600 hover:border-indigo-400',
						{
							'bg-indigo-100 border-indigo-400 text-indigo-600': hasVotedOnOption
						}
					)}
				>
					<ThumbsUp class="h-6 w-6" />
				</button>
			</div>
		</li>
	{/each}
</ul>
