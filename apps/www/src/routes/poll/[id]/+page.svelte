<script lang="ts">
	import { goto, invalidate } from '$app/navigation';
	import { cn } from '$lib/cn';
	import Alert from '$lib/components/Alert.svelte';
	import { getAuthContext } from '$lib/context/auth-context.svelte';
	import { ThumbsUp } from 'lucide-svelte';
	import { formatWithTime } from '$lib/date';
	import { shihai } from '$lib/shihai';
	import Button from '$lib/components/ui/Button.svelte';
	import ButtonLink from '$lib/components/ui/ButtonLink.svelte';

	let { data } = $props();

	let auth = getAuthContext();
	let isLoggedIn = $derived(!!auth.user);
	let votedOption = $derived(
		data.poll.votes.find((vote) => vote.userId === auth.user?.id)?.voteOptionId
	);
	let hasExpired = $derived(
		data.poll.expiresAt ? new Date(data.poll.expiresAt) < new Date() : false
	);
	let isOwner = $derived(data.poll.userId === auth.user?.id);

	const handleVote = async (voteOptionId: string) => {
		await shihai.polls.vote({
			pollId: data.poll.id,
			voteOptionId
		});

		await invalidate(`poll:${data.poll.id}`);
	};

	const countVotes = (voteOptionId: string) => {
		return data.poll.votes.filter((vote) => vote.voteOptionId === voteOptionId).length;
	};

	const handleDelete = async () => {
		const result = await shihai.polls.delete(data.poll.id);

		// @ts-expect-error idk why this is not working
		if (result.success) {
			goto('/');
		}
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

{#if hasExpired}
	<Alert class="mb-4">
		<p>This poll has expired.</p>
	</Alert>
{/if}

<h1 class="text-2xl font-medium mb-2">{data.poll.question}</h1>
<p class="text-sm text-gray-500 mb-4">Views: {data.views}</p>

<ul class="flex flex-col gap-2 mb-4">
	{#each data.poll.options as option}
		{@const hasVotedOnOption = votedOption === option.id}
		<li>
			<div class="border rounded bg-gray-100 h-16 px-4 py-2 flex items-center gap-2">
				<p class="font-medium text-xl flex-1">{option.caption}</p>

				<div class="flex flex-col items-center justify-center h-10 w-10 -space-y-1">
					<p class="text-sm text-gray-500">Votes</p>
					<p class="font-medium text-lg">{countVotes(option.id)}</p>
				</div>

				<button
					onclick={() => handleVote(option.id)}
					class={cn(
						'flex items-center justify-center border text-gray-600 h-10 w-10 rounded transition-all duration-300 ease-in-out bg-white hover:bg-indigo-100 hover:border-2 hover:text-indigo-600 hover:border-indigo-400 disabled:opacity-50 disabled:cursor-not-allowed',
						{
							'bg-indigo-100 border-indigo-400 text-indigo-600': hasVotedOnOption
						}
					)}
					disabled={!isLoggedIn || hasExpired}
				>
					<ThumbsUp class="h-6 w-6" />
				</button>
			</div>
		</li>
	{/each}
</ul>

<div class="flex flex-col text-sm text-gray-600 mb-4">
	<p>Created at: {formatWithTime(data.poll.createdAt)}</p>
	<p>Expires at: {data.poll.expiresAt ? formatWithTime(data.poll.expiresAt) : 'Never'}</p>
</div>

{#if isOwner}
	<div class="flex flex-col gap-2">
		<h2 class="font-medium text-lg">Poll actions</h2>

		<div class="flex items-center gap-2">
			<ButtonLink href="/poll/{data.poll.id}/edit">Edit</ButtonLink>
			<Button onclick={handleDelete}>Delete</Button>
		</div>
	</div>
{/if}
