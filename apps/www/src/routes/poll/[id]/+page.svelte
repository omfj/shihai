<script lang="ts">
	let { data } = $props();
</script>

<svelte:head>
	<title>{data.poll.question}</title>
</svelte:head>

<h1 class="text-lg font-medium">{data.poll.question}</h1>

{#each data.poll.options as option}
	<div class="flex items-center gap-2">
		<input type="radio" name="option" id={option.id} value={option.id} />
		<label for={option.id}>{option.caption}</label>
	</div>
{/each}
