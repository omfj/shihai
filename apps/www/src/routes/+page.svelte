<script lang="ts">
	import { format } from '$lib/date';
	import { OctagonAlert, ArrowRight } from 'lucide-svelte';

	let { data } = $props();
	let { polls } = data;
</script>

<svelte:head>
	<title>Shihai</title>
</svelte:head>

{#if polls.length > 0}
	<h1 class="font-bold text-2xl mb-4">Active polls</h1>

	<ul class="flex flex-col gap-4">
		{#each polls as poll}
			<li>
				<a class="group" href="/poll/{poll.id}">
					<div class="flex items-center border-b-2 border-b-indigo-600 py-1">
						<ArrowRight
							class="transition-all pr-2 w-0 group-hover:w-6 duration-300 ease-in-out transform -translate-x-8 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 h-6 text-indigo-600"
						/>
						<div class="flex-1">
							<h2 class="font-medium text-lg">{poll.question}</h2>
							<p class="text-sm text-gray-500">{format(poll.createdAt)}</p>
						</div>

						<div class="w-10 flex flex-col items-center justify-center">
							<p class="text-sm text-gray-500">Votes</p>
							<p class="font-medium text-lg">{poll.votes}</p>
						</div>
					</div>
				</a>
			</li>
		{/each}
	</ul>
{:else}
	<div class="flex flex-col justify-center items-center gap-2">
		<OctagonAlert class="h-8 w-8" />
		<p class="font-medium text-lg">No polls found</p>
	</div>
{/if}
