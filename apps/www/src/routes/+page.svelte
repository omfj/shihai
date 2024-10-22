<script lang="ts">
	import { OctagonAlert } from 'lucide-svelte';

	let { data } = $props();
	let { polls } = data;
</script>

{#if polls.length > 0}
	<ul>
		{#each polls as poll}
			<li>
				<a href="/poll/{poll.id}">
					<div class="rounded border p-4">
						<h2 class="font-medium text-lg">{poll.question}</h2>
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
