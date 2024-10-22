<script lang="ts">
	import { OctagonAlert } from 'lucide-svelte';

	let { data } = $props();
	let { polls } = data;
</script>

<svelte:head>
	<title>Shihai</title>
</svelte:head>

{#if polls.length > 0}
	<ul class="flex flex-col gap-4">
		{#each polls as poll}
			<li>
				<a class="group" href="/poll/{poll.id}">
					<div class="relative rounded border p-4">
						<span class="absolute top-1 right-1 text-[10px] text-gray-500">#{poll.id}</span>
						<h2 class="font-medium text-lg group-hover:underline">{poll.question}</h2>
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
